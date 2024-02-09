const { URL } = require("url");
const { window, workspace } = require("vscode");
const { getConfiguration } = require("../utilities/configuration");
const { RemoteEditorClient } = require("./RemoteEditorClient");
const { RiseOfPraxisClient } = require("./RiseOfPraxis/client");

const remoteEditorClients = {
	"rise-of-praxis": RiseOfPraxisClient
}

module.exports = {
	RemoteEditorClient,

	/**
	 * 
	 * @param {object} [options] The options use to create the client
	 * @returns {Promise<RemoteEditorClient>}
	 */
	createRemoteEditorClient: async (options) =>
	{
		const config = getConfiguration();

		const connectionOptions = options || {
			uri: new URL(config.uri),
			userName: config.userName,
			password: config.password,
		};

		if (!connectionOptions.userName || !connectionOptions.password)
			return undefined;

		// Figure out which client type to use
		const clientType = config.get("protocol");
		const Client = remoteEditorClients[clientType];
		if (!Client)
			return undefined;

		// Create the client.  If the client is session based, call the connect method.
		// Session-based clients are identified by having a connect method.
		connectionOptions.outputChannel = config.connectionDebugging ? window.createOutputChannel('Remote Editor') : undefined;
		const client = new Client(connectionOptions);
		if (typeof (client.connect) === "function")
			await client.connect(connectionOptions);

		return client;
	}

}