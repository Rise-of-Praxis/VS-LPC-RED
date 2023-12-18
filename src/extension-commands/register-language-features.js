const { languages } = require("vscode");
const { LPCLanguageProvider } = require("../lpc");
const { getConfiguration } = require("../utilities/configuration");

module.exports = async(context) => {
	const config = {
		...getConfiguration()
	}
	const languageProvider = new LPCLanguageProvider();
	languageProvider.register(context, config);
}