const { workspace, commands } = require("vscode");

/**
 * 
 * @param {ExtensionContext} context 
 */
module.exports =
{
    id: "addMyRealms",
    
    command: async(context, realmUri, myRealmTitle) =>
    {
        const workspaceFolders = workspace.workspaceFolders || [];
        const realmFolder = workspaceFolders.find((folder) => { folder.uri.path === realmUri.path });

        if (realmFolder
            && realmFolder.uri.path === realmUri.path
            && realmFolder.name === myRealmTitle)
            return;

        let insertIndex = 0;
        if (realmFolder)
            insertIndex = realmFolder.index;
        else
            insertIndex = workspace.workspaceFolders ? workspace.workspaceFolders.length : 0;

        commands.executeCommand('lpc-remote-editor.registerFileSystem', context);
        // Append or replace the folder
        workspace.updateWorkspaceFolders(insertIndex, realmFolder ? 1 : 0, { uri: realmUri, name: myRealmTitle });
    }
}