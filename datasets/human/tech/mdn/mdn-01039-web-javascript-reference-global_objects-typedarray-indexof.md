# TypedArray.prototype.indexOf()

The indexOf() method returns the first index at which a given element can be found in the typed array, or -1 if it is not present. This method has the same algorithm as . TypedArray is one of the typed array types here.

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone https://github.com/mdn/interactive-examples and send us a pull request.

Syntax

typedarray.indexOf(searchElement[, fromIndex = 0])

Parameters

searchElement

Element to locate in the typed array.

fromIndex

The index to start the search at. If the index is greater than or equal to the typed array's length, -1 is returned, which means the typed array will not be searched. If the provided index value is a negative number, it is taken as the offset from the end of the typed array. Note: if the provided index is negative, the typed array is still searched from front to back. If the calculated index is less than 0, then the whole typed array will be searched. Default: 0 (entire typed array is searched).

Return value

The first index of the element in the array; -1 if not found.

Description

indexOf compares searchElement to elements of the typed array using strict equality (the same method used by the ===, or triple-equals, operator).

Examples

Using indexOf

var uint8 = new Uint8Array([2, 5, 9]);

uint8.indexOf(2);     // 0

uint8.indexOf(7);     // -1

uint8.indexOf(9, 2);  // 2

uint8.indexOf(2, -1); // -1

uint8.indexOf(2, -3); // 0

Specifications

Specification

Browser compatibility

See also