const { commands, ExtensionContext, workspace, languages } = require('vscode');
const extensionCommands = require('./extension-commands');

const extensionIdPattern = /^([^.]+)\.(.+)$/i;

function getExtensionId(extensionId)
{
	const matches = extensionIdPattern.exec(extensionId);
	if (!matches)
		return undefined;

	return {
		publisher: matches[1],
		id: matches[2]
	};
}

/**
 * The Remote Editor 
 * @param {ExtensionContext} context 
 */
function activate(context)
{
	const extensionId = getExtensionId(context.extension.id);

	console.log("Activating LPC Remote Editor...");

	Object.keys(extensionCommands).forEach((name) =>
	{
		const commandHandler = extensionCommands[name];
		const fullCommandName = `${extensionId.id}.${name}`;
		console.log(`Registering Extension Command '${fullCommandName}'`)
		const command = commands.registerCommand(fullCommandName, () => commandHandler(context))
		context.subscriptions.push(command);
	});

	commands.executeCommand("lpc-remote-editor.registerFileSystem", context);
}

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}