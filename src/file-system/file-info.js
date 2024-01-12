const { FilePermission, FileType, Uri } = require("vscode");

/**
 * Information about a file system entry
 * @extends {import("vscode").FileStat}
 */
class FileInfo
{
    /**
     * The name of the file
     * @type {string}
     */
    name;

    /**
     * The Uri used to access the file
     * @type { Uri }
     */
    uri;

    /**
     * The file type
     * @type {FileType}
     */
    type;

    /**
     * The full path of the file
     * @type {string}
     */
    path

    /**
     * The size of the file.
     * @type {number}
     */
    size

    /**
     * The last modified date of the file
     * @type {number}
     */
    ctime;

    /**
     * The file creation date
     * @type {number}
     */
    mtime;

    /**
     * The access level of the record
     * @type {string} 
     */
    access

    /**
     * The file permissions
     * @type {FilePermission}
     */
    permissions;
}

module.exports = { FileInfo };