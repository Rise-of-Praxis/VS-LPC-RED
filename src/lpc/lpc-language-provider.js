const { Position, DocumentHighlight, DiagnosticCollection, TextDocument, CancellationToken, DocumentSymbol, WorkspaceEdit, languages, Location, SymbolKind, Range, window, workspace, Diagnostic, DiagnosticSeverity, DocumentLink } = require("vscode");
const { extname } = require("path");
const { getRemoteEditorClient } = require("../clients");
const { getDocument, onDocumentChanged, onDocumentClosed } = require("./lpc-document");
const { debounce } = require("../utilities/debounce");

const LanguageId = "lpc";

const validIdentifierRegEx = /^[a-zA-Z_][a-zA-Z0-9_]*$/m;

/**
 * Provides a list of {@type Range} where a symbol, located at the current position, occurs 
 * @param {TextDocument} document The document to search in
 * @param {Position} position The position the cursor is at
 * @param {CancellationToken} cancellationToken The token that indicates if a request is cancelled
 * @async
 * @returns {Promise<Range[]>}
 */
async function getSymbolOccurrences(document, position, cancellationToken)
{
    const lpcDocument = await getDocument(document);
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

class LPCLanguageProvider
{
    /**
     * Provides document symbol functionality
     * @param {TextDocument} document The document to extract the symbols for
     * @param {CancellationToken} cancellationToken The token that indicates if a request is cancelled
     * @async
     */
    async provideDocumentSymbols(document, cancellationToken)
    {
        // Get the compiled version of the file
        const lpcDocument = await getDocument(document);
        if (lpcDocument === undefined)
            return [];

        /** @type {DocumentSymbol[]} */
        const documentSymbols = [];

        lpcDocument.symbolTable.forEach((entry) => documentSymbols.push(entry.symbol));

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

        return sorted;
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
        const occurrences = await getSymbolOccurrences(document, position, cancellationToken);
        const highlights = occurrences.map((range) => new DocumentHighlight(range));

        return highlights;
    }

    /**
     * Provides the location of an identifier's definition, based on current position
     * @param {TextDocument} document The document to perform the highlighting in
     * @param {Position} position The position the cursor is at
     * @param {CancellationToken} cancellationToken The token that indicates if a request is cancelled
     * @async
     * @returns {Promise<Location|Location[]>}
     */
    async provideDefinition(document, position, cancellationToken)
    {
        const lpcDocument = await getDocument(document);
        if (cancellationToken.isCancellationRequested)
            return undefined;

        const identifier = lpcDocument.getIdentifierAtPosition(position);
        if (identifier === undefined)
            return undefined;

        // Get the scope where this identifier is located
        const { name, scope } = identifier;
        if (scope === undefined
            || !scope.symbolTable.has(identifier))
        {
            // Search the hierarchy of included and imported files for it
            const matches = [];

            lpcDocument.dependencies.forEach(async (promise) =>
            {
                const dependency = await promise;
                const symbolTable = dependency.symbols;
                if (symbolTable.has(name))
                {
                    const entry = symbolTable.get(name);
                    const { documentUri, symbol } = entry;
                    const { range } = symbol;
            
                    matches.push(new Location(documentUri, range));
                }
            });

            return matches;
        }

        const entry = scope.symbolTable.get(identifier.name);
        const { documentUri, symbol } = entry;
        const { range } = symbol;

        return new Location(documentUri, range);
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
        const lpcDocument = await getDocument(document);
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

        const occurrences = await getSymbolOccurrences(document, position, cancellationToken);
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
        const occurrences = await getSymbolOccurrences(document, position, cancellationToken);
        return occurrences.map((occurrence) => new Location(document.uri, occurrence));
    }

    /**
     * Refreshes the diagnostic collection for a document
     * @param {TextDocument} document 
     * @param {DiagnosticCollection} diagnosticCollection 
     */
    async refreshDiagnostics(document, diagnosticCollection)
    {
        if (document.languageId !== LanguageId)
            return;

        const lpcDocument = await getDocument(document);

        const diagnostics = lpcDocument.syntaxErrors.map(({ line, column, msg }) =>
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
     */
    subscribeToDocumentChanges(context)
    {
        const lpcSyntaxDiagnostics = languages.createDiagnosticCollection("lpc-syntax");
        context.subscriptions.push(lpcSyntaxDiagnostics);

        if (window.activeTextEditor)
            this.refreshDiagnostics(window.activeTextEditor.document, lpcSyntaxDiagnostics);

        const onDidChangeActiveTextEditorHandler = debounce(editor =>
        {
            if (editor)
                this.refreshDiagnostics(editor.document, lpcSyntaxDiagnostics);
        });

        const onDidChangeTextDocumentHandler = debounce(e =>
        {
            const { document } = e;
            const { uri } = document;
            onDocumentChanged(uri.path);
            this.refreshDiagnostics(document, lpcSyntaxDiagnostics);
        });

        context.subscriptions.push(
            window.onDidChangeActiveTextEditor(onDidChangeActiveTextEditorHandler)
        );

        context.subscriptions.push(
            workspace.onDidChangeTextDocument(onDidChangeTextDocumentHandler)
        );

        context.subscriptions.push(
            workspace.onDidCloseTextDocument(document =>
            {
                const { uri } = document;
                onDocumentClosed(uri.path);
                lpcSyntaxDiagnostics.delete(document.uri)
            })
        );
    }

    /**
     * Provides links to other documents from within this document
     * @param {TextDocument} document The document to return the links for
     * @param {CancellationToken} cancellationToken The token that indicates if a request is cancelled
     * @async
     */
    async provideDocumentLinks(document, cancellationToken)
    {
        const lpcDocument = await getDocument(document);
        if (cancellationToken.isCancellationRequested)
            return undefined;

        return new Promise(async (resolve, reject) =>
        {
            const documentLinks = [];
            documentLinks.push(...lpcDocument.includeFiles);
            documentLinks.push(...lpcDocument.inheritance);

            // Check which document links are actually valid
            const resolvedLinks = [];

            for (const link of documentLinks)
            {
                const { target } = link;
                const dependency = await lpcDocument.getDependency(target.path);
                if (dependency === undefined)
                    continue;

                resolvedLinks.push(new DocumentLink(link.range, dependency.uri));
            }

            resolve(resolvedLinks);
        });
    }

    resolveDocumentLinks(link, cancellationToken)
    {
        debugger;
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
        languages.registerDocumentLinkProvider(documentSelector, this);

        // Mark any .c files as lpc files.
        workspace.onDidOpenTextDocument((document) =>
        {
            const { uri } = document;
            if (uri.scheme !== 'lpc-remote-ed')
                return;

            const ext = extname(uri.path);
            if ((ext === ".c" || ext === ".h")
                && document.languageId !== LanguageId)
                languages.setTextDocumentLanguage(document, LanguageId);
        });
    }
}

module.exports = {
    LanguageId,
    LPCLanguageProvider
};