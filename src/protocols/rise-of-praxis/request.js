const EventEmitter = require("events");
const { Socket } = require("net");

const loginResponsePattern = /^Connection to (.+)./i;
const serverResponsePattern = /^(\d{3}) (.+?)\n(.*)$/si;
const messageContentPattern = /^\((\d+)\) (.*)$/si;

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
	}

	#connectionOptions;

	#connection;

	/**
	 * The name of the MUD the request connected to
	 * @type {string}
	 */
	#mudName;

	/**
	 * 
	 * @param {string} data The server response data
	 * @returns 
	 */
	processResponse(data)
	{
		if (!serverResponsePattern.test(data))
			return;

		// Parse the response data from the server, getting the status code and status text first.
		const matches = serverResponsePattern.exec(data);
		const [message, statusCode, status, messageContent] = matches;

		const response = {
			statusCode, status, mudName: this.#mudName
		};

		// If content was also included, parse that as well
		if (messageContent)
		{
			const contentMatches = messageContentPattern.exec(messageContent);
			response.dataSize = parseInt(contentMatches[1]);
			response.data = contentMatches[2];

			if(response.dataSize > 0
				&& response.dataSize !== response.data.length)
				return;
		}

		return response;
	}

	/**
	 * 
	 * @returns {Promise}
	 */
	async #sendLogin()
	{
		const { userName, password } = this.#connectionOptions;
		const response = await this.write(`login ${userName} ${password}\n`);

		if (response.statusCode === "100")
		{
			const matches = loginResponsePattern.exec(response.status);
			if(matches)
				this.#mudName = matches[1];
			return true;
		}

		return false;
	}

	write(data)
	{
		return new Promise((resolve, reject) =>
		{
			let buffer = '';
			const connection = this.#connection;
			
			// Callback function that handles the server response
			const handleServerResponse = (responseData) => {
				buffer += responseData.toString();
				const response = this.processResponse(buffer);	

				// If the data returned is not valid, wait because there may be more data that is being streamed
				// back
				if (response === undefined)
					return;
			
				// Stop listening on this connection
				connection.off('data', handleServerResponse);
				resolve(response);
			}

			connection.on('data', handleServerResponse);
			connection.write(data);
		});
	}

	/**
	 * Sends the request to the Remote Editor
	 * @async
	 */
	send(data)
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
				const loginResponse = await this.#sendLogin();
				if (!loginResponse)
					reject('Remote Editor login failed');

				const response = this.write(data);
				resolve(response);
			});

			const { host, port } = this.#connectionOptions;
			connection.connect({ host, port })
		});
	}
}

module.exports = RemoteEditorRequest;