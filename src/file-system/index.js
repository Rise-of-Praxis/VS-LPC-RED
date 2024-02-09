const { RemoteEditorFileSystem, enableAutoSave, SearchOptions } = require('./file-system');
const { SearchResultMatch } = require("./search-results-match");
const { FileInfo } = require("./file-info");
const { getRemoteEditorClient } = require('../clients');
const { getConfiguration } = require('../utilities/configuration');

/**
 * @type {RemoteEditorFileSystem}
 */
let _fileSystemInstance = null;

/**
 * Gets the instance of a file system
 * @returns {RemoteEditorFileSystem}
 */
function getFileSystem()
{
    if (!_fileSystemInstance)
    {
        const client = getRemoteEditorClient();
        const config = {
            ...getConfiguration()
        }
        _fileSystemInstance = new RemoteEditorFileSystem(client, config.fileSystem);
    }
    
    return _fileSystemInstance;
}

module.exports = {
    getFileSystem,
    enableAutoSave,
    SearchOptions,
    FileInfo,
    SearchResultMatch
};