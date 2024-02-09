const { getFileSystem } = require("../file-system");

const fileSystem = getFileSystem();

module.exports = {
    id: "findFiles",
    command: async (context, path, options) =>
    {
        return fileSystem.findFiles();
    }
}