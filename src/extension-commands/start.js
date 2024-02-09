
const { workspace, languages, window, Uri } = require('vscode');
const RemoteEditorClient = require('../client');
const { FileSystem } = require('../file-system');
const { URL } = require('url');

let registeredFileSystem = false;

function addRealmFolder(who, config) {
	
}

/**
 * 
 * @param {ExtensionContext} context 
 */
module.exports = async (context) =>
{
	const config = workspace.getConfiguration("lpcRemoteEditor");
	const outputChannel = window.createOutputChannel('Remote Editor');
	
	const connectionOptions = {
		uri: new URL(config.uri),
		userName: config.userName,
		password: config.password,
		outputChannel: config.connectionDebugging ? outputChannel : undefined
	};

	const client = new RemoteEditorClient(connectionOptions);
	const fileSystem = new FileSystem(client);
	if (!registeredFileSystem)
	{
		context.subscriptions.push(workspace.registerFileSystemProvider(client.scheme, fileSystem, { isCaseSensitive: true }));
		registeredFileSystem = true;
	}

	const { mudName, name } = await client.who();
	const realmDirectory = client.getFileUri(`/realms/${name}`);
	const realmFolder = workspace.getWorkspaceFolder(realmDirectory);
	if (!realmFolder
		|| realmFolder.uri.path !== realmDirectory.path
		|| realmFolder.name !== config.myRealmTitle)
	{
		outputChannel.appendLine(`Setting '${config.myRealmTitle}' to '${realmDirectory.path}'`);
		let insertIndex = 0;
		
		if (realmFolder)
			insertIndex = realmFolder.index;
		else
			insertIndex = workspace.workspaceFolders ? workspace.workspaceFolders.length : 0;

		// Append or replace the folder
		workspace.updateWorkspaceFolders(insertIndex, realmFolder ? 1 : 0, { uri: realmDirectory, name: config.myRealmTitle });
	}

	window.setStatusBarMessage(`Connected to ${mudName} as ${name}`)

	workspace
		.onDidOpenTextDocument((document) =>
		{
			// For all documents that end with .c or .h to be LPC documentions,
			if (document.uri.path.endsWith('.c')
				|| document.uri.path.endsWith('.h'))
				languages.setTextDocumentLanguage(document, 'lpc');
		});
}