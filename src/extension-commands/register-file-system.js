const vscode = require('vscode');
const { workspace, window, Uri, StatusBarAlignment } = require('vscode');
const { FileSystem } = require("../file-system");
const { existsSync, mkdirSync } = require('fs');
const { dirname } = require('path');
const { getConfiguration } = require('../utilities/configuration');
const { LanguageId } = require("../lpc");
const { getRemoteEditorClient } = require('../clients');
const { ConnectError, RequestCancelledError } = require('../clients/ClientErrors');

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

let client = null;

/**
 * 
 * @param {object} context 
 */
module.exports = async (context) =>
{
	let reconnectAttempts = 0;

	if (client)
		return;

	try
	{
		client = getRemoteEditorClient();
		const statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left, 1);
		statusBarItem.name = "LPC Remote Editor";
		statusBarItem.show();

		/**
		 * 
		 * @param {object} settings 
		 * @param {string} settings.message
		 * @param {string} [settings.tooltip]
		 * @param {string} settings.icon
		 */
		function setStatusBarItem({ message, tooltip, icon })
		{
			statusBarItem.text = `$(${icon}) ${statusBarItem.name}: ${message}`;
			statusBarItem.tooltip = tooltip;
		}

		/**
		 * Attempts to reconnect to the mud
		 * @returns Promise
		 * @async
		 */
		async function attemptReconnect()
		{
			reconnectAttempts++;

			if (reconnectAttempts > 3)
			{
				setStatusBarItem({ message: 'Failed to connect', icon: 'error' });
				return;
			}

			setStatusBarItem({ message: `Attempt ${reconnectAttempts} to reconnect...`, icon: 'warning' });
			return client.connect();
		}

		client.on('connected', (who) =>
		{
			reconnectAttempts = 0;
			setStatusBarItem({ message: `Connected to ${who.mudName}`, tooltip: `Successfully connected ${who.name} to ${who.mudName}`, icon: 'vm-active' });

			if (window.activeTextEditor)
				window.showTextDocument(window.activeTextEditor.document);
		});

		client.on('disconnected', () =>
		{
			// Try to reconnect, but don't wait for it.
			attemptReconnect();
		});

		client.on('error', (error) =>
		{
			if (error instanceof RequestCancelledError)
				return;

			if (error instanceof ConnectError)
				window.showErrorMessage("Remote Editor connection error occurred.");
		});

		const fileSystem = new FileSystem(client);
		const fileSystemProvider = workspace.registerFileSystemProvider(fileSystem.scheme, fileSystem, { isCaseSensitive: true })
		context.subscriptions.push(client);
		context.subscriptions.push(fileSystemProvider);

		enableAutoSave();
	} catch (err)
	{
		window.showErrorMessage(`Failed to connect the Remote Editor Client.\n${err}`);
		return;
	}

}

