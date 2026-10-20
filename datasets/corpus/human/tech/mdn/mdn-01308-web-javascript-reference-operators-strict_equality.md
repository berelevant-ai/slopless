# Strict equality (===)

The strict equality operator (===) checks whether its two operands are equal, returning a Boolean result. Unlike the equality operator, the strict equality operator always considers operands of different types to be different.

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone https://github.com/mdn/interactive-examples and send us a pull request.

Syntax

x === y

Description

The strict equality operators (=== and !==) use the Strict Equality Comparison Algorithm to compare two operands.

If the operands are of different types, return false.

If both operands are objects, return true only if they refer to the same object.

If both operands are null or both operands are undefined, return true.

If either operand is NaN, return false.

Otherwise, compare the two operand's values:

Numbers must have the same numeric values. +0 and -0 are considered to be the same value.

Strings must have the same characters in the same order.

Booleans must be both true or both false.

The most notable difference between this operator and the equality (==) operator is that if the operands are of different types, the == operator attempts to convert them to the same type before comparing.

Examples

Comparing operands of the same type

console.log("hello" === "hello");   // true

console.log("hello" === "hola");    // false

console.log(3 === 3);               // true

console.log(3 === 4);               // false

console.log(true === true);         // true

console.log(true === false);        // false

console.log(null === null);         // true

Comparing operands of different types

console.log("3" === 3);           // false

console.log(true === 1);          // false

console.log(null === undefined);  // false

Comparing objects

const object1 = {

name: "hello"

}

const object2 = {

name: "hello"

}

console.log(object1 === object2);  // false

console.log(object1 === object1);  // true

Specifications

Specification

Browser compatibility

See also

Equality operator

Inequality operator

Strict inequality operator