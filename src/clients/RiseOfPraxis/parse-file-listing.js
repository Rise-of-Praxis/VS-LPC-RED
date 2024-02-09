const { FileType, FilePermission } = require('vscode');
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
 * @returns {import('../../types').FileInfo} Information about the file
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

	const readFlag = access[0] === '-' ? 0 : 1;
	const writeFlag = access[1] === '-' ? 0 : 2;
	const permissions = (readFlag && !writeFlag) ? FilePermission.Readonly : 0;

	return {
		ctime: null,
		mtime: fileDate.getTime(),
		type,
		size: type === FileType.Directory ? 0 : size,
		permissions,
		name,
		path,
		access,
		lockedBy,
		lockedDate
	};
}