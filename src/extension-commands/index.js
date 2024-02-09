const startRemoteEditor = require('./start');
const createNewWorkspace = require('./create-new-workspace');
const registerFileSystem = require('./register-file-system');
const addMyRealms = require('./add-my-realms');
const registerLanguageFeatures = require('./register-language-features');

module.exports = {
	startRemoteEditor,
	createNewWorkspace,
	registerFileSystem,
	registerLanguageFeatures,
	addMyRealms
}