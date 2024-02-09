const { Location, Uri } = require("vscode");

class SearchResultMatch
{
    /**
     * @param {object} [initDictionary] The initial set of values for the search options
     */
    constructor(initDictionary)
    {
        if (initDictionary)
            Object.assign(this, initDictionary);
    }

    /**
     * The file that the match occurred in
     * @type {Uri}
     */
    uri;

    /**
     * The location that matched the search
     * @type {Location}
     */
    location;

    /**
     * The text that was matched
     * @type {string}
     */
    text = "";

    /**
     * The lines that contain the matched the search
     * @type {string}
     */
    lines = "";
}

module.exports =
{
    SearchResultMatch
}