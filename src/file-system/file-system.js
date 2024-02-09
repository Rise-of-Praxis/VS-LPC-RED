const { EventEmitter, Uri, FileSystemError, Disposable, FileType, FileChangeType } = require('vscode');
const { RemoteEditorClient } = require('../clients/RemoteEditorClient');

const watchTimeoutMS = 2500;

class RemoteEditorFileSystem
{
	constructor(client)
	{
		this.#client = client;
	}

	/** @type {RemoteEditorClient} */
	#client;

	/** @type {RemoteEditorClient} */
	get client() { return this.#client; }

	/*
	 * The timeout that checks the status of files that are being watched.
	 */
	#watchTimeout;

	/** 
	 * The files currently being warched
	 * @type {Map} 
	 */
	watchedFiles = new Map();

	/**
	 * The scheme to use in {@link Uri} for links
	 */
	get scheme()
	{
		return this.client.scheme;
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

	/**
	 * 
	 * @type {import('vscode').Event<import('vscode').FileChangeEvent[]>}
	 */
	get onDidChangeFile() { return this.onFileChangeEmitter.event; }

	/**
	 * 
	 * @param {*} uri 
	 * @param {*} options 
	 * @returns {Disposable}
	 */
	watch(uri, options)
	{
		let fileInfo = null;

		// See if the file exists
		this.stat(uri)
			.then((fileInfo) =>
			{
				this.watchedFiles.set(uri.path, fileInfo);
			})
			.catch((err) =>
			{
				if (err.code !== "FileNotFound")
					throw err;
				this.watchedFiles.set(uri.path, null);
			})
			.finally(() =>
			{
				// If we haven't started watching, start now
				if (!this.#watchTimeout)
					this.checkWatchedFiles();
			});

		return new Disposable(() =>
		{
			this.watchedFiles.delete(uri.path);
		});
	}

	checkWatchedFiles()
	{
		this.watchedFiles.forEach(async (lastInfo, path) =>
		{
			const uri = this.client.getFileUri(path);
			let currentInfo;
			try
			{
				currentInfo = await this.stat(uri);

				if (!lastInfo)
					// If we didn't have any information the last time, but now we do, it was created
					this.onFileChangeEmitter.fire({ type: FileChangeType.Created, uri });
				else if (currentInfo.mtime !== lastInfo.mtime)
					// The file changed
					this.onFileChangeEmitter.fire({ type: FileChangeType.Changed, uri });
			}
			catch (err)
			{
				if (err.code === "FileNotFound"
					&& lastInfo)
					// The file was deleted
					this.onFileChangeEmitter.fire({ type: FileChangeType.Deleted, uri });
			}

			// Update the current stat
			this.watchedFiles.set(path, currentInfo);
		});

		// If there are files to watch, then check in a bit
		if (this.watchedFiles.size)
			this.#watchTimeout = setTimeout(() => this.checkWatchedFiles(), watchTimeoutMS)
	}

	/**
	 * Gets information about about a single file
	 *  
	 * @param {Uri} uri The path of the file to return
	 * @returns {Promise<import('../types').FileInfo>}
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

		/** @type {[string, FileType][]} */
		const entries = [];
		for (const entry of results)
		{
			entries.push([entry.name, entry.type]);
		}

		return entries;
	}

	async createDirectory(uri)
	{
		this.#validateUri(uri);
		return this.client.createDirectory(uri.path);
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
		return this.client.writeFile(uri.path, content, options);
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