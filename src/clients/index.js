const { URL } = require("url");
const { window, workspace, StatusBarAlignment } = require("vscode");
const { getConfiguration } = require("../utilities/configuration");
const { RemoteEditorClient } = require("./RemoteEditorClient");
const { RiseOfPraxisClient } = require("./RiseOfPraxis/client");

const remoteEditorClients = {
    "rise-of-praxis": RiseOfPraxisClient
}

const { ConnectError, RequestCancelledError } = require('../clients/ClientErrors');

/**
 * A singleton instance of the RemoteEditorClient
 * @type {RemoteEditorClient}
 */
let _clientInstance = null;

function getRemoteEditorClient()
{
    if (_clientInstance === null)
        _clientInstance = createRemoteEditorClient();

    return _clientInstance;
}

async function closeRemoteEditorClient()
{
    {
        if (_clientInstance !== null)
        {
            await _clientInstance.dispose();
            _clientInstance = null;
        }
    }
}

/**
 * 
 * @param {object} [options] The options use to create the client
 * @returns {RemoteEditorClient}
 */
function createRemoteEditorClient(options)
{
    {
        const config = getConfiguration();

        if (!config.uri)
            return undefined;

        const connectionOptions = options || {
            ...config,
            uri: new URL(config.uri),
            userName: config.userName,
            password: config.password
        };

        if (!connectionOptions.userName
            || !connectionOptions.password)
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
            client.connect(connectionOptions);

        return client;
    }
}

module.exports = {
    RemoteEditorClient,
    getRemoteEditorClient,
    createRemoteEditorClient,
    closeRemoteEditorClient
}