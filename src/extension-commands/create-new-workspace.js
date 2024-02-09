const { workspace, window, ExtensionContext, ConfigurationTarget, commands, Uri } = require('vscode');
const { createRemoteEditorClient } = require('../clients');
const { URL } = require('url');

const connectToMudCancelled = 'Connect to a MUD - cancelled';
const invalidUriMessage = `The hostname must be a valid URL in the format of 'tcp://hostname[:port]' or 'http[s]://hostname[:port]'`;

/**
 * Prompts the user to enter a host to connect to
 * @param {ExtensionContext} context 
 */
async function getHostUri(context)
{
	let uri = ''
	const stateKey = 'lpc-remote-editor.new-connection.uri';

	while (!uri.length)
	{
		uri = context.workspaceState.get(stateKey);
		let parsedUrl;

		function validateHostUri(input)
		{
			try
			{
				if (!input || !input.length)
					return;

				// Ensure that the input starts with tcp or http[s].  If it doesn't, prepend tcp:// to it.
				const url = (input && !/[tcp|https?]:\/\//i.test(input)) ? `tcp://${input}` : input;
				parsedUrl = new URL(url);
			}
			catch {
				return invalidUriMessage;
			}
		}

		uri = await window.showInputBox({ title: "MUD Host", prompt: `Enter the MUD host to connect to`, validateInput: validateHostUri, value: uri });

		if (typeof (uri) !== "string")
			return;

		if (!uri.length)
			window.showErrorMessage(invalidUriMessage);

		if (parsedUrl)
			uri = parsedUrl.toString();
	}

	context.workspaceState.update(stateKey, uri);
	return new URL(uri);
}

/**
 * Prompts the user to enter a username
 * @param {ExtensionContext} context 
 */
async function getUserName(context)
{
	let userName = "";
	const stateKey = 'lpc-remote-editor.new-connection.userName';

	while (!userName.length)
	{
		userName = context.workspaceState.get(stateKey);
		userName = await window.showInputBox({ title: "User name", prompt: `Enter your username`, value: userName });

		if (typeof (userName) !== "string")
			return;
	}

	context.workspaceState.update(stateKey, userName);
	return userName;
}

/**
 * Prompts the user to enter a password
 * @param {ExtensionContext} context 
 */
async function getPassword(context)
{
	let password = "";

	while (!password.length)
	{
		password = await window.showInputBox({ title: "Password", prompt: `Enter your password`, password: true });

		if (typeof (password) !== "string")
			return;
	}

	return password;
}

/**
 * Gets the connection options from the user
 * @param {ExtensionContext} context
 * @returns {Promise<object>} The connection options, or undefined if the user cancelled.
 */
async function getConnectionOptions(context)
{
	const uri = await getHostUri(context);
	if (!uri)
		return;

	const userName = await getUserName(context);
	if (!userName)
		window.showErrorMessage(connectToMudCancelled);

	const password = await getPassword(context);
	if (!password)
		window.showErrorMessage(connectToMudCancelled);

	return {
		uri,
		userName,
		password
	};
}

async function saveWorkspace(folders, connectionOptions)
{

	// Prompt to save the workspace
	const filters = {
		"Code Workspaces": ["code-workspace"]
	};
	const saveOptions = {
		title: "LPC Remote Editor workspace",
		filters,
		defaultUri: Uri.parse("file://")
	};
	const workspaceUri = await window.showSaveDialog(saveOptions);
	if (!workspaceUri)
		return;

	const settings = {
		'lpcRemoteEditor.uri': connectionOptions.uri.toString(),
		'lpcRemoteEditor.userName': connectionOptions.userName,
		'lpcRemoteEditor.password': connectionOptions.password,
	};

	const content = JSON.stringify({ folders, settings }, undefined, '\t');
	await workspace.fs.writeFile(workspaceUri, Uint8Array.from(Buffer.from(content)));

	return workspaceUri;
}

/**
 * 
 * @param {ExtensionContext} context 
 */
module.exports = async (context) =>
{
	const connectionOptions = await getConnectionOptions(context);
	if (!connectionOptions)
	{
		window.showWarningMessage(connectToMudCancelled);
		return;
	}

	const { uri, userName } = connectionOptions;
	window.setStatusBarMessage(`Attempting to connect to ${uri} as ${userName}...`);

	const client = createRemoteEditorClient(connectionOptions);

	client.once('connected', async (who) =>
	{
		const { mudName, name } = who;

		window.setStatusBarMessage(`Connected to ${uri} as ${userName}`, 1000);

		// Save the workspace setup
		const realmDirectory = `/realms/${name}`;
		const folders = [
			{ uri: client.getFileUri('/').toString(), name: mudName },
			{ uri: client.getFileUri(realmDirectory).toString(), name: `My Realm - ${realmDirectory}` }
		];
		const workspaceUri = await saveWorkspace(folders, connectionOptions);
		if (!workspaceUri)
		{
			window.showWarningMessage(connectToMudCancelled);
			return;
		}

		// Start the remote editor
		commands.executeCommand('vscode.openFolder', workspaceUri);
		client.dispose();
	});

	client.once('error', () =>
	{
		window.showErrorMessage(`Authentication failed for ${userName}`);
	});
}