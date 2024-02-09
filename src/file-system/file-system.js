const { EventEmitter, Uri, FileSystemError, Disposable, FileType, FileChangeType } = require('vscode');
const { TimeoutError } = require('../clients/ClientErrors');
const { RemoteEditorClient } = require('../clients/RemoteEditorClient');

const watchTimeoutMS = 2500;

class RemoteEditorFileSystem
{
	constructor(client)
	{
		this.#client = client;
		this.#watchForClientConnection();
	}

	/** @type {RemoteEditorClient} */
	#client;

	/** @type {Promise} */
	#clientAvailablePromise;

	/** @type {Function} */
	#onClientConnectedHandler;

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

	#watchForClientConnection()
	{
		this.#clientAvailablePromise = new Promise((resolve, reject) =>
		{
			const waitTimeout = setTimeout(() => {
				reject(new TimeoutError("Waiting for client to connect has timed out."));
			}, 10000);

			this.#client.once('connected', (obj) =>
			{
				clearTimeout(waitTimeout);
				return resolve();
			});

			this.#client.once('disconnected', () =>
			{
				clearTimeout(waitTimeout);
				this.#watchForClientConnection();
			});
		});
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
	 * Waits for the client to be available for use.
	 * @returns {Promise}
	 */
	#waitForAvailableClient()
	{
		return this.#clientAvailablePromise;
	}

	/**
	 * Gets information about about a single file
	 *  
	 * @param {Uri} uri The path of the file to return
	 * @returns {Promise<import('../types').FileInfo>}
	 */
	async stat(uri)
	{
		await this.#waitForAvailableClient();
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
		await this.#waitForAvailableClient();
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
		await this.#waitForAvailableClient();
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
		await this.#waitForAvailableClient();
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
		await this.#waitForAvailableClient();
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
		await this.#waitForAvailableClient();

		const fileInfo = await this.stat(uri);
		if (fileInfo.type === FileType.File)
			return this.client.deleteFile(uri.path, options);
		else
			return this.client.deleteDirectory(uri.path, options);
    }
    
    /**
     * Renames a file/directory
     * 
	 * @param {Uri} oldUri The path of the source file/directory
	 * @param {Uri} newUri The path of the target file/directory
	 * @param {object} options Options used for copying the file/directory
     */

	async rename(oldUri, newUri, options)
	{
		this.#validateUri(newUri);
		await this.#waitForAvailableClient();

		if (!await this.client.rename(oldUri.path, newUri.path, options))
			throw new FileSystemError(`Failed to rename ${oldUri.path} to ${newUri.path}`);
	}
}

module.exports = RemoteEditorFileSystem;