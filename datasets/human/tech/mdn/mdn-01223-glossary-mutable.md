# Mutable

Mutable is a type of variable that can be changed. In , only  and  are mutable, not .

(You can make a variable name point to a new value, but the previous value is still held in memory. Hence the need for garbage collection.)

A mutable object is an object whose state can be modified after it is created.

Immutables are the objects whose state cannot be changed once the object is created.

Strings and Numbers are Immutable. Lets understand this with an example:

var immutableString = "Hello";

// In the above code, a new object with string value is created.

immutableString = immutableString + "World";

// We are now appending "World" to the existing value.

On appending the "immutableString" with a string value, following events occur:

Existing value of "immutableString" is retrieved

"World" is appended to the existing value of "immutableString"

The resultant value is then allocated to a new block of memory

"immutableString" object now points to the newly created memory space

Previously created memory space is now available for garbage collection.

Learn more

General knowledge

on Wikipedia