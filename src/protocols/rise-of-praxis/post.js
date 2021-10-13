const RemoteEditorRequest = require('./request');
const { FileSystemError } = require('vscode');
const { rejects } = require('assert');


module.exports = async (connectionOptions, path, content, options) =>
{
	const size = content ? content.length : 0;
	const request = new RemoteEditorRequest(connectionOptions);

	const chunkSize = 1024;

	const uploadFile = (startResponse, connection) =>
	{
		return new Promise((resolve, reject) =>
		{
			if (startResponse.statusCode !== "200"
				|| size === 0)
				resolve();

			const uploadResponse = (buffer) =>
			{
				const data = buffer.toString();
				if(data.startsWith("1"))
					return;

				if(data.startsWith("2"))
				{
					connection.off('data', uploadResponse);
					resolve();
					return;
				}

				reject(data.substr(4));
			};

			connection.on('data', uploadResponse);

			let remainingData = content.toString();
			while (remainingData.length > 0)
			{
				const chunk = remainingData.substr(0, chunkSize);
				connection.write(chunk);

				remainingData = remainingData.substr(chunkSize);
			}
		});
	};

	const response = await request.send(`post ${path} ${size}\n`, uploadFile);

	if (response.statusCode !== "200")
		throw new FileSystemError(response.status);

	return true;
}