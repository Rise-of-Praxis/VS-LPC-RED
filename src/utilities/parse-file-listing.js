const { Uri, FileType } = require('vscode');
const { basename } = require('path');
const parseDate = require('./parse-date');

// File info is structued with the following values, delimited by tabs
// full name
// size
// date-time
// access (r,w,-)
// locked by
// locked timestamp
const fileInfoPattern = /^([^\t]+)\t(-?\d+)\t([^\t]+)\t([rw-]+)\t([^\t]*)\t([^\t]*)/i;

/**
 * 
 * @param {string} fileInfo The file information string to parse 
 * @returns {FileInfo}
 */
module.exports = (fileInfo) =>
{
	const matches = fileInfoPattern.exec(fileInfo);
	if (!matches)
		return undefined;

	const fullName = matches[1];
	const path = fullName;
	const name = basename(fullName);
	const size = parseInt(matches[2]);
	const type = size == -2 ? FileType.Directory : FileType.File;
	const fileDate = parseDate(matches[3]);
	const access = matches[4];
	const lockedBy = matches[5];
	const lockedDate = parseDate(matches[6]);

	return {
		name,
		path,
		type,
		uri: null,
		size: type === FileType.Directory ? 0 : size,
		date: fileDate,
		access,
		lockedBy,
		lockedDate
	};
}