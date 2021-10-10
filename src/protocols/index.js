const RemoteEditorProtocol = require('./protocol');
const riseOfPraxisCommands = require('./rise-of-praxis');

const protocolCommands = {
	"rise-of-praxis": riseOfPraxisCommands
}

module.exports = (type, connectionOptions) =>
{
	const commands = protocolCommands[type];
	return new RemoteEditorProtocol(connectionOptions, commands);
}