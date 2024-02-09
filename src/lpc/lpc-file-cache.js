const { LPCFile } = require("./lpc-file");

/**
 * A cache of already parsed files
 */
const _cache = new Map();

/**
 * Returns a parsed LPC file
 * @param {TextDocument} document The document to return the parsed LPC document for
 * @returns {LPCFile}
 */
function getLpcFile(document)
{
    const path = document.uri.path;
    if (!_cache.has(path))
    {
        const uri = document.uri;
        const text = document.getText();

        try
        {
            let lpcFile;
            if (uri.path.endsWith(".c")
                || uri.path.endsWith(".h"))
                lpcFile = new LPCFile({ uri, text });
            
            _cache.set(path, lpcFile);
        } catch (ex)
        {
            console.log(`Error getting parsed LPC document: ${ex}`);
            return undefined;
        }
    }

    return _cache.get(path);
}

/**
 * Called when a document changes
 * @param {TextDocument} document The document that changed
 */
function onDocumentChanged(document)
{
    const path = document.uri.path;
    _cache.delete(path);
}

/**
 * Called when a document is closed
 * @param {TextDocument} document The document that was closed
 */
function onDocumentClosed(document)
{
    const path = document.uri.path;
    _cache.delete(path);
}

module.exports = {
    getLpcFile,
    onDocumentChanged,
    onDocumentClosed
};
