const { EventEmitter, Uri, FileSystemError, Disposable, FileType, FileChangeType, window, workspace, CancellationTokenSource, Position, Range, Location } = require('vscode');
const { TimeoutError } = require('../clients/ClientErrors');
const { existsSync, mkdirSync } = require('fs');
const { dirname } = require('path');
const { getConfiguration } = require('../utilities/configuration');
const { LanguageId } = require("../lpc");
const { FileInfo } = require('./file-info');
const { isMatch: globMatch } = require("micromatch");
const { SearchResultMatch } = require("./search-results-match");
const { InvalidSearchOptionError } = require('./search-options-error');

class FileSystemOptions
{
    /**
     * The maximum number of matches allowed to be returned from a search
     * @type {number}
     */
    maxSearchResults = 1000;

    /**
     * The amount of time to go and check files that are being watched
     * @type {number}
     */
    watchTimeoutMS = 2500;
}

/**
 * @callback onMatchFoundCallback
 * @param {SearchResultMatch} match The match that was found
 * @param {import('vscode').Progress} progress Used to send progress to the UI
 */

/**
 * Options for {@link FileSystem.findFiles}
 */
class SearchOptions
{
    /**
     * @param {object} [initDictionary] The initial set of values for the search options
     */
    constructor(initDictionary)
    {
        if (initDictionary)
            Object.assign(this, initDictionary);
    }

    /**
     * Text to find within a file
     * @type {string|RegExp}
     */
    findText = undefined;

    /**
     * Indicates that {@link findType} value is a regular expression
     * @type {boolean}
     */
    useRegEx = false;

    /**
     * Indicates that {@link wholeWord} value is matched on word boundaries
     */
    wholeWord = false;

    /**
     * Indicates that {@link wholeWord} value is matched as case-sensitive
     */
    caseSensitive = false;

    /**
     * Indicates that the search should be recursive
     * @type {boolean}
     */
    recursive = false;

    /**
     * A glob pattern to include in the search
     * @type {string[]}
     */
    include = [];

    /**
     * A glob pattern to exclude from the search
     * @type {string[]}
     */
    exclude = [];

    /**
     * The cancellation token used to stop the search process
     * @type {import('vscode').CancellationToken}
     */
    cancellationToken = null;

    /**
     * Instance of Progress used to report progress of the search
     * @type {import('vscode').Progress}
     */
    progress = undefined;


    /**
     * A callback to call whenever a single match is found
     * @type {onMatchFoundCallback}
     */
    onMatchFound = undefined;

    /**
     * Indicates if ever instance within the file should be found or just
     * files that contain any instances.  If `false`, 
     * {@link SearchMatchResult.location} will be null.
     */
    instances = true;

    /**
     * The maximum number of results to return.
     * @type {number | undefined}
     */
    maxResults = undefined;
}

function getLocalWorkspacePath()
{
    // If the user has local backup specified, make a copy of the file.
    const config = getConfiguration();
    const localWorkspace = config.get("localWorkspace");
    if (!localWorkspace)
        return;

    try
    {
        // Ensure the directory exists
        if (!existsSync(localWorkspace))
            mkdirSync(localWorkspace, { recursive: true });
    }
    catch (err)
    {
        window.showErrorMessage(`Unable to use directory ${localWorkspace} to save local files: ${err}`);
        return;
    }

    return localWorkspace;
}

/**
 * Turns on auto-save
 */
function enableAutoSave()
{
    workspace.onDidSaveTextDocument((document) =>
    {
        if (document.languageId !== LanguageId)
            return;

        const localWorkspace = getLocalWorkspacePath()
        if (!localWorkspace)
            return;

        // Get the local workspace
        const baseUri = Uri.file(localWorkspace);
        const { uri } = document;
        const targetPath = Uri.joinPath(baseUri, uri.path);

        try
        {
            const content = Uint8Array.from(Buffer.from(document.getText()));
            const dirName = dirname(targetPath.fsPath);
            mkdirSync(dirName, { recursive: true });
            workspace.fs.writeFile(targetPath, content);
        } catch (err)
        {
            window.showErrorMessage(`Error saving local file to ${targetPath.fsPath}`);

        }
    });
}

/**
 * Escapes all the special characters in a string so that it matches exactly
 */
function escapeRegExText(regEx)
{
    return regEx.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

/**
 * Returns an array of numbers indicate the length of each line within text
 * @param {string} text The text to process
 * @returns {number[]}
 */
function getTextLineEnds(text)
{
    const lineBreakRegEx = /\r?\n/g;
    const lengths = [];
    let match;

    while ((match = lineBreakRegEx.exec(text)) !== null)
        lengths.push(match.index + match[0].length);

    return lengths;
}

class RemoteEditorFileSystem
{
    constructor(client, options)
    {
        this.#options = { ...this.#options, ...options };
        this.#client = client;
        this.#watchForClientConnection();
    }

    /**
     * The file system options
     * @type {FileSystemOptions}
     */
    #options = new FileSystemOptions();

    /** @type {import("../clients").RemoteEditorClient} */
    #client;

    /** @type {Promise} */
    #clientAvailablePromise;

    /** @type {import("../clients").RemoteEditorClient} */
    get client() { return this.#client; }

    /*
     * The timeout that checks the status of files that are being watched.
     */
    #watchTimeout;

    /** 
     * The files currently being warched
     * @type {Map} 
     */
    watchedFiles = new Map();

    /**
     * The scheme to use in {@link Uri} for links
     */
    get scheme()
    {
        return this.client.scheme;
    }

    get options() { return { ...this.#options }; }

    /**
     * Checks that a uri contains a valid path.  If not, throw an error
     * @param {Uri} uri 
     */
    #validateUri(uri)
    {
        const { path } = uri;

        if (path.indexOf(" ") !== -1)
            throw new Error("Filenames can not contain spaces.");
    }

    #watchForClientConnection()
    {
        this.#clientAvailablePromise = new Promise((resolve, reject) =>
        {
            const waitTimeout = setTimeout(() =>
            {
                reject(new TimeoutError("Waiting for client to connect has timed out."));
            }, 10000);

            this.#client.once('connected', (obj) =>
            {
                clearTimeout(waitTimeout);
                return resolve();
            });

            this.#client.once('disconnected', () =>
            {
                clearTimeout(waitTimeout);
                this.#watchForClientConnection();
            });
        });
    }

    /**
     * @type {EventEmitter}
     */
    onFileChangeEmitter = new EventEmitter();

    /**
     * 
     * @type {import('vscode').Event<import('vscode').FileChangeEvent[]>}
     */
    get onDidChangeFile() { return this.onFileChangeEmitter.event; }

    /**
     * 
     * @param {*} uri 
     * @param {*} options 
     * @returns {Disposable}
     */
    watch(uri, options)
    {
        let fileInfo = null;

        // See if the file exists
        this.stat(uri)
            .then((fileInfo) =>
            {
                this.watchedFiles.set(uri.path, fileInfo);
            })
            .catch((err) =>
            {
                if (err.code !== "FileNotFound")
                    throw err;
                this.watchedFiles.set(uri.path, null);
            })
            .finally(() =>
            {
                // If we haven't started watching, start now
                if (!this.#watchTimeout)
                    this.checkWatchedFiles();
            });

        return new Disposable(() =>
        {
            this.watchedFiles.delete(uri.path);
        });
    }

    #getFindTextRegEx(searchOptions)
    {
        if (searchOptions.findText instanceof RegExp)
            return searchOptions.findText;

        let findText = searchOptions.findText;
        let regExFlags = 'gm';

        if (!searchOptions.useRegEx)
            findText = escapeRegExText(findText);

        if (searchOptions.wholeWord)
            findText = `\\b${findText}\\b`;

        if (!searchOptions.caseSensitive)
            regExFlags += 'i';

        // Find all the matches within the text
        return new RegExp(findText, regExFlags);
    }

    checkWatchedFiles()
    {
        this.watchedFiles.forEach(async (lastInfo, path) =>
        {
            const uri = this.client.getFileUri(path);
            let currentInfo;
            try
            {
                currentInfo = await this.stat(uri);

                if (!lastInfo)
                    // If we didn't have any information the last time, but now we do, it was created
                    this.onFileChangeEmitter.fire({ type: FileChangeType.Created, uri });
                else if (currentInfo.mtime !== lastInfo.mtime)
                    // The file changed
                    this.onFileChangeEmitter.fire({ type: FileChangeType.Changed, uri });
            }
            catch (err)
            {
                if (err.code === "FileNotFound"
                    && lastInfo)
                    // The file was deleted
                    this.onFileChangeEmitter.fire({ type: FileChangeType.Deleted, uri });
            }

            // Update the current stat
            this.watchedFiles.set(path, currentInfo);
        });

        // If there are files to watch, then check in a bit
        if (this.watchedFiles.size)
            this.#watchTimeout = setTimeout(() => this.checkWatchedFiles(), this.#options.watchTimeoutMS)
    }

    /**
     * Waits for the client to be available for use.
     * @returns {Promise}
     */
    #waitForAvailableClient()
    {
        return this.#clientAvailablePromise;
    }

    /**
     * Gets information about about a single file
     *  
     * @param {Uri} uri The path of the file to return
     * @returns {Promise<import('./file-info').FileInfo>}
     */
    async stat(uri)
    {
        await this.#waitForAvailableClient();
        return this.client.getFileInfo(uri.path);
    }

    /**
     * Gets the contents of a directory
     *  
     * @param {Uri} uri The path of the directory to return
     * @async
     * @returns {Promise<[string, FileType][]>}
     */
    async readDirectory(uri)
    {
        await this.#waitForAvailableClient();
        const results = await this.client.readDirectory(uri.path);
        if (!results)
            throw FileSystemError.FileNotFound(uri);

        /** @type {[string, FileType][]} */
        const entries = [];
        for (const entry of results)
        {
            entries.push([entry.name, entry.type]);
        }

        return entries;
    }

    async createDirectory(uri)
    {
        this.#validateUri(uri);
        await this.#waitForAvailableClient();
        return this.client.createDirectory(uri.path);
    }

    /**
     * Gets the contents of a file
     *  
     * @param {Uri} uri The path of the file to return
     * @async
     * @returns {Promise<Uint8Array>}
     */
    async readFile(uri)
    {
        await this.#waitForAvailableClient();
        const data = await this.client.readFile(uri.path);
        if (!data)
            throw FileSystemError.FileNotFound(uri);

        return Uint8Array.from(data);
    }

    /**
     * Writes a file
     *
     * @param {Uri} uri The path of the file to write to 
     * @param {Buffer} content The contents to write
     * @param {object} options Additional settings when writing the file
     */
    async writeFile(uri, content, options)
    {
        this.#validateUri(uri);
        await this.#waitForAvailableClient();
        return this.client.writeFile(uri.path, content, options);
    }

    /**
     * Deletes a file
     * 
     * @param {Uri} uri The path of the file to delete
     * @param {object} options Additional settings when deleting the file
     * @returns 
     */
    async delete(uri, options)
    {
        await this.#waitForAvailableClient();

        const fileInfo = await this.stat(uri);
        if (fileInfo.type === FileType.File)
            return this.client.deleteFile(uri.path, options);
        else
            return this.client.deleteDirectory(uri.path, options);
    }

    /**
     * Renames a file/directory
     * 
     * @param {Uri} oldUri The path of the source file/directory
     * @param {Uri} newUri The path of the target file/directory
     * @param {object} options Options used for copying the file/directory
     */

    async rename(oldUri, newUri, options)
    {
        this.#validateUri(newUri);
        await this.#waitForAvailableClient();

        if (!await this.client.rename(oldUri.path, newUri.path, options))
            throw new FileSystemError(`Failed to rename ${oldUri.path} to ${newUri.path}`);
    }

    /**
     * Returns true if the path matches all the criteria of the search options
     * @param {FileInfo} fileInfo The file to check
     * @param {SearchOptions} searchOptions The search options to check
     * @returns {Promise<SearchResultMatch[]>} The matching information
     */
    async #doesMatchSearch(fileInfo, searchOptions)
    {
        const { path, uri } = fileInfo;

        // Check to see if the file is in the include/exclude list
        if (searchOptions.include.length
            && !globMatch(fileInfo.path, searchOptions.include, { basename: true }))
            return [];

        if (searchOptions.exclude.length
            && globMatch(fileInfo.path, searchOptions.exclude, { basename: true }))
            return [];

        // See if individual instances are being looked for
        if (!searchOptions.findText
            || (typeof (searchOptions.findText) === "string" && !searchOptions.findText.length))
            return [new SearchResultMatch({ uri })];

        let text;
        try
        {
            text = (await this.client.readFile(path)).toString();
        }
        catch (err)
        {
            window.showWarningMessage(`Error checking ${path}: ${err.toString()}`)
            return [];
        }
        const lineEnds = getTextLineEnds(text);

        // Find all the matches within the text
        const searchRegEx = this.#getFindTextRegEx(searchOptions)
        let match;
        const matches = [];
        let lineIndex = 0;
        while ((match = searchRegEx.exec(text)) !== null)
        {
            if (!searchOptions.instances)
                return [new SearchResultMatch({ uri })];

            const matchStart = match.index;
            const matchEnd = matchStart + match[0].length;
            while (lineEnds[lineIndex] < matchStart)
                lineIndex++;

            // Calculate the start of the match based on the line it's on
            const startLineIndex = lineIndex;
            const startLineStart = startLineIndex === 0 ? 0 : lineEnds[startLineIndex - 1];
            const startChar = matchStart - startLineStart;
            const start = new Position(startLineIndex, startChar);

            // Calculate the end line and position
            let endLineIndex = startLineIndex;
            let endLineStart = endLineIndex === 0 ? 0 : lineEnds[endLineIndex - 1];
            let endChar = matchEnd;
            while (lineEnds[endLineIndex] < matchEnd)
            {
                endLineIndex++;
                endLineStart = lineEnds[endLineIndex - 1];
            }
            endChar = matchEnd - endLineStart;
            const end = new Position(endLineIndex, endChar);

            const range = new Range(start, end);
            const location = new Location(uri, range);

            // Extract the lines that contains the matching text
            const lines = text.substring(startLineStart, lineEnds[endLineIndex]);
            const result = new SearchResultMatch({ uri, location, text: match[0].toString(), lines });

            matches.push(result);
        }

        return matches;
    }

    /**
     * Finds files that matches the search options
     * @param {string} path The path to return the list of files for
     * @param {SearchOptions} searchOptions The options for finding the files.
     * @returns {Promise<SearchResultMatch[]>} The list of files matching the search
     */
    async #findFiles(path, searchOptions, results)
    {
        
        const client = this.#client;
        const resolvedPath = client.resolvePath(path, "/");
        let files = [];
        const maxResults = searchOptions.maxResults === undefined ? Number.MAX_SAFE_INTEGER : searchOptions.maxResults;

        // Check to see if the regex pattern is valid
        if (searchOptions.useRegEx
            && typeof (searchOptions.findText) === "string"
            && searchOptions.findText.length)
        {
            try
            {
                new RegExp(searchOptions.findText);
            }
            catch (err)
            {
                throw new InvalidSearchOptionError("findText", err.message);
            }
        }

        try
        {
            const pathInfo = await client.getFileInfo(path);
            if (pathInfo.type !== FileType.Directory)
                throw new InvalidSearchOptionError("path", `The path '${resolvedPath}' is not a directory.`);

            files = await client.readDirectory(resolvedPath);
        } catch (err)
        {
            if (err instanceof FileSystemError)
                throw new InvalidSearchOptionError("path", `The path '${resolvedPath}' is invalid.`);

            throw err;
        }

        if (searchOptions.progress)
            searchOptions.progress.report({ message: `Searching in ${path}...` });

        // Sort the list so that files are handled first, then directories
        files.sort((a, b) =>
        {
            if (a.type === b.type)
                return a.name.localeCompare(b.name);

            if (a.type === FileType.File
                && b.type === FileType.Directory)
                return -1;
            else
                return 1;
        });

        // Iterate over each file and see if it matches the search options
        const { cancellationToken } = searchOptions;
        for (const file of files)
        {
            if (cancellationToken.isCancellationRequested)
                break;

            if (file.type === FileType.File)
            {
                const matched = await this.#doesMatchSearch(file, searchOptions);
                for (const match of matched)
                {   
                    results.push(match);

                    if (typeof (searchOptions.onMatchFound) === "function")
                    {
                        const promise = searchOptions.onMatchFound(match, searchOptions.progress);
                        if (promise instanceof Promise)
                            await promise;
                    }

                    if (results.length === maxResults)
                        break;
                }
            }
            else if (searchOptions.recursive)
            {
                const children = await this.#findFiles(file.path, searchOptions, []);
                results.push(...children);

                if (results.length > maxResults)
                    results.length = maxResults;
            }

            if (results.length === maxResults)
                break;
        }

        return results;
    }

    /**
     * Finds files that matches the search options
     * @param {string} path The path to return the list of files for
     * @param {SearchOptions} searchOptions The options for finding the files.
     * @returns {Promise<SearchResultMatch[]>} The list of files matching the search
     */
    async findFiles(path, searchOptions)
    {
        await this.#waitForAvailableClient();

        return this.#findFiles(path, searchOptions, []);
    }
}

module.exports = {
    RemoteEditorFileSystem
    , enableAutoSave
    , SearchOptions
}