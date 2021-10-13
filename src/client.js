const getCommandProtocol = require("./protocols");
const { Directory, File } = require("./file-system");
const { Uri, FileType } = require("vscode");

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
	 * Creates a {@link File} or {@link Directory} for the file information provided
	 * 
	 * @param {FileInfo} fileInfo The object containing the file information
	 * @returns {File | Directory}
	 */
	#createFileEntry(fileInfo)
	{
		const fileMeta = { ...fileInfo };
		fileMeta.uri = Uri.parse(`${this.scheme}:${fileMeta.path}`);

		if (fileMeta.type === FileType.Directory)
			return new Directory(fileMeta);
		else
			return new File(fileMeta);
	}

	/**
	 * Reads the content of a directory
	 *
	 * @param {string} path The path to get the directory listing for
	 * @returns {Promise}
	 */
	async readDirectory(path)
	{
		const listing = await this.#protocol.ls(path);
		const directory = new Directory({ name: path });
		const { entries } = directory;

		listing.forEach((meta) => 
		{
			const fileEntry = this.#createFileEntry(meta);
			entries.set(fileEntry.name, fileEntry);
		});

		return directory;
	}
	
	/** 
	 * Creates a new directory
	 */
	async createDirectory(path) {
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
	 * @returns {Buffer} The file content
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
		this.#protocol.post(path, content, options);
	}

	/**
	 * Deletes a file
	 * 
	 * @param {string} path The path of the file to delete
	 * @param {object} options Options used for deleting the file
	 */
	async deleteFile(path, options)
	{
		this.#protocol.rm(path, options);
	}

	/**
	 * Deletes a directory
	 * 
	 * @param {string} path The path of the directory to delete
	 * @param {object} options Options used for deleting the directory
	 */
	 async deleteDirectory(path, options)
	{
		this.#protocol.rmdir(path, options);
	}

	/**
	 * Copies a file from one location to another location
	 * 
	 * @param {string} oldPath The path of the source file
	 * @param {string} newPath The path of the target file
	 * @param {object} options Options used for copying the file
	 */
	 async copy(oldPath, newPath, options) {
		this.#protocol.cp(oldPath, newPath, options);
	}
}

module.exports = RemoteEditorClient;