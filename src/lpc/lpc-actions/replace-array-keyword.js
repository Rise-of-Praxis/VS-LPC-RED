const { CodeActionKind, CodeAction, WorkspaceEdit, commands, workspace, Diagnostic, TextEdit } = require("vscode");
const { LPCParser } = require('../LPCParser');
const { LPCDiagnosticKind, LPCFile } = require("../lpc-file");
const { getLpcFile } = require("../lpc-file-cache");
const { actionsIdPrefix, fixAllCommandIdSuffix } = require("../../constants");

const ruleScopes = [
    LPCParser.RULE_variableDeclaration,
    LPCParser.RULE_functionDeclaration,
    LPCParser.RULE_parameterDefinition
];

const actionId = `${actionsIdPrefix}.fixDeprecatedArrayKeyword`;
const fixAllCommandId = `${actionId}.${fixAllCommandIdSuffix}`;

const providedCodeActionKinds = [
    CodeActionKind.QuickFix
];

const fixTitle = 'Replace \'array\' keyword';

/**
 * Creates the collection of edits that will fix the issues
 * @returns {TextEdit[]}
 */
function createFixEdits(lpcFile, diagnostic) 
{
    const context = diagnostic.context;
    const edits = [];

    let parentCtx = context;
    while (parentCtx
        && ruleScopes.indexOf(parentCtx.ruleIndex) === -1)
    {
        parentCtx = parentCtx.parentCtx;
    }

    if (parentCtx.ruleIndex === LPCParser.RULE_variableDeclaration)
    {
        const variableList = parentCtx.variableList();

        if (variableList)
        {
            const variables = variableList.variable();
            for (const variable of variables)
            {
                edits.push(TextEdit.replace(lpcFile.getContextRange(variable), `*${variable.getText()}`));
            }
        }

        // See if the `array` keyword is removed or replaced with `mixed`
        const dataType = parentCtx.dataType();
        if (dataType.getText() === 'array')
            edits.push(TextEdit.replace(lpcFile.getContextRange(dataType), `mixed`));
        else
            edits.push(TextEdit.delete(lpcFile.getContextRange(context)));
    }
    else if (parentCtx.ruleIndex === LPCParser.RULE_parameterDefinition)
    {
        // See if the `array` keyword is replaced with just '*' or `mixed *`
        const dataType = parentCtx.dataType();
        if (dataType.getText() === 'array')
            edits.push(TextEdit.replace(lpcFile.getContextRange(dataType), `mixed *`));
        else
            edits.push(TextEdit.replace(lpcFile.getContextRange(context), `*`));
    }
    else
    {
        // See if the `array` keyword is removed or replaced with `mixed *`
        const returnType = parentCtx.functionReturnType();
        if (returnType.getText() === 'array')
            edits.push(TextEdit.replace(lpcFile.getContextRange(returnType), `mixed *`));
        else
            edits.push(TextEdit.replace(lpcFile.getContextRange(returnType), `${returnType.dataType().getText()} *`));
    }

    return edits;
}

function hasDeprecatedArrayKeywordDiagnostics(diagnostics, range)
{
    return diagnostics
        .some((diagnostic) =>
        {
            return diagnostic.code === LPCDiagnosticKind.DeprecatedArrayKeyword
                && (!range || diagnostic.range.contains(range));
        });
}

function getDeprecatedArrayKeywordDiagnostics(diagnostics, range)
{
    return diagnostics
        .filter((diagnostic) =>
        {
            return diagnostic.code === LPCDiagnosticKind.DeprecatedArrayKeyword
                && (!range || diagnostic.range.contains(range));
        });
}

/**
 * Provides code actions to update an 'array' keyword with the proper code structure
 * @param {TextDocument} document The document to generate the code actions for
 * @param {Range | Selection} range The range within the document to generate the code actions for
 * @param {CodeActionContext} context The context of the code action
 * @param {CancellationToken} token The cancellation token 
 * @returns {CodeAction[]}
 */
function provideCodeActions(document, range, context, cancellationToken)
{
    const lpcFile = getLpcFile(document);
    if (!hasDeprecatedArrayKeywordDiagnostics(lpcFile.diagnostics, range))
        return [];

    const diagnostics = getDeprecatedArrayKeywordDiagnostics(lpcFile.diagnostics, range);

    const actions = diagnostics.map((diagnostic) =>
    {
        const fix = new CodeAction(fixTitle, CodeActionKind.QuickFix);
        fix.diagnostics = [diagnostic];

        fix.edit = new WorkspaceEdit();
        fix.edit.set(document.uri, createFixEdits(lpcFile, diagnostic));
        fix.isPreferred = true;
        return fix;
    });

    if (actions.length)
    {
        const fixAll = new CodeAction(`Fix all: ${fixTitle}`, CodeActionKind.Empty);
        fixAll.isPreferred = true;
        fixAll.command =
        {
            "command": fixAllCommandId, title: fixAll.title, arguments: [document]
        };
        actions.push(fixAll);
    }

    return actions;
}

/**
 * Returns the edits to fix all the 'array' keyword issues
 * @param {LPCFile} lpcFile The file containing the issues
 * @returns {TextEdit[]}
 */
function getAllFixes(lpcFile)
{
    const diagnostics = getDeprecatedArrayKeywordDiagnostics(lpcFile.diagnostics);
    const edits = [];
    for (const diagnostic of diagnostics)
    {
        const fix = createFixEdits(lpcFile, diagnostic);
        edits.push(...fix);
    }

    return edits;
}

/**
 * Command that fixes all Deprecated Array keywords issues
 * @param {TextDocument} document The document that LPC File
 */
async function fixAll(document)
{
    const lpcFile = getLpcFile(document);
    const edits = getAllFixes(lpcFile);

    const workspaceEdit = new WorkspaceEdit();
    workspaceEdit.set(document.uri, edits);
    
    await workspace.applyEdit(workspaceEdit);
}

function registerCommands(context, ...args)
{
    const command = commands.registerCommand(fixAllCommandId, fixAll);
    context.subscriptions.push(command);
}

module.exports = {
    actionId,
    getAllFixes,
    getDeprecatedArrayKeywordDiagnostics,
    hasDeprecatedArrayKeywordDiagnostics,
    providedCodeActionKinds,
    provideCodeActions,
    registerCommands
}