const { CodeActionKind, CodeAction, WorkspaceEdit, commands, workspace, window } = require("vscode");
const { getLpcFile } = require("../lpc-file-cache");
const { hasDeprecatedArrayKeywordDiagnostics, getAllFixes: arrayGetAllFixes } = require("./replace-array-keyword");
const { hasDeprecatedStaticKeywordDiagnostics, getAllFixes: staticGetAllFixes } = require("./replace-static-keyword");
const { actionsIdPrefix, fixAllCommandIdSuffix } = require("../../constants");

const actionId = `${actionsIdPrefix}.${fixAllCommandIdSuffix}`;

const providedCodeActionKinds = [
    CodeActionKind.QuickFix
];

const fixTitle = 'Fix all issues';

/**
 * Provides code actions to update an 'array' keyword with the proper code structure
 * @param {TextDocument} document The document to generate the code actions for
 * @param {Range | Selection} range The range within the document to generate the code actions for
 * @param {CodeActionContext} context The context of the code action
 * @param {CancellationToken} cancellationToken The cancellation token 
 * @returns {CodeAction[]}
 */
function provideCodeActions(document, range, context, cancellationToken)
{   
    const lpcFile = getLpcFile(document);

    if (!hasDeprecatedArrayKeywordDiagnostics(lpcFile.diagnostics)
        && !hasDeprecatedStaticKeywordDiagnostics(lpcFile.diagnostics))
        return [];

    const actions = [];

    const fixAll = new CodeAction(fixTitle, CodeActionKind.Empty);
    fixAll.isPreferred = true;
    fixAll.command =
    {
        "command": actionId, title: fixAll.title, arguments: [document]
    };
    actions.push(fixAll);

    return actions;
}

/**
 * Command that fixes all quick-fix issues
 * @param {TextDocument} arg The document to fix the issues in
 */
async function fixAll(arg)
{
    let document = arg;

    if (!document)
        return;

    const lpcFile = getLpcFile(document);
    const edits = [];

    edits.push(...arrayGetAllFixes(lpcFile))
    edits.push(...staticGetAllFixes(lpcFile))

    const workspaceEdit = new WorkspaceEdit();
    workspaceEdit.set(document.uri, edits);
    
    await workspace.applyEdit(workspaceEdit);
}

function registerCommands(context, ...args)
{
    const command = commands.registerCommand(actionId, fixAll);
    context.subscriptions.push(command);
}

module.exports = {
    actionId,
    providedCodeActionKinds,
    provideCodeActions,
    registerCommands
}