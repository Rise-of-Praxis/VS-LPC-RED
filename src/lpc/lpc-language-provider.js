const { Position, DocumentHighlight, DiagnosticCollection, TextDocument, CancellationToken, WorkspaceEdit, languages, Location, SymbolKind, Range, window, workspace, Diagnostic, DiagnosticSeverity } = require("vscode");
const { extname } = require("path");
const documentCache = require("./lpc-file-cache");
const { getRemoteEditorClient } = require("../clients");
const lpcCodeActions = require("./lpc-actions");

// The collection of diagnostics of the currently opened text documents
const lpcDiagnostics = languages.createDiagnosticCollection("lpc-syntax");

const LanguageId = "lpc";

const validIdentifierRegEx = /^[a-zA-Z_][a-zA-Z0-9_]*$/m;

/**
 * Returns a function that will get called after a particular timeout.
 */
function debounce(func, timeout = 500)
{
    if (!timeout)
        return func;

    let timer;

    return (...args) =>
    {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

/**
 * Refreshes the diagnostic collection for the documents opened within the workspace
 */
function refreshDiagnostics()
{
    const uris = new Set();
    workspace.textDocuments.forEach((document) =>
    {
        if (document.languageId !== LanguageId)
            return;

        const lpcFile = documentCache.getLpcFile(document);
        if (!lpcFile)
            return;

        uris.add(document.uri.path);

        lpcDiagnostics.set(document.uri, lpcFile.diagnostics);
    });

    // Remove any diagnostics that are not open
    lpcDiagnostics.forEach((uri) =>
    {
        if (!uris.has(uri.path))
            lpcDiagnostics.delete(uri); 
    });
}

/**
 * Subscribes to document changes
 * @param {ExtensionContext} context 
 */
function subscribeToDocumentChanges(context)
{
    context.subscriptions.push(lpcDiagnostics);

    function onDocumentClosedHandler(document)
    {
        lpcDiagnostics.delete(document.uri);
        documentCache.onDocumentClosed(document);
    }

    const onDidChangeTextDocumentHandler = debounce(e =>
    {
        const { document } = e;
        if (document.isClosed)
        {
            onDocumentClosedHandler(document);
        }
        else
        {
            documentCache.onDocumentChanged(document);
            refreshDiagnostics()
        }

    });

    const checkDocumentsHandler = (e =>
    {
        refreshDiagnostics();
    });

    context.subscriptions.push(workspace.onDidChangeTextDocument(onDidChangeTextDocumentHandler));
    context.subscriptions.push(window.onDidChangeActiveTextEditor(checkDocumentsHandler));
    context.subscriptions.push(window.onDidChangeVisibleTextEditors(checkDocumentsHandler));
    context.subscriptions.push(workspace.onDidCloseTextDocument(checkDocumentsHandler));
    
    context.subscriptions.push(workspace.onDidOpenTextDocument((document) =>
    {
        const { uri } = document;
        if (uri.scheme !== 'lpc-remote-ed')
            return;

        const ext = extname(uri.path);
        if ((ext === ".c"
            || ext === ".h")
            && document.languageId !== LanguageId)
            languages.setTextDocumentLanguage(document, LanguageId);
    }));
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
        const lpcFile = documentCache.getLpcFile(document);
        if (lpcFile === undefined)
            return [];

        return lpcFile.documentSymbols;
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
        const lpcFile = documentCache.getLpcFile(document);
        if (cancellationToken.isCancellationRequested)
            return undefined;

        const identifier = lpcFile.getIdentifierAtPosition(position);
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
        const lpcFile = documentCache.getLpcFile(document);
        if (cancellationToken.isCancellationRequested)
            return undefined;

        const identifier = lpcFile.getIdentifierAtPosition(position);
        if (identifier === undefined)
            return undefined;

        // Get the scope where this identifier is located
        const scope = identifier.scope;
        if (scope === undefined
            || !scope.symbolTable.has(identifier.name))
            return undefined;

        const symbol = scope.symbolTable.get(identifier.name).symbol;
        const range = symbol.range;

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
        const lpcFile = documentCache.getLpcFile(document);
        if (cancellationToken.isCancellationRequested)
            return undefined;

        const identifier = lpcFile.getIdentifierAtPosition(position);
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
     * Provides links to other documents from within this document
     * @param {TextDocument} document The document to return the links for
     * @param {CancellationToken} cancellationToken The token that indicates if a request is cancelled
     */
    provideDocumentLinks(document, cancellationToken)
    {
        const lpcFile = documentCache.getLpcFile(document);
        if (!lpcFile)
            return undefined;

        if (cancellationToken.isCancellationRequested)
            return undefined;

        return new Promise(async (resolve, reject) =>
        {
            const documentLinks = [];
            documentLinks.push(...lpcFile.includeFiles);
            documentLinks.push(...lpcFile.inheritance);

            // Check which document links are actually valid
            const client = getRemoteEditorClient();
            const resolvedLinks = [];

            for (const link of documentLinks)
            {
                const path = link.target.path;
                const valid = await client.pathExists(path);

                if (cancellationToken.isCancellationRequested)
                    return reject();

                if (valid)
                {
                    const fileInfo = await client.getFileInfo(path);
                    link.tooltip = fileInfo.path;
                    if (fileInfo.path !== path)
                        link.target = client.getFileUri(fileInfo.path);
                    resolvedLinks.push(link);
                }
            }

            resolve(resolvedLinks);
        });
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

        for (const codeActionProvider of lpcCodeActions)
        {
            const provider = languages.registerCodeActionsProvider(documentSelector, codeActionProvider, { providedCodeActionKinds: codeActionProvider.providedCodeActionKinds })
            context.subscriptions.push(provider);
        }

        subscribeToDocumentChanges(context);
    }
}

module.exports = {
    LanguageId,
    LPCLanguageProvider
};