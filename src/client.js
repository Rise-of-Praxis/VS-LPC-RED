const { Uri, FileType, window } = require("vscode");
const { URL } = require("url");
const getCommandProtocol = require("./protocols");
const { getConfiguration } = require("./utilities/configuration");

class RemoteEditorClient
{
	constructor(options)
	{
		this.#protocol = getCommandProtocol('rise-of-praxis', options);
	}

	/**
	 * The scheme to use in {@link Uri} for links
	 */
	get scheme() { return 'lpc-remote-ed' }

	/**
	 * The remote editor command protocol this client is using
	 */
	#protocol;

	/**
	 * Generates a Uri that can be used to access a path
	 * 
	 * @param {string} path The path to access
	 * @returns {Uri}
	 */
	getFileUri(path) { return Uri.parse(`${this.scheme}:${path}`); }

	/**
	 * Reads the content of a directory
	 *
	 * @param {string} path The path to get the directory listing for
	 * @returns {Promise}
	 */
	async readDirectory(path)
	{
		return this.#protocol.ls(path);
	}

	/** 
	 * Creates a new directory
	 */
	async createDirectory(path)
	{
		return this.#protocol.mkdir(path);
	}

	/**
	 * Get's information about the connection this client will be using
	 * 
	 * @returns {Promise<object>}
	 */
	async who()
	{
		return this.#protocol.who();
	}

	/**
	 * Gets information about a file or directory
	 * 
	 * @param {string} path The path to get the file information
	 * @returns {Promise<FileInfo>}
	 */
	async getFileInfo(path)
	{
		const response = await this.#protocol.info(path);
		response.uri = this.getFileUri(path);

		return response;
	}

	/**
	 * Reads a file
	 * 
	 * @param {string} path The path of the file to read 
	 * @returns {Promise<Buffer>} The file content
	 */
	async readFile(path)
	{
		return this.#protocol.get(path);
	}

	/**
	 * Writes a file
	 * 
	 * @param {string} path The path of the file to be written to
	 * @param {Buffer} content The file content to write
	 * @param {object} options Options used for writing the file
	 */
	async writeFile(path, content, options)
	{
		return this.#protocol.post(path, content, options);
	}

	/**
	 * Deletes a file
	 * 
	 * @param {string} path The path of the file to delete
	 * @param {object} options Options used for deleting the file
	 */
	async deleteFile(path, options)
	{
		return this.#protocol.rm(path, options);
	}

	/**
	 * Deletes a directory
	 * 
	 * @param {string} path The path of the directory to delete
	 * @param {object} options Options used for deleting the directory
	 */
	async deleteDirectory(path, options)
	{
		return this.#protocol.rmdir(path, options);
	}

	/**
	 * Copies a file from one location to another location
	 * 
	 * @param {string} oldPath The path of the source file
	 * @param {string} newPath The path of the target file
	 * @param {object} options Options used for copying the file
	 */
	async copy(oldPath, newPath, options)
	{
		return this.#protocol.cp(oldPath, newPath, options);
	}
}

/**
 * Creates an instance of the Remote Editor Client based on supplied options or the current workspace configuration
 * @param {object} [options] The options to create a remote editor client with
 * @returns {RemoteEditorClient}
 */
module.exports = (options) =>
{
	const config = getConfiguration();

	const outputChannel = window.createOutputChannel('Remote Editor');

	const connectionOptions = options || {
		uri: new URL(config.uri),
		userName: config.userName,
		password: config.password,
		outputChannel: config.connectionDebugging ? outputChannel : undefined,
	};

	return new RemoteEditorClient(connectionOptions);
};