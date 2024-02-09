const RemoteEditorRequest = require('./request');
const { FileSystemError } = require('vscode');

module.exports = async (connectionOptions, oldPath, newPath) =>
{
	const request = new RemoteEditorRequest(connectionOptions);
	const response = await request.send(`cp ${oldPath} ${newPath}\n`);
	if (response.statusCode !== "200")
		throw new FileSystemError(`Error copying ${oldPath} to ${newPath}: ${response.status}`);

	return true;
}