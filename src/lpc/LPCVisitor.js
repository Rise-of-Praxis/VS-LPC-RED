// Generated from src/lpc/LPC.g4 by ANTLR 4.7.2
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete generic visitor for a parse tree produced by LPCParser.

function LPCVisitor() {
	antlr4.tree.ParseTreeVisitor.call(this);
	return this;
}

LPCVisitor.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype);
LPCVisitor.prototype.constructor = LPCVisitor;

// Visit a parse tree produced by LPCParser#lpcProgram.
LPCVisitor.prototype.visitLpcProgram = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#programDeclarations.
LPCVisitor.prototype.visitProgramDeclarations = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#comment.
LPCVisitor.prototype.visitComment = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#programDeclaration.
LPCVisitor.prototype.visitProgramDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#preprocessorDirective.
LPCVisitor.prototype.visitPreprocessorDirective = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#includePreprocessor.
LPCVisitor.prototype.visitIncludePreprocessor = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#includeFileLiteral.
LPCVisitor.prototype.visitIncludeFileLiteral = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#definePreprocessor.
LPCVisitor.prototype.visitDefinePreprocessor = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#defineConstantStatement.
LPCVisitor.prototype.visitDefineConstantStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#defineMacroStatement.
LPCVisitor.prototype.visitDefineMacroStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#defineMacroParameterList.
LPCVisitor.prototype.visitDefineMacroParameterList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#variableDeclaration.
LPCVisitor.prototype.visitVariableDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#programVariableDeclaration.
LPCVisitor.prototype.visitProgramVariableDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#functionDeclaration.
LPCVisitor.prototype.visitFunctionDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#functionParameters.
LPCVisitor.prototype.visitFunctionParameters = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#parameterList.
LPCVisitor.prototype.visitParameterList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#parameterDefinition.
LPCVisitor.prototype.visitParameterDefinition = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#spreadParameterDefinition.
LPCVisitor.prototype.visitSpreadParameterDefinition = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#dataTypeList.
LPCVisitor.prototype.visitDataTypeList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#functionDefinition.
LPCVisitor.prototype.visitFunctionDefinition = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#accessLevelModifier.
LPCVisitor.prototype.visitAccessLevelModifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#functionTypeModifier.
LPCVisitor.prototype.visitFunctionTypeModifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#functionModifier.
LPCVisitor.prototype.visitFunctionModifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#classDefinition.
LPCVisitor.prototype.visitClassDefinition = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#classIdentifier.
LPCVisitor.prototype.visitClassIdentifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#classMembers.
LPCVisitor.prototype.visitClassMembers = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#classMemberInitializer.
LPCVisitor.prototype.visitClassMemberInitializer = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#variableModifier.
LPCVisitor.prototype.visitVariableModifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#variableList.
LPCVisitor.prototype.visitVariableList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#variable.
LPCVisitor.prototype.visitVariable = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#variableAssignmentExpression.
LPCVisitor.prototype.visitVariableAssignmentExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#array.
LPCVisitor.prototype.visitArray = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#comparisonOperator.
LPCVisitor.prototype.visitComparisonOperator = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#logicalOperator.
LPCVisitor.prototype.visitLogicalOperator = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#bitOperator.
LPCVisitor.prototype.visitBitOperator = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#arithmeticOperator.
LPCVisitor.prototype.visitArithmeticOperator = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#functionalDeclaration.
LPCVisitor.prototype.visitFunctionalDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#anonymousFunctionalDeclaration.
LPCVisitor.prototype.visitAnonymousFunctionalDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#functionalStart.
LPCVisitor.prototype.visitFunctionalStart = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#functionalEnd.
LPCVisitor.prototype.visitFunctionalEnd = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#functionalParameter.
LPCVisitor.prototype.visitFunctionalParameter = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#castOperation.
LPCVisitor.prototype.visitCastOperation = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#expression.
LPCVisitor.prototype.visitExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#ternaryExpression.
LPCVisitor.prototype.visitTernaryExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#stringConcatExpression.
LPCVisitor.prototype.visitStringConcatExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#memberIdentifier.
LPCVisitor.prototype.visitMemberIdentifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#incrementExpression.
LPCVisitor.prototype.visitIncrementExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#decrementExpression.
LPCVisitor.prototype.visitDecrementExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#catchExpression.
LPCVisitor.prototype.visitCatchExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#newExpression.
LPCVisitor.prototype.visitNewExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#newExpressionIdentifier.
LPCVisitor.prototype.visitNewExpressionIdentifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#operator.
LPCVisitor.prototype.visitOperator = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#assignmentOperator.
LPCVisitor.prototype.visitAssignmentOperator = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#notExpression.
LPCVisitor.prototype.visitNotExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#unaryOperator.
LPCVisitor.prototype.visitUnaryOperator = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#literal.
LPCVisitor.prototype.visitLiteral = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#mappingDeclaration.
LPCVisitor.prototype.visitMappingDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#mappingElementList.
LPCVisitor.prototype.visitMappingElementList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#mappingElement.
LPCVisitor.prototype.visitMappingElement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#mappingKey.
LPCVisitor.prototype.visitMappingKey = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#mappingValue.
LPCVisitor.prototype.visitMappingValue = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#arrayDeclaration.
LPCVisitor.prototype.visitArrayDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#arrayStart.
LPCVisitor.prototype.visitArrayStart = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#arrayEnd.
LPCVisitor.prototype.visitArrayEnd = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#indexOperator.
LPCVisitor.prototype.visitIndexOperator = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#range.
LPCVisitor.prototype.visitRange = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#index.
LPCVisitor.prototype.visitIndex = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#block.
LPCVisitor.prototype.visitBlock = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#statement.
LPCVisitor.prototype.visitStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#breakStatement.
LPCVisitor.prototype.visitBreakStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#continueStatement.
LPCVisitor.prototype.visitContinueStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#statementOrBlock.
LPCVisitor.prototype.visitStatementOrBlock = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#loopStatement.
LPCVisitor.prototype.visitLoopStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#whileControlStatement.
LPCVisitor.prototype.visitWhileControlStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#doLoopStatement.
LPCVisitor.prototype.visitDoLoopStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#whileLoopStatement.
LPCVisitor.prototype.visitWhileLoopStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#forControlStatement.
LPCVisitor.prototype.visitForControlStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#forLoopStatement.
LPCVisitor.prototype.visitForLoopStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#forInitialState.
LPCVisitor.prototype.visitForInitialState = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#forLoopVariable.
LPCVisitor.prototype.visitForLoopVariable = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#forCondition.
LPCVisitor.prototype.visitForCondition = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#forIncrementStep.
LPCVisitor.prototype.visitForIncrementStep = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#foreachLoopStatement.
LPCVisitor.prototype.visitForeachLoopStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#foreachControlStatement.
LPCVisitor.prototype.visitForeachControlStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#foreachVariableList.
LPCVisitor.prototype.visitForeachVariableList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#returnStatement.
LPCVisitor.prototype.visitReturnStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#functionCall.
LPCVisitor.prototype.visitFunctionCall = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#scopedFunctionCall.
LPCVisitor.prototype.visitScopedFunctionCall = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#argumentList.
LPCVisitor.prototype.visitArgumentList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#expressionList.
LPCVisitor.prototype.visitExpressionList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#functionName.
LPCVisitor.prototype.visitFunctionName = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#inheritanceDeclaration.
LPCVisitor.prototype.visitInheritanceDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#stringExpression.
LPCVisitor.prototype.visitStringExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#dataType.
LPCVisitor.prototype.visitDataType = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#functionReturnType.
LPCVisitor.prototype.visitFunctionReturnType = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#identifier.
LPCVisitor.prototype.visitIdentifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#conditionalStatement.
LPCVisitor.prototype.visitConditionalStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#conditionalExpression.
LPCVisitor.prototype.visitConditionalExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#elseStatement.
LPCVisitor.prototype.visitElseStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#switchStatement.
LPCVisitor.prototype.visitSwitchStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#caseLabel.
LPCVisitor.prototype.visitCaseLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#caseStatement.
LPCVisitor.prototype.visitCaseStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by LPCParser#defaultSwitchStatement.
LPCVisitor.prototype.visitDefaultSwitchStatement = function(ctx) {
  return this.visitChildren(ctx);
};



exports.LPCVisitor = LPCVisitor;