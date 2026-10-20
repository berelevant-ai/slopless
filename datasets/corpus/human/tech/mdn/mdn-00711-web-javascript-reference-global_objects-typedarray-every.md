# TypedArray.prototype.every()

The every() method tests whether all elements in the typed array pass the test implemented by the provided function. This method has the same algorithm as . TypedArray is one of the typed array types here.

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone https://github.com/mdn/interactive-examples and send us a pull request.

Syntax

typedarray.every(callback[, thisArg])

Parameters

callback

A function to test for each element, taking three arguments:

element

The current element being processed in the typed array.

index

The index of the current element being processed in the typed array.

array

The typed array every was called upon.

thisArg

A value to use as this when executing callback.

Return value

true if the callback function returns a  value for every array element; otherwise, false.

Description

The every method executes the provided callback function once for each element present in the typed array until it finds the one where callback returns a falsy value. If such an element is found, the every method immediately returns false. Otherwise, if callback returns a  value for all elements, every returns true.

callback is invoked with three arguments: the value of the element, the index of the element, and the typed array object being traversed.

If a thisArg parameter is provided to every, it will be used as callback's this value. Otherwise, the value undefined will be used as its this value. The this value ultimately observable by callback is determined according to the usual rules for determining the this seen by a function.

every does not mutate the typed array on which it is called.

Examples

Testing size of all typed array elements

The following example tests whether all elements in the typed array are bigger than 10.

function isBigEnough(element, index, array) {

return element >= 10;

}

new Uint8Array([12, 5, 8, 130, 44]).every(isBigEnough);   // false

new Uint8Array([12, 54, 18, 130, 44]).every(isBigEnough); // true

Testing typed array elements using arrow functions

Arrow functions provide a shorter syntax for the same test.

new Uint8Array([12, 5, 8, 130, 44]).every(elem => elem >= 10); // false

new Uint8Array([12, 54, 18, 130, 44]).every(elem => elem >= 10); // true

Specifications

Specification

Browser compatibility

See also