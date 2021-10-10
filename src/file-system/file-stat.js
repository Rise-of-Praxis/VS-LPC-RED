const { FileType, Uri } = require("vscode");

class FileStat
{
	/**
	 * 
	 * @param {FileStatSettings} meta The file information to initialize the data 
	 * 
	 */
	constructor({ type, uri, date, size, name, access })
	{
		this.uri = uri;
		this.#type = type;
		this.#fileDate = date;
		this.size = size;
		this.name = name;

		this.canRead = access && typeof (access) === "string" && access[0] == 'r';
		this.canWrite = access && typeof (access) === "string" && access[1] == 'w';
	}

	/**
	 * The type of file
	 * @type {FileType}
	 */
	get type() { return this.#type; };
	#type = FileType.Unknown;

	/**
	 * The creation date/time, always 0 for Remote Editor
	 * 
	 * @type {number}
	 */
	get ctime() { return 0 };

	/**
	 * The modified date/time
	 * 
	 * @type {number}
	 */
	get mtime() { return this.#fileDate.getTime() }

	/**
	 * The file modified time
	 * @type {Date}
	 */
	#fileDate = new Date(0);

	/**
	 * The size of the file.
	 * @type {number}
	 */
	size = 0;

	/**
	 * The name of the file
	 * 
	 * @type {string}
	 */
	name = "";

	/**
	 * Indicates if the file can be read
	 * 
	 * @type {boolean}
	 */
	canRead = false;

	/**
	 * Indicates if the file can be written to
	 * 
	 * @type {boolean}
	 */
	canWrite = false;

	/**
	 * The uri used to access the file
	 * @type {Uri}
	 */
	uri;
}

module.exports = FileStat;