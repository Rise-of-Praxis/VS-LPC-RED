const { commands, languages, workspace, Disposable, window, ViewColumn } = require("vscode");
const { LPCLanguageProvider } = require("./lpc");
const { getConfiguration } = require("./utilities/configuration");
const { closeRemoteEditorClient, getRemoteEditorClient } = require("./clients");
const { getSearchViewProvider } = require("./search/mud-search-view-provider");
const { extensionId } = require("./constants");
const { enableAutoSave, getFileSystem } = require("./file-system");
const extensionCommands = require('./extension-commands');
const codeActions = require("./lpc/lpc-actions");


async function registerLanguageFeatures(context)
{
    const config = {
        ...getConfiguration()
    }
    const languageProvider = new LPCLanguageProvider();
    languageProvider.register(context, config);
}

async function registerFileSystem(context)
{ 
    const fileSystem = getFileSystem();
    const fileSystemProvider = workspace.registerFileSystemProvider(fileSystem.scheme, fileSystem, { isCaseSensitive: true })
    context.subscriptions.push(fileSystemProvider);

    enableAutoSave();
}

/**
 * The Remote Editor 
 * @param {import("vscode").ExtensionContext} context 
 */
function activate(context)
{
    console.log("Activating LPC Remote Editor...");

    const client = getRemoteEditorClient();
    if (!client)
        return;

    extensionCommands.forEach((command) =>
    {
        const { id, command: commandHandler } = command;
		const fullCommandName = `${extensionId}.${id}`;
		console.log(`Registering Extension Command '${fullCommandName}'`)
		context.subscriptions.push(commands.registerCommand(fullCommandName, (...args) => commandHandler(context, ...args)));
    });
    
    codeActions.forEach((actionProvider) =>
    {
        if (typeof (actionProvider.registerCommands) !== "function")
            return;
       
        console.log(`Registering commands associated with '${actionProvider.actionId}' action`);
        actionProvider.registerCommands(context);
    });

    context.subscriptions.push(client);

    registerFileSystem(context);
    registerLanguageFeatures(context);

    const searchViewProvider = getSearchViewProvider(context);

    context.subscriptions.push(
        window.registerWebviewViewProvider(searchViewProvider.viewId, searchViewProvider)
    );
}

// this method is called when your extension is deactivated
async function deactivate()
{ 
	await closeRemoteEditorClient();
}

module.exports = {
	activate,
    deactivate
}

