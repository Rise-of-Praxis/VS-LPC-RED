const { InputStream, CommonTokenStream, tree } = require("antlr4");
const { LPCParser } = require('./LPCParser');
const { LPCLexer } = require("./LPCLexer");
const { LPCListener } = require("./LPCListener");
const { Uri, Range, Position, DocumentSymbol, SymbolKind } = require("vscode");

/**
 * The list of parser rules that should be tracked as document symbols
 */
const documentSymbolRules =
	[
		LPCParser.RULE_defineConstantStatement,
		LPCParser.RULE_variable,
		LPCParser.RULE_programVariableDeclaration,
		LPCParser.RULE_functionDefinition,
		LPCParser.RULE_classIdentifier
	];

/**
 * The mapping of parser rules to the symbol type
 */
const documentSymbolMapping =
{
	[LPCParser.RULE_defineConstantStatement]: SymbolKind.Constant,
	[LPCParser.RULE_variable]: SymbolKind.Variable,
	[LPCParser.RULE_programVariableDeclaration]: SymbolKind.Field,
	[LPCParser.RULE_functionDefinition]: SymbolKind.Function,
	[LPCParser.RULE_classIdentifier]: SymbolKind.Struct
}

/**
 * @typedef {Object} Identifier
 * @property {String} name The name of the identifier
 * @property {Range} range The range the identifier occupies
 * @property {Scope} scope The scope of the identifier
 */

/**
 * @typedef {Object} Scope
 * @property {ParserRuleContext} context The context representing the whole scope block
 * @property {Map<String, SymbolTableEntry>} symbolTable The symbols defined within this scope
 * @property {Scope} parent The parent scope for this scope
 */

/**
 * @typedef {Object} SymbolTableEntry
 * @property {Range[]} occurrences The ranges where a symbol occurs 
 * @property {Range} definitionRange The range where the symbol is defined. 
 */

/**
 * A representation of an LPC file
 */
class LPCDocument extends LPCListener
{
	constructor(input, uri)
	{
		super();

		const chars = new InputStream(input);
		const lexer = new LPCLexer(chars);
		const tokens = new CommonTokenStream(lexer);
		const parser = new LPCParser(tokens);

		parser.removeErrorListeners();
		parser.addErrorListener(this);

		parser.buildParseTrees = true;
		const lpcProgram = this.#lpcProgram = parser.lpcProgram();
		this.#lpcProgram = lpcProgram;
		this.#uri = uri;

		const walker = new tree.ParseTreeWalker()
		walker.walk(this, lpcProgram);

		this.#scope = [];
	}

	/**
	 * The root context to the document
	 * @type {ParserRuleContext}
	 */
	get root() { return this.#lpcProgram; }
	#lpcProgram;

	/**
	 * The URI of this file
	 * @type {Uri}
	 */
	get uri() { return this.#uri; }
	#uri;

	/**
	 * The list of symbols within the file.  These are the declarations 
	 * of variables, functions, etc.
	 * @type {DocumentSymbol[]}
	 */
	get documentSymbols() { return this.#documentSymbols; }
	#documentSymbols = [];

	/**
	 * The complete list of all identifiers in the file
	 * @type {ParserRuleContext[]}
	 */
	#identifiers = [];

	/**
	 * A stack of contexts that represent the scope block while visiting the parse tree
	 * @type {Scope[]}
	 */
	#scope = [];

	/**
	 * The current scope being processed
	 * @type {Scope}
	 */
	get currentScope() { return this.#scope[0]; }

	/**
	 * Any captured syntax errors
	 * @type {object[]}
	 */
	get syntaxErrors() { return this.#syntaxErrors; }
	#syntaxErrors = [];

	syntaxError(recognizer, offendingSymbol, line, column, msg, e)
	{
		this.#syntaxErrors.push({ recognizer, offendingSymbol, line, column, msg, e });
	}

	reportAmbiguity(recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs)
	{
	};

	reportAttemptingFullContext(recognizer, dfa, startIndex, stopIndex, conflictingAlts, configs)
	{
	};

	reportContextSensitivity(recognizer, dfa, startIndex, stopIndex, prediction, configs)
	{
	};

	/**
	 * Returns the {@link SymbolKind} for a specific context and scope
	 * @param {ParserRuleContext} context The rule context to create the symbol for
	 * @returns {SymbolKind}
	 */
	getDocumentSymbolKind(context)
	{
		if (context == null)
			return;

		const { ruleIndex } = context;

		return documentSymbolMapping[ruleIndex];
	}

	/**
	 * Returns the identifier used for a context
	 */
	getContextIdentifierText(context)
	{
		if (context.ruleIndex === LPCParser.RULE_identifier)
			return context.getText();

		if (!context || !context.identifier)
			return undefined;

		const identifier = context.identifier();
		return identifier.getText();
	}

	/**
	 * Creates a document symbol for a rule context
	 * 
	 * @param {ParserRuleContext} context The rule context to create the symbol for
	 * @param {SymbolKind} kind The type of symbol to create
	 * @returns {DocumentSymbol}
	 */
	createSymbol(context, kind)
	{
		const name = this.getContextIdentifierText(context);
		if (!name)
			return undefined;

		const range = this.createRange(context);

		const symbol = new DocumentSymbol(name, "", kind, range, range);

		return symbol;
	}

	/**
	 * Creates a {@link Position} equivalent of a parser context position
	 * @param {object} contextPosition The position to convert
	 * @returns {Position}
	 */
	createDocumentPosition(contextPosition)
	{
		return new Position(contextPosition.line - 1, contextPosition.column);
	}

	/**
	 * Indicates if the context is a terminal node or not
	 * @param {ParserRuleContext} context The rule context to create the symbol for
	 * @returns {boolean}
	 */
	isTerminalNode(context) { return context.symbol !== undefined; }

	/**
	 * Returns an instance of {@link Range} for a given context
	 * @param {ParserRuleContext} context 
	 * @returns {Range}
	 */
	createRange(context)
	{
		if (this.isTerminalNode(context))
			return this.getTerminalRange(context);

		// Get the start and stopping tokens
		const { start, stop } = context;

		// Set the start position to be at the beginning of the start token, but the
		// stop position is at the end of the stop token
		const startPosition = this.createDocumentPosition(start);
		const stopPosition = this.createDocumentPosition(stop)
			.translate(0, stop.text ? stop.text.length : 0);

		return new Range(startPosition, stopPosition);
	}

	/**
	 * Returns an instance of {@link Range} for a terminal context
	 * @param {ParserRuleContext} context 
	 * @returns {Range}
	 */
	getTerminalRange(context)
	{
		if (!this.isTerminalNode(context))
			return undefined;

		const { line, column, text } = context.symbol;

		// Get the starting position
		const startPosition = new Position(line - 1, column);

		// The end position is at the end of the consumed terminal.  Take note that
		// it may include newlines, so calculate accordingly.
		const lines = text ? text.split(/(\r\n|\n)/) : [''];
		const endLine = startPosition.line + lines.length - 1;
		const endColumn = lines[lines.length - 1];
		const endPosition = new Position(endLine, endColumn);

		return new Range(startPosition, endPosition);
	}

	/**
	 * Returns the identifier at a position.
	 * @returns {Identifier}
	 */
	getIdentifierAtPosition(position)
	{
		let identifier = this.#identifiers.find((identifier) =>
		{
			const { range } = identifier;
			return (range.contains(position));
		});

		if (identifier === undefined)
			return;

		return identifier;
	}

	/**
	 * Adds a symbol to the current scope's symbol table.  This enables quick lookup of symbols
	 * @param {DocumentSymbol} symbol The symbol to add to the current scope
	 */
	addToSymbolTable(symbol)
	{
		const scope = this.currentScope;
		scope.symbolTable.set(symbol.name, { occurrences: [], definitionRange: symbol.range });
	}

	/**
	 * Adds a document symbol
	 */
	addDocumentSymbol(ctx)
	{
		let statement = ctx;
		while (statement != null
			&& documentSymbolRules.indexOf(statement.ruleIndex) === -1)
		{
			statement = statement.parentCtx;
		}

		if (statement == null)
			return;

		const kind = this.getDocumentSymbolKind(statement);
		if (kind == null)
			return;

		const symbol = this.createSymbol(ctx, kind);

		// If this is a top-level declaration, then add it to the top set of document symbols
		if (ctx.ruleIndex === LPCParser.RULE_functionDeclaration
			|| ctx.ruleIndex === LPCParser.RULE_classIdentifier
			|| this.#scope.length === 1)
			this.#documentSymbols.push(symbol);
		else
		{
			// Add this to the function scope that it's defined in
			const scope = this.#documentSymbols[this.#documentSymbols.length - 1];
			scope.children.push(symbol);
		}

		// Add this symbol to the symbol table for the current scope
		this.addToSymbolTable(symbol);
	}

	/**
	 * Returns an instance of {@link Range} for a given context
	 * @param {ParserRuleContext} context 
	 * @returns {Range}
	 */
	getContextRange(context)
	{
		if (this.isTerminalNode(context))
			return this.getTerminalRange(context);

		// Get the start and stopping tokens
		const { start, stop } = context;

		// Set the start position to be at the beginning of the start token, but the
		// stop position is at the end of the stop token
		const startPosition = this.createDocumentPosition(start);
		const stopPosition = this.createDocumentPosition(stop)
			.translate(0, stop.text ? stop.text.length : 0);

		return new Range(startPosition, stopPosition);
	}

	/**
	 * Returns the scope instance where the identifier is declared
	 * @param {(Identifier|String)} identifier The identifier to find the scope for
	 * @returns {Scope} The scope this identifier is defined at
	 */
	getIdentifierDeclarationScope(identifier)
	{
		const name = (typeof(identifier) === "string") ? identifier : identifier.name;
		let scope = (typeof(identifier) === "string") ? this.currentScope : identifier.scope;

		while (scope !== undefined)
		{
			if (scope.symbolTable.has(name))
				return scope;

			scope = scope.parent;
		}

		return undefined;
	}

	/**
	 * Adds the occurrence of an identifier to where it the declaration scope
	 * @param {Identifier} identifier The identifier
	 */
	addIdentifierOccurrence(identifier)
	{
		const { name, range } = identifier;
		const scope = this.getIdentifierDeclarationScope(identifier);

		if (!scope)
			return;

		const entry = scope.symbolTable.get(name);
		entry.occurrences.push(range);
	}

	pushScope(ctx)
	{
		/** @type {Scope} */
		const scope = { context: ctx, symbolTable: new Map(), parent: this.currentScope };

		this.#scope.unshift(scope);
	}

	popScope()
	{
		this.#scope.shift();
	}

	enterLpcProgram(ctx)
	{
		this.pushScope(ctx);
	}

	exitLpcProgram(ctx)
	{
		this.popScope();
	}

	enterParameterDefinition(ctx)
	{
		this.addDocumentSymbol(ctx);
	}

	enterFunctionDeclaration(ctx)
	{
		this.addDocumentSymbol(ctx);
	}

	enterFunctionDefinition(ctx)
	{
		this.pushScope(ctx);
	}

	exitFunctionDefinition(ctx)
	{
		this.popScope();
	}

	enterClassIdentifier(ctx)
	{
		const scope = this.currentScope;
		if (scope
			&& scope.context.ruleIndex === LPCParser.RULE_classDefinition)
			this.addDocumentSymbol(ctx);
	}

	enterClassDefinition(ctx)
	{
		this.pushScope(ctx);
	}

	exitClassDefinition(ctx)
	{
		this.popScope();
	}

	enterVariable(ctx)
	{
		this.addDocumentSymbol(ctx);
	}

	enterIdentifier(ctx)
	{
		const name = ctx.getText();
		const scope = this.getIdentifierDeclarationScope(name);

		const range = this.createRange(ctx);
		const identifier = { name, range, scope };

		// Find where this symbol is defined and add it to that occurrence
		this.addIdentifierOccurrence(identifier);

		this.#identifiers.push(identifier);
	}

	enterDefineConstantStatement(ctx)
	{
		this.addDocumentSymbol(ctx);
	}
}

module.exports = {
	LPCDocument
};