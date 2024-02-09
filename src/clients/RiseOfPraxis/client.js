const { Socket, createConnection } = require("net");
const { URL } = require("url");
const { FileSystemError } = require("vscode");
const parseFileListing = require("./parse-file-listing");
const { RemoteEditorClient } = require("../RemoteEditorClient");

const loginResponsePattern = /^Connection to (.+)./i;
const serverResponsePattern = /^(\d{3}) (.+?)\n(.*)$/si;
const messageContentPattern = /^\((\d+)\) (.*)$/si;

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
	constructor(options)
	{
		super(options);
	}

	/**
	 * @type {Socket}
	 */
	#connection;

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
	 * Connects to Rise of Praxis' Remote Editor port
	 * @param {object} options The options for connecting
	 * @param {URL} options.uri The host address to connect to
	 * @param {string} options.userName The username to authenticate with
	 * @param {string} options.password The username to authenticate with
	 * @returns {Promise}
	 * @async
	 */
	async connect(options)
	{
		const { uri, userName, password } = options;
		const host = uri.hostname;
		const port = parseInt(uri.port);

		return new Promise((resolve, reject) =>
		{
			// Create the connection
			const connection = createConnection({ host, port }, async () =>
			{
				// Remove the connect error listener
				connection.removeAllListeners("error");

				// Set this to be the current connection and authenticate the user
				this.#connection = connection;

				this.#who = await this.#handshake(userName, password);

				return resolve(this.#who);
			});

			connection.once('error', (error) =>
			{
				return reject(error);
			});

			// Listen for if this connection disconnects from the remote end
			connection.on('end', () =>
			{
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
		let buffer = '';
		const connection = this.#connection;

		// Called when the request completed, regardless of failure or success
		const complete = (response) =>
		{
			// Remove all the listeners
			connection.off('data', handleServerResponse);
			connection.off('error', handleError);
			connection.off('timeout', handleTimeout);

			// Move onto the next request
			this.pendingRequests.shift()
			if (this.pendingRequests.length)
				setTimeout(() => this.#processNextRequest());

			if (callback)
				callback(response);
		}

		// Called when there was an error with the request
		const handleError = (error) => 
		{
			complete(new Error(error));
		}

		// Called when the response from the server timed out
		const handleTimeout = () =>
		{
			handleError("Remote Editor response timed out")
		}

		// Callback function that handles the server response
		const handleServerResponse = async (responseData) =>
		{
			buffer += responseData.toString();
			if (!serverResponsePattern.test(buffer))
				return handleError(`Server sent invalid response: ${buffer}`);

			// Process the completed buffer
			let response = this.#processResponse(buffer);

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
		connection.on('timeout', handleTimeout);
		connection.write(message);
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
					reject(response);

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

			let responseBuffer = "";
			const handleUploadResponse = (buffer) =>
			{
				responseBuffer += buffer.toString();

				// Parse the response that's been put together so far
				let uploadResponse;
				while (uploadResponse = this.#processResponse(responseBuffer))
				{
					// There are possible multiple responses in the buffer, so the response content are the 
					// other responses.
					responseBuffer = uploadResponse.content || '';

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
			const chunkSize = 2014;
			while (remainingData.length > 0)
			{
				const chunk = remainingData.substr(0, chunkSize);
				connection.write(chunk);

				remainingData = remainingData.substr(chunkSize);
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

			this.log(`Authentication for ${userName} failed: ${response.statusCode} ${response.status}`);

			return null;
		}
		catch (error)
		{
			this.log(`Handshake failed: ${error}`);
			return null;
		}
	}

	/**
	 * 
	 * @param {string} data The server response data
	 * @returns {RemoteEditorResponse}
	 */
	#processResponse(data)
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
				response.content = contentMatches[2] || "";
			}
			else
			{
				response.content = messageContent;
				response.size = messageContent.length;
			}

			if (response.size > 0
				&& response.size !== response.content.length)
				return;
		}

		return response;
	}

	/**
	 * Reads the content of a directory
	 *
	 * @param {string} path The path to get the directory listing for
	 * @returns {Promise<import("vscode").FileStat[]>}
	 */
	async readDirectory(path)
	{
		const response = await this.#sendMessage(`ls ${path}\n`);

		const entries = [];
		const listing = response.content.split('\n');

		for (const entry of listing)
		{
			const fileInfo = parseFileListing(entry);
			if (!fileInfo)
				continue;

			entries.push(fileInfo);
		}

		return entries;
	}

	/** 
	 * Creates a new directory
	 * @returns {Promise}
	 * @async
	 */
	async createDirectory(path)
	{
		const response = await this.#sendMessage(`mkdir ${path}\n`);
		if (response.statusCode !== "200")
			throw new FileSystemError(`Error creating directory ${path}: ${response.status}`);

		return true;
	}

	/**
	 * Get's information about the connection this client will be using
	 * 
	 * @returns {Promise<object>}
	 */
	async who()
	{
		return this.#who;
	}

	/**
	 * Gets information about a file or directory
	 * 
	 * @param {string} path The path to get the file information
	 * @returns {Promise<import("vscode").FileStat>}
	 */
	async getFileInfo(path)
	{
		const response = await this.#sendMessage(`info ${path}\n`);
		if (response.statusCode === "404")
			throw FileSystemError.FileNotFound(path);

		const fileInfo = parseFileListing(response.status);
		fileInfo.uri = this.getFileUri(path);

		return fileInfo;
	}

	/**
	 * Reads a file
	 * 
	 * @param {string} path The path of the file to read 
	 * @returns {Promise<Buffer>} The file content
	 */
	async readFile(path)
	{
		const response = await this.#sendMessage(`get ${path}\n`);
		if (response.statusCode === "404")
			throw FileSystemError.FileNotFound(path);
		else if (response.statusCode !== "200")
			throw new FileSystemError(response.status);

		if (!response.content)
			return Buffer.from('');

		return Buffer.from(response.content);
	}

	/**
	 * Writes a file
	 * 
	 * @param {string} path The path of the file to be written to
	 * @param {Buffer} content The file content to write
	 * @param {object} options Options used for writing the file
	 * @returns {Promise}
	 * @async
	 */
	async writeFile(path, content, options)
	{
		// Let the server know we're sending a file
		const size = content ? content.length : 0;
		const response = await this.#sendMessage(`post ${path} ${size}\n`, content);

		if (response.statusCode !== "200")
			throw new FileSystemError(response.status);
	}

	/**
	 * Deletes a file
	 * 
	 * @param {string} path The path of the file to delete
	 * @param {object} options Options used for deleting the file
	 * @returns {Promise}
	 * @async
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
	 * Deletes a directory
	 * 
	 * @param {string} path The path of the directory to delete
	 * @param {object} options Options used for deleting the directory
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
	 * Copies a file from one location to another location
	 * 
	 * @param {string} oldPath The path of the source file
	 * @param {string} newPath The path of the target file
	 * @param {object} options Options used for copying the file
	 */
	async copy(oldPath, newPath, options)
	{
		const response = await this.#sendMessage(`cp ${oldPath} ${newPath}\n`);
		if (response.statusCode !== "200")
			throw new FileSystemError(`Error copying ${oldPath} to ${newPath}: ${response.status}`);

		return true;
	}
}

module.exports = { RiseOfPraxisClient };