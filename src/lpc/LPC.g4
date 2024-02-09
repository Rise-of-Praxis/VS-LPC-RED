	grammar LPC;

	/*
	* LPC Tokens and Keywords - Lexer
	*/

	NoMask				: 'nomask';

	Private				: 'private';

	Protected			: 'protected';

	Public				: 'public';

	Static				: 'static';

	VarArgs				: 'varargs';

	Buffer				: 'buffer';

	Float				: 'float';

	Function			: 'function';

	Int					: 'int';

	Mapping				: 'mapping';

	Mixed				: 'mixed';

	Object				: 'object';

	String				: 'string';

	Void				: 'void';

	Break				: 'break';

	Catch				: 'catch';

	Class				: 'class';

	Continue			: 'continue';

	Efun				: 'efun';

	Else				: 'else';

	If					: 'if';

	Inherit				: 'inherit';

	Return				: 'return';

	For					: 'for';

	Foreach				: 'foreach';

	In					: 'in';

	Switch				: 'switch';

	Case				: 'case';

	While				: 'while';

	Do					: 'do';

	Default				: 'default';

	New					: 'new';

	Array				: 'array';		// Deprecated in FluffOS v2019

	Ellipsis			: '...';

	AddAssign			: '+=';

	SubtractAssign		: '-=';

	BitAndAssign		: '&=';

	BitOrAssign			: '|=';

	BitXor				: '^';

	BitXorAssign		: '^=';

	ModulusAssign		: '%=';

	DivideAssign		: '/=';

	LeftShiftAssign		: '<<=';

	RightShiftAssign	: '>>=';

	PlusPlus    		: '++' ;

	MinusMinus  		: '--' ;

	And					: '&&';

	Or					: '||';

	Equals				: '==';

	LeftShift			: '<<';

	RightShift			: '>>';

	NotEquals			: '!=';

	LessThanEqualTo		: '<=';

	GreaterThanEqualTo	: '>=';

	MemberOperator		: '->';

	ScopeOperator		: '::';

	Range				: '..';

	Period				: '.';

	MultiplyAssign		: '*=';

	Assign				: '=';

	Add					: '+';

	Subtract			: '-';

	Modulus				: '%';

	Divide				: '/';

	BitAnd				: '&' ;

	BitOr				: '|';

	Not					: '!';

	LessThan			: '<';

	GreaterThan			: '>';

	Colon				: ':';

	SemiColon			: ';';

	Comma				: ',';

	Question			: '?';

	SingleQuote			: '\'';

	DoubleQuote 		: '"';

	LeftBrace			: '{';

	RightBrace			: '}';

	LeftBracket			: '[';

	RightBracket		: ']';

	LeftParen			: '(';

	RightParen			: ')';

	Multiply			: '*';

	FunctionalScope		: '$';

	Identifier			: NonDigit (NonDigit | Digit)*;

	BlockComment		: '/*' .*? '*/';

	LineComment			: '//' ~[\r\n]*;

	DefinePreprocessor	: '#define'
						;

	IncludePreprocessor	: '#include'
						;

	IfndefPreprocessor	: '#ifndef' ~[\r\n]*
						;

	IfdefPreprocessor	: '#ifdef' ~[\r\n]*
						;

	IfPreprocessor		: '#if' ~[\r\n]*
						;

	ElseIfPreprocessor	: '#elseif'
						;

	EndIfPreprocessor	: '#endif' ~[\r\n]*
						;

	/*
	* Literal definitions
	*/
	IntegerLiteral		: IntegerConstant;

	FloatLiteral		: FractionalConstant;

	StringLiteral		: '@'? DoubleQuote StringCharacters? DoubleQuote;

	CharacterLiteral	: SingleQuote SingleChar? SingleQuote;

	/*
	* Tokens that are skipped/ignored
	*/
	Newline
		:   ('\r' '\n'? | '\n')
		-> skip
		;

	Whitespace
		:   ([ \t] | Newline )+
		-> skip
		;

	/*
	* Fragments - Not captured as tokens
	*/

	fragment
	DigitSequence
		:   Digit+
		;

	fragment
	FractionalConstant
		:   DigitSequence? Period DigitSequence
		;

	fragment
	NonDigit	:   [a-zA-Z_];

	fragment
	Digit		:   [0-9];

	fragment
	IntegerConstant
		:   DecimalConstant IntegerSuffix?
		|   OctalConstant IntegerSuffix?
		|   HexadecimalConstant IntegerSuffix?
		|   BinaryConstant
		;
		
	fragment
	BinaryConstant
		:   '0' [bB] [0-1]+
		;

	fragment
	DecimalConstant
		:   NonzeroDigit Digit*
		;

	fragment
	OctalConstant
		:   '0' OctalDigit*
		;

	fragment
	HexadecimalConstant
		:   HexadecimalPrefix HexadecimalDigit+
		;

	fragment
	HexadecimalPrefix
		:   '0' [xX]
		;

	fragment
	NonzeroDigit
		:   [1-9]
		;

	fragment
	OctalDigit
		:   [0-7]
		;

	fragment
	HexadecimalDigit
		:   [0-9a-fA-F]
		;

	fragment
	IntegerSuffix
		:   UnsignedSuffix LongSuffix?
		|   UnsignedSuffix LongLongSuffix
		|   LongSuffix UnsignedSuffix?
		|   LongLongSuffix UnsignedSuffix?
		;

	fragment
	UnsignedSuffix
		:   [uU]
		;

	fragment
	LongSuffix
		:   [lL]
		;

	fragment
	LongLongSuffix
		:   'll' | 'LL'
		;

	fragment
	StringCharacters
		:   StringCharacter+
		;

	fragment
	StringCharacter
		:   ~["\\\r\n]
		|   EscapeSequence
		|   '\\\n'   // Added line
		|   '\\\r\n' // Added line
		|   '\n'     // lpc want this
		|   '\r\n'   // lpc want this, too
		;

	fragment
	SingleChar
		:   DoubleQuote
		|   StringCharacter
		;

	fragment
	EscapeSequence
		:   SimpleEscapeSequence
		|   OctalEscapeSequence
		|   HexadecimalEscapeSequence
		|   UniversalCharacterName
		;

	fragment
	UniversalCharacterName
		:   '\\u' HexQuad
		|   '\\U' HexQuad HexQuad
		;

	fragment
	HexQuad
		:   HexadecimalDigit HexadecimalDigit HexadecimalDigit HexadecimalDigit
		;

	fragment
	HexadecimalEscapeSequence
		:   '\\x' HexadecimalDigit+
		;

	fragment
	OctalEscapeSequence
		:   '\\' OctalDigit
		|   '\\' OctalDigit OctalDigit
		|   '\\' OctalDigit OctalDigit OctalDigit
		;

	fragment
	SimpleEscapeSequence
		:   '\\' ['"?abfnrtv\\]
		|   '\\' [^+.[{}\]!@#$%&*()_=\-|/<>]    // WTF: LPC escapes these characters (inface, only warn in lpc)
		;

	/*
	* LPC Expression rules - Parser
	*/

	/*
	* Root rule for processing an LPC file.
	*/
	lpcProgram
		:	programDeclarations? EOF
		;

	programDeclarations
		:	programDeclaration+
		;

	comment
		:	LineComment
		|	BlockComment
		;

	programDeclaration
		:	programVariableDeclaration
		|	inheritanceDeclaration
		|	functionDeclaration SemiColon
		|	functionDefinition
		|	classDefinition
		|	SemiColon	// Stray semi-colon is allowed
		| 	preprocessorDirective
		|	comment
		;

	preprocessorDirective
		:	definePreprocessor
		|	includePreprocessor
		|	IfdefPreprocessor
		|	IfndefPreprocessor
		|	IfPreprocessor
		|	ElseIfPreprocessor
		|	EndIfPreprocessor
		;
		
	includePreprocessor
		:	IncludePreprocessor includeFileLiteral
		;

	includeFileLiteral
		:	LessThan (~GreaterThan)+? GreaterThan
		|	StringLiteral;

	definePreprocessor
		:	DefinePreprocessor defineConstantStatement
		|	DefinePreprocessor defineMacroStatement
		;

	defineConstantStatement
		:	identifier expression?
		;

	defineMacroStatement
		:	identifier LeftParen defineMacroParameterList? RightParen expression
		;

	defineMacroParameterList
		:   identifier (Comma identifier)*
		;

	/*
	* A declaraction of one or more variables.
	* example: int i = 0;
	*/
	variableDeclaration
		: 	dataType variableList SemiColon
		;

	/*
	* File level variable declarations.  These can have additional type modifiers
	*/
	programVariableDeclaration
		:	variableModifier? variableDeclaration
		;

	/*
	* A function declaration is the function signature without the body.
	*/
	functionDeclaration
		:	functionModifier? functionReturnType identifier functionParameters
		;

	functionParameters
		:	LeftParen (parameterList | dataTypeList)? RightParen
		;

	parameterList
		:   spreadParameterDefinition
		|	parameterDefinition Comma spreadParameterDefinition
		|	parameterDefinition (Comma parameterDefinition)* spreadParameterDefinition?
		;

	parameterDefinition
		:   dataType array? identifier?
		;

	spreadParameterDefinition
		:	parameterDefinition Ellipsis
		;

	dataTypeList
		:	dataType (Comma dataTypeList)*
		;

	/*
	* A function definition contains the function declaration followed by the function implementation.
	*/
	functionDefinition
		:   functionDeclaration block
		;

	/*
	* Variable/Function access levels
	*/
	accessLevelModifier
		:	Private
		|	Protected
		|	Public
		;

	/*
	* Type modifiers applicable to functions
	*/
	functionTypeModifier
		:	NoMask
		|	VarArgs
		|	Static
		;

	functionModifier
		:	accessLevelModifier? functionTypeModifier+
		|	functionTypeModifier* accessLevelModifier
		;

	/*
	* A class definition statement
	*/
	classDefinition
		:	classIdentifier LeftBrace classMembers? RightBrace
		;

	/*
	* The formal referencing of a class identifier
	*/
	classIdentifier
		:	Class identifier
		;

	/*
	* The members of a class
	*/
	classMembers
		:	variableDeclaration+
		;

	/*
	* Syntax used when creating a new class with initial values
	* example: new(class door_side, Rooms : ({ }) )
	*/
	classMemberInitializer
		:	identifier Colon expression
		;

	/*
	* Type modifiers applicable to variable
	*/
	variableModifier
		: 	Static? accessLevelModifier
		|	accessLevelModifier? Static;

	/*
	* A list of variables
	*/
	variableList
		:   variable (Comma variable)*
		;

	/*
	* A variable name, and possible assignment to that variable
	*/
	variable
		:   array? identifier
		|   array? identifier variableAssignmentExpression
		;

	variableAssignmentExpression
		:	Assign expression
		;

	array
		:	Multiply
		|	Array
		;

	/*
	* Operators used in comparing expressions
	*/
	comparisonOperator
		:	LessThan
		|	LessThanEqualTo
		|	GreaterThan
		|	GreaterThanEqualTo
		|	Equals
		|	NotEquals
		;

	logicalOperator
		:	Or
		|	And
		;

	/*
	* Boolean bit operators
	*/
	bitOperator
		:	BitOr
		|	BitAnd
		|	BitXor
		;

	/*
	* Basic arthimetic operators
	*/
	arithmeticOperator
		:	LeftShift
		|   RightShift
		|   Add
		|   Subtract
		|   Multiply
		|   Divide
		|	Modulus
		;

	/*
	* An LPC functional expression
	*/
	functionalDeclaration
		:	functionalStart expressionList functionalEnd
		;
	/*
	* An LPC function declaration that does not have a name.  ie: function(ob) { ...someCode... }
	*/
	anonymousFunctionalDeclaration
		:	Function LeftParen parameterList? RightParen block
		;

	/*
	* Syntax for start of an LPC function data type
	*/
	functionalStart
		:	LeftParen Colon
		;

	/*
	* Syntax for end of an LPC function data type
	*/
	functionalEnd
		:	Colon RightParen
		;

	/*
	* Token used inside a functional to represent a functional parameter
	*/
	functionalParameter
		:	FunctionalScope IntegerLiteral
		|	FunctionalScope LeftParen expression RightParen
		;

	/*
	* Operation meant to coerce data types
	*/
	castOperation
		:	LeftParen dataType array? RightParen expression
		;

	/*
	* An expression is a statement that returns a value
	*/
	expression
		:   LeftParen expression RightParen
		|	literal
		|	identifier
		|	functionCall
		|	scopedFunctionCall
		|	functionalDeclaration
		|	anonymousFunctionalDeclaration
		|	mappingDeclaration
		|	arrayDeclaration
		|	catchExpression
		|	newExpression

		//	Operator expressions.  Take note of operator precedence
		|	expression (incrementExpression | decrementExpression)
		|	expression indexOperator
		|	expression memberIdentifier
		|	(incrementExpression | decrementExpression) expression
		|	unaryOperator
		|	notExpression
		|	castOperation
		|	expression operator expression

		//	Ternary expression
		|   expression ternaryExpression

		//	A parameter reference in a functional
		|	functionalParameter

		//	Expansion expression (ie: array... expands it out to individual values)
		|	expression Ellipsis

		//	Support for "string" "string" concatenation
		|	stringConcatExpression

		//	Support for expressions followed by a comment (ie: "some string" 	//this is a string)
		|	expression comment+
		;

	ternaryExpression
		:	Question expression Colon expression
		;

	stringConcatExpression
		:	StringLiteral+ stringConcatExpression*
		|   identifier StringLiteral stringConcatExpression*
		;

	/*
	 * The expression that calls or references an object's function or property
	 */
	memberIdentifier
		:	MemberOperator functionCall
		|	MemberOperator identifier
		;

	/*
	 * The expression '++'
	 */
	incrementExpression
		: 	PlusPlus
		;

	/*
	 * The expression '--'
	 */
	decrementExpression
		:	MinusMinus
		;

	/*
	* 'catch' keyword expression
	*/
	catchExpression
		:	Catch LeftParen expression RightParen
		;

	/*
	* 'new' keyword expression
	*/
	newExpression
		:	New LeftParen newExpressionIdentifier (Comma expressionList)? RightParen
		;

	newExpressionIdentifier
		:	expression
		|	classIdentifier (Comma classMemberInitializer+)?
		;

	/*
	* Expression operators, in order of precedence
	*/
	operator
		:	arithmeticOperator 
		|	comparisonOperator
		|	bitOperator 
		|	logicalOperator
		|	assignmentOperator
		;

	/*
	* Operator used when assigning a value
	*/
	assignmentOperator
		:	Assign
		|   (AddAssign | SubtractAssign)
		|   (MultiplyAssign | DivideAssign | ModulusAssign)
		|   (LeftShiftAssign | RightShiftAssign)
		|   (BitAndAssign | BitXorAssign | BitOrAssign )
		;

	/*
	*	A negative expresions. ie: !expression
	*/
	notExpression
		:	Not expression
		;

	/*
	* Unary operator.  Ie: -expression or +expression
	*/
	unaryOperator
		:	Add expression
		|	Subtract expression
		;

	/*
	* Static value 
	*/
	literal
		: 	StringLiteral
		|   IntegerLiteral
		|   FloatLiteral
		|	CharacterLiteral;

	/*
	* An LPC mapping declaration.  IE: ([ "myKey": "myValue" ])
	*/
	mappingDeclaration
		:	LeftParen LeftBracket mappingElementList? Comma? RightBracket RightParen
		;

	/*
	* A list of mapping elements
	*/
	mappingElementList
		:	mappingElement (Comma mappingElement)*
		;

	/*
	* A single mapping element
	*/
	mappingElement
		:	mappingKey Colon mappingValue
        |   comment+ mappingElement
		;

	/*
	* The mapping key
	*/
	mappingKey
		:	literal
		|	expression
		;

	/*
	* The mapping value
	*/
	mappingValue
		: 	expression
		;

	/*
	* An LPC array declaration. ({ 1, 2, 3})
	*/
	arrayDeclaration
		:	arrayStart expressionList? arrayEnd
		;

	/*
	* Syntax for end of an LPC array
	*/
	arrayStart
		:	LeftParen LeftBrace
		;

	/*
	* Syntax for end of an LPC array
	*/
	arrayEnd
		:	RightBrace RightParen
		;

	indexOperator
		:	LeftBracket range RightBracket
		;

	range
		:	index
		|	Range index
		|	index Range index?
		;

	index
		:	expression
		|	LessThan index
		;

	/*
	* A block is a logical grouping of statements.  Variables can be declared at the top of a block.
	*/
	block
		:   LeftBrace statement* RightBrace
		;

	/*
	* A statement is a single complete line of code.
	*/
	statement
		:	variableDeclaration
		|	expression SemiColon
		|	conditionalStatement
		|	switchStatement
		|	loopStatement
		| 	breakStatement 
		| 	continueStatement
		|	returnStatement
		|	comment
        |   comment+ statement
		|	SemiColon
		;

	/*
	* Loop control break statement
	*/
	breakStatement
		:	Break SemiColon
		;

	/*
	* Loop control continuation statement
	*/
	continueStatement
		:	Continue SemiColon
		;

	/*
	* Represents a statement or a block.
	* This is separated from statement because not all statements can be blocks.
	*/
	statementOrBlock
		:	statement
		|	block
        |   comment+ statementOrBlock
		;

	/*
	* Represents any loop statement
	*/
	loopStatement
		:	doLoopStatement
		|	whileLoopStatement
		|   forLoopStatement
		|	foreachLoopStatement
		;

	/*
	* The control statement in a while loop.  ie: while(expression)
	*/
	whileControlStatement
		:	While LeftParen expression RightParen
		;

	/*
	* A standard do-while statement.
	*/
	doLoopStatement
		:	Do statementOrBlock whileControlStatement
		;

	/*
	* Standard while loop construct
	*/
	whileLoopStatement
		:   whileControlStatement statementOrBlock
		;

	/*
	* The control statement for a for-loop.  ie: for(int x = 0; x < 100; x++)
	*/
	forControlStatement
		:	For LeftParen forInitialState? forCondition? forIncrementStep? RightParen
		;

	/*
	* for-loop statement
	*/
	forLoopStatement
		:   forControlStatement statementOrBlock
		;

	/*
	* for-loop initial state expressions
	*/
	forInitialState
		:	forLoopVariable
		|	forLoopVariable (Comma forLoopVariable)*
		;

	/*
	* for-loop initial state variable
	*/
	forLoopVariable
		:	dataType? variable
		;

	/*
	* for-loop condition check expressions
	*/
	forCondition
		:	SemiColon expressionList
		;

	/*
	* for-loop incrememnt step expressions
	*/
	forIncrementStep
		:	SemiColon expressionList
		;

	/*
	* A foreach-loop.  ie: foreach(object ob in objects()) { }
	*/
	foreachLoopStatement
		:	foreachControlStatement statementOrBlock
		;

	foreachControlStatement
		:	Foreach LeftParen foreachVariableList In expression RightParen
		;

	foreachVariableList
		:	forLoopVariable (Comma forLoopVariable)*
		;

	/*
	* The standard return statement
	*/
	returnStatement
		:   Return SemiColon
		|   Return expressionList SemiColon
		;

	/*
	* The structure of a function call.  This includes
	* func()
	* func(arg1, arg2, arg3)
	*/
	functionCall
		:   functionName argumentList
		;

	/*
	 * Function calls with the scope operator
 	 */
	scopedFunctionCall
		:	ScopeOperator functionCall
		|	identifier ScopeOperator functionCall 
		|	Efun ScopeOperator functionCall						// used in efun:: overrides
		|	Object ScopeOperator functionCall 					// Hack for when someone inherits ".../object" file
		;

	argumentList
		:	LeftParen expressionList? RightParen
		;

	/*
	* A list of expressions, separated by a comma
	*/
	expressionList 
		: 	expression (Comma expression)*
		;

	/*
	* Function name
	*/
	functionName
		:   identifier
		|	LeftParen '*' expression RightParen		// Dereferencing a function data type
		;

	/*
	* Inheritance declaration
	*/
	inheritanceDeclaration
		:   accessLevelModifier? Inherit stringExpression SemiColon
		|   accessLevelModifier? Inherit identifier SemiColon
		;

	stringExpression
		:	StringLiteral Add? expression
		|	expression Add? StringLiteral
		|	StringLiteral
		;

	/*
	* Data types
	*/
	dataType
		: 	Float
		|	Function
		|	Int
		|	Mapping
		|	Mixed
		|	Object
		|	String
		|	Buffer
		|	classIdentifier
		|	array				// Deprecated in FluffOS v2019, should be switched to mixed *
		;

	/*
	* Return type of a function.  This is the list of valid data types + void
	*/
	functionReturnType
		:	dataType array?
		|	Void
		;

	/*
	* Captures an identifier
	*/
	identifier
		:   Identifier
		;

	/*
	* If-Else statement
	*/
	conditionalStatement
		:   If conditionalExpression
			statementOrBlock 
			elseStatement?
		;

	conditionalExpression
		:	LeftParen expression RightParen
		;

	elseStatement
		:	Else statementOrBlock
        |   comment+ Else statementOrBlock
		;

	/*
	* A switch statement and block
	*/
	switchStatement
		:	Switch LeftParen expression RightParen 
			LeftBrace 
			caseStatement*
			defaultSwitchStatement?
			RightBrace
		;

	caseLabel
		:	literal
		|	identifier
		|	stringExpression
		|	range
		;

	/*
	* The case condition in a switch statement.  ie: case 1: statements
	*/
	caseStatement
		:	Case caseLabel Colon statement* breakStatement?
		;

	/*
	* The default case statement.  ie: default: statements
	*/
	defaultSwitchStatement
		:	Default Colon statement* breakStatement?
		;