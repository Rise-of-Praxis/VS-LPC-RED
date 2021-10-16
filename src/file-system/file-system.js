const { EventEmitter, Uri, FileSystemError, Disposable, FileType, workspace, ConfigurationTarget, window } = require('vscode');
const Directory = require('./directory');
const File = require('./file');
const createRemoteEditorClient = require('../client');

class RemoteEditorFileSystem
{
	/** @type {RemoteEditorClient} */
	#client;


	/**
	 * Creates a {@link File} or {@link Directory} for the file information provided
	 * 
	 * @param {FileInfo} fileInfo The object containing the file information
	 * @returns {File | Directory}
	 */
	#createFileEntry(fileInfo)
	{
		const fileMeta = { ...fileInfo };
		fileMeta.uri = this.client.getFileUri(fileInfo.path);

		if (fileMeta.type === FileType.Directory)
			return new Directory(fileMeta);
		else
			return new File(fileMeta);
	}

	#createDirectoryEntry(path, listing) {
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
	 * The scheme to use in {@link Uri} for links
	 */
	get scheme()
	{
		return this.client.scheme;
	}

	get client()
	{
		if (!this.#client)
			this.#client = createRemoteEditorClient();

		return this.#client
	}

	/**
	 * Checks that a uri contains a valid path.  If not, throw an error
	 * @param {Uri} uri 
	 */
	#validateUri(uri)
	{
		const { path } = uri;

		if (path.indexOf(" ") !== -1)
			throw new Error("Filenames can not contain spaces.");
	}

	/**
	 * @type {EventEmitter}
	 */
	onFileChangeEmitter = new EventEmitter();

	onDidChangeFile = this.onFileChangeEmitter.event;
	watch(uri, options)
	{
		return new Disposable(() => { });
	}

	/**
	 * Gets information about about a single file
	 *  
	 * @param {Uri} uri The path of the file to return
	 */
	async stat(uri)
	{
		return this.client.getFileInfo(uri.path);
	}

	/**
	 * Gets the contents of a directory
	 *  
	 * @param {Uri} uri The path of the directory to return
	 * @async
	 * @returns {Promise<[string, FileType][]>}
	 */
	async readDirectory(uri)
	{
		const results = await this.client.readDirectory(uri.path);
		if (!results)
			throw FileSystemError.FileNotFound(uri);

		const directory = this.#createDirectoryEntry(uri.path, results);

		/** @type {[string, FileType][]} */
		const entries = [];
		for (const [name, entry] of directory.entries)
			entries.push([name, entry.type]);

		return entries;
	}

	async createDirectory(uri)
	{
		this.#validateUri(uri);
		return await this.client.createDirectory(uri.path);
	}

	/**
	 * Gets the contents of a file
	 *  
	 * @param {Uri} uri The path of the file to return
	 * @async
	 * @returns {Promise<Uint8Array>}
	 */
	async readFile(uri)
	{
		const data = await this.client.readFile(uri.path);
		if (!data)
			throw FileSystemError.FileNotFound(uri);

		return Uint8Array.from(data);
	}

	/**
	 * Writes a file
	 *
	 * @param {Uri} uri The path of the file to write to 
	 * @param {Buffer} content The contents to write
	 * @param {object} options Additional settings when writing the file
	 */
	async writeFile(uri, content, options)
	{
		this.#validateUri(uri);
		this.client.writeFile(uri.path, content, options);
	}

	/**
	 * Deletes a file
	 * 
	 * @param {Uri} uri The path of the file to delete
	 * @param {object} options Additional settings when deleting the file
	 * @returns 
	 */
	async delete(uri, options)
	{
		const fileInfo = await this.stat(uri);
		if (fileInfo.type === FileType.File)
			return this.client.deleteFile(uri.path, options);
		else
			return this.client.deleteDirectory(uri.path, options);
	}

	async rename(oldUri, newUri, options)
	{
		this.#validateUri(newUri);

		if (!await this.client.copy(oldUri.path, newUri.path, options))
			throw new FileSystemError(`Failed to copy ${oldUri.path} to ${newUri.path}`);

		if (!await this.client.deleteFile(oldUri.path))
		{
			await this.client.deleteDirectory(newUri.path);
			throw new FileSystemError(`Failed to remove ${oldUri.path} during the rename.`);
		}
	}
}

module.exports = RemoteEditorFileSystem;