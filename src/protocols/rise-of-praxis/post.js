const RemoteEditorRequest = require('./request');
const { FileSystemError } = require('vscode');
const { rejects } = require('assert');


/**
 * 
 * @param {object} connectionOptions 
 * @param {string} path 
 * @param {Buffer} content 
 * @param {*} options 
 * @returns 
 */
module.exports = async (connectionOptions, path, content, options) =>
{
	const size = content ? content.length : 0;
	const request = new RemoteEditorRequest(connectionOptions);

	/**
	 * 
	 * @param {import('./request').RemoteEditorResponse} startResponse 
	 * @param {Socket} connection 
	 * @returns 
	 */
	const handlePostResponse = (startResponse, connection) =>
	{
		return new Promise((resolve, reject) =>
		{
			// If the initial start response is not 200, reject this.
			if (startResponse.statusCode !== "200")
				return reject(startResponse.content);

			// If there was no content to upload, we're done.
			if (size === 0)
				resolve();

			let responseBuffer = "";
			const handleUploadResponse = (buffer) =>
			{
				responseBuffer += buffer.toString();

				// Parse the response that's been put together so far
				let uploadResponse;
				while (uploadResponse = request.processResponse(responseBuffer))
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
						return resolve();
					}

					// If it got this far, then there's something wrong.
					reject(uploadResponse.status);
				}
			};

			// Handle responses from the server
			connection.on('data', handleUploadResponse);
			connection.on('error', (err) =>
			{
				reject(err);
			})

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

	const response = await request.send(`post ${path} ${size}\n`, handlePostResponse);

	if (response.statusCode !== "200")
		throw new FileSystemError(response.status);

	return true;
}