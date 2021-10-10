const RemoteEditorRequest = require('./request');
const { FileSystemError } = require('vscode');
const { basename } = require('path');

module.exports = async (connectionOptions) =>
{
	const request = new RemoteEditorRequest(connectionOptions);
	let response = await request.send(`who\n`);

	const name = basename(response.status);

	return { mudName: response.mudName, name };
}