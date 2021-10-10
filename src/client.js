const getCommandProtocol = require("./protocols");
const { Directory, File } = require("./file-system");
const { Uri, FileType } = require("vscode");

class RemoteEditorClient
{
	constructor(options)
	{
		this.#protocol = getCommandProtocol('rise-of-praxis', options);
	}

	get scheme() { return 'lpc-remote-ed' }

	/**
	 * The remote editor command protocol this client is using
	 */
	#protocol;

	/**
	 * Generates a Uri that can be used to access a path
	 * @param {string} path The path to access
	 * @returns {Uri}
	 */
	getFileUri(path) { return Uri.parse(`${this.scheme}:${path}`); }

	/**
	 * Creates a {@link File} or {@link Directory} for the file information provided
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
		return await this.#protocol.who();
	}

	/**
	 * 
	 * @param {string} path The path to get the file information
	 * @returns {Promise<FileInfo>}
	 */
	async getFileInfo(path)
	{
		const response = await this.#protocol.info(path);

		return response;
	}

	async readFile(path)
	{
		return await this.#protocol.get(path);
	}

	async writeFile(path, content, options)
	{
		const response = await this.#protocol.post(path, content, options);

		return response;
	}

	async deleteFile(path, options)
	{
		return this.#protocol.rm(path, options);
	}

	async deleteDirectory(path, options)
	{
		return this.#protocol.rmdir(path, options);
	}
}

module.exports = RemoteEditorClient;