const { getSearchViewProvider } = require("../search/mud-search-view-provider")

module.exports =
{
    id: "clearSearch",   
    command: async (context) =>
    {
        const searchViewProvider = getSearchViewProvider(context);
        searchViewProvider.clear();
    }
}