const { workspace, window, ExtensionContext, Uri } = require('vscode');
const { FileSystem } = require("../file-system");
const { existsSync, mkdirSync } = require('fs');
const { dirname } = require('path');
const { getConfiguration } = require('../utilities/configuration');
const { LanguageId } = require("../lpc-lang");
const { createRemoteEditorClient } = require('../clients');

function getLocalWorkspacePath()
{
	// If the user has local backup specified, make a copy of the file.
	const config = getConfiguration();
	const localWorkspace = config.get("localWorkspace");
	if (!localWorkspace)
		return;

	try
	{
		// Ensure the directory exists
		if (!existsSync(localWorkspace))
			mkdirSync(localWorkspace, { recursive: true });
	}
	catch (err)
	{
		window.showErrorMessage(`Unable to use directory ${localWorkspace} to save local files: ${err}`);
		return;
	}

	return localWorkspace;
}

/**
 * Turns on auto-save
 */
function enableAutoSave()
{
	workspace.onDidSaveTextDocument((document) =>
	{
		if (document.languageId !== LanguageId)
			return;

		const localWorkspace = getLocalWorkspacePath()
		if (!localWorkspace)
			return;

		// Get the local workspace
		const baseUri = Uri.file(localWorkspace);
		const { uri } = document;
		const targetPath = Uri.joinPath(baseUri, uri.path);

		try
		{
			const content = Uint8Array.from(Buffer.from(document.getText()));
			const dirName = dirname(targetPath.fsPath);
			mkdirSync(dirName, { recursive: true });
			workspace.fs.writeFile(targetPath, content);
		} catch (err)
		{
			window.showErrorMessage(`Error saving local file to ${targetPath.fsPath}`);

		}
	});
}


let registeredFileSystem = false;

/**
 * 
 * @param {import("vscode").ExtensionContext} context 
 */
module.exports = async (context) =>
{
	if (registeredFileSystem)
		return;

	const client = await createRemoteEditorClient();
	client.on('disconnected', () =>
	{
		registeredFileSystem = false;
		fileSystemProvider.dispose();

		const messageOptions = { modal: true, detail: 'The connection to the MUD was dropped.  You need to reload the workspace to reconnect.' };
		window.showErrorMessage('Mud connection was dropped.', messageOptions);
	});

	const fileSystem = new FileSystem(client);
	const fileSystemProvider = workspace.registerFileSystemProvider(fileSystem.scheme, fileSystem, { isCaseSensitive: true })
	context.subscriptions.push(fileSystemProvider);
	registeredFileSystem = true;

	enableAutoSave();
}

