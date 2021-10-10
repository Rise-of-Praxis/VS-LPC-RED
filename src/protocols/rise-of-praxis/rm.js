const RemoteEditorRequest = require('./request');
const { FileSystemError } = require('vscode');

module.exports = async (connectionOptions, path) =>
{
	const request = new RemoteEditorRequest(connectionOptions);
	const response = await request.send(`rm ${path}\n`);
	if (response.statusCode === "404")
		throw FileSystemError.FileNotFound(path);
	else if (response.statusCode === "401")
		throw FileSystemError.NoPermissions(path);
	else if (response.statusCode !== "200")
		throw new FileSystemError(`Error deleting ${path}: ${response.status}`);

	return true;
}