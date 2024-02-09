const { Position, DocumentHighlight, DiagnosticCollection, TextDocument, CancellationToken, DocumentSymbol, WorkspaceEdit, languages, Location, SymbolKind, Range, window, workspace, Diagnostic, DiagnosticSeverity } = require("vscode");
const { LPCParser } = require('./lpc-parser');
const { LPCProgram } = require("./lpc-program");

const cache = new Map();

const documentSymbolMapping = {
	[LPCParser.RULE_variable]: SymbolKind.Variable,
	[LPCParser.RULE_functionDefinition]: SymbolKind.Method,
	[LPCParser.RULE_functionDeclaration]: SymbolKind.Function
}

const scopeBlocks = [
	LPCParser.RULE_lpcProgram, LPCParser.RULE_block
]

class LPCLanguageProvider
{
	/**
	 * 
	 * @param {TextDocument} document 
	 * @returns {LPCProgram}
	 */
	getParsedLpcProgram(document)
	{

		const path = document.uri.path;
		if (!cache.has(path)
			|| document.isDirty)
		{
			const program = new LPCProgram(document);
			cache.set(path, program);
		}

		return cache.get(path);
	}

	/**
	 * Provides document symbol functionality
	 * @param {TextDocument} document The document to extract the symbols for
	 * @param {CancellationToken} cancellationToken The token that indicates if a request is cancelled
	 * @async
	 */
	async provideDocumentSymbols(document, cancellationToken)
	{
		const lpcProgram = this.getParsedLpcProgram(document);
		const results = this.getDocumentSymbols(lpcProgram.root, cancellationToken);

		if (cancellationToken.isCancellationRequested)
			return [];

		return results;
	}

	/**
	 * Finds all occurrences of an identifier
	 * @param {string} identifier The identifier to find
	 * @param {ParserRulContext} context The scope to look within.
	 * @param {boolean} [recursive=true] Indicates if the search is recursive
	 * @return {ParserRuleContext[]}
	 */
	searchForIdentifier(identifier, context, recursive = true)
	{
		const identifiers = [];

		if (context.ruleIndex === LPCParser.RULE_identifier)
		{
			const text = this.getContextIdentifierText(context);
			if (text === identifier)
				identifiers.push(context);
		}

		if (!recursive
			|| !context.children)
			return identifiers;

		for (const child of context.children)
			identifiers.push(...this.searchForIdentifier(identifier, child, recursive));

		return identifiers;
	}

	/**
	 * Returns the list of arguments in a function definition
	 * @param {ParserRuleContext} argumentList 
	 * @returns {ParserRuleContext[]}
	 */
	flattenArgumentList(argumentList)
	{
		const args = [];

		let current = argumentList;
		while (current)
		{
			const argument = current.argument();
			if (argument)
				args.push(argument)

			// See if there is a sibling argument list to this and process that
			current = current.argumentList();
		}

		return args;
	}

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
	 * Returns the argument in a function definition that matches an identifier
	 * @param {string} identifier 
	 * @param {ParserRuleContext} context A function definition or function declaration context  
	 * @returns {ParserRuleContext}
	 */
	getArgumentInFunction(identifier, context)
	{
		if (!context)
			return undefined;

		// If this is a functionDefinition rule, drill down into the functionDeclaration
		// and try again
		if (context.ruleIndex === LPCParser.RULE_functionDefinition)
			return this.getArgumentInFunction(identifier, context.functionDeclaration());

		// If this is not a functionDeclaration, then we shouldn't be here
		if (context.ruleIndex !== LPCParser.RULE_functionDeclaration)
			return undefined;

		// Get the argumentList rule, but be aware it may not exist
		const argumentList = context.argumentList();
		if (!argumentList)
			return undefined;

		const args = argumentList.argument();
		for (const arg of args)
		{
			if (this.getContextIdentifierText(arg) === identifier)
				return arg;
		}

		return undefined;
	}

	/**
	 * Finds where a variable is declared/defined within a context
	 * @param {string} identifier The identifier to find the declaration for
	 * @param {ParserRulContext} context The scope to look within.
	 */
	getVariableDeclarationInContext(identifier, context)
	{
		if (!context)
			return undefined;

		switch (context.ruleIndex)
		{
			case LPCParser.RULE_variableDeclaration:
				const variableList = context.variableList();
				const variables = variableList.variable();

				for (const variable of variables)
				{
					if (identifier === this.getContextIdentifierText(variable))
						return variable;
				}
				break;

			case LPCParser.RULE_block: {
				const statements = context.statement();
				for (const statement of statements)
				{
					const variable = this.getVariableDeclarationInContext(identifier, statement);
					if (variable)
						return variable;
				}
				break;
			}

			case LPCParser.RULE_statement:
				const variable = this.getVariableDeclarationInContext(identifier, context.variableDeclaration());
				if (variable)
					return variable;
				break;

			case LPCParser.RULE_programDeclarations:
				const programDeclarations = context.programDeclaration();
				for (const programDeclaration of programDeclarations)
				{
					const programVariableDeclaration = programDeclaration.programVariableDeclaration();
					if (!programVariableDeclaration)
						continue;

					const variable = this.getVariableDeclarationInContext(identifier, programVariableDeclaration.variableDeclaration());
					if (variable)
						return variable;
				}
				break;

		}

		return undefined;

	}

	/**
	 * Finds where an identifier is declared/defined
	 * @param {string} identifier The identifier to find the declaration for
	 * @param {ParserRulContext} context The scope to look within.
	 */
	findDeclaration(identifier, context)
	{
		if (!context)
			return undefined;

		// If the context is a function definition, then check the function declaration's argument list
		switch (context.ruleIndex)
		{
			case LPCParser.RULE_functionDefinition:
				//Check the function name first:
				if (identifier === this.getContextIdentifierText(context.functionDeclaration()))
					return context;

				const argument = this.getArgumentInFunction(identifier, context);
				if (argument)
					return argument;
				break;

			case LPCParser.RULE_functionDeclaration:
				if (identifier === this.getContextIdentifierText(context))
					return context;
				break;

			case LPCParser.RULE_block:
				const blockVariable = this.getVariableDeclarationInContext(identifier, context);
				if (blockVariable)
					return blockVariable;
				break;

			case LPCParser.RULE_programDeclarations:
				// At the program level, the declaration can be a function or a program level variable
				const programDeclarations = context.programDeclaration();

				for (const programDeclaration of programDeclarations)
				{
					// If this is a function (prototype declaration or actual definition),
					// then check it
					const functionDefinition = programDeclaration.functionDefinition();
					const functionDeclaration = functionDefinition ?
						functionDefinition.functionDeclaration() :
						programDeclaration.functionDeclaration();

					if (functionDeclaration && identifier === this.getContextIdentifierText(functionDeclaration))
						return functionDeclaration;

					// If it's a variable list, check that
					const programVariableDeclaration = programDeclaration.programVariableDeclaration();
					if (programVariableDeclaration)
					{
						const programVariable = this.getVariableDeclarationInContext(identifier, programVariableDeclaration.variableDeclaration());
						if (programVariable)
							return programVariable;
					}
				}
		}

		// Move up in scope
		if (context !== undefined)
			return this.findDeclaration(identifier, context.parentCtx);

	}

	/**
	 * Returns a {@link Position} equivalent of a parser context position
	 * @param {object} contextPosition The position to convert
	 * @returns {Position}
	 */
	getDocumentPosition(contextPosition)
	{
		return new Position(contextPosition.line - 1, contextPosition.column);
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
	 * Returns an instance of {@link Range} for a given context
	 * @param {ParserRuleContext} context 
	 * @returns {Range}
	 */
	getRange(context)
	{
		if (this.isTerminalNode(context))
			return this.getTerminalRange(context);

		// Get the start and stopping tokens
		const { start, stop } = context;

		// Set the start position to be at the beginning of the start token, but the
		// stop position is at the end of the stop token
		const startPosition = this.getDocumentPosition(start);
		const stopPosition = this.getDocumentPosition(stop)
			.translate(0, stop.text ? stop.text.length : 0);

		return new Range(startPosition, stopPosition);
	}

	getSymbolInfo(context)
	{
		const name = this.getContextIdentifierText(context);
		if (!name)
			return undefined;

		const range = this.getRange(context);
		return { name, range };
	}

	/**
	 * The name of the 
	 * @param {ParserRuleContext} context 
	 */
	getSymbolScopeName(context)
	{
		const name = this.getContextIdentifierText(context);
		if (name)
			return name;

		if (!context.parentCtx)
			return undefined;

		const { parentCtx } = context;
		if (parentCtx.ruleIndex === LPCParser.RULE_functionDefinition)
		{
			const functionDeclaration = parentCtx.functionDeclaration();
			return this.getContextIdentifierText(functionDeclaration);
		}

		return this.getSymbolScopeName(context.parentCtx);
	}

	/**
	 * Returns all the {@link DocumentSymbol} occurrences in a context
	 * @param {ParserRuleContext} context The context to find all the symbols within
	 * @param {CancellationToken} cancellationToken A cancellation token
	 * @param {ParserRuleContext} [scope] The current scope block being processed
	 * @returns 
	 */
	getDocumentSymbols(context, cancellationToken, scope)
	{
		if (cancellationToken.isCancellationRequested)
			return [];

		let currentScope = scope;
		const symbols = [];
		if (context.ruleIndex === LPCParser.RULE_functionDeclaration
			|| context.ruleIndex === LPCParser.RULE_variable)
		{
			symbols.push(this.getDocumentSymbol(context, currentScope));
		}

		if (context.ruleIndex === LPCParser.RULE_block)
		{
			currentScope = context;
		}

		if (!context.children)
			return symbols;

		for (const child of context.children)
		{
			if (cancellationToken.isCancellationRequested)
				return symbols;

			const childSymbols = this.getDocumentSymbols(child, cancellationToken, currentScope);
			symbols.push(...childSymbols);
		}

		return symbols;
	}

	/**
	 * Creates a document symbol for a rule context
	 * 
	 * @param {ParserRuleContext} context The rule context to create the symbol for
	 * @param {SymbolKind} kind The type of symbol to create
	 * @param {ParserRuleContext} [scope] The scope block the context is in 
	 * @returns {DocumentSymbol}
	 */
	createSymbol(context, kind, scope)
	{
		const info = this.getSymbolInfo(context);
		let containerName = null;
		let { name, range } = info

		if (scope)
			containerName = this.getSymbolScopeName(scope);

		return new DocumentSymbol(name, containerName, kind, range, range);
	}

	/**
	 * Returns the 
	 * @param {Position} position The position to get the context for
	 * @param {ParserRuleContext} [scope] The scope to limit the search to.  If not specified, the scope starts at the root level
	 * @param {number} [ruleIndex] The type of symbol to find.  If not specified, the lowest level token is returned
	 */
	getSymbolAtPosition(position, scope, ruleIndex)
	{
		const range = this.getRange(scope);
		if (!range
			|| !range.contains(position))
			return undefined;

		if (ruleIndex !== undefined
			&& scope.ruleIndex === ruleIndex)
			return scope;

		const { children } = scope;
		if (!children)
			return scope;

		for (const child of children)
		{
			const childRange = this.getRange(child);
			if (!childRange.contains(position))
				continue;

			// If the child does not contain any children, then this child is the symbol that contains the position
			if (!child.children)
				return child;

			return this.getSymbolAtPosition(position, child);
		}

		return scope;
	}

	/**
	 * Indicates if the context is a terminal node or not
	 * @param {ParserRuleContext} context The rule context to create the symbol for
	 * @returns {boolean}
	 */
	isTerminalNode(context) { return context.symbol !== undefined; }

	/**
	 * Returns the {@link SymbolKind} for a specific context and scope
	 * @param {ParserRuleContext} context The rule context to create the symbol for
	 * @param {ParserRuleContext} [scope] The scope the context is in
	 * @returns {SymbolKind}
	 */
	getDocumentSymbolKind(context, scope)
	{
		const { ruleIndex } = context;

		if (!documentSymbolMapping[ruleIndex])
			return undefined;

		const kind = documentSymbolMapping[ruleIndex];
		if (kind === SymbolKind.Variable && !scope)
			return SymbolKind.Field;

		return kind;
	}

	/**
	 * Gets the {@link DocumentSymbol} for a specific context and scope
	 * @param {ParserRuleContext} context The rule context to create the symbol for
	 * @param {ParserRuleContext} [scope] The scope the context is in
	 * @returns {DocumentSymbol}
	 */
	getDocumentSymbol(context, scope)
	{
		const kind = this.getDocumentSymbolKind(context, scope);
		return this.createSymbol(context, kind, scope);
	}

	/**
	 * Returns the scope block for a particular context
	 * @param {ParserRuleContext} context 
	 */
	getContextScope(context)
	{
		let scope = context;

		while (scope)
		{
			if (scopeBlocks.indexOf(scope.ruleIndex) !== -1)
				break;

			scope = scope.parentCtx;
		}

		return scope;
	}

	/**
	 * Provides a list of symbols within the document, identified by the symbol at a position 
	 * @param {TextDocument} document The document to search in
	 * @param {Position} position The position the cursor is at
	 * @param {CancellationToken} cancellationToken The token that indicates if a request is cancelled
	 * @param {boolean} [onlyLocallyDeclared = true] Only return symbols that are declared within the file
	 * @async
	 * @returns {Promise<ParserRuleContext[]>}
	 */
	async getSymbolOccurrences(document, position, cancellationToken, onlyLocallyDeclared = true)
	{
		const lpcProgram = this.getParsedLpcProgram(document);
		if (cancellationToken.isCancellationRequested)
			return [];

		const selectedSymbol = this.getSymbolAtPosition(position, lpcProgram.root);
		if (!selectedSymbol
			|| selectedSymbol.ruleIndex !== LPCParser.RULE_identifier)
			return [];

		const declaration = this.findDeclaration(selectedSymbol.getText(), selectedSymbol.parentCtx);
		if (declaration || !onlyLocallyDeclared)
		{
			// Get the scope block where this symbol is declared and return all the matches
			const scope = declaration ? this.getContextScope(declaration) : lpcProgram.root;
			return this.searchForIdentifier(selectedSymbol.getText(), scope);
		}

		if (!onlyLocallyDeclared)
			return [];

		return [selectedSymbol];
	}

	/**
	 * Provides document highlighting functionality
	 * @param {TextDocument} document The document to perform the highlighting in
	 * @param {Position} position The position the cursor is at
	 * @param {CancellationToken} cancellationToken The token that indicates if a request is cancelled
	 * @async
	 * @returns {Promise<DocumentHighlight[]>}
	 */
	async provideDocumentHighlights(document, position, cancellationToken)
	{
		const occurrences = await this.getSymbolOccurrences(document, position, cancellationToken);

		return occurrences.map((context) => new DocumentHighlight(this.getRange(context)));
	}

	provideDeclaration(document, position, cancellationToken)
	{
		const lpcProgram = this.getParsedLpcProgram(document);
		if (cancellationToken.isCancellationRequested)
			return undefined;

		const selectedSymbol = this.getSymbolAtPosition(position, lpcProgram.root);
		if (cancellationToken.isCancellationRequested
			|| !selectedSymbol
			|| selectedSymbol.ruleIndex !== LPCParser.RULE_identifier)
			return undefined;

		const declaration = this.findDeclaration(selectedSymbol.getText(), selectedSymbol.parentCtx);
		if (!declaration)
			return undefined;

		const range = this.getRange(declaration);
		return new Location(document.uri, range);
	}

	provideDefinition(document, position, cancellationToken)
	{
		const lpcProgram = this.getParsedLpcProgram(document);
		if (cancellationToken.isCancellationRequested)
			return undefined;

		const selectedSymbol = this.getSymbolAtPosition(position, lpcProgram.root);
		if (cancellationToken.isCancellationRequested
			|| !selectedSymbol
			|| selectedSymbol.ruleIndex !== LPCParser.RULE_identifier)
			return undefined;

		const declaration = this.findDeclaration(selectedSymbol.getText(), selectedSymbol.parentCtx);
		if (!declaration)
			return undefined;

		const range = this.getRange(declaration);
		return new Location(document.uri, range);
	}

	/**
	 * Checks if symbol can be renamed
	 * @param {TextDocument} document The document to perform the rename in
	 * @param {Position} position The position the cursor is at
	 * @param {CancellationToken} cancellationToken The token that indicates if a request is cancelled
	 * @async
	 * @returns {Promise<Range>}
	 */
	async prepareRename(document, position, cancellationToken)
	{
		const lpcProgram = this.getParsedLpcProgram(document);
		if (cancellationToken.isCancellationRequested)
			return undefined;

		const selectedSymbol = this.getSymbolAtPosition(position, lpcProgram.root);
		if (cancellationToken.isCancellationRequested
			|| !selectedSymbol
			|| selectedSymbol.ruleIndex !== LPCParser.RULE_identifier)
			throw new Error('You can not rename this element.');

		if (!this.findDeclaration(selectedSymbol.getText(), selectedSymbol.parentCtx))
			throw new Error('Only symbols defined in this file can be renamed.');

		return this.getRange(selectedSymbol);
	}

	/**
	 * Provides symbol renaming functionality
	 * @param {TextDocument} document The document to perform the rename in
	 * @param {Position} position The position the cursor is at
	 * @param {CancellationToken} cancellationToken The token that indicates if a request is cancelled
	 * @async
	 * @returns {Promise<WorkspaceEdit>}
	 */
	async provideRenameEdits(document, position, newName, cancellationToken)
	{
		const workspaceEdit = new WorkspaceEdit();

		const occurrences = await this.getSymbolOccurrences(document, position, cancellationToken);
		for (const occurrence of occurrences)
			workspaceEdit.replace(document.uri, this.getRange(occurrence), newName);

		return workspaceEdit;
	}

	/**
	 * Provides symbol reference lookups
	 * @param {TextDocument} document The document to perform the reference lookup in
	 * @param {Position} position The position the cursor is at
	 * @param {import("vscode").ReferenceContext} referenceContext The reference context
	 * @param {CancellationToken} cancellationToken The token that indicates if a request is cancelled
	 * @async
	 * @returns {Promise<Location[]>}
	 */
	async provideReferences(document, position, referenceContext, cancellationToken)
	{
		const occurrences = await this.getSymbolOccurrences(document, position, cancellationToken, false);
		return occurrences.map((context) => new Location(document.uri, this.getRange(context)));
	}

	/**
	 * Refreshes the diagnostic collection for a document
	 * @param {TextDocument} document 
	 * @param {DiagnosticCollection} diagnosticCollection 
	 */
	refreshDiagnostics(document, diagnosticCollection)
	{
		const program = this.getParsedLpcProgram(document);

		const diagnostics = program.syntaxErrors.map(({ line, column, msg }) =>
		{
			const documentLine = line - 1;
			const documentColumn = column;
			const symbolRange = new Range(documentLine, documentColumn, documentLine, documentColumn);

			return new Diagnostic(symbolRange, msg, DiagnosticSeverity.Error);
		});

		diagnosticCollection.set(document.uri, diagnostics);
	}

	/**
	 * Subscribes to document changes
	 * @param {ExtensionContext} context 
	 * @param {DiagnosticCollection} diagnosticCollection
	 */
	subscribeToDocumentChanges(context, diagnosticCollection)
	{
		if (window.activeTextEditor)
			this.refreshDiagnostics(window.activeTextEditor.document, diagnosticCollection);

		context.subscriptions.push(
			window.onDidChangeActiveTextEditor(editor =>
			{
				if (editor)
					this.refreshDiagnostics(editor.document, diagnosticCollection);
			})
		);

		context.subscriptions.push(
			workspace.onDidChangeTextDocument(e =>
			{
				const { document } = e;
				cache.delete(document.uri.path);
				this.refreshDiagnostics(document, diagnosticCollection)
			})
		);

		context.subscriptions.push(
			workspace.onDidCloseTextDocument(doc => diagnosticCollection.delete(doc.uri))
		);
	}

	/**
	 * Registeres all the language providers supported
	 */
	register(context, lpcSyntaxDiagnostics)
	{
		const documentSelector = { language: "lpc" };
		languages.registerDocumentSymbolProvider(documentSelector, this);
		languages.registerDocumentHighlightProvider(documentSelector, this);
		languages.registerRenameProvider(documentSelector, this);
		languages.registerDeclarationProvider(documentSelector, this);
		languages.registerDefinitionProvider(documentSelector, this);
		languages.registerReferenceProvider(documentSelector, this);

		// Subscript to document changes so things can be reloaded
		this.subscribeToDocumentChanges(context, lpcSyntaxDiagnostics);

		workspace
			.onDidOpenTextDocument((document) =>
			{
				// For all documents that end with .c or .h to be LPC documents
				if (document.languageId === 'lpc')
					return;

				if (document.uri.path.endsWith('.c')
					|| document.uri.path.endsWith('.h'))
					languages.setTextDocumentLanguage(document, 'lpc');
			});
	}
}

module.exports = {
	LPCLanguageProvider
};