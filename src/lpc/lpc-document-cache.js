const { LPCDocument } = require("./lpc-document");

/**
 * A cache of already parsed documents
 */
const _documentsCache = new Map();

/**
 * Returns a parsed LPC file
 * @param {TextDocument} document The document to return the parsed LPC document for
 * @returns {LPCDocument}
 */
function getParsedLpcDocument(document)
{

    const path = document.uri.path;
    if (!_documentsCache.has(path))
    {
        const text = document.getText();
        const uri = document.uri;

        try
        {
            const lpcDocument = new LPCDocument(text, uri);
            _documentsCache.set(path, lpcDocument);
        } catch (ex)
        {
            console.log(`Error getting parsed LPC document: ${ex}`);
            return undefined;
        }
    }

    return _documentsCache.get(path);
}

/**
 * Called when a document changes
 * @param {TextDocument} document The document that changed
 */
function onDocumentChanged(document)
{
    const path = document.uri.path;
    _documentsCache.delete(path);
}

/**
 * Called when a document is closed
 * @param {TextDocument} document The document that was closed
 */
function onDocumentClosed(document)
{
    const path = document.uri.path;
    _documentsCache.delete(path);
}

module.exports = {
    getParsedLpcDocument,
    onDocumentChanged,
    onDocumentClosed
};
