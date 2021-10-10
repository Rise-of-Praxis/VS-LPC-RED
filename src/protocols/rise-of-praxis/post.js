const RemoteEditorRequest = require('./request');
const { FileSystemError } = require('vscode');

module.exports = async (connectionOptions, path, content, options) =>
{
	let size = content ? content.length : 0;
	const request = new RemoteEditorRequest(connectionOptions);
	let response = await request.send(`post ${path} ${size}\n`);
	if (response.statusCode !== "200")
		throw new FileSystemError(response.status);
	
	if(size === 0)
		return true;

	const chunkSize = 1024;
	let remainingData = content.toString();
	while (size > 0)
	{
		const chunk = remainingData.substr(0, chunkSize);
		response = await request.write(chunk);
		remainingData = remainingData.substr(chunkSize);
		size -= chunkSize;
	}

	return true;
}