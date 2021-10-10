const FileStat = require('./file-stat');

class File extends FileStat
{
	constructor(meta)
	{
		const fileStat = {
			...meta,
			type: 1
		}
		super(fileStat);

		this.data = meta.data;
	}

	/**
	 * The file data
	 * 
	 * @type {string}
	 */
	 data;

}

module.exports = File;