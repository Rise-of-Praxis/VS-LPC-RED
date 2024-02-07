const { Uri, Location, commands, Range, Position, EventEmitter, CancellationTokenSource, window, ProgressLocation } = require("vscode");
const { extensionId } = require("../constants");
const { getRemoteEditorClient } = require("../clients");
const { getFileSystem, SearchOptions, SearchResultMatch } = require("../file-system");

const locationRegEx = /^(?<path>[^:]+)(:((?<startLine>\d+),(?<startChar>\d+))-((?<endLine>\d+),(?<endChar>\d+)))?$/;

const viewId = `${extensionId}.mud-search`;

function openMatchLocation(matchLocation)
{
    const locationParts = locationRegEx.exec(matchLocation);
    const path = locationParts.groups['path'];
    const startLine = locationParts.groups['startLine'];
    const startChar = locationParts.groups['startChar'];
    const endLine = locationParts.groups['endLine'];
    const endChar = locationParts.groups['endChar'];
    let start, end;
    let location;

    const client = getRemoteEditorClient();
    const uri = client.getFileUri(path);
    if (startLine !== undefined && startChar !== undefined)
        start = new Position(parseInt(startLine), parseInt(startChar));
    if (endLine !== undefined && endChar !== undefined)
        end = new Position(parseInt(endLine), parseInt(endChar));

    if (start && end)
    {
        location = new Location(uri, new Range(start, end));
        commands.executeCommand("editor.action.goToLocations", uri, start, [location], 'goto')
    }
    else
        commands.executeCommand("vscode.open", location || uri);
}

function getNonce()
{
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++)
    {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

/**
 * @typedef {object} SearchContext
 * @property {string} path The path that the search was being performed at
 * @property {SearchOptions} searchOptions The options for the search
 * @property {SearchViewOptions} viewOptions The options for the search view
 * @property {CancellationTokenSource} cancellationTokenSource The cancellation token source used to cancel the current search
 */

class SearchViewOptions
{
    /**
     * The location of where search notifications appears
     */
    notificationLocation = ProgressLocation.Window;

    /**
     * The title of the search notification
     */
    notificationTitle = "Find in files";

    /**
     * A message to show in the search view below the search options but above the search results.
     */
    searchInfo = undefined;

    /**
     * Indicates if the search options should be visible
     */
    showSearchOptionControls = true;
};

const _defaultViewOptions = new SearchViewOptions();

/**
 * Returns text describe the search options
 * @param {string} path The path being searched
 * @param {SearchOptions} searchOptions The search options to describe
 * @return {string}
 */
function getSearchOptionsText(path, searchOptions)
{
    let text = "Finding files";

    if (typeof (searchOptions.findText) === "string"
        && searchOptions.findText.length > 0)
    {
        let matchOptions = [];
        if (searchOptions.caseSensitive)
            matchOptions.push("case-sensitive");

        if (searchOptions.wholeWord)
            matchOptions.push("match whole word");

        if (searchOptions.useRegEx)
            matchOptions.push("use regular expressions");

        text += ` containing '${searchOptions.findText}'`;
        if (matchOptions.length)
            text += ` (${matchOptions.join(", ")})`;
    }

    text += ` in '${path}'`;
    if (searchOptions.recursive)
        text += " (recursive)";
    text += "."

    if (searchOptions.include.length)
        text += `  Including ${searchOptions.include.map((filter) => `'${filter}`).join(",")}.`;

    if (searchOptions.exclude.length)
        text += `  Excluding ${searchOptions.exclude.map((filter) => `'${filter}`).join(",")}.`;

    return text;
}

class SearchViewProvider
{
    /**
     * @type {import("vscode").WebviewView}
     */
    #view = undefined;

    /**
     * @type {Uri}
     */
    #extensionUri;

    /**
     * The list of matches returned
     * @type {SearchResultMatch[]}
     */
    #matches = [];

    /**
     * The unique ID of this view
     */
    get viewId() { return viewId; }

    /**
     * @type {EventEmitter<any>}
     */
    #didCancelSearchEvent = new EventEmitter();

    /**
     * The current search being executed
     * @type {SearchContext}
     */
    #currentSearchContext = null;

    /**
     * Triggered when cancel is called on this provider
     */
    get onDidCancelSearch() { return this.#didCancelSearchEvent.event };

    constructor(extensionUri)
    {
        this.#extensionUri = extensionUri;
    }

    async #didStartSearch(searchOptions)
    {
        await this.#sendWebviewMessage({ type: "searching" })
        commands.executeCommand("setContext", `${viewId}.searching`, true);
    }

    async #didCompleteSearch(searchContext)
    {
        if (searchContext)
        {
            const cancellationTokenSource = searchContext.cancellationTokenSource;
            const cancellationToken = cancellationTokenSource.token;

            // Is the current search the one that finished?
            if (!cancellationToken.isCancellationRequested)
                await this.#sendWebviewMessage({ type: "search-completed" });
        }
        commands.executeCommand("setContext", `${viewId}.searching`, false);

        this.#currentSearchContext = null;
    }

    async #sendWebviewMessage(message)
    {
        if (!this.#view)
            return;

        const view = this.#view;
        if (!view.visible)
            return;

        return view.webview.postMessage(message);
    }

    /**
     * @param {string} path The search path
     * @param {SearchOptions} searchOptions The search options
     * @param {SearchViewOptions} [searchViewOptions] Options for the view provider
     */
    async performSearch(path, searchOptions, searchViewOptions)
    {
        const defaultOnMatchHandler = async (match) => await this.addMatch(match);

        await commands.executeCommand(`${this.viewId}.focus`);

        let viewOptions = searchViewOptions;
        if (!viewOptions)
        {
            viewOptions = { ..._defaultViewOptions };
            viewOptions.searchInfo = getSearchOptionsText(path, searchOptions);
        }

        // If there is already a search happening, cancel it
        if (this.#currentSearchContext)
            await this.cancel();

        await this.clear();

        const currentContext = {
            path,
            searchOptions,
            viewOptions,
            cancellationTokenSource: new CancellationTokenSource()
        }
        this.#currentSearchContext = currentContext;
        const fileSystem = getFileSystem();

        await window.withProgress(
            {
                location: viewOptions.notificationLocation,
                title: viewOptions.notificationTitle,
                cancellable: true
            },
            async (progress, commandCancellationToken) =>
            {
                const options = new SearchOptions(searchOptions);
                options.progress = progress;
                if (!options.onMatchFound)
                    options.onMatchFound = defaultOnMatchHandler;

                const searchOptionsCancellationToken = options.cancellationToken;
                commandCancellationToken.onCancellationRequested(() => searchCancellationTokenSource.cancel());
                if (searchOptionsCancellationToken)
                    searchOptionsCancellationToken.onCancellationRequested(() => searchCancellationTokenSource.cancel());

                const searchCancellationTokenSource = this.#currentSearchContext.cancellationTokenSource;
                options.cancellationToken = searchCancellationTokenSource.token;

                this.#sendWebviewMessage({ type: "initialize", ...viewOptions });

                await this.#didStartSearch(options)

                try
                {
                    await fileSystem.findFiles(path, options);
                }
                catch (err)
                {
                    await this.#sendWebviewMessage({ type: "search-error", name: err.name, message: err.message })
                }


                await this.#didCompleteSearch(currentContext);
            }
        );
    }

    /**
     * Renders the HTML for this webview
     */
    #render()
    {
        const { webview } = this.#view;
        webview.options =
        {
            enableScripts: true,
            localResourceRoots: [Uri.joinPath(this.#extensionUri, 'media'), Uri.joinPath(this.#extensionUri, 'node_modules')]
        };
        const nonce = getNonce();

        webview.onDidReceiveMessage(async (message) =>
        {
            switch (message.command)
            {
                case "open": openMatchLocation(message.location); break;
                case "match-added": commands.executeCommand("setContext", `${viewId}.hasMatches`, true); break;
                case "clear": commands.executeCommand("setContext", `${viewId}.hasMatches`, false); break;
                case "search":
                    const { path } = message;
                    const include = [];
                    const exclude = [];
                    if (typeof (message.include) === "string" && message.include.length)
                        include.push(...message.include.split(","));

                    if (typeof (message.exclude) === "string" && message.exclude.length)
                        exclude.push(...message.exclude.split(","));

                    this.performSearch(path, new SearchOptions({ ...message, include, exclude }));
                    break;
            }
        });

        const codiconsUri = webview.asWebviewUri(Uri.joinPath(this.#extensionUri, 'node_modules', '@vscode/codicons', 'dist', 'codicon.css'));
        const styleResetUri = webview.asWebviewUri(Uri.joinPath(this.#extensionUri, 'media', 'reset.css'));
        const styleVSCodeUri = webview.asWebviewUri(Uri.joinPath(this.#extensionUri, 'media', 'vscode.css'));
        const styleMainUri = webview.asWebviewUri(Uri.joinPath(this.#extensionUri, 'media', 'search', 'main.css'));
        const searchJS = webview.asWebviewUri(Uri.joinPath(this.#extensionUri, 'media', 'search', 'search.js'));
        const fileSystem = getFileSystem();

        return /*html*/`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width,initial-scale=1.0">
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; font-src ${webview.cspSource}; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
                <title>MUD Search</title>
                <link href="${styleResetUri}" rel="stylesheet">
                <link href="${styleVSCodeUri}" rel="stylesheet">
                <link href="${styleMainUri}" rel="stylesheet">
                <link href="${codiconsUri}" rel="stylesheet">
            </head>
            <body class="mud-search-view">
                <div class="progress-bar-container">
                    <div class="progress-indicator"></div>
                </div>
                <div class="search-options hidden">
                    <div class="search-option">
                        <label>Path to find files in</label>
                        <div class="option-wrapper">
                            <input name="path" class="text-input" autocorrect="false" autocomplete="false" autocapitalize="false" aria-label="Search: Enter path of where to search" title="Search: Enter path of where to search" placeholder="Enter path of where to search"></textarea>
                            <div class="controls">
                                <div class="checkbox-wrapper">
                                    <input type="checkbox" id="search-text-recursive" name="recursive" value="Search recursively">
                                    <label for="search-text-recursive">
                                        <i role="checkbox" title="Search recursively" area-checked="false" class="codicon codicon-list-tree"></i>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="error-message"></div>
                    </div>
                    <div class="search-option">
                        <label>Text to find in files</label>
                        <div class="option-wrapper">
                            <textarea id="search-text" name="findText" class="text-input" autocorrect="false" autocomplete="false" autocapitalize="false" aria-label="Search: Enter search term" title="Search: Enter search term" placeholder="Enter text to find in files"></textarea>
                            <div class="mirror" data-for="search-text"></div>
                            <div class="controls">
                                <div class="checkbox-wrapper">
                                    <input type="checkbox" id="search-text-case-sensitive" name="caseSensitive" value="Match Case">
                                    <label for="search-text-case-sensitive">
                                        <i role="checkbox" title="Match Case" area-checked="false" class="codicon codicon-case-sensitive"></i>
                                    </label>
                                </div>
                                <div class="checkbox-wrapper">
                                    <input type="checkbox" id="search-text-whole-word" name="wholeWord" value="Match Whole Word">
                                    <label for="search-text-whole-word">
                                        <i role="checkbox" title="Match Whole Word" area-checked="false" class="codicon codicon-whole-word"></i>
                                    </label>
                                </div>
                                <div class="checkbox-wrapper">
                                    <input type="checkbox" id="search-text-use-reg-ex" name="useRegEx" value="Use Regular Expressions">
                                    <label for="search-text-use-reg-ex">
                                        <i role="checkbox" title="Use Regular Expressions" area-checked="false" class="codicon codicon-regex"></i>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="error-message"></div>
                    </div>
                    <div class="advanced-options">
                        <div class="checkbox-wrapper">
                            <input type="checkbox" name="showAdvancedOptions" id="show-adv-options" value="Toggle advanced options">
                            <label for="show-adv-options">
                                <i role="checkbox" title="Toggle advanced options" area-checked="false" class="codicon codicon-ellipsis"></i>
                            </label>
                        </div>
                        <div class="search-option">
                            <label>Files to include</label>
                            <div class="option-wrapper">
                                <input name="include" class="text-input" autocorrect="false" autocomplete="false" autocapitalize="false" aria-label="Search: Enter patterns to include in the search" title="Search: Enter patterns to include in the search" placeholder="e.g.: *.c,/lib/**/*.h"></textarea>
                            </div>
                        </div>
                        <div class="search-option">
                            <label>Files to exclude</label>
                            <div class="option-wrapper">
                                <input name="exclude" class="text-input" autocorrect="false" autocomplete="false" autocapitalize="false" aria-label="Search: Enter patterns to exclude in the search" title="Search: Enter patterns to exclude in the search" placeholder="e.g.: *.c,/lib/**/*.h"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="search-info" class="info-panel"></div>
                <div id="search-results" class="search-results">
                </div>
                <div class="search-cancelled info-panel">
                    The search was cancelled before it completed.
                </div>

                <script nonce="${nonce}" src="${searchJS}"></script>
            </body>
        </html>
        `;
    }

    /**
     * Add a search match result
     * @param {SearchResultMatch} match
     */
    async addMatch(match)
    {
        this.#matches.push(match);
        await this.#sendWebviewMessage({ type: "add-match", match });
    }

    async clear()
    {
        this.#matches.length = 0;
        await this.#sendWebviewMessage({ type: "clear" })

        await this.#sendWebviewMessage({ type: "initialize", ..._defaultViewOptions });
    }

    async cancel()
    {
        if (!this.#currentSearchContext)
            return;

        const searchContext = this.#currentSearchContext;
        const searchCancellationTokenSource = searchContext.cancellationTokenSource;
        commands.executeCommand("setContext", `${viewId}.searching`, false);

        searchCancellationTokenSource.cancel();

        await this.#sendWebviewMessage({ type: "cancelled" });

        this.#didCancelSearchEvent.fire();
        this.#currentSearchContext = null;
    }

    reveal()
    {
        if (!this.#view)
            return;

        this.#view.show(true);
    }

    /**
     * Revolves a webview view
     * @param {import("vscode").WebviewView} webviewView
     * @param {import("vscode").WebviewViewResolveContext} context
     * @param {import("vscode").CancellationToken} cancellationToken
     */
    resolveWebviewView(webviewView, context, cancellationToken)
    {
        this.#view = webviewView;
        webviewView.webview.html = this.#render();

        webviewView.onDidChangeVisibility((event) =>
        {
            if (!webviewView.visible)
                return;

            this.#restoreWebViewContent();
        });

        this.#restoreWebViewContent();
    }

    #restoreWebViewContent()
    {
        let viewOptions = _defaultViewOptions;
        if (this.#currentSearchContext)
            viewOptions = this.#currentSearchContext.viewOptions;;

        this.#sendWebviewMessage({ type: "initialize", ...viewOptions });

        const currentSearch = this.#currentSearchContext;
        if (currentSearch)
        {
            const searchCancellationTokenSource = currentSearch.cancellationTokenSource;
            if (searchCancellationTokenSource)
                this.#sendWebviewMessage({ type: "searching" })
        }

        for (const match of this.#matches)
        {
            this.#sendWebviewMessage({ type: "add-match", match })
        }
    }
}

let searchViewProvider = undefined;

module.exports =
{
    getSearchViewProvider: (context) =>
    {
        if (searchViewProvider === undefined)
            searchViewProvider = new SearchViewProvider(context.extensionUri);

        return searchViewProvider;
    },
    SearchViewOptions
}