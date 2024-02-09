/**
 * Abstraction of the commands used in Remote Editor
 */
class RemoteEditorProtocol
{
	constructor(connectionOptions, commands)
	{
		this.#connectionOptions = connectionOptions;
		this.#commands = commands;
	}

	#connectionOptions;

	#commands;

	/**
	 * Returns a listing of a directory
	 * 
	 * @param {string} path The path to get the listing for
	 * @async
	 * @returns {Promise<FileInfo[]>}
	 */
	ls(path) { return this.#commands.ls(this.#connectionOptions, path); }

	/**
	 * Returns information about a file or directory
	 * @param {string} path The path to get the information for
	 * @returns {Promise<FileInfo>}
	 * @async
	 */
	info(path) { return this.#commands.info(this.#connectionOptions, path); }

	/**
	 * Reads a file
	 * @param {string} path The path of the file to read
	 * @returns {Promise<Buffer>}
	 * @async
	 */
	get(path) { return this.#commands.get(this.#connectionOptions, path); }

	/**
	 * Uploads a file
	 * @param {string} path The path of the file to upload to
	 * @param {Buffer} content The content to upload
	 * @returns {Promise<boolean>}
	 * @async
	 */
	 post(path, content, options) { return this.#commands.post(this.#connectionOptions, path, content, options); }

	rm(path, options) { return this.#commands.rm(this.#connectionOptions, path, options); }

	who() { return this.#commands.who(this.#connectionOptions) }

	mkdir(path, options) { return this.#commands.mkdir(this.#connectionOptions, path, options); }

	rmdir(path, options) { return this.#commands.rmdir(this.#connectionOptions, path, options); }

	cp(oldPath, newPath, options) { return this.#commands.cp(this.#connectionOptions, oldPath, newPath, options); }
}

module.exports = RemoteEditorProtocol;