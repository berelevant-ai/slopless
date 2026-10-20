# TypedArray.prototype.set()

The set() method stores multiple values in the typed array, reading input values from a specified array.

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone https://github.com/mdn/interactive-examples and send us a pull request.

Syntax

typedarray.set(array[, offset])

typedarray.set(typedarray[, offset])

Parameters

array

The array from which to copy values. All values from the source array are copied into the target array, unless the length of the source array plus the offset exceeds the length of the target array, in which case an exception is thrown.

typedarray

If the source array is a typed array, the two arrays may share the same underlying ; the JavaScript engine will intelligently copy the source range of the buffer to the destination range.

offset

The offset into the target array at which to begin writing values from the source array. If this value is omitted, 0 is assumed (that is, the source array will overwrite values in the target array starting at index 0).

Exceptions

A , if the offset is set such as it would store beyond the end of the typed array.

Examples

Using set()

var buffer = new ArrayBuffer(8);

var uint8 = new Uint8Array(buffer);

uint8.set([1, 2, 3], 3);

console.log(uint8); // Uint8Array [ 0, 0, 0, 1, 2, 3, 0, 0 ]

Specifications

Specification

Browser compatibility

See also

JavaScript typed arrays