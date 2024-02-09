const { languages } = require("vscode");
const { LPCLanguageProvider } = require("../lpc-lang");

module.exports = async(context) => {
	const lpcSyntaxDiagnostics = languages.createDiagnosticCollection("lpc-syntax");
	context.subscriptions.push(lpcSyntaxDiagnostics);
	
	const languageProvider = new LPCLanguageProvider();
	languageProvider.register(context, lpcSyntaxDiagnostics);
}