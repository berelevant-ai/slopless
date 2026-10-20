# Function() constructor

The Function constructor creates a new Function object. Calling the constructor directly can create functions dynamically, but suffers from security and similar (but far less significant) performance issues to . However, unlike eval, the Function constructor creates functions which execute in the global scope only.

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone https://github.com/mdn/interactive-examples and send us a pull request.

Syntax

new Function([arg1 [, arg2 [, ...argN]] ,] functionBody)

Parameters

arg1, arg2, ... argN

Names to be used by the function as formal argument names. Each must be a string that corresponds to a valid JavaScript identifier, or a list of such strings separated with a comma. For example: "x", "theValue"—or "x,theValue".

functionBody

A string containing the JavaScript statements comprising the function definition.

Description

Function objects created with the Function constructor are parsed when the function is created. This is less efficient than declaring a function with a  or  and calling it within your code because such functions are parsed with the rest of the code.

All arguments passed to the function are treated as the names of the identifiers of the parameters in the function to be created, in the order in which they are passed. Omitting an argument will result in the value of that parameter being undefined.

Invoking the Function constructor as a function (without using the new operator) has the same effect as invoking it as a constructor.

Examples

Specifying arguments with the Function constructor

The following code creates a Function object that takes two arguments.

// Example can be run directly in your JavaScript console

// Create a function that takes two arguments, and returns the sum of those arguments

const adder = new Function('a', 'b', 'return a + b');

// Call the function

adder(2, 6);

// 8

The arguments "a" and "b" are formal argument names that are used in the function body, "return a + b".

Specifications

Specification

Browser compatibility

See also

statement

expression

statement

expression