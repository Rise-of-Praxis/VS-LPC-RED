const RemoteEditorRequest = require('./request');
const { FileSystemError } = require('vscode');

module.exports = async (connectionOptions, path) =>
{
	const request = new RemoteEditorRequest(connectionOptions);
	const response = await request.send(`get ${path}\n`);
	if (response.statusCode === "404")
		throw FileSystemError.FileNotFound(path);
	else if (response.statusCode !== "200")
		throw new FileSystemError(response.status);

	if(!response.content)
		return Buffer.from('');

	return Buffer.from(response.content);
}