const { FileInfo } = require("../../file-system/file-info");

/**
 * Rise of Praxis specific implementation of {@see FileInfo}
 */
class RiseOfPraxisFileInfo extends FileInfo
{
    /**
     * Indicates who has the file currently locked
     * @type {string}
     */
    lockedBy

    /**
     * The timestamp the file was locked
     * @type {Date}
     */
    lockedDate
}

module.exports = { RiseOfPraxisFileInfo  }