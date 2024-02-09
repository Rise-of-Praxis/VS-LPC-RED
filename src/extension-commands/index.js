const createNewWorkspace = require('./create-new-workspace');
const registerFileSystem = require('./register-file-system');
const addMyRealms = require('./add-my-realms');
const registerLanguageFeatures = require('./register-language-features');
const copyMudPath = require('./copy-mud-path');

module.exports = {
	createNewWorkspace,
	registerFileSystem,
	registerLanguageFeatures,
	addMyRealms,
	copyMudPath
}