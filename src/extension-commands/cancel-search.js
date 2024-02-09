const { getSearchViewProvider } = require("../search/mud-search-view-provider")

module.exports =
{
    id: "cancelSearch",   
    command: async (context) =>
    {
        const searchViewProvider = getSearchViewProvider(context);
        searchViewProvider.cancel();
    }
}