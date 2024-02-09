const { window, FileType, ProgressLocation, workspace, Diagnostic, Location, CancellationTokenSource, Uri } = require("vscode");
const { getRemoteEditorClient, RemoteEditorClient } = require("../clients");
const { getLpcFile, onDocumentChanged } = require("../lpc/lpc-file-cache");
const { getDeprecatedStaticKeywordDiagnostics } = require("../lpc/lpc-actions/replace-static-keyword");
const { getDeprecatedArrayKeywordDiagnostics } = require("../lpc/lpc-actions/replace-array-keyword");
const { FileInfo } = require("../file-system/file-info");
const { LPCFile } = require("../lpc");
const { getSearchViewProvider, SearchViewOptions } = require("../search/mud-search-view-provider");
const { SearchResultMatch, getFileSystem, SearchOptions } = require("../file-system");

const _keywordRegEx = /\barray|static\b/;

/**
 * Checks a file to see if it contains outdated LPC content
 * @param {Uri} uri The uri of the file
 * @param {string} text The contents of the file
 */
async function checkFile(searchViewProvider, uri, text)
{
    const lpcFile = new LPCFile({ uri, text });

    /** @type {Diagnostic[]} */
    const diagnostics = [];
    diagnostics.push(...getDeprecatedStaticKeywordDiagnostics(lpcFile.diagnostics));
    diagnostics.push(...getDeprecatedArrayKeywordDiagnostics(lpcFile.diagnostics));

    if (!diagnostics.length)
        return;

    diagnostics.sort((a, b) =>
    {
        const startA = a.range.start;
        const startB = b.range.start;
        if (startA.line > startB.line)
            return 1;
        if (startA.line < startB.line)
            return -1;

        if (startA.character < startB.character)
            return 1;
        if (startA.character > startB.character)
            return -1;

        return 0;
    });

    for (const diagnostic of diagnostics)
    {
        const match = new SearchResultMatch();
        match.uri = uri;
        match.location = new Location(uri, diagnostic.range);
        match.lines = lpcFile.getRangeLines(diagnostic.range).join("\n");;
        match.text = lpcFile.getRangeText(diagnostic.range);
        searchViewProvider.addMatch(match);
    }
}

/**
 * @param {SearchViewProvider} searchViewProvider An instance of a SearchViewProvider used to update the status
 * @param {string} path The path to start the search from
 */
async function findOutdatedFiles(searchViewProvider, path)
{
    const searchCancellationTokenSource = new CancellationTokenSource();
    const searchCancellationToken = searchCancellationTokenSource.token;
    const client = getRemoteEditorClient();

    searchViewProvider.clear();
    searchViewProvider.reveal();

    function cancelledSearch()
    {
        searchCancellationTokenSource.cancel();
    }

    // Track to see if the search is ever cancelled
    searchViewProvider.onDidCancelSearch(cancelledSearch);

    // Search in a *.c or *.h file.
    const searchOptions = new SearchOptions();
    searchOptions.include = ["*.c", "*.h"];
    searchOptions.cancellationToken = searchCancellationToken;
    searchOptions.recursive = true;
    searchOptions.caseSensitive = true;
    searchOptions.onMatchFound = async (match, progress) =>
    {
        const { uri } = match;
        const { path } = uri;

        // Check the file to see if it's syntactically OK
        try
        {
            if (progress)
                progress.report({ message: `Checking ${path}` });

            const text = (await client.readFile(uri.path)).toString();
            if (!_keywordRegEx.test(text))
                return;

            await checkFile(searchViewProvider, uri, text);

            if (progress)
                progress.report({ message: `` });
        }
        catch (err)
        {
            window.showWarningMessage(`Error checking ${path}: ${err.toString()}`)
        }
    };
    searchOptions.instances = false;

    const viewOptions = new SearchViewOptions();
    viewOptions.notificationTitle = "Find outdated LPC Files";
    viewOptions.showSearchOptionControls = false;
    viewOptions.searchInfo = `Finding files in '${path}' (recursive) that contain deprecated keywords.`;
    await searchViewProvider.performSearch(path, searchOptions, viewOptions);
}

module.exports =
{
    id: "findOutdatedFiles",
    command: async (context) =>
    {
        const searchViewProvider = getSearchViewProvider(context);

        const uris = await window.showOpenDialog({
            canSelectFiles: true
            , canSelectFolders: true
            , openLabel: "Scan..."
            , title: "Select the file or directory you want to scan"
        });

        if (!uris || !uris.length)
            return;

        findOutdatedFiles(searchViewProvider, uris[0].path);
    }
}