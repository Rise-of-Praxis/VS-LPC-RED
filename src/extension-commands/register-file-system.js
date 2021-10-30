const { workspace, languages } = require("vscode");
const { FileSystem } = require("../file-system");

let registeredFileSystem = false;

/**
 * 
 * @param {ExtensionContext} context 
 */
module.exports = async (context) =>
{
	if (registeredFileSystem)
		return;

	const fileSystem = new FileSystem();
	context.subscriptions.push(workspace.registerFileSystemProvider(fileSystem.scheme, fileSystem, { isCaseSensitive: true }));
	registeredFileSystem = true;
}