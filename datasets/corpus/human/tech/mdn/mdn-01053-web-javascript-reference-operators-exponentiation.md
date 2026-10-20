# Exponentiation (**)

The exponentiation operator (**) returns the result of raising the first operand to the power of the second operand. It is equivalent to Math.pow, except it also accepts BigInts as operands.

Syntax

Operator: var1 ** var2

Description

The exponentiation operator is right-associative: a ** b ** c is equal to a ** (b ** c).

In most languages, such as PHP, Python, and others that have an exponentiation operator (**), the exponentiation operator is defined to have a higher precedence than unary operators, such as unary + and unary -, but there are a few exceptions. For example, in Bash, the ** operator is defined to have a lower precedence than unary operators.

In JavaScript, it is impossible to write an ambiguous exponentiation expression. That is, you cannot put a unary operator (+/-/~/!/delete/void/typeof) immediately before the base number; doing so will cause a SyntaxError.

-2 ** 2;

// 4 in Bash, -4 in other languages.

// This is invalid in JavaScript, as the operation is ambiguous.

-(2 ** 2);

// -4 in JavaScript and the author's intention is unambiguous.

Note that some programming languages use the caret symbol ^ for exponentiation, but JavaScript uses that symbol for the bitwise logical XOR operator.

Examples

Basic exponentiation

2 ** 3   // 8

3 ** 2   // 9

3 ** 2.5 // 15.588457268119896

10 ** -1 // 0.1

NaN ** 2 // NaN

Associativity

2 ** 3 ** 2   // 512

2 ** (3 ** 2) // 512

(2 ** 3) ** 2 // 64

Usage with unary operators

To invert the sign of the result of an exponentiation expression:

-(2 ** 2) // -4

To force the base of an exponentiation expression to be a negative number:

(-2) ** 2 // 4

Specifications

Specification

Browser compatibility

See also

Addition operator

Subtraction operator

Division operator

Multiplication operator

Remainder operator

Increment operator

Decrement operator

Unary negation operator

Unary plus operator