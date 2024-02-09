const { workspace } = require("vscode")

module.exports = {
	
	getConfiguration: () => {
		return workspace.getConfiguration("lpcRemoteEditor");
	}
}