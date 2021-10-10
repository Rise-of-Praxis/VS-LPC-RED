
const { workspace, languages, window } = require('vscode');
const RemoteEditorClient = require('../client');
const { FileSystem } = require('../file-system');
const { URL } = require('url');

let registeredFileSystem = false;

/**
 * 
 * @param {ExtensionContext} context 
 */
module.exports = async (context) =>
{
	const config = workspace.getConfiguration("[lpc-remote-ed]");
	const connectionOptions = {
		uri: new URL(config.get("uri")),
		userName: config.get("userName"),
		password: config.get("password")
	};

	const client = new RemoteEditorClient(connectionOptions);
	const fileSystem = new FileSystem(client);
	if(!registeredFileSystem)
	{
		context.subscriptions.push(workspace.registerFileSystemProvider(client.scheme, fileSystem, { isCaseSensitive: true }));
		registeredFileSystem = true;
	}

	const {mudName, name} = await client.who();
	workspace.updateWorkspaceFolders(0, 0, { uri: client.getFileUri('/'), name: mudName });
	window.setStatusBarMessage(`Connected to ${mudName} as ${name}`)

	workspace
		.onDidOpenTextDocument((document) =>
		{
			// For all documents that end with .c or .h to be LPC documentions,
			if(document.uri.path.endsWith('.c')
				|| document.uri.path.endsWith('.h'))
				languages.setTextDocumentLanguage(document, 'lpc');
		});
}