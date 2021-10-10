const RemoteEditorRequest = require('./request');
const { FileSystemError } = require('vscode');

module.exports = async (connectionOptions, path) =>
{
	const request = new RemoteEditorRequest(connectionOptions);
	const response = await request.send(`get ${path}\n`);
	if (response.statusCode === "404")
		throw FileSystemError.FileNotFound(path);
	else if (response.statusCode === "400"
		&& response.status === "File is too large to get")
		throw FileSystemError.Unavailable(path);

	return Buffer.from(response.data);
}