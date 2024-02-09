const EventEmitter = require("events");
const { connect } = require("http2");
const { Socket } = require("net");
const { window } = require("vscode");

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


class RemoteEditorRequest extends EventEmitter
{
	constructor(options)
	{
		super();
		const { uri, userName, password } = options;
		this.#connectionOptions = {
			host: uri.hostname,
			port: uri.port,
			userName,
			password
		};

		this.#outputChannel = options.outputChannel;
	}

	/**
	 * The options used to establish a connection
	 * 
	 * @type {object}
	 */
	#connectionOptions;

	/**
	 * The socket used for this request
	 * 
	 * @type {Socket}
	 */
	#connection;

	/** 
	 * The output channel used for logging information
	 * 
	 * @type {OutputChannel}
	 */
	#outputChannel;

	/**
	 * The name of the MUD the request connected to
	 * @type {string}
	 */
	#mudName;

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
			statusCode, status, mudName: this.#mudName
		};
	}

	/**
	 * 
	 * @param {string} data The server response data
	 * @returns {RemoteEditorResponse}
	 */
	processResponse(data)
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
			response.size = parseInt(contentMatches[1]);
			response.content = contentMatches[2] || "";

			if (response.size > 0
				&& response.size !== response.content.length)
				return;
		}

		return response;
	}

	/**
	 * Outputs a message to the VS Code Output Channel
	 * @param {string} message The message to write to the output channel 
	 */
	#log(message)
	{
		if (this.#outputChannel)
			this.#outputChannel.appendLine(message);
	}

	/**
	 * Sends authentication information to the server to establish who the connection is for
	 * 
	 * @returns {Promise<boolean>}
	 */
	async #handshake()
	{
		const { userName, password } = this.#connectionOptions;

		if(!userName || !password)
			return false;

		try {
			const response = await this.#write(`login ${userName} ${password}\n`);

			if (response.statusCode === "100")
			{
				const matches = loginResponsePattern.exec(response.status);
				if (matches)
					this.#mudName = matches[1];
				return true;
			}

			this.#log(`Authentication for ${userName} failed: ${response.statusCode} ${response.status}`);

			return false;
		}
		catch(error) {
			this.#log(`Handshake failed: ${error}`);
			return false;
		}
	}

	/**
	 * Writes data to the open connection
	 * 
	 * @param {string | Buffer} data The data to write to the connection
	 * @async
	 * @returns {Promise<RemoteEditorResponse>}
	 */
	#write(data)
	{
		return new Promise((resolve, reject) =>
		{
			let buffer = '';
			const connection = this.#connection;

			// Callback function that handles the server response
			const handleServerResponse = (responseData) =>
			{
				buffer += responseData.toString();
				if (!serverResponsePattern.test(buffer))
					reject("Server sent invalid response");

				// Process the completed buffer
				const response = this.processResponse(buffer);

				// If the data returned is not valid, wait because there may be more data that is being streamed
				// back
				if (response === undefined)
					return;

				connection.off('data', handleServerResponse);

				// Stop listening on this connection
				resolve(response);
			}

			connection.on('data', handleServerResponse);
			connection.on('error', (error) =>
			{
				reject(error);
			});
			connection.on('timeout', () =>
			{
				reject("Remote Editor response timed out");
			});
			connection.write(data);
		});
	}

	/**
	 * Sends the request to the Remote Editor
	 * 
	 * @param {string} data The request being sent
	 * @param {function} [callback] The callback function that is called after the data is sent.  
	 * It will receive a reference to the connection object if any additional data is to be sent
	 * @returns {Promise<RemoteEditorResponse>}
	 */
	send(data, callback)
	{
		return new Promise((resolve, reject) =>
		{
			const connection = new Socket();
			this.#connection = connection;
			connection.on('error', (error) =>
			{
				reject(error);
			});

			connection.on('connect', async () =>
			{
				// Authenticate this connection
				if (!await this.#handshake())
				{
					this.#log(`Remote Editor login failed`);
					return reject('Remote Editor login failed');
				}

				try
				{
					// Write the data to the socket and wait for a response
					const response = await this.#write(data);
					this.#log(`${data} -> Response: ${response.statusCode} ${response.status}`);

					if (typeof (response.content) === "string")
						this.#log(` -> Content is ${response.size} bytes long`);

					if (typeof (callback) === "function")
						await callback(response, connection);

					resolve(response);
				}
				catch (error)
				{
					reject(error);
				}
				finally
				{
					connection.write("quit\n");
					connection.end();
				}
			});

			const { host, port } = this.#connectionOptions;
			connection.connect({ host, port })
		});
	}
}

module.exports = RemoteEditorRequest;