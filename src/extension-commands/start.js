const {  window, ExtensionContext, commands, Uri } = require('vscode');
const createRemoteEditorClient = require('../client');
const { getConfiguration } = require('../utilities/configuration');

/**
 * 
 * @param {ExtensionContext} context 
 */
module.exports = async (context) =>
{
	const client = createRemoteEditorClient();
	const { mudName, name } = await client.who();

	const config = getConfiguration();
	if (config.addMyRealmFolderOnStartup)
	{
		const realmUri = client.getFileUri(`/realms/${name}`);
		await commands.executeCommand('lpc-remote-editor.addMyRealms', context, realmUri, config.myRealmTitle);
	}
	window.setStatusBarMessage(`Connected to ${mudName} as ${name}`)
}