const FileStat = require('./file-stat');

class Directory extends FileStat
{
	constructor(meta)
	{
		const fileStat = {
			...meta,
			type: 2
		}
		super(fileStat);

		this.entries = new Map();
	}

	/**
	 * The file data
	 * 
	 * @type {Map}
	 */
	entries;
}

module.exports = Directory;