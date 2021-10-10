const RemoteEditorRequest = require('./request');
const { FileSystemError } = require('vscode');

module.exports = async (connectionOptions, path) =>
{
	const request = new RemoteEditorRequest(connectionOptions);
	const response = await request.send(`mkdir ${path}\n`);
	if (response.statusCode !== "200")
		throw new FileSystemError(`Error creating directory ${path}: ${response.status}`);

	return true;
}