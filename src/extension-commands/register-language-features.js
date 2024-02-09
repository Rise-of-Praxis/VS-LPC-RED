const { languages } = require("vscode");
const { LPCLanguageProvider } = require("../lpc");
const { getConfiguration } = require("../utilities/configuration");

module.exports = async(context) => {
	const lpcSyntaxDiagnostics = languages.createDiagnosticCollection("lpc-syntax");
	context.subscriptions.push(lpcSyntaxDiagnostics);
	
	const config = {
		...getConfiguration(),
		lpcSyntaxDiagnostics
	}
	const languageProvider = new LPCLanguageProvider();
	languageProvider.register(context, config);
}