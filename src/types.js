const { Uri, FileType } = require('vscode');

/**
 * @typedef {object} FileInfo
 * @property {string} name The name of the file
 * @property {Uri} uri The Uri used to access the file
 * @property {FileType} type The file type
 * @property {string} path The full path of the file
 * @property {number} size The size of the file.
 * @property {Date} date The last modified date of the file
 * @property {string} access The access level of the record
 * @property {string} lockedBy Indicates who has the file currently locked
 * @property {Date} lockedDate The timestamp the file was locked
 */

module.exports = {}