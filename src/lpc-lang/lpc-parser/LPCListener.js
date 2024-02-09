"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _antlr = _interopRequireDefault(require("antlr4"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

// This class defines a complete listener for a parse tree produced by LPCParser.
var LPCListener = /*#__PURE__*/function (_antlr4$tree$ParseTre) {
  _inherits(LPCListener, _antlr4$tree$ParseTre);

  var _super = _createSuper(LPCListener);

  function LPCListener() {
    _classCallCheck(this, LPCListener);

    return _super.apply(this, arguments);
  }

  _createClass(LPCListener, [{
    key: "enterLpcProgram",
    value: // Enter a parse tree produced by LPCParser#lpcProgram.
    function enterLpcProgram(ctx) {} // Exit a parse tree produced by LPCParser#lpcProgram.

  }, {
    key: "exitLpcProgram",
    value: function exitLpcProgram(ctx) {} // Enter a parse tree produced by LPCParser#programDeclarations.

  }, {
    key: "enterProgramDeclarations",
    value: function enterProgramDeclarations(ctx) {} // Exit a parse tree produced by LPCParser#programDeclarations.

  }, {
    key: "exitProgramDeclarations",
    value: function exitProgramDeclarations(ctx) {} // Enter a parse tree produced by LPCParser#programDeclaration.

  }, {
    key: "enterProgramDeclaration",
    value: function enterProgramDeclaration(ctx) {} // Exit a parse tree produced by LPCParser#programDeclaration.

  }, {
    key: "exitProgramDeclaration",
    value: function exitProgramDeclaration(ctx) {} // Enter a parse tree produced by LPCParser#variableDeclaration.

  }, {
    key: "enterVariableDeclaration",
    value: function enterVariableDeclaration(ctx) {} // Exit a parse tree produced by LPCParser#variableDeclaration.

  }, {
    key: "exitVariableDeclaration",
    value: function exitVariableDeclaration(ctx) {} // Enter a parse tree produced by LPCParser#programVariableDeclaration.

  }, {
    key: "enterProgramVariableDeclaration",
    value: function enterProgramVariableDeclaration(ctx) {} // Exit a parse tree produced by LPCParser#programVariableDeclaration.

  }, {
    key: "exitProgramVariableDeclaration",
    value: function exitProgramVariableDeclaration(ctx) {} // Enter a parse tree produced by LPCParser#functionDeclaration.

  }, {
    key: "enterFunctionDeclaration",
    value: function enterFunctionDeclaration(ctx) {} // Exit a parse tree produced by LPCParser#functionDeclaration.

  }, {
    key: "exitFunctionDeclaration",
    value: function exitFunctionDeclaration(ctx) {} // Enter a parse tree produced by LPCParser#argumentList.

  }, {
    key: "enterArgumentList",
    value: function enterArgumentList(ctx) {} // Exit a parse tree produced by LPCParser#argumentList.

  }, {
    key: "exitArgumentList",
    value: function exitArgumentList(ctx) {} // Enter a parse tree produced by LPCParser#argument.

  }, {
    key: "enterArgument",
    value: function enterArgument(ctx) {} // Exit a parse tree produced by LPCParser#argument.

  }, {
    key: "exitArgument",
    value: function exitArgument(ctx) {} // Enter a parse tree produced by LPCParser#dataTypeList.

  }, {
    key: "enterDataTypeList",
    value: function enterDataTypeList(ctx) {} // Exit a parse tree produced by LPCParser#dataTypeList.

  }, {
    key: "exitDataTypeList",
    value: function exitDataTypeList(ctx) {} // Enter a parse tree produced by LPCParser#functionDefinition.

  }, {
    key: "enterFunctionDefinition",
    value: function enterFunctionDefinition(ctx) {} // Exit a parse tree produced by LPCParser#functionDefinition.

  }, {
    key: "exitFunctionDefinition",
    value: function exitFunctionDefinition(ctx) {} // Enter a parse tree produced by LPCParser#accessLevelModifier.

  }, {
    key: "enterAccessLevelModifier",
    value: function enterAccessLevelModifier(ctx) {} // Exit a parse tree produced by LPCParser#accessLevelModifier.

  }, {
    key: "exitAccessLevelModifier",
    value: function exitAccessLevelModifier(ctx) {} // Enter a parse tree produced by LPCParser#functionTypeModifier.

  }, {
    key: "enterFunctionTypeModifier",
    value: function enterFunctionTypeModifier(ctx) {} // Exit a parse tree produced by LPCParser#functionTypeModifier.

  }, {
    key: "exitFunctionTypeModifier",
    value: function exitFunctionTypeModifier(ctx) {} // Enter a parse tree produced by LPCParser#functionModifier.

  }, {
    key: "enterFunctionModifier",
    value: function enterFunctionModifier(ctx) {} // Exit a parse tree produced by LPCParser#functionModifier.

  }, {
    key: "exitFunctionModifier",
    value: function exitFunctionModifier(ctx) {} // Enter a parse tree produced by LPCParser#classDefinition.

  }, {
    key: "enterClassDefinition",
    value: function enterClassDefinition(ctx) {} // Exit a parse tree produced by LPCParser#classDefinition.

  }, {
    key: "exitClassDefinition",
    value: function exitClassDefinition(ctx) {} // Enter a parse tree produced by LPCParser#classIdentifier.

  }, {
    key: "enterClassIdentifier",
    value: function enterClassIdentifier(ctx) {} // Exit a parse tree produced by LPCParser#classIdentifier.

  }, {
    key: "exitClassIdentifier",
    value: function exitClassIdentifier(ctx) {} // Enter a parse tree produced by LPCParser#classMembers.

  }, {
    key: "enterClassMembers",
    value: function enterClassMembers(ctx) {} // Exit a parse tree produced by LPCParser#classMembers.

  }, {
    key: "exitClassMembers",
    value: function exitClassMembers(ctx) {} // Enter a parse tree produced by LPCParser#classMemberInitializer.

  }, {
    key: "enterClassMemberInitializer",
    value: function enterClassMemberInitializer(ctx) {} // Exit a parse tree produced by LPCParser#classMemberInitializer.

  }, {
    key: "exitClassMemberInitializer",
    value: function exitClassMemberInitializer(ctx) {} // Enter a parse tree produced by LPCParser#variableModifier.

  }, {
    key: "enterVariableModifier",
    value: function enterVariableModifier(ctx) {} // Exit a parse tree produced by LPCParser#variableModifier.

  }, {
    key: "exitVariableModifier",
    value: function exitVariableModifier(ctx) {} // Enter a parse tree produced by LPCParser#variableList.

  }, {
    key: "enterVariableList",
    value: function enterVariableList(ctx) {} // Exit a parse tree produced by LPCParser#variableList.

  }, {
    key: "exitVariableList",
    value: function exitVariableList(ctx) {} // Enter a parse tree produced by LPCParser#variable.

  }, {
    key: "enterVariable",
    value: function enterVariable(ctx) {} // Exit a parse tree produced by LPCParser#variable.

  }, {
    key: "exitVariable",
    value: function exitVariable(ctx) {} // Enter a parse tree produced by LPCParser#array.

  }, {
    key: "enterArray",
    value: function enterArray(ctx) {} // Exit a parse tree produced by LPCParser#array.

  }, {
    key: "exitArray",
    value: function exitArray(ctx) {} // Enter a parse tree produced by LPCParser#comparisonOperator.

  }, {
    key: "enterComparisonOperator",
    value: function enterComparisonOperator(ctx) {} // Exit a parse tree produced by LPCParser#comparisonOperator.

  }, {
    key: "exitComparisonOperator",
    value: function exitComparisonOperator(ctx) {} // Enter a parse tree produced by LPCParser#logicalOperator.

  }, {
    key: "enterLogicalOperator",
    value: function enterLogicalOperator(ctx) {} // Exit a parse tree produced by LPCParser#logicalOperator.

  }, {
    key: "exitLogicalOperator",
    value: function exitLogicalOperator(ctx) {} // Enter a parse tree produced by LPCParser#bitOperator.

  }, {
    key: "enterBitOperator",
    value: function enterBitOperator(ctx) {} // Exit a parse tree produced by LPCParser#bitOperator.

  }, {
    key: "exitBitOperator",
    value: function exitBitOperator(ctx) {} // Enter a parse tree produced by LPCParser#arithmeticOperator.

  }, {
    key: "enterArithmeticOperator",
    value: function enterArithmeticOperator(ctx) {} // Exit a parse tree produced by LPCParser#arithmeticOperator.

  }, {
    key: "exitArithmeticOperator",
    value: function exitArithmeticOperator(ctx) {} // Enter a parse tree produced by LPCParser#functionalDeclaration.

  }, {
    key: "enterFunctionalDeclaration",
    value: function enterFunctionalDeclaration(ctx) {} // Exit a parse tree produced by LPCParser#functionalDeclaration.

  }, {
    key: "exitFunctionalDeclaration",
    value: function exitFunctionalDeclaration(ctx) {} // Enter a parse tree produced by LPCParser#anonymousFunctionalDeclaration.

  }, {
    key: "enterAnonymousFunctionalDeclaration",
    value: function enterAnonymousFunctionalDeclaration(ctx) {} // Exit a parse tree produced by LPCParser#anonymousFunctionalDeclaration.

  }, {
    key: "exitAnonymousFunctionalDeclaration",
    value: function exitAnonymousFunctionalDeclaration(ctx) {} // Enter a parse tree produced by LPCParser#functionalStart.

  }, {
    key: "enterFunctionalStart",
    value: function enterFunctionalStart(ctx) {} // Exit a parse tree produced by LPCParser#functionalStart.

  }, {
    key: "exitFunctionalStart",
    value: function exitFunctionalStart(ctx) {} // Enter a parse tree produced by LPCParser#functionalEnd.

  }, {
    key: "enterFunctionalEnd",
    value: function enterFunctionalEnd(ctx) {} // Exit a parse tree produced by LPCParser#functionalEnd.

  }, {
    key: "exitFunctionalEnd",
    value: function exitFunctionalEnd(ctx) {} // Enter a parse tree produced by LPCParser#functionalParameter.

  }, {
    key: "enterFunctionalParameter",
    value: function enterFunctionalParameter(ctx) {} // Exit a parse tree produced by LPCParser#functionalParameter.

  }, {
    key: "exitFunctionalParameter",
    value: function exitFunctionalParameter(ctx) {} // Enter a parse tree produced by LPCParser#castOperation.

  }, {
    key: "enterCastOperation",
    value: function enterCastOperation(ctx) {} // Exit a parse tree produced by LPCParser#castOperation.

  }, {
    key: "exitCastOperation",
    value: function exitCastOperation(ctx) {} // Enter a parse tree produced by LPCParser#expression.

  }, {
    key: "enterExpression",
    value: function enterExpression(ctx) {} // Exit a parse tree produced by LPCParser#expression.

  }, {
    key: "exitExpression",
    value: function exitExpression(ctx) {} // Enter a parse tree produced by LPCParser#catchExpression.

  }, {
    key: "enterCatchExpression",
    value: function enterCatchExpression(ctx) {} // Exit a parse tree produced by LPCParser#catchExpression.

  }, {
    key: "exitCatchExpression",
    value: function exitCatchExpression(ctx) {} // Enter a parse tree produced by LPCParser#newExpression.

  }, {
    key: "enterNewExpression",
    value: function enterNewExpression(ctx) {} // Exit a parse tree produced by LPCParser#newExpression.

  }, {
    key: "exitNewExpression",
    value: function exitNewExpression(ctx) {} // Enter a parse tree produced by LPCParser#newExpressionIdentifier.

  }, {
    key: "enterNewExpressionIdentifier",
    value: function enterNewExpressionIdentifier(ctx) {} // Exit a parse tree produced by LPCParser#newExpressionIdentifier.

  }, {
    key: "exitNewExpressionIdentifier",
    value: function exitNewExpressionIdentifier(ctx) {} // Enter a parse tree produced by LPCParser#operator.

  }, {
    key: "enterOperator",
    value: function enterOperator(ctx) {} // Exit a parse tree produced by LPCParser#operator.

  }, {
    key: "exitOperator",
    value: function exitOperator(ctx) {} // Enter a parse tree produced by LPCParser#assignmentOperator.

  }, {
    key: "enterAssignmentOperator",
    value: function enterAssignmentOperator(ctx) {} // Exit a parse tree produced by LPCParser#assignmentOperator.

  }, {
    key: "exitAssignmentOperator",
    value: function exitAssignmentOperator(ctx) {} // Enter a parse tree produced by LPCParser#notExpression.

  }, {
    key: "enterNotExpression",
    value: function enterNotExpression(ctx) {} // Exit a parse tree produced by LPCParser#notExpression.

  }, {
    key: "exitNotExpression",
    value: function exitNotExpression(ctx) {} // Enter a parse tree produced by LPCParser#unaryOperator.

  }, {
    key: "enterUnaryOperator",
    value: function enterUnaryOperator(ctx) {} // Exit a parse tree produced by LPCParser#unaryOperator.

  }, {
    key: "exitUnaryOperator",
    value: function exitUnaryOperator(ctx) {} // Enter a parse tree produced by LPCParser#literal.

  }, {
    key: "enterLiteral",
    value: function enterLiteral(ctx) {} // Exit a parse tree produced by LPCParser#literal.

  }, {
    key: "exitLiteral",
    value: function exitLiteral(ctx) {} // Enter a parse tree produced by LPCParser#mappingDeclaration.

  }, {
    key: "enterMappingDeclaration",
    value: function enterMappingDeclaration(ctx) {} // Exit a parse tree produced by LPCParser#mappingDeclaration.

  }, {
    key: "exitMappingDeclaration",
    value: function exitMappingDeclaration(ctx) {} // Enter a parse tree produced by LPCParser#mappingStart.

  }, {
    key: "enterMappingStart",
    value: function enterMappingStart(ctx) {} // Exit a parse tree produced by LPCParser#mappingStart.

  }, {
    key: "exitMappingStart",
    value: function exitMappingStart(ctx) {} // Enter a parse tree produced by LPCParser#mappingEnd.

  }, {
    key: "enterMappingEnd",
    value: function enterMappingEnd(ctx) {} // Exit a parse tree produced by LPCParser#mappingEnd.

  }, {
    key: "exitMappingEnd",
    value: function exitMappingEnd(ctx) {} // Enter a parse tree produced by LPCParser#mappingElementList.

  }, {
    key: "enterMappingElementList",
    value: function enterMappingElementList(ctx) {} // Exit a parse tree produced by LPCParser#mappingElementList.

  }, {
    key: "exitMappingElementList",
    value: function exitMappingElementList(ctx) {} // Enter a parse tree produced by LPCParser#mappingElement.

  }, {
    key: "enterMappingElement",
    value: function enterMappingElement(ctx) {} // Exit a parse tree produced by LPCParser#mappingElement.

  }, {
    key: "exitMappingElement",
    value: function exitMappingElement(ctx) {} // Enter a parse tree produced by LPCParser#mappingKey.

  }, {
    key: "enterMappingKey",
    value: function enterMappingKey(ctx) {} // Exit a parse tree produced by LPCParser#mappingKey.

  }, {
    key: "exitMappingKey",
    value: function exitMappingKey(ctx) {} // Enter a parse tree produced by LPCParser#mappingValue.

  }, {
    key: "enterMappingValue",
    value: function enterMappingValue(ctx) {} // Exit a parse tree produced by LPCParser#mappingValue.

  }, {
    key: "exitMappingValue",
    value: function exitMappingValue(ctx) {} // Enter a parse tree produced by LPCParser#arrayDeclaration.

  }, {
    key: "enterArrayDeclaration",
    value: function enterArrayDeclaration(ctx) {} // Exit a parse tree produced by LPCParser#arrayDeclaration.

  }, {
    key: "exitArrayDeclaration",
    value: function exitArrayDeclaration(ctx) {} // Enter a parse tree produced by LPCParser#arrayStart.

  }, {
    key: "enterArrayStart",
    value: function enterArrayStart(ctx) {} // Exit a parse tree produced by LPCParser#arrayStart.

  }, {
    key: "exitArrayStart",
    value: function exitArrayStart(ctx) {} // Enter a parse tree produced by LPCParser#arrayEnd.

  }, {
    key: "enterArrayEnd",
    value: function enterArrayEnd(ctx) {} // Exit a parse tree produced by LPCParser#arrayEnd.

  }, {
    key: "exitArrayEnd",
    value: function exitArrayEnd(ctx) {} // Enter a parse tree produced by LPCParser#indexOperator.

  }, {
    key: "enterIndexOperator",
    value: function enterIndexOperator(ctx) {} // Exit a parse tree produced by LPCParser#indexOperator.

  }, {
    key: "exitIndexOperator",
    value: function exitIndexOperator(ctx) {} // Enter a parse tree produced by LPCParser#index.

  }, {
    key: "enterIndex",
    value: function enterIndex(ctx) {} // Exit a parse tree produced by LPCParser#index.

  }, {
    key: "exitIndex",
    value: function exitIndex(ctx) {} // Enter a parse tree produced by LPCParser#range.

  }, {
    key: "enterRange",
    value: function enterRange(ctx) {} // Exit a parse tree produced by LPCParser#range.

  }, {
    key: "exitRange",
    value: function exitRange(ctx) {} // Enter a parse tree produced by LPCParser#block.

  }, {
    key: "enterBlock",
    value: function enterBlock(ctx) {} // Exit a parse tree produced by LPCParser#block.

  }, {
    key: "exitBlock",
    value: function exitBlock(ctx) {} // Enter a parse tree produced by LPCParser#statement.

  }, {
    key: "enterStatement",
    value: function enterStatement(ctx) {} // Exit a parse tree produced by LPCParser#statement.

  }, {
    key: "exitStatement",
    value: function exitStatement(ctx) {} // Enter a parse tree produced by LPCParser#breakStatement.

  }, {
    key: "enterBreakStatement",
    value: function enterBreakStatement(ctx) {} // Exit a parse tree produced by LPCParser#breakStatement.

  }, {
    key: "exitBreakStatement",
    value: function exitBreakStatement(ctx) {} // Enter a parse tree produced by LPCParser#continueStatement.

  }, {
    key: "enterContinueStatement",
    value: function enterContinueStatement(ctx) {} // Exit a parse tree produced by LPCParser#continueStatement.

  }, {
    key: "exitContinueStatement",
    value: function exitContinueStatement(ctx) {} // Enter a parse tree produced by LPCParser#statementOrBlock.

  }, {
    key: "enterStatementOrBlock",
    value: function enterStatementOrBlock(ctx) {} // Exit a parse tree produced by LPCParser#statementOrBlock.

  }, {
    key: "exitStatementOrBlock",
    value: function exitStatementOrBlock(ctx) {} // Enter a parse tree produced by LPCParser#loopStatement.

  }, {
    key: "enterLoopStatement",
    value: function enterLoopStatement(ctx) {} // Exit a parse tree produced by LPCParser#loopStatement.

  }, {
    key: "exitLoopStatement",
    value: function exitLoopStatement(ctx) {} // Enter a parse tree produced by LPCParser#whileControlStatement.

  }, {
    key: "enterWhileControlStatement",
    value: function enterWhileControlStatement(ctx) {} // Exit a parse tree produced by LPCParser#whileControlStatement.

  }, {
    key: "exitWhileControlStatement",
    value: function exitWhileControlStatement(ctx) {} // Enter a parse tree produced by LPCParser#doLoopStatement.

  }, {
    key: "enterDoLoopStatement",
    value: function enterDoLoopStatement(ctx) {} // Exit a parse tree produced by LPCParser#doLoopStatement.

  }, {
    key: "exitDoLoopStatement",
    value: function exitDoLoopStatement(ctx) {} // Enter a parse tree produced by LPCParser#whileLoopStatement.

  }, {
    key: "enterWhileLoopStatement",
    value: function enterWhileLoopStatement(ctx) {} // Exit a parse tree produced by LPCParser#whileLoopStatement.

  }, {
    key: "exitWhileLoopStatement",
    value: function exitWhileLoopStatement(ctx) {} // Enter a parse tree produced by LPCParser#forControlStatement.

  }, {
    key: "enterForControlStatement",
    value: function enterForControlStatement(ctx) {} // Exit a parse tree produced by LPCParser#forControlStatement.

  }, {
    key: "exitForControlStatement",
    value: function exitForControlStatement(ctx) {} // Enter a parse tree produced by LPCParser#forLoopStatement.

  }, {
    key: "enterForLoopStatement",
    value: function enterForLoopStatement(ctx) {} // Exit a parse tree produced by LPCParser#forLoopStatement.

  }, {
    key: "exitForLoopStatement",
    value: function exitForLoopStatement(ctx) {} // Enter a parse tree produced by LPCParser#forInitialState.

  }, {
    key: "enterForInitialState",
    value: function enterForInitialState(ctx) {} // Exit a parse tree produced by LPCParser#forInitialState.

  }, {
    key: "exitForInitialState",
    value: function exitForInitialState(ctx) {} // Enter a parse tree produced by LPCParser#forLoopVariable.

  }, {
    key: "enterForLoopVariable",
    value: function enterForLoopVariable(ctx) {} // Exit a parse tree produced by LPCParser#forLoopVariable.

  }, {
    key: "exitForLoopVariable",
    value: function exitForLoopVariable(ctx) {} // Enter a parse tree produced by LPCParser#forCondition.

  }, {
    key: "enterForCondition",
    value: function enterForCondition(ctx) {} // Exit a parse tree produced by LPCParser#forCondition.

  }, {
    key: "exitForCondition",
    value: function exitForCondition(ctx) {} // Enter a parse tree produced by LPCParser#forIncrementStep.

  }, {
    key: "enterForIncrementStep",
    value: function enterForIncrementStep(ctx) {} // Exit a parse tree produced by LPCParser#forIncrementStep.

  }, {
    key: "exitForIncrementStep",
    value: function exitForIncrementStep(ctx) {} // Enter a parse tree produced by LPCParser#foreachLoopStatement.

  }, {
    key: "enterForeachLoopStatement",
    value: function enterForeachLoopStatement(ctx) {} // Exit a parse tree produced by LPCParser#foreachLoopStatement.

  }, {
    key: "exitForeachLoopStatement",
    value: function exitForeachLoopStatement(ctx) {} // Enter a parse tree produced by LPCParser#foreachControlStatement.

  }, {
    key: "enterForeachControlStatement",
    value: function enterForeachControlStatement(ctx) {} // Exit a parse tree produced by LPCParser#foreachControlStatement.

  }, {
    key: "exitForeachControlStatement",
    value: function exitForeachControlStatement(ctx) {} // Enter a parse tree produced by LPCParser#foreachVariableList.

  }, {
    key: "enterForeachVariableList",
    value: function enterForeachVariableList(ctx) {} // Exit a parse tree produced by LPCParser#foreachVariableList.

  }, {
    key: "exitForeachVariableList",
    value: function exitForeachVariableList(ctx) {} // Enter a parse tree produced by LPCParser#returnStatement.

  }, {
    key: "enterReturnStatement",
    value: function enterReturnStatement(ctx) {} // Exit a parse tree produced by LPCParser#returnStatement.

  }, {
    key: "exitReturnStatement",
    value: function exitReturnStatement(ctx) {} // Enter a parse tree produced by LPCParser#functionCall.

  }, {
    key: "enterFunctionCall",
    value: function enterFunctionCall(ctx) {} // Exit a parse tree produced by LPCParser#functionCall.

  }, {
    key: "exitFunctionCall",
    value: function exitFunctionCall(ctx) {} // Enter a parse tree produced by LPCParser#expressionList.

  }, {
    key: "enterExpressionList",
    value: function enterExpressionList(ctx) {} // Exit a parse tree produced by LPCParser#expressionList.

  }, {
    key: "exitExpressionList",
    value: function exitExpressionList(ctx) {} // Enter a parse tree produced by LPCParser#functionName.

  }, {
    key: "enterFunctionName",
    value: function enterFunctionName(ctx) {} // Exit a parse tree produced by LPCParser#functionName.

  }, {
    key: "exitFunctionName",
    value: function exitFunctionName(ctx) {} // Enter a parse tree produced by LPCParser#inheritanceDeclaration.

  }, {
    key: "enterInheritanceDeclaration",
    value: function enterInheritanceDeclaration(ctx) {} // Exit a parse tree produced by LPCParser#inheritanceDeclaration.

  }, {
    key: "exitInheritanceDeclaration",
    value: function exitInheritanceDeclaration(ctx) {} // Enter a parse tree produced by LPCParser#stringExpression.

  }, {
    key: "enterStringExpression",
    value: function enterStringExpression(ctx) {} // Exit a parse tree produced by LPCParser#stringExpression.

  }, {
    key: "exitStringExpression",
    value: function exitStringExpression(ctx) {} // Enter a parse tree produced by LPCParser#dataType.

  }, {
    key: "enterDataType",
    value: function enterDataType(ctx) {} // Exit a parse tree produced by LPCParser#dataType.

  }, {
    key: "exitDataType",
    value: function exitDataType(ctx) {} // Enter a parse tree produced by LPCParser#functionReturnType.

  }, {
    key: "enterFunctionReturnType",
    value: function enterFunctionReturnType(ctx) {} // Exit a parse tree produced by LPCParser#functionReturnType.

  }, {
    key: "exitFunctionReturnType",
    value: function exitFunctionReturnType(ctx) {} // Enter a parse tree produced by LPCParser#identifier.

  }, {
    key: "enterIdentifier",
    value: function enterIdentifier(ctx) {} // Exit a parse tree produced by LPCParser#identifier.

  }, {
    key: "exitIdentifier",
    value: function exitIdentifier(ctx) {} // Enter a parse tree produced by LPCParser#conditionalStatement.

  }, {
    key: "enterConditionalStatement",
    value: function enterConditionalStatement(ctx) {} // Exit a parse tree produced by LPCParser#conditionalStatement.

  }, {
    key: "exitConditionalStatement",
    value: function exitConditionalStatement(ctx) {} // Enter a parse tree produced by LPCParser#switchStatement.

  }, {
    key: "enterSwitchStatement",
    value: function enterSwitchStatement(ctx) {} // Exit a parse tree produced by LPCParser#switchStatement.

  }, {
    key: "exitSwitchStatement",
    value: function exitSwitchStatement(ctx) {} // Enter a parse tree produced by LPCParser#caseLabel.

  }, {
    key: "enterCaseLabel",
    value: function enterCaseLabel(ctx) {} // Exit a parse tree produced by LPCParser#caseLabel.

  }, {
    key: "exitCaseLabel",
    value: function exitCaseLabel(ctx) {} // Enter a parse tree produced by LPCParser#caseStatement.

  }, {
    key: "enterCaseStatement",
    value: function enterCaseStatement(ctx) {} // Exit a parse tree produced by LPCParser#caseStatement.

  }, {
    key: "exitCaseStatement",
    value: function exitCaseStatement(ctx) {} // Enter a parse tree produced by LPCParser#defaultSwitchStatement.

  }, {
    key: "enterDefaultSwitchStatement",
    value: function enterDefaultSwitchStatement(ctx) {} // Exit a parse tree produced by LPCParser#defaultSwitchStatement.

  }, {
    key: "exitDefaultSwitchStatement",
    value: function exitDefaultSwitchStatement(ctx) {}
  }]);

  return LPCListener;
}(_antlr["default"].tree.ParseTreeListener);

exports["default"] = LPCListener;