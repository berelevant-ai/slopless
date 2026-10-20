# Grouping operator ( )

The grouping operator ( ) controls the precedence of evaluation in expressions.

Syntax

( )

Description

The grouping operator consists of a pair of parentheses around an expression or sub-expression to override the normal operator precedence so that expressions with lower precedence can be evaluated before an expression with higher priority. As it sounds, it groups what's inside of the parentheses.

Examples

Using the grouping operator

Overriding multiplication and division first, then addition and subtraction to evaluate addition first.

var a = 1;

var b = 2;

var c = 3;

// default precedence

a + b * c     // 7

// evaluated by default like this

a + (b * c)   // 7

// now overriding precedence

// addition before multiplication

(a + b) * c   // 9

// which is equivalent to

a * c + b * c // 9

Specifications

Specification

Browser compatibility

See also

Operator precedence