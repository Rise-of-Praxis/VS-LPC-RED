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
		LPCParser.RULE_parameterDefinition,
		LPCParser.RULE_defineConstantStatement,
		LPCParser.RULE_programVariableDeclaration,
		LPCParser.RULE_functionDefinition,
		LPCParser.RULE_functionDeclaration,
		LPCParser.RULE_classIdentifier
	];

/**
 * The mapping of parser rules to the symbol type
 */
const documentSymbolMapping =
{
	[LPCParser.RULE_defineConstantStatement]: SymbolKind.Constant,
	[LPCParser.RULE_parameterDefinition]: SymbolKind.Variable,
	[LPCParser.RULE_variable]: SymbolKind.Variable,
	[LPCParser.RULE_programVariableDeclaration]: SymbolKind.Field,
	[LPCParser.RULE_programDeclaration]: SymbolKind.Variable,
	[LPCParser.RULE_functionDefinition]: SymbolKind.Function,
	[LPCParser.RULE_functionDeclaration]: SymbolKind.Function,
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
 * @property {DocumentSymbol} symbol The instance of {@type DocumentSymbol}
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

		this.#scopes = [];
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
	#scopes = [];

	/**
	 * The function that is currently being parsed
	 * @type {DocumentSymbol}
	 */
	#currentFunctionSymbol = undefined;

	/**
	 * The scope representing the file's top-level symbols
	 * @type {Scope}
	 */
	#rootScope = undefined;

	/**
	 * The current scope being processed
	 * @type {Scope}
	 */
	get currentScope() { return this.#scopes[0]; }

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

		if (identifier == undefined)
			return undefined;

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
		const { symbolTable } = this.currentScope;
		symbolTable.set(symbol.name, { symbol, occurrences: [] });
	}

	/**
	 * Adds a document symbol
	 * @param {ParserRuleContext} ctx The parser rule context
	 * @returns {DocumentSymbol} The document symbol that was added.
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

		const statementKind = this.getDocumentSymbolKind(statement);
		let symbolKind = this.getDocumentSymbolKind(ctx) || statementKind;
		if (symbolKind == null)
			return;

		if (symbolKind === SymbolKind.Variable
			&& statementKind === SymbolKind.Field)
			symbolKind = statementKind;

		// Create the symbol for this
		const symbol = this.createSymbol(ctx, symbolKind);
		if (!symbol)
			return;

		// Add this symbol to the symbol table for the current scope
		this.addToSymbolTable(symbol);
		if (this.#currentFunctionSymbol
			&& symbol.kind !== SymbolKind.Function)
			this.#currentFunctionSymbol.children.push(symbol);

		return symbol;
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
		const name = (typeof (identifier) === "string") ? identifier : identifier.name;
		let scope = (typeof (identifier) === "string") ? this.currentScope : identifier.scope;

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

	/**
	 * Pushes a scope onto the stack of scopes being processed
	 * @returns {Scope} The scope that was added
	 */
	pushScope(ctx)
	{
		/** @type {Scope} */
		const scope = { context: ctx, symbolTable: new Map(), parent: this.currentScope };

		this.#scopes.unshift(scope);

		return scope;
	}

	/**
	 * pops a scope from the stack of scopes being processed
	 * @returns {Scope} The scope that was removed
	 */
	popScope()
	{
		return this.#scopes.shift();
	}

	enterLpcProgram(ctx)
	{
		this.#rootScope = this.pushScope(ctx);
	}

	exitLpcProgram(ctx)
	{
		this.popScope();

		// Set the document symbols to root scope's symbol table
		/** @type {DocumentSymbol[]} */
		const documentSymbols = [];

		this.#rootScope.symbolTable.forEach((entry) => documentSymbols.push(entry.symbol));

		// Sort the array based on the names
		const sorted = documentSymbols.sort((a, b) =>
		{
			if (a.kind === b.kind)
				return a.name.localeCompare(b.name)

			// Sorting based on type should always put functions at the end
			if (a.kind === SymbolKind.Function)
				return 1;
			else if (b.kind === SymbolKind.Function)
				return -1;

			return (a.kind > b.kind ? 1 : -1);
		});

		this.#documentSymbols = sorted;
	}

	enterParameterDefinition(ctx)
	{
		this.addDocumentSymbol(ctx);
	}

	enterFunctionDeclaration(ctx)
	{
		const symbol = this.addDocumentSymbol(ctx);
		this.#currentFunctionSymbol = symbol;
	}

	enterFunctionDefinition(ctx)
	{
		this.pushScope(ctx);
	}

	exitFunctionDefinition(ctx)
	{

		this.popScope();

		// Check to see if we need to replace a previous function declaration 
		// with this definition
		const currentFunction = this.#currentFunctionSymbol;
		const { name } = currentFunction;
		const scope = this.#rootScope;
		const { symbolTable } = scope;

		if (symbolTable.has(name))
		{
			const declaration = symbolTable.get(name);
			declaration.symbol = currentFunction;
		}

		this.#currentFunctionSymbol = undefined;
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