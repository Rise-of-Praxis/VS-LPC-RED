const RemoteEditorRequest = require('./request');
const { FileSystemError } = require('vscode');


module.exports = async (connectionOptions, path, content, options) =>
{
	const size = content ? content.length : 0;
	const request = new RemoteEditorRequest(connectionOptions);

	const uploadFile = (startResponse, connection) =>
	{
		const chunkSize = 1024;
		if (startResponse.statusCode !== "200"
			|| size === 0)
			return;

		let remainingData = content.toString();
		let remaining = size;
		while (remaining > 0)
		{
			const chunk = remainingData.substr(0, chunkSize);
			connection.write(chunk);

			remainingData = remainingData.substr(chunkSize);
			remaining -= chunkSize;
		}
	};

	const response = await request.send(`post ${path} ${size}\n`, uploadFile);

	if (response.statusCode !== "200")
		throw new FileSystemError(response.status);

	return true;
}