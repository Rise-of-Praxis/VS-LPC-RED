const EventEmitter = require("events");
const { Socket } = require("net");
const { Uri } = require("vscode");

/**
 * @typedef {object} RemoteEditorClientOptions
 * @property {import("vscode").OutputChannel} outputChannel The channel to output connection messages to
 */


/**
 * Interface of all Remote Editor clients
 */
class RemoteEditorClient extends EventEmitter
{
    /**
     * @param {RemoteEditorClientOptions} options
     */
	constructor(options)
	{
		super();
		this.#outputChannel = options.outputChannel;
	}

	pathSeparator = "/";

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
	getFileUri(path, baseUri)
	{
		if (baseUri)
			path = this.resolvePath(path, baseUri.path);

		return Uri.from({ scheme: this.scheme, path });
	}

	/**
	 * Resolves a path relative to another path
	 * @param {string} path The path to resolve
	 * @param {string} basePath The base path to resolve relative to
	 * @returns {string}
	 */
	resolvePath(path, basePath)
	{
		const parts = [];

		// basePath is only used if the path is not absolute (ie: starts with the path separator)
		if (!path.startsWith(this.pathSeparator))
		{
			parts.push(...basePath.split(this.pathSeparator));

			// If `path` does not end with the path separator, remove the last entry
			if (!basePath.endsWith(this.pathSeparator))
				parts.pop();
		}

		parts.push(...path.split(this.pathSeparator));

		// Resolve and self and parent path directives
		const resolvedParts = [];
		for (const part of parts)
		{
			if (part === ".")
				continue;

			if (part === "..")
				resolvedParts.pop();

			resolvedParts.push(part);
		}

		return resolvedParts.join(this.pathSeparator);
	}

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
	 * Simple check to see if a path exists.
	 * Note: The default implementation works on capturing FileNotFound errors from {@see getFileInfo}.  
	 * A more optimal approach should be implemented in the specific clients.
	 * 
	 * @param {string} path The path to check
	 * @returns {Promise<boolean>}
	 */
	async pathExists(path)
	{
		try
		{
			const info = this.getFileInfo(path);
		}
		catch (err)
		{
			return false;
		}
		
		return true;
	}

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

	/**
	 * Renames a file or directory from one location to another location
	 * 
	 * @param {string} oldPath The path of the source file/directory
	 * @param {string} newPath The path of the target file/directory
	 * @param {object} options Options used for copying the file/directory
	 * @returns {Promise}
	 * @async
	 */
	async rename(oldPath, newPath, options) { throw new Error("Not implemented"); }

	isReady() { return true; }

	/**
	 * Clean up resources used by the client
	 */
	dispose() { }
}

module.exports = {
	RemoteEditorClient
}