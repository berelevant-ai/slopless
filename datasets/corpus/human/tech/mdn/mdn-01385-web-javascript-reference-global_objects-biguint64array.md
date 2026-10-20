# BigUint64Array

The BigUint64Array typed array represents an array of 64-bit unsigned integers in the platform byte order. If control over byte order is needed, use  instead. The contents are initialized to 0n. Once established, you can reference elements in the array using the object's methods, or by using standard array index syntax (that is, using bracket notation).

Constructor

BigUint64Array()

Creates a new BigUint64Array object.

Static properties

Returns a number value of the element size. 8 in the case of a BigUint64Array.

Returns the string value of the constructor name. In the case of the BigUint64Array type this is "BigUint64Array".

Static methods

Creates a new BigUint64Array from an array-like or iterable object. See also .

Creates a new BigUint64Array with a variable number of arguments. See also .

Instance properties

Returns the  referenced by the BigUint64Array. This is fixed at construction time and thus read only.

Returns the length (in bytes) of the BigUint64Array from the start of its . This is fixed at construction time and thus read only.

Returns the offset (in bytes) of the BigUint64Array from the start of its . This is fixed at construction time and thus read only.

Returns the number of elements hold in the BigUint64Array. This is fixed at construction time and thus read only.

Instance methods

Copies a sequence of array elements within the array. See also .

Returns a new Array Iterator object that contains the key/value pairs for each index in the array. See also .

Tests whether all elements in the array pass the test provided by a function. See also .

Fills all the elements of an array from a start index to an end index with a static value. See also .

Creates a new array with all of the elements of this array for which the provided filtering function returns true. See also .

Returns the found value in the array if an element in the array satisfies the provided testing function, or undefined if not found. See also .

Returns the found index in the array if an element in the array satisfies the provided testing function, or -1 if not found. See also .

Calls a function for each element in the array. See also .

Determines whether a typed array includes a certain element, returning true or false as appropriate. See also .

Returns the first (least) index of an element within the array equal to the specified value, or -1 if none is found. See also .

Joins all elements of an array into a string. See also .

Returns a new Array Iterator that contains the keys for each index in the array. See also .

Returns the last (greatest) index of an element within the array equal to the specified value, or -1 if none is found. See also .

Creates a new array with the results of calling a provided function on every element in this array. See also .

Apply a function against an accumulator and each value of the array (from left-to-right) so as to reduce it to a single value. See also .

Applies a function against an accumulator and each value of the array (from right-to-left) so as to reduce it to a single value. See also .

Reverses the order of the elements of an array — the first becomes the last, and the last becomes the first. See also .

Stores multiple values in the typed array, reading input values from a specified array.

Extracts a section of an array and returns a new array. See also .

Returns true if at least one element in this array satisfies the provided testing function. See also .

Sorts the elements of an array in place and returns the array. See also .

Returns a new BigUint64Array from the given start and end element index.

Returns a new Array Iterator object that contains the values for each index in the array. See also .

Returns a localized string representing the array and its elements. See also .

Returns a string representing the array and its elements. See also .

Returns a new Array Iterator object that contains the values for each index in the array.

Examples

Different ways to create a BigUint64Array

// From a length

var biguint64 = new BigUint64Array(2);

biguint64[0] = 42n;

console.log(biguint64[0]); // 42n

console.log(biguint64.length); // 2

console.log(biguint64.BYTES_PER_ELEMENT); // 8

// From an array

var arr = new BigUint64Array([21n,31n]);

console.log(arr[1]); // 31n

// From another TypedArray

var x = new BigUint64Array([21n, 31n]);

var y = new BigUint64Array(x);

console.log(y[0]); // 21n

// From an ArrayBuffer

var buffer = new ArrayBuffer(32);

var z = new BigUint64Array(buffer, 0, 4);

// From an iterable

var iterable = function*(){ yield* [1n, 2n, 3n]; }();

var biguint64 = new BigUint64Array(iterable);

// BigUint64Array[1n, 2n, 3n]

Specifications

Specification

Browser compatibility

See also

JavaScript typed arrays