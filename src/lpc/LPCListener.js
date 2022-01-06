// Generated from src/lpc/LPC.g4 by ANTLR 4.7.2
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by LPCParser.
function LPCListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

LPCListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
LPCListener.prototype.constructor = LPCListener;

// Enter a parse tree produced by LPCParser#lpcProgram.
LPCListener.prototype.enterLpcProgram = function(ctx) {
};

// Exit a parse tree produced by LPCParser#lpcProgram.
LPCListener.prototype.exitLpcProgram = function(ctx) {
};


// Enter a parse tree produced by LPCParser#programDeclarations.
LPCListener.prototype.enterProgramDeclarations = function(ctx) {
};

// Exit a parse tree produced by LPCParser#programDeclarations.
LPCListener.prototype.exitProgramDeclarations = function(ctx) {
};


// Enter a parse tree produced by LPCParser#comment.
LPCListener.prototype.enterComment = function(ctx) {
};

// Exit a parse tree produced by LPCParser#comment.
LPCListener.prototype.exitComment = function(ctx) {
};


// Enter a parse tree produced by LPCParser#programDeclaration.
LPCListener.prototype.enterProgramDeclaration = function(ctx) {
};

// Exit a parse tree produced by LPCParser#programDeclaration.
LPCListener.prototype.exitProgramDeclaration = function(ctx) {
};


// Enter a parse tree produced by LPCParser#preprocessorDirective.
LPCListener.prototype.enterPreprocessorDirective = function(ctx) {
};

// Exit a parse tree produced by LPCParser#preprocessorDirective.
LPCListener.prototype.exitPreprocessorDirective = function(ctx) {
};


// Enter a parse tree produced by LPCParser#includePreprocessor.
LPCListener.prototype.enterIncludePreprocessor = function(ctx) {
};

// Exit a parse tree produced by LPCParser#includePreprocessor.
LPCListener.prototype.exitIncludePreprocessor = function(ctx) {
};


// Enter a parse tree produced by LPCParser#includeFileLiteral.
LPCListener.prototype.enterIncludeFileLiteral = function(ctx) {
};

// Exit a parse tree produced by LPCParser#includeFileLiteral.
LPCListener.prototype.exitIncludeFileLiteral = function(ctx) {
};


// Enter a parse tree produced by LPCParser#definePreprocessor.
LPCListener.prototype.enterDefinePreprocessor = function(ctx) {
};

// Exit a parse tree produced by LPCParser#definePreprocessor.
LPCListener.prototype.exitDefinePreprocessor = function(ctx) {
};


// Enter a parse tree produced by LPCParser#defineConstantStatement.
LPCListener.prototype.enterDefineConstantStatement = function(ctx) {
};

// Exit a parse tree produced by LPCParser#defineConstantStatement.
LPCListener.prototype.exitDefineConstantStatement = function(ctx) {
};


// Enter a parse tree produced by LPCParser#defineMacroStatement.
LPCListener.prototype.enterDefineMacroStatement = function(ctx) {
};

// Exit a parse tree produced by LPCParser#defineMacroStatement.
LPCListener.prototype.exitDefineMacroStatement = function(ctx) {
};


// Enter a parse tree produced by LPCParser#defineMacroParameterList.
LPCListener.prototype.enterDefineMacroParameterList = function(ctx) {
};

// Exit a parse tree produced by LPCParser#defineMacroParameterList.
LPCListener.prototype.exitDefineMacroParameterList = function(ctx) {
};


// Enter a parse tree produced by LPCParser#variableDeclaration.
LPCListener.prototype.enterVariableDeclaration = function(ctx) {
};

// Exit a parse tree produced by LPCParser#variableDeclaration.
LPCListener.prototype.exitVariableDeclaration = function(ctx) {
};


// Enter a parse tree produced by LPCParser#programVariableDeclaration.
LPCListener.prototype.enterProgramVariableDeclaration = function(ctx) {
};

// Exit a parse tree produced by LPCParser#programVariableDeclaration.
LPCListener.prototype.exitProgramVariableDeclaration = function(ctx) {
};


// Enter a parse tree produced by LPCParser#functionDeclaration.
LPCListener.prototype.enterFunctionDeclaration = function(ctx) {
};

// Exit a parse tree produced by LPCParser#functionDeclaration.
LPCListener.prototype.exitFunctionDeclaration = function(ctx) {
};


// Enter a parse tree produced by LPCParser#functionParameters.
LPCListener.prototype.enterFunctionParameters = function(ctx) {
};

// Exit a parse tree produced by LPCParser#functionParameters.
LPCListener.prototype.exitFunctionParameters = function(ctx) {
};


// Enter a parse tree produced by LPCParser#parameterList.
LPCListener.prototype.enterParameterList = function(ctx) {
};

// Exit a parse tree produced by LPCParser#parameterList.
LPCListener.prototype.exitParameterList = function(ctx) {
};


// Enter a parse tree produced by LPCParser#parameterDefinition.
LPCListener.prototype.enterParameterDefinition = function(ctx) {
};

// Exit a parse tree produced by LPCParser#parameterDefinition.
LPCListener.prototype.exitParameterDefinition = function(ctx) {
};


// Enter a parse tree produced by LPCParser#spreadParameterDefinition.
LPCListener.prototype.enterSpreadParameterDefinition = function(ctx) {
};

// Exit a parse tree produced by LPCParser#spreadParameterDefinition.
LPCListener.prototype.exitSpreadParameterDefinition = function(ctx) {
};


// Enter a parse tree produced by LPCParser#dataTypeList.
LPCListener.prototype.enterDataTypeList = function(ctx) {
};

// Exit a parse tree produced by LPCParser#dataTypeList.
LPCListener.prototype.exitDataTypeList = function(ctx) {
};


// Enter a parse tree produced by LPCParser#functionDefinition.
LPCListener.prototype.enterFunctionDefinition = function(ctx) {
};

// Exit a parse tree produced by LPCParser#functionDefinition.
LPCListener.prototype.exitFunctionDefinition = function(ctx) {
};


// Enter a parse tree produced by LPCParser#accessLevelModifier.
LPCListener.prototype.enterAccessLevelModifier = function(ctx) {
};

// Exit a parse tree produced by LPCParser#accessLevelModifier.
LPCListener.prototype.exitAccessLevelModifier = function(ctx) {
};


// Enter a parse tree produced by LPCParser#functionTypeModifier.
LPCListener.prototype.enterFunctionTypeModifier = function(ctx) {
};

// Exit a parse tree produced by LPCParser#functionTypeModifier.
LPCListener.prototype.exitFunctionTypeModifier = function(ctx) {
};


// Enter a parse tree produced by LPCParser#functionModifier.
LPCListener.prototype.enterFunctionModifier = function(ctx) {
};

// Exit a parse tree produced by LPCParser#functionModifier.
LPCListener.prototype.exitFunctionModifier = function(ctx) {
};


// Enter a parse tree produced by LPCParser#classDefinition.
LPCListener.prototype.enterClassDefinition = function(ctx) {
};

// Exit a parse tree produced by LPCParser#classDefinition.
LPCListener.prototype.exitClassDefinition = function(ctx) {
};


// Enter a parse tree produced by LPCParser#classIdentifier.
LPCListener.prototype.enterClassIdentifier = function(ctx) {
};

// Exit a parse tree produced by LPCParser#classIdentifier.
LPCListener.prototype.exitClassIdentifier = function(ctx) {
};


// Enter a parse tree produced by LPCParser#classMembers.
LPCListener.prototype.enterClassMembers = function(ctx) {
};

// Exit a parse tree produced by LPCParser#classMembers.
LPCListener.prototype.exitClassMembers = function(ctx) {
};


// Enter a parse tree produced by LPCParser#classMemberInitializer.
LPCListener.prototype.enterClassMemberInitializer = function(ctx) {
};

// Exit a parse tree produced by LPCParser#classMemberInitializer.
LPCListener.prototype.exitClassMemberInitializer = function(ctx) {
};


// Enter a parse tree produced by LPCParser#variableModifier.
LPCListener.prototype.enterVariableModifier = function(ctx) {
};

// Exit a parse tree produced by LPCParser#variableModifier.
LPCListener.prototype.exitVariableModifier = function(ctx) {
};


// Enter a parse tree produced by LPCParser#variableList.
LPCListener.prototype.enterVariableList = function(ctx) {
};

// Exit a parse tree produced by LPCParser#variableList.
LPCListener.prototype.exitVariableList = function(ctx) {
};


// Enter a parse tree produced by LPCParser#variable.
LPCListener.prototype.enterVariable = function(ctx) {
};

// Exit a parse tree produced by LPCParser#variable.
LPCListener.prototype.exitVariable = function(ctx) {
};


// Enter a parse tree produced by LPCParser#variableAssignmentExpression.
LPCListener.prototype.enterVariableAssignmentExpression = function(ctx) {
};

// Exit a parse tree produced by LPCParser#variableAssignmentExpression.
LPCListener.prototype.exitVariableAssignmentExpression = function(ctx) {
};


// Enter a parse tree produced by LPCParser#array.
LPCListener.prototype.enterArray = function(ctx) {
};

// Exit a parse tree produced by LPCParser#array.
LPCListener.prototype.exitArray = function(ctx) {
};


// Enter a parse tree produced by LPCParser#comparisonOperator.
LPCListener.prototype.enterComparisonOperator = function(ctx) {
};

// Exit a parse tree produced by LPCParser#comparisonOperator.
LPCListener.prototype.exitComparisonOperator = function(ctx) {
};


// Enter a parse tree produced by LPCParser#logicalOperator.
LPCListener.prototype.enterLogicalOperator = function(ctx) {
};

// Exit a parse tree produced by LPCParser#logicalOperator.
LPCListener.prototype.exitLogicalOperator = function(ctx) {
};


// Enter a parse tree produced by LPCParser#bitOperator.
LPCListener.prototype.enterBitOperator = function(ctx) {
};

// Exit a parse tree produced by LPCParser#bitOperator.
LPCListener.prototype.exitBitOperator = function(ctx) {
};


// Enter a parse tree produced by LPCParser#arithmeticOperator.
LPCListener.prototype.enterArithmeticOperator = function(ctx) {
};

// Exit a parse tree produced by LPCParser#arithmeticOperator.
LPCListener.prototype.exitArithmeticOperator = function(ctx) {
};


// Enter a parse tree produced by LPCParser#functionalDeclaration.
LPCListener.prototype.enterFunctionalDeclaration = function(ctx) {
};

// Exit a parse tree produced by LPCParser#functionalDeclaration.
LPCListener.prototype.exitFunctionalDeclaration = function(ctx) {
};


// Enter a parse tree produced by LPCParser#anonymousFunctionalDeclaration.
LPCListener.prototype.enterAnonymousFunctionalDeclaration = function(ctx) {
};

// Exit a parse tree produced by LPCParser#anonymousFunctionalDeclaration.
LPCListener.prototype.exitAnonymousFunctionalDeclaration = function(ctx) {
};


// Enter a parse tree produced by LPCParser#functionalStart.
LPCListener.prototype.enterFunctionalStart = function(ctx) {
};

// Exit a parse tree produced by LPCParser#functionalStart.
LPCListener.prototype.exitFunctionalStart = function(ctx) {
};


// Enter a parse tree produced by LPCParser#functionalEnd.
LPCListener.prototype.enterFunctionalEnd = function(ctx) {
};

// Exit a parse tree produced by LPCParser#functionalEnd.
LPCListener.prototype.exitFunctionalEnd = function(ctx) {
};


// Enter a parse tree produced by LPCParser#functionalParameter.
LPCListener.prototype.enterFunctionalParameter = function(ctx) {
};

// Exit a parse tree produced by LPCParser#functionalParameter.
LPCListener.prototype.exitFunctionalParameter = function(ctx) {
};


// Enter a parse tree produced by LPCParser#castOperation.
LPCListener.prototype.enterCastOperation = function(ctx) {
};

// Exit a parse tree produced by LPCParser#castOperation.
LPCListener.prototype.exitCastOperation = function(ctx) {
};


// Enter a parse tree produced by LPCParser#expression.
LPCListener.prototype.enterExpression = function(ctx) {
};

// Exit a parse tree produced by LPCParser#expression.
LPCListener.prototype.exitExpression = function(ctx) {
};


// Enter a parse tree produced by LPCParser#ternaryExpression.
LPCListener.prototype.enterTernaryExpression = function(ctx) {
};

// Exit a parse tree produced by LPCParser#ternaryExpression.
LPCListener.prototype.exitTernaryExpression = function(ctx) {
};


// Enter a parse tree produced by LPCParser#stringConcatExpression.
LPCListener.prototype.enterStringConcatExpression = function(ctx) {
};

// Exit a parse tree produced by LPCParser#stringConcatExpression.
LPCListener.prototype.exitStringConcatExpression = function(ctx) {
};


// Enter a parse tree produced by LPCParser#memberIdentifier.
LPCListener.prototype.enterMemberIdentifier = function(ctx) {
};

// Exit a parse tree produced by LPCParser#memberIdentifier.
LPCListener.prototype.exitMemberIdentifier = function(ctx) {
};


// Enter a parse tree produced by LPCParser#incrementExpression.
LPCListener.prototype.enterIncrementExpression = function(ctx) {
};

// Exit a parse tree produced by LPCParser#incrementExpression.
LPCListener.prototype.exitIncrementExpression = function(ctx) {
};


// Enter a parse tree produced by LPCParser#decrementExpression.
LPCListener.prototype.enterDecrementExpression = function(ctx) {
};

// Exit a parse tree produced by LPCParser#decrementExpression.
LPCListener.prototype.exitDecrementExpression = function(ctx) {
};


// Enter a parse tree produced by LPCParser#catchExpression.
LPCListener.prototype.enterCatchExpression = function(ctx) {
};

// Exit a parse tree produced by LPCParser#catchExpression.
LPCListener.prototype.exitCatchExpression = function(ctx) {
};


// Enter a parse tree produced by LPCParser#newExpression.
LPCListener.prototype.enterNewExpression = function(ctx) {
};

// Exit a parse tree produced by LPCParser#newExpression.
LPCListener.prototype.exitNewExpression = function(ctx) {
};


// Enter a parse tree produced by LPCParser#newExpressionIdentifier.
LPCListener.prototype.enterNewExpressionIdentifier = function(ctx) {
};

// Exit a parse tree produced by LPCParser#newExpressionIdentifier.
LPCListener.prototype.exitNewExpressionIdentifier = function(ctx) {
};


// Enter a parse tree produced by LPCParser#operator.
LPCListener.prototype.enterOperator = function(ctx) {
};

// Exit a parse tree produced by LPCParser#operator.
LPCListener.prototype.exitOperator = function(ctx) {
};


// Enter a parse tree produced by LPCParser#assignmentOperator.
LPCListener.prototype.enterAssignmentOperator = function(ctx) {
};

// Exit a parse tree produced by LPCParser#assignmentOperator.
LPCListener.prototype.exitAssignmentOperator = function(ctx) {
};


// Enter a parse tree produced by LPCParser#notExpression.
LPCListener.prototype.enterNotExpression = function(ctx) {
};

// Exit a parse tree produced by LPCParser#notExpression.
LPCListener.prototype.exitNotExpression = function(ctx) {
};


// Enter a parse tree produced by LPCParser#unaryOperator.
LPCListener.prototype.enterUnaryOperator = function(ctx) {
};

// Exit a parse tree produced by LPCParser#unaryOperator.
LPCListener.prototype.exitUnaryOperator = function(ctx) {
};


// Enter a parse tree produced by LPCParser#literal.
LPCListener.prototype.enterLiteral = function(ctx) {
};

// Exit a parse tree produced by LPCParser#literal.
LPCListener.prototype.exitLiteral = function(ctx) {
};


// Enter a parse tree produced by LPCParser#mappingDeclaration.
LPCListener.prototype.enterMappingDeclaration = function(ctx) {
};

// Exit a parse tree produced by LPCParser#mappingDeclaration.
LPCListener.prototype.exitMappingDeclaration = function(ctx) {
};


// Enter a parse tree produced by LPCParser#mappingElementList.
LPCListener.prototype.enterMappingElementList = function(ctx) {
};

// Exit a parse tree produced by LPCParser#mappingElementList.
LPCListener.prototype.exitMappingElementList = function(ctx) {
};


// Enter a parse tree produced by LPCParser#mappingElement.
LPCListener.prototype.enterMappingElement = function(ctx) {
};

// Exit a parse tree produced by LPCParser#mappingElement.
LPCListener.prototype.exitMappingElement = function(ctx) {
};


// Enter a parse tree produced by LPCParser#mappingKey.
LPCListener.prototype.enterMappingKey = function(ctx) {
};

// Exit a parse tree produced by LPCParser#mappingKey.
LPCListener.prototype.exitMappingKey = function(ctx) {
};


// Enter a parse tree produced by LPCParser#mappingValue.
LPCListener.prototype.enterMappingValue = function(ctx) {
};

// Exit a parse tree produced by LPCParser#mappingValue.
LPCListener.prototype.exitMappingValue = function(ctx) {
};


// Enter a parse tree produced by LPCParser#arrayDeclaration.
LPCListener.prototype.enterArrayDeclaration = function(ctx) {
};

// Exit a parse tree produced by LPCParser#arrayDeclaration.
LPCListener.prototype.exitArrayDeclaration = function(ctx) {
};


// Enter a parse tree produced by LPCParser#arrayStart.
LPCListener.prototype.enterArrayStart = function(ctx) {
};

// Exit a parse tree produced by LPCParser#arrayStart.
LPCListener.prototype.exitArrayStart = function(ctx) {
};


// Enter a parse tree produced by LPCParser#arrayEnd.
LPCListener.prototype.enterArrayEnd = function(ctx) {
};

// Exit a parse tree produced by LPCParser#arrayEnd.
LPCListener.prototype.exitArrayEnd = function(ctx) {
};


// Enter a parse tree produced by LPCParser#indexOperator.
LPCListener.prototype.enterIndexOperator = function(ctx) {
};

// Exit a parse tree produced by LPCParser#indexOperator.
LPCListener.prototype.exitIndexOperator = function(ctx) {
};


// Enter a parse tree produced by LPCParser#range.
LPCListener.prototype.enterRange = function(ctx) {
};

// Exit a parse tree produced by LPCParser#range.
LPCListener.prototype.exitRange = function(ctx) {
};


// Enter a parse tree produced by LPCParser#index.
LPCListener.prototype.enterIndex = function(ctx) {
};

// Exit a parse tree produced by LPCParser#index.
LPCListener.prototype.exitIndex = function(ctx) {
};


// Enter a parse tree produced by LPCParser#block.
LPCListener.prototype.enterBlock = function(ctx) {
};

// Exit a parse tree produced by LPCParser#block.
LPCListener.prototype.exitBlock = function(ctx) {
};


// Enter a parse tree produced by LPCParser#statement.
LPCListener.prototype.enterStatement = function(ctx) {
};

// Exit a parse tree produced by LPCParser#statement.
LPCListener.prototype.exitStatement = function(ctx) {
};


// Enter a parse tree produced by LPCParser#breakStatement.
LPCListener.prototype.enterBreakStatement = function(ctx) {
};

// Exit a parse tree produced by LPCParser#breakStatement.
LPCListener.prototype.exitBreakStatement = function(ctx) {
};


// Enter a parse tree produced by LPCParser#continueStatement.
LPCListener.prototype.enterContinueStatement = function(ctx) {
};

// Exit a parse tree produced by LPCParser#continueStatement.
LPCListener.prototype.exitContinueStatement = function(ctx) {
};


// Enter a parse tree produced by LPCParser#statementOrBlock.
LPCListener.prototype.enterStatementOrBlock = function(ctx) {
};

// Exit a parse tree produced by LPCParser#statementOrBlock.
LPCListener.prototype.exitStatementOrBlock = function(ctx) {
};


// Enter a parse tree produced by LPCParser#loopStatement.
LPCListener.prototype.enterLoopStatement = function(ctx) {
};

// Exit a parse tree produced by LPCParser#loopStatement.
LPCListener.prototype.exitLoopStatement = function(ctx) {
};


// Enter a parse tree produced by LPCParser#whileControlStatement.
LPCListener.prototype.enterWhileControlStatement = function(ctx) {
};

// Exit a parse tree produced by LPCParser#whileControlStatement.
LPCListener.prototype.exitWhileControlStatement = function(ctx) {
};


// Enter a parse tree produced by LPCParser#doLoopStatement.
LPCListener.prototype.enterDoLoopStatement = function(ctx) {
};

// Exit a parse tree produced by LPCParser#doLoopStatement.
LPCListener.prototype.exitDoLoopStatement = function(ctx) {
};


// Enter a parse tree produced by LPCParser#whileLoopStatement.
LPCListener.prototype.enterWhileLoopStatement = function(ctx) {
};

// Exit a parse tree produced by LPCParser#whileLoopStatement.
LPCListener.prototype.exitWhileLoopStatement = function(ctx) {
};


// Enter a parse tree produced by LPCParser#forControlStatement.
LPCListener.prototype.enterForControlStatement = function(ctx) {
};

// Exit a parse tree produced by LPCParser#forControlStatement.
LPCListener.prototype.exitForControlStatement = function(ctx) {
};


// Enter a parse tree produced by LPCParser#forLoopStatement.
LPCListener.prototype.enterForLoopStatement = function(ctx) {
};

// Exit a parse tree produced by LPCParser#forLoopStatement.
LPCListener.prototype.exitForLoopStatement = function(ctx) {
};


// Enter a parse tree produced by LPCParser#forInitialState.
LPCListener.prototype.enterForInitialState = function(ctx) {
};

// Exit a parse tree produced by LPCParser#forInitialState.
LPCListener.prototype.exitForInitialState = function(ctx) {
};


// Enter a parse tree produced by LPCParser#forLoopVariable.
LPCListener.prototype.enterForLoopVariable = function(ctx) {
};

// Exit a parse tree produced by LPCParser#forLoopVariable.
LPCListener.prototype.exitForLoopVariable = function(ctx) {
};


// Enter a parse tree produced by LPCParser#forCondition.
LPCListener.prototype.enterForCondition = function(ctx) {
};

// Exit a parse tree produced by LPCParser#forCondition.
LPCListener.prototype.exitForCondition = function(ctx) {
};


// Enter a parse tree produced by LPCParser#forIncrementStep.
LPCListener.prototype.enterForIncrementStep = function(ctx) {
};

// Exit a parse tree produced by LPCParser#forIncrementStep.
LPCListener.prototype.exitForIncrementStep = function(ctx) {
};


// Enter a parse tree produced by LPCParser#foreachLoopStatement.
LPCListener.prototype.enterForeachLoopStatement = function(ctx) {
};

// Exit a parse tree produced by LPCParser#foreachLoopStatement.
LPCListener.prototype.exitForeachLoopStatement = function(ctx) {
};


// Enter a parse tree produced by LPCParser#foreachControlStatement.
LPCListener.prototype.enterForeachControlStatement = function(ctx) {
};

// Exit a parse tree produced by LPCParser#foreachControlStatement.
LPCListener.prototype.exitForeachControlStatement = function(ctx) {
};


// Enter a parse tree produced by LPCParser#foreachVariableList.
LPCListener.prototype.enterForeachVariableList = function(ctx) {
};

// Exit a parse tree produced by LPCParser#foreachVariableList.
LPCListener.prototype.exitForeachVariableList = function(ctx) {
};


// Enter a parse tree produced by LPCParser#returnStatement.
LPCListener.prototype.enterReturnStatement = function(ctx) {
};

// Exit a parse tree produced by LPCParser#returnStatement.
LPCListener.prototype.exitReturnStatement = function(ctx) {
};


// Enter a parse tree produced by LPCParser#functionCall.
LPCListener.prototype.enterFunctionCall = function(ctx) {
};

// Exit a parse tree produced by LPCParser#functionCall.
LPCListener.prototype.exitFunctionCall = function(ctx) {
};


// Enter a parse tree produced by LPCParser#scopedFunctionCall.
LPCListener.prototype.enterScopedFunctionCall = function(ctx) {
};

// Exit a parse tree produced by LPCParser#scopedFunctionCall.
LPCListener.prototype.exitScopedFunctionCall = function(ctx) {
};


// Enter a parse tree produced by LPCParser#argumentList.
LPCListener.prototype.enterArgumentList = function(ctx) {
};

// Exit a parse tree produced by LPCParser#argumentList.
LPCListener.prototype.exitArgumentList = function(ctx) {
};


// Enter a parse tree produced by LPCParser#expressionList.
LPCListener.prototype.enterExpressionList = function(ctx) {
};

// Exit a parse tree produced by LPCParser#expressionList.
LPCListener.prototype.exitExpressionList = function(ctx) {
};


// Enter a parse tree produced by LPCParser#functionName.
LPCListener.prototype.enterFunctionName = function(ctx) {
};

// Exit a parse tree produced by LPCParser#functionName.
LPCListener.prototype.exitFunctionName = function(ctx) {
};


// Enter a parse tree produced by LPCParser#inheritanceDeclaration.
LPCListener.prototype.enterInheritanceDeclaration = function(ctx) {
};

// Exit a parse tree produced by LPCParser#inheritanceDeclaration.
LPCListener.prototype.exitInheritanceDeclaration = function(ctx) {
};


// Enter a parse tree produced by LPCParser#stringExpression.
LPCListener.prototype.enterStringExpression = function(ctx) {
};

// Exit a parse tree produced by LPCParser#stringExpression.
LPCListener.prototype.exitStringExpression = function(ctx) {
};


// Enter a parse tree produced by LPCParser#dataType.
LPCListener.prototype.enterDataType = function(ctx) {
};

// Exit a parse tree produced by LPCParser#dataType.
LPCListener.prototype.exitDataType = function(ctx) {
};


// Enter a parse tree produced by LPCParser#functionReturnType.
LPCListener.prototype.enterFunctionReturnType = function(ctx) {
};

// Exit a parse tree produced by LPCParser#functionReturnType.
LPCListener.prototype.exitFunctionReturnType = function(ctx) {
};


// Enter a parse tree produced by LPCParser#identifier.
LPCListener.prototype.enterIdentifier = function(ctx) {
};

// Exit a parse tree produced by LPCParser#identifier.
LPCListener.prototype.exitIdentifier = function(ctx) {
};


// Enter a parse tree produced by LPCParser#conditionalStatement.
LPCListener.prototype.enterConditionalStatement = function(ctx) {
};

// Exit a parse tree produced by LPCParser#conditionalStatement.
LPCListener.prototype.exitConditionalStatement = function(ctx) {
};


// Enter a parse tree produced by LPCParser#conditionalExpression.
LPCListener.prototype.enterConditionalExpression = function(ctx) {
};

// Exit a parse tree produced by LPCParser#conditionalExpression.
LPCListener.prototype.exitConditionalExpression = function(ctx) {
};


// Enter a parse tree produced by LPCParser#elseStatement.
LPCListener.prototype.enterElseStatement = function(ctx) {
};

// Exit a parse tree produced by LPCParser#elseStatement.
LPCListener.prototype.exitElseStatement = function(ctx) {
};


// Enter a parse tree produced by LPCParser#switchStatement.
LPCListener.prototype.enterSwitchStatement = function(ctx) {
};

// Exit a parse tree produced by LPCParser#switchStatement.
LPCListener.prototype.exitSwitchStatement = function(ctx) {
};


// Enter a parse tree produced by LPCParser#caseLabel.
LPCListener.prototype.enterCaseLabel = function(ctx) {
};

// Exit a parse tree produced by LPCParser#caseLabel.
LPCListener.prototype.exitCaseLabel = function(ctx) {
};


// Enter a parse tree produced by LPCParser#caseStatement.
LPCListener.prototype.enterCaseStatement = function(ctx) {
};

// Exit a parse tree produced by LPCParser#caseStatement.
LPCListener.prototype.exitCaseStatement = function(ctx) {
};


// Enter a parse tree produced by LPCParser#defaultSwitchStatement.
LPCListener.prototype.enterDefaultSwitchStatement = function(ctx) {
};

// Exit a parse tree produced by LPCParser#defaultSwitchStatement.
LPCListener.prototype.exitDefaultSwitchStatement = function(ctx) {
};



exports.LPCListener = LPCListener;