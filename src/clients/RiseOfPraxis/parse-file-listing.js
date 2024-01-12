const { FileType, FilePermission } = require('vscode');
const { basename } = require('path');
const parseDate = require('./parse-date');
const { RiseOfPraxisFileInfo } = require('./file-info');

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
 * @param {string} data The file information string to parse 
 * @param {import("../RemoteEditorClient").RemoteEditorClient} [client] If provided, the client used to resolve the path into a Uri
 * @returns {RiseOfPraxisFileInfo} Information about the file
 */
module.exports = (data, client) =>
{
    const matches = fileInfoPattern.exec(data);
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

    const fileInfo = new RiseOfPraxisFileInfo();
    fileInfo.ctime = null;
    fileInfo.mtime = fileDate.getTime();
    fileInfo.type = type;
    fileInfo.size = type === FileType.Directory ? 0 : size;

    if(permissions !== 0)
        fileInfo.permissions = permissions;

    fileInfo.name = name;
    fileInfo.path = path;
    if(client)
        fileInfo.uri = client.getFileUri(path);
    fileInfo.lockedBy = lockedBy;
    fileInfo.lockedDate = lockedDate;

    return fileInfo;
}