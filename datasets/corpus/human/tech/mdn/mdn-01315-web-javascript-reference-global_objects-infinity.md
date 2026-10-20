# Infinity

The global property Infinity is a numeric value representing infinity.

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone https://github.com/mdn/interactive-examples and send us a pull request.

Description

Infinity is a property of the global object. In other words, it is a variable in global scope.

The initial value of Infinity is . The value Infinity (positive infinity) is greater than any other number.

This value behaves slightly differently than mathematical infinity; see  for details.

As defined by the ECMAScript 5 specification, Infinity is read-only (implemented in JavaScript 1.8.5 / Firefox 4).

Examples

Using Infinity

console.log(Infinity          ); /* Infinity */

console.log(Infinity + 1      ); /* Infinity */

console.log(Math.pow(10, 1000)); /* Infinity */

console.log(Math.log(0)       ); /* -Infinity */

console.log(1 / Infinity      ); /* 0 */

console.log(1 / 0             ); /* Infinity */

Specifications

Specification

Browser compatibility

See also