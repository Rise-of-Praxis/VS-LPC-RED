const { CodeActionKind, CodeAction, WorkspaceEdit, commands, workspace, Diagnostic, TextEdit, Range } = require("vscode");
const { LPCParser } = require('../LPCParser');
const { LPCDiagnosticKind } = require("../lpc-file");
const { getLpcFile } = require("../lpc-file-cache");
const { actionsIdPrefix, fixAllCommandIdSuffix } = require("../../constants");

const ruleScopes = [
    LPCParser.RULE_variableModifier,
    LPCParser.RULE_functionDeclaration
];

const actionId = `${actionsIdPrefix}.fixDeprecatedStaticKeyword`;
const fixAllCommandId = `${actionId}.${fixAllCommandIdSuffix}`;


const fixTitle = 'Replace \'static\' keyword';

const providedCodeActionKinds = [
    CodeActionKind.QuickFix
];

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

    if (parentCtx.ruleIndex === LPCParser.RULE_variableModifier)
    {
        edits.push(TextEdit.replace(lpcFile.getContextRange(context), `nosave`));
    }
    else
    {
        // If there is already a scope on this function, then just remove static
        if (parentCtx.functionModifier().children.length > 1)
        {
            let range = lpcFile.getContextRange(context);
            range = new Range(range.start, range.end.translate(0, 1)); 
            edits.push(TextEdit.delete(range));
        }
        else
            edits.push(TextEdit.replace(lpcFile.getContextRange(context), `protected`));
    }

    return edits;
}


function hasDeprecatedStaticKeywordDiagnostics(diagnostics, range)
{
    return diagnostics
        .some((diagnostic) =>
        {
            return diagnostic.code === LPCDiagnosticKind.DeprecatedStaticKeyword
                && (!range || diagnostic.range.contains(range));
        });
}

function getDeprecatedStaticKeywordDiagnostics(diagnostics, range)
{
    return diagnostics
        .filter((diagnostic) =>
        {
            return diagnostic.code === LPCDiagnosticKind.DeprecatedStaticKeyword
                && (!range || diagnostic.range.contains(range));
        });
}

/**
 * Provides code actions to update an 'static' keyword with the proper code structure
 * @param {TextDocument} document The document to generate the code actions for
 * @param {Range | Selection} range The range within the document to generate the code actions for
 * @param {CodeActionContext} context The context of the code action
 * @param {CancellationToken} token The cancellation token 
 * @returns {CodeAction[]}
 */
function provideCodeActions(document, range, context, cancellationToken)
{
    const lpcFile = getLpcFile(document);

    if (!hasDeprecatedStaticKeywordDiagnostics(lpcFile.diagnostics, range))
        return [];

    const diagnostics = getDeprecatedStaticKeywordDiagnostics(lpcFile.diagnostics, range);

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
 * Returns the edits to fix all the 'static' keyword issues
 * @param {LPCFile} lpcFile The file containing the issues
 * @returns {TextEdit[]}
 */
function getAllFixes(lpcFile)
{
    const diagnostics = getDeprecatedStaticKeywordDiagnostics(lpcFile.diagnostics);
    const edits = [];
    for (const diagnostic of diagnostics)
    {
        const fix = createFixEdits(lpcFile, diagnostic);
        edits.push(...fix);
    }

    return edits;
}

/**
 * Command that fixes all deprecated static keywords issues
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
    getDeprecatedStaticKeywordDiagnostics,
    hasDeprecatedStaticKeywordDiagnostics,
    providedCodeActionKinds,
    provideCodeActions,
    registerCommands
}