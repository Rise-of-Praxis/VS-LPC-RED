const RemoteEditorRequest = require('./request');
const { FileSystemError } = require('vscode');
const { parseFileListing } = require('../../utilities');

module.exports = async (connectionOptions, path) =>
{
	const request = new RemoteEditorRequest(connectionOptions);
	const response = await request.send(`info ${path}\n`);
	if (response.statusCode === "404")
		throw FileSystemError.FileNotFound(path);

	return parseFileListing(response.status);
}