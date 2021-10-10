const RemoteEditorRequest = require('./request');
const { parseFileListing } = require('../../utilities');

const directoryListingPattern = /^([^\t]+)\t(-?\d+)\t(\d{4}\.\d{2}\.\d{2})-(\d{2}\.\d{2})\t([rw]+)/i;

module.exports = async (connectionOptions, path) =>
{
	const request = new RemoteEditorRequest(connectionOptions);
	const response = await request.send(`ls ${path}\n`);

	const entries = [];
	const listing = response.data.split('\n');

	for (const entry of listing)
	{
		const fileInfo = parseFileListing(entry);
		if(!fileInfo)
			continue;

		entries.push(fileInfo);
	}

	return entries;
}