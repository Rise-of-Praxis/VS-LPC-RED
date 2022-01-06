const { Position, DocumentHighlight, DiagnosticCollection, TextDocument, CancellationToken, DocumentSymbol, WorkspaceEdit, languages, Location, SymbolKind, Range, window, workspace, Diagnostic, DiagnosticSeverity } = require("vscode");
const { LPCParser } = require('./LPCParser');
const { LPCDocument } = require("./lpc-document");
const { extname } = require("path");

/**
 * A cache of already parsed documents
 */
const cache = new Map();

const scopeBlocks = [
	LPCParser.RULE_lpcProgram
	, LPCParser.RULE_block
	, LPCParser.RULE_functionDeclaration
];

const LanguageId = "lpc";

const validIdentifierRegEx = /^[a-zA-Z_][a-zA-Z0-9_]*$/gm;

class LPCLanguageProvider
{
	/**
	 * Returns a parsed LPC file
	 * @param {TextDocument} document 
	 * @returns {LPCDocument}
	 */
	getParsedLpcDocument(document)
	{

		const path = document.uri.path;
		if (!cache.has(path)
			|| document.isDirty)
		{
			const text = document.getText();
			const uri = document.uri;

			try
			{
				const lpcDocument = new LPCDocument(text, uri);
				cache.set(path, lpcDocument);
			} catch (ex)
			{
				console.log(`Error getting parsed LPC document: ${ex}`);
				return undefined;
			}
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
		// Get the compiled version of the file
		const lpcDocument = this.getParsedLpcDocument(document);
		if (lpcDocument === undefined)
			return [];

		return lpcDocument.documentSymbols;
	}

	/**
	 * Provides a list of {@type Range} where a symbol, located at the current position, occurs 
	 * @param {TextDocument} document The document to search in
	 * @param {Position} position The position the cursor is at
	 * @param {CancellationToken} cancellationToken The token that indicates if a request is cancelled
	 * @async
	 * @returns {Promise<Range[]>}
	 */
	async getSymbolOccurrences(document, position, cancellationToken)
	{
		const lpcDocument = this.getParsedLpcDocument(document);
		if (cancellationToken.isCancellationRequested)
			return undefined;

		const identifier = lpcDocument.getIdentifierAtPosition(position);
		if (identifier === undefined)
			return [];

		const { scope } = identifier;
		if (!scope)
			return [identifier.range];

		const entry = scope.symbolTable.get(identifier.name);
		if (!entry)
			return [identifier.range];

		return entry.occurrences;
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
		const highlights = occurrences.map((range) => new DocumentHighlight(range));

		return highlights;
	}

	provideDefinition(document, position, cancellationToken)
	{
		const lpcDocument = this.getParsedLpcDocument(document);
		if (cancellationToken.isCancellationRequested)
			return undefined;

		const identifier = lpcDocument.getIdentifierAtPosition(position);
		if (identifier === undefined)
			return undefined;

		// Get the scope where this identifier is located
		const scope = identifier.scope;
		if (scope === undefined
			|| !scope.symbolTable.has(identifier.name))
			return undefined;

		const range = scope.symbolTable.get(identifier.name).definitionRange;

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
		const lpcDocument = this.getParsedLpcDocument(document);
		if (cancellationToken.isCancellationRequested)
			return undefined;

		const identifier = lpcDocument.getIdentifierAtPosition(position);
		if (identifier === undefined)
			throw new Error("You can not rename this symbol.");

		if (identifier.scope === undefined
			|| !identifier.scope.symbolTable.has(identifier.name))
			throw new Error("Only symbols defined in this file can be renamed.");
		
		return identifier.range;
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

		// Validate the new name doesn't contain oddities
		if (!validIdentifierRegEx.test(newName))
			throw new Error("Invalid name.  Identifiers must start with a letter or underscore and can only contain letters, numbers, or underscores.");

		const occurrences = await this.getSymbolOccurrences(document, position, cancellationToken);
		for (const occurrence of occurrences)
			workspaceEdit.replace(document.uri, occurrence, newName);

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
		const occurrences = await this.getSymbolOccurrences(document, position, cancellationToken);
		return occurrences.map((occurrence) => new Location(document.uri, occurrence));
	}

	/**
	 * Refreshes the diagnostic collection for a document
	 * @param {TextDocument} document 
	 * @param {DiagnosticCollection} diagnosticCollection 
	 */
	refreshDiagnostics(document, diagnosticCollection)
	{
		if (document.languageId !== LanguageId)
			return;

		const program = this.getParsedLpcDocument(document);

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
	register(context, config)
	{
		const documentSelector = { language: LanguageId };
		languages.registerDocumentSymbolProvider(documentSelector, this);
		languages.registerDocumentHighlightProvider(documentSelector, this);
		languages.registerRenameProvider(documentSelector, this);
		languages.registerDefinitionProvider(documentSelector, this);
		languages.registerReferenceProvider(documentSelector, this);

		// Subscript to document changes so things can be reloaded
		const { lpcSyntaxDiagnostics } = config;

		if (lpcSyntaxDiagnostics)
			this.subscribeToDocumentChanges(context, lpcSyntaxDiagnostics);

		// Mark any .c files as lpc files.
		workspace.onDidOpenTextDocument((document) =>
		{
			const { uri } = document;
			if (uri.scheme !== 'lpc-remote-ed')
				return;

			const ext = extname(uri.path);
			if (ext === ".c"
				&& document.languageId !== LanguageId)
				languages.setTextDocumentLanguage(document, LanguageId);
		});
	}
}

module.exports = {
	LanguageId,
	LPCLanguageProvider
};