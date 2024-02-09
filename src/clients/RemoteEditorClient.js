const EventEmitter = require("events");
const { Socket } = require("net");
const { Uri } = require("vscode");

/**
 * Interface of all Remote Editor clients
 */
class RemoteEditorClient extends EventEmitter
{
	constructor(options)
	{
		super();
		this.#outputChannel = options.outputChannel;
	}

	/**
	 * If defined, the channel used to output messages to
	 * 
	 * @type {import("vscode").OutputChannel}
	 */
	#outputChannel;

	/**
	 * The current connection representing the user's session to the mud
	 * 
	 * @type {Socket}
	 */
	#connection;
	get connection() { return this.#connection; }

	/**
	 * The scheme to use in {@link Uri} for links
	 */
	get scheme() { return 'lpc-remote-ed' }

	/**
	 * Writes a log message to the output channel and debug console.
	 * @param {string} message 
	 */
	log(message)
	{
		const logMessage = `[${new Date().toISOString()}] ${message}`;
		if (this.#outputChannel)
			this.#outputChannel.appendLine(logMessage);

		console.debug(logMessage);
	}

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
	 * @returns {Promise<import("../types").FileInfo[]>}
	 */
	async readDirectory(path) { throw new Error("Not implemented"); }

	/** 
	 * Creates a new directory
	 * @returns {Promise}
	 * @async
	 */
	async createDirectory(path) { throw new Error("Not implemented"); }

	/**
	 * Get's information about the connection this client will be using
	 * 
	 * @returns {Promise<object>}
	 */
	async who() { throw new Error("Not implemented"); }

	/**
	 * Gets information about a file or directory
	 * 
	 * @param {string} path The path to get the file information
	 * @returns {Promise<import("../types").FileInfo>}
	 */
	async getFileInfo(path) { throw new Error("Not implemented"); }

	/**
	 * Reads a file
	 * 
	 * @param {string} path The path of the file to read 
	 * @returns {Promise<Buffer>} The file content
	 */
	async readFile(path) { throw new Error("Not implemented"); }

	/**
	 * Writes a file
	 * 
	 * @param {string} path The path of the file to be written to
	 * @param {Buffer} content The file content to write
	 * @param {object} options Options used for writing the file
	 * @returns {Promise}
	 * @async
	 */
	async writeFile(path, content, options) { throw new Error("Not implemented"); }

	/**
	 * Deletes a file
	 * 
	 * @param {string} path The path of the file to delete
	 * @param {object} options Options used for deleting the file
	 * @returns {Promise}
	 * @async
	 */
	async deleteFile(path, options) { throw new Error("Not implemented"); }

	/**
	 * Deletes a directory
	 * 
	 * @param {string} path The path of the directory to delete
	 * @param {object} options Options used for deleting the directory
	 * @returns {Promise}
	 * @async
	 */
	async deleteDirectory(path, options) { throw new Error("Not implemented"); }

	/**
	 * Copies a file from one location to another location
	 * 
	 * @param {string} oldPath The path of the source file
	 * @param {string} newPath The path of the target file
	 * @param {object} options Options used for copying the file
	 * @returns {Promise}
	 * @async
	 */
	async copy(oldPath, newPath, options) { throw new Error("Not implemented"); }

	isReady() { return true; }

	/**
	 * Clean up resources used by the client
	 */
	dispose() { }
}

module.exports = {
	RemoteEditorClient
}