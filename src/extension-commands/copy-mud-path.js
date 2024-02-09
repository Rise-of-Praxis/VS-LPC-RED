//TODO: Figure out how to properly override the standard `Copy Path` command
// Until then, add a custom command called 'Copy MUD Path' that calls this command.

const { env, window } = require("vscode");

/**
 * 
 * @param {ExtensionContext} context 
 */
module.exports = async (context, uri) =>
{
	const { path } = uri;

	env.clipboard.writeText(path);

	window.setStatusBarMessage(`Copied '${path}' to clipboard.`, 5000);
}