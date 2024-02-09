const antlr4 = require("antlr4");
const { LPCLexer, LPCParser } = require('./lpc-parser');

/**
 * Wrapper around a parsed document 
 */
class LPCProgram
{
	constructor(document)
	{
		const input = document.getText();
		const chars = new antlr4.InputStream(input);
		const lexer = new LPCLexer(chars);
		const tokens = new antlr4.CommonTokenStream(lexer);
		const parser = new LPCParser(tokens);

		parser.removeErrorListeners();
		parser.addErrorListener(this);

		parser.buildParseTrees = true;
		this.#lpcProgram = parser.lpcProgram();
		this.uri = document.uri;
	}

	/**
	 * The root context to the document
	 * @type {import('antlr4').ParserRuleContext}
	 */
	get root() { return this.#lpcProgram; }
	#lpcProgram;

	/**
	 * Any captured syntax errors
	 * @type {object[]}
	 */
	get syntaxErrors() { return this.#syntaxErrors; }
	#syntaxErrors = [];

	syntaxError(recognizer, offendingSymbol, line, column, msg, e)
	{
		this.#syntaxErrors.push({ recognizer, offendingSymbol, line, column, msg, e });
	}

	reportAmbiguity(recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs)
	{
	};

	reportAttemptingFullContext(recognizer, dfa, startIndex, stopIndex, conflictingAlts, configs)
	{
	};

	reportContextSensitivity(recognizer, dfa, startIndex, stopIndex, prediction, configs)
	{
	};
}

module.exports = {
	LPCProgram
};