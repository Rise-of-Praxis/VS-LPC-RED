const { Socket, createConnection } = require("net");
const { URL } = require("url");
const { FileSystemError, Uri, FileType } = require("vscode");
const parseFileListing = require("./parse-file-listing");
const { RemoteEditorClient } = require("../RemoteEditorClient");
const { TimeoutError, ConnectError, RequestCancelledError } = require("../ClientErrors");
const { isMatch: globMatch } = require("micromatch");
const { FileInfo } = require("../../file-system/file-info");

const loginResponsePattern = /^Connection to (.+)./i;
const serverResponsePattern = /^(\d{3}) (.+?)\n(.*)$/si;
const messageContentPattern = /^\((\d+)\) (.*)$/si;

/**
 * @typedef {object} RiseOfPraxisConnectionOptions
 * @property {URL} uri The connection URI
 * @property {string} userName The authentication user name
 * @property {string} password The authentication password
 * @property {number} [requestTimeout=2500] The amount of time, in ms, that a request has to timeout
 * @property {number} [fetchSize=5000] The number of bytes to fetch at a time when reading a file
 * @property {number} [uploadChunkSize=2000] The number of bytes to send when uploading a file
 * @property {string[]} [ignorePaths]] A list of paths to ignore
 */

/** @type {RiseOfPraxisConnectionOptions} */
const _connectionOptionsDefaults = {
    uri: undefined,
    userName: undefined,
    password: undefined,
    requestTimeout: 2500,
    fetchSize: 5000,
    uploadChunkSize: 2000,
    ignorePaths: ["**/.vscode/**", "**/.git/**"]
}

/**
 * @typedef {object} RemoteEditorResponse
 * @property {string} mudName The name of the mud the client is connected to
 * @property {string} statusCode The server response code
 * @property {string } status The server response message
 * @property {number} [size] If the server sent content with the response, this is the size of the content
 * @property {string} [content] If the server sent content
 */

/**
 * Remote Editor client for Rise of Praxis
 */
class RiseOfPraxisClient extends RemoteEditorClient 
{
    /**
     * @param {import("../RemoteEditorClient").RemoteEditorClientOptions} options
     */
    constructor(options)
    {
        super(options);
        this.#connectionOptions = { ..._connectionOptionsDefaults, ...options };
    }

    /**
     * @type {Socket}
     */
    #connection;

    /**
     * The connection options
     * @type {RiseOfPraxisConnectionOptions}
     */
    #connectionOptions;

    /**
     * @returns {number} The time, in ms, a request has before it times out
     */
    get requestTimeout() { return this.#connectionOptions.requestTimeout; }

    /**
     * @returns {number} The size of data to fetch per read request
     */
    get fetchSize() { return this.#connectionOptions.fetchSize; }

    /**
     * The collection of requests that are to be executed, in order.  This is done
     * to avoid the cross chatter that would occur due to VS Code calling many
     * methods asynchronously.
     */
    pendingRequests = [];

    /**
     * Information about who the user is.  This is set in `connect`
     */
    #who;

    /**
     * Creates the response object for this request
     * 
     * @param {string} statusCode The status code of the response
     * @param {string} status The status of the response
     * @returns {RemoteEditorResponse}
     */
    #createResponseObject(statusCode, status)
    {
        return {
            statusCode, status, ...this.#who
        };
    }

    /**
     * @inheritdoc
     */
    async connect(options)
    {
        if (options)
            this.#connectionOptions = { ...this.#connectionOptions, ...options };
        else if (!this.#connectionOptions)
            throw new Error('No connection options were provided');

        const { uri, userName, password } = this.#connectionOptions;
        const host = uri.hostname;
        const port = parseInt(uri.port);

        return new Promise((resolve, reject) =>
        {
            // Create the connection
            const connection = createConnection({ host, port }, async (err) =>
            {
                // Remove the connect error listener
                connection.removeAllListeners("error");

                // Set this to be the current connection and authenticate the user
                this.#connection = connection;

                this.#who = await this.#handshake(userName, password);
                this.emit('connected', this.#who);

                return resolve(this.#who);
            });

            connection.once('error', (error) =>
            {
                const connectError = new ConnectError(error.toString());
                this.emit('error', connectError);
                return reject(connectError);
            });

            connection.once('timeout', () =>
            {
                return reject(new ConnectError('Establishing connection timed out.'));
            });

            // Listen for if this connection disconnects from the remote end
            connection.once('end', () =>
            {
                this.#connection = null;
                connection.removeAllListeners();
                this.dispose();
                this.emit('disconnected');
            });
        });
    }

    #pushRequest(message, content, callback)
    {
        this.pendingRequests.push({ message, content, callback });

        if (this.pendingRequests.length === 1)
            this.#processNextRequest();
    }

    #processNextRequest()
    {
        if (!this.pendingRequests.length)
            return;

        const { message, content, callback } = this.pendingRequests[0];
        let buffer = Buffer.alloc(0);
        const connection = this.#connection;
        const requestTimeout = this.requestTimeout;

        let timeoutId;

        // Called when the request completed, regardless of failure or success
        const complete = (response) =>
        {
            clearTimeout(timeoutId);

            // Remove all the listeners
            connection.off('data', handleServerResponse);
            connection.off('error', handleError);

            if (callback)
                callback(response);

            // Pop this off the requests and move to the next one
            this.pendingRequests.shift()
            if (this.pendingRequests.length)
                setTimeout(() => this.#processNextRequest());
        }

        // Called when there was an error with the request
        const handleError = (error) => 
        {
            if (error instanceof Error)
                complete(error);
            else
                complete(new Error(error));
        }

        const timeoutHandler = () =>
        {
            this.emit('timeout');
            handleError(new TimeoutError(`Request failed to complete within the alotted time (${requestTimeout / 1000}s).`));
        }

        const resetTimeout = () =>
        {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(timeoutHandler, requestTimeout);
        }

        // Callback function that handles the server response
        const handleServerResponse = async (responseData) =>
        {
            resetTimeout();
            buffer = Buffer.concat([buffer, responseData]);
            const text = buffer.toString();

            if (!serverResponsePattern.test(text))
                return handleError(`Server sent invalid response: ${text}`);
            let response = this.#processResponse(text);

            // If the data returned is not valid, wait because there may be more data that 
            // is being streamed back
            if (response === undefined)
                return;

            if (content)
            {
                // Turn off the data handler and upload the content
                connection.off('data', handleServerResponse);
                if (!await this.#uploadContent(content))
                    complete(new Error("Failed to upload content"));
            }

            complete(response);
        }

        connection.on('data', handleServerResponse);
        connection.on('error', handleError);

        connection.write(message);
        resetTimeout();
    }

    /**
     * Sends a Remote Editor message and handles the response for that specific message.
     * 
     * @param {string | Buffer} message The message to send to the Remote Editor
     * @async
     * @returns {Promise<RemoteEditorResponse>}
     */
    async #sendMessage(message, content)
    {
        return new Promise((resolve, reject) =>
        {
            // To avoid cross chatter caused by sending messages at the same time,
            // we need to queue them up and handle them individually.
            this.#pushRequest(message, content, (response) =>
            {
                if (response instanceof Error)
                    return reject(response);

                resolve(response);
            });
        });
    }

    /**
     * Uploads a file to the server once it's been put in Posting state
     * @param {string | Buffer} content 
     * @returns {Promise<boolean>}
     * @async
     */
    async #uploadContent(content)
    {
        if (!content || !content.length)
            return Promise.resolve(true);

        const connection = this.#connection;

        return new Promise((resolve, reject) =>
        {
            const size = content.length;

            let buffer = Buffer.alloc(0);
            let text = "";
            const handleUploadResponse = (data) =>
            {
                buffer = Buffer.concat([buffer, data]);
                text = buffer.toString("ascii")

                // Parse the response that's been put together so far
                let uploadResponse;
                while (uploadResponse = this.#processResponse(text))
                {
                    // There are possible multiple responses in the buffer, so the response content are the 
                    // other responses.
                    text = uploadResponse.content || '';

                    // If the response code is 1xx, then there's more coming
                    if (uploadResponse.statusCode.startsWith("1"))
                        continue;

                    // If the response code is 2xx, the upload is done
                    if (uploadResponse.statusCode.startsWith("2"))
                    {
                        connection.off('data', handleUploadResponse);
                        return resolve(true);
                    }

                    // If it got this far, then there's something wrong.
                    reject(new Error(uploadResponse.status));
                }
            };

            // Handle responses from the server
            connection.on('data', handleUploadResponse);

            // Send the data to the server, in chunks
            let remainingData = content.toString();
            const chunkSize = this.#connectionOptions.uploadChunkSize;
            while (remainingData.length > 0)
            {
                const chunk = remainingData.substring(0, chunkSize);
                connection.write(chunk);

                remainingData = remainingData.substring(chunkSize);
            }
        });
    };

    /**
     * Sends authentication information to the server to establish who the connection is for
     * 
     * @returns {Promise<object>}
     * @async
     */
    async #handshake(userName, password)
    {
        if (!userName || !password)
            throw new Error('Username or password can not be blank');

        try
        {
            const response = await this.#sendMessage(`login ${userName} ${password}\n`);

            if (response.statusCode === "100")
            {
                const matches = loginResponsePattern.exec(response.status);
                return { name: userName, mudName: matches[1] };
            }

            throw new Error(`Authentication for ${userName} failed: ${response.statusCode} ${response.status}`);
        }
        catch (error)
        {
            this.log(`Handshake failed: ${error}`);
            throw error;
        }
    }

    /**
     * 
     * @param {string} data The server response data
     * @param {boolean} [skipResponseValidation=false] If true, this skips the validation step where the file size
     * @returns {RemoteEditorResponse}
     */
    #processResponse(data, skipResponseValidation = false)
    {
        if (!serverResponsePattern.test(data))
            return;

        // Parse the response data from the server, getting the status code and status text first.
        const matches = serverResponsePattern.exec(data);
        const [message, statusCode, status, messageContent] = matches;

        const response = this.#createResponseObject(statusCode, status);

        // If content was also included, parse that as well
        if (messageContent)
        {
            const contentMatches = messageContentPattern.exec(messageContent);
            if (contentMatches)
            {
                response.size = parseInt(contentMatches[1]);
                response.content = (contentMatches[2] || "");
            }
            else
            {
                response.content = messageContent;
                response.size = messageContent.length;
            }

            if (!skipResponseValidation
                && response.size > 0
                && response.size !== response.content.length)
                return;
        }

        return response;
    }

    /**
     * @inheritdoc
     */
    async readDirectory(path)
    {
        const response = await this.#sendMessage(`ls ${path}\n`);

        const entries = [];
        const content = response.content || "";
        const listing = content.split('\n');

        for (const entry of listing)
        {
            const fileInfo = parseFileListing(entry, this);
            if (!fileInfo)
                continue;

            entries.push(fileInfo);
        }

        return entries;
    }

    /** 
     * @inheritdoc
     */
    async createDirectory(path)
    {
        const response = await this.#sendMessage(`mkdir ${path}\n`);
        if (response.statusCode !== "200")
            throw new FileSystemError(`Error creating directory ${path}: ${response.status}`);

        return true;
    }

    /**
     * @inheritdoc
     */
    async who()
    {
        return this.#who;
    }

    /**
     * @inheritdoc
     */
    async getFileInfo(path)
    {
        // See if the path should be ignored
        if (globMatch(path, this.#connectionOptions.ignorePaths))
            throw FileSystemError.FileNotFound(path);

        const response = await this.#sendMessage(`info ${path}\n`);
        if (response.statusCode === "404")
            throw FileSystemError.FileNotFound(path);

        const fileInfo = parseFileListing(response.status, this);

        return fileInfo;
    }

    /**
     * @inheritdoc
     */
    async pathExists(path)
    {
        const response = await this.#sendMessage(`info ${path}\n`);
        return (response.statusCode !== "404");
    }

    /**
     * @inheritdoc
     */
    async readFile(path)
    {
        // See if the path should be ignored
        if (globMatch(path, this.#connectionOptions.ignorePaths))
            throw FileSystemError.FileNotFound(path);

        const fileInfo = await this.getFileInfo(path);
        let fileSize = fileInfo.size;
        let rangeStart = 0;
        let fetchSize = this.fetchSize;
        const chunks = [];

        while (fileSize > 0)
        {
            // If we can fetch the whole file in one request, then do it without specifying the range
            let requestMessage = `get ${path}`;
            if (rangeStart > 1
                || fileSize > fetchSize)
            {
                requestMessage += `#${rangeStart}-${rangeStart + fetchSize - 1}`;
                rangeStart += fetchSize;
            }
            requestMessage += "\n";

            const response = await this.#sendMessage(requestMessage);
            if (response.statusCode === "404")
                throw FileSystemError.FileNotFound(path);
            else if (response.statusCode !== "200")
                throw new FileSystemError(response.status);

            if (!response.content)
                break;

            const content = Buffer.from(response.content)
            chunks.push(content);
            fileSize -= content.length;
        }

        if (chunks.length === 0)
            return Buffer.from('');
        else if (chunks.length === 1)
            return chunks[0];

        return Buffer.concat(chunks);
    }

    /**
     * @inheritdoc
     */
    async writeFile(path, content, options)
    {
        // Let the server know we're sending a file
        const size = content ? content.length : 0;
        const response = await this.#sendMessage(`post ${path} ${size}\n`, content.toString("ascii"));

        if (response.statusCode !== "200")
            throw new FileSystemError(response.status);
    }

    /**
     * @inheritdoc
     */
    async deleteFile(path, options)
    {
        const response = await this.#sendMessage(`rm ${path}\n`);
        if (response.statusCode === "404")
            throw FileSystemError.FileNotFound(path);
        else if (response.statusCode === "401")
            throw FileSystemError.NoPermissions(path);
        else if (response.statusCode !== "200")
            throw new FileSystemError(`Error deleting ${path}: ${response.status}`);
    }

    /**
     * @inheritdoc
     */
    async deleteDirectory(path, options)
    {
        const response = await this.#sendMessage(`rmdir ${path}\n`);
        if (response.statusCode === "404")
            throw FileSystemError.FileNotFound(path);
        else if (response.statusCode === "401")
            throw FileSystemError.NoPermissions(path);
        else if (response.statusCode !== "200")
            throw new FileSystemError(`Error deleting ${path}: ${response.status}`);

        return true;
    }

    /**
     * @inheritdoc
     */
    async copy(oldPath, newPath, options)
    {
        const response = await this.#sendMessage(`cp ${oldPath} ${newPath}\n`);
        if (response.statusCode !== "200")
            throw new FileSystemError(`Error copying ${oldPath} to ${newPath}: ${response.status}`);

        return true;
    }

    /**
     * @inheritdoc
     */
    async rename(oldPath, newPath, options)
    {
        const response = await this.#sendMessage(`rename ${oldPath} ${newPath}\n`);
        if (response.statusCode !== "200")
            throw new FileSystemError(`Error moving ${oldPath} to ${newPath}: ${response.status}`);

        return true;
    }

    dispose()
    {
        if (this.#connection)
        {
            this.#sendMessage("quit\n");
            this.#connection.end();
            this.#connection = null;
        }
        const pendingRequests = this.pendingRequests;
        this.pendingRequests = [];

        for (const { callback, message } of pendingRequests)
        {
            if (typeof (callback) == "function")
                callback(new RequestCancelledError(message));
        }
    }
}

module.exports = { RiseOfPraxisClient };