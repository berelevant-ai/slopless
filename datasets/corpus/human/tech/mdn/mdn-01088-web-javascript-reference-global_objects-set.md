# Set

The Set object lets you store unique values of any type, whether  or object references.

Description

Set objects are collections of values. You can iterate through the elements of a set in insertion order. A value in the Set may only occur once; it is unique in the Set's collection.

Value equality

Because each value in the Set has to be unique, the value equality will be checked. In an earlier version of ECMAScript specification, this was not based on the same algorithm as the one used in the === operator. Specifically, for Sets, +0 (which is strictly equal to -0) and -0 were different values. However, this was changed in the ECMAScript 2015 specification. See "Key equality for -0 and 0" in the browser compatibility table for details.

and  can also be stored in a Set. All NaN values are equated (i.e. NaN is considered the same as NaN, even though NaN !== NaN).

Constructor

Creates a new Set object.

Static properties

The constructor function that is used to create derived objects.

Instance properties

Returns the number of values in the Set object.

Instance methods

Appends value to the Set object. Returns the Set object with added value.

Removes all elements from the Set object.

Removes the element associated to the value and returns a boolean asserting whether an element was successfully removed or not. Set.prototype.has(value) will return false afterwards.

Returns a boolean asserting whether an element is present with the given value in the Set object or not.

Iteration methods

Returns a new iterator object that yields the values for each element in the Set object in insertion order.

Returns a new iterator object that yields the values for each element in the Set object in insertion order. (For Sets, this is the same as the values() method.)

Returns a new iterator object that yields the values for each element in the Set object in insertion order. (For Sets, this is the same as the keys() method.)

Returns a new iterator object that contains an array of [value, value] for each element in the Set object, in insertion order.

This is similar to the  object, so that each entry's key is the same as its value for a Set.

Calls callbackFn once for each value present in the Set object, in insertion order. If a thisArg parameter is provided, it will be used as the this value for each invocation of callbackFn.

Examples

Using the Set object

let mySet = new Set()

mySet.add(1)           // Set [ 1 ]

mySet.add(5)           // Set [ 1, 5 ]

mySet.add(5)           // Set [ 1, 5 ]

mySet.add('some text') // Set [ 1, 5, 'some text' ]

let o = {a: 1, b: 2}

mySet.add(o)

mySet.add({a: 1, b: 2})   // o is referencing a different object, so this is okay

mySet.has(1)              // true

mySet.has(3)              // false, since 3 has not been added to the set

mySet.has(5)              // true

mySet.has(Math.sqrt(25))  // true

mySet.has('Some Text'.toLowerCase()) // true

mySet.has(o)       // true

mySet.size         // 5

mySet.delete(5)    // removes 5 from the set

mySet.has(5)       // false, 5 has been removed

mySet.size         // 4, since we just removed one value

console.log(mySet)

// logs Set(4) [ 1, "some text", {…}, {…} ] in Firefox

// logs Set(4) { 1, "some text", {…}, {…} } in Chrome

Iterating Sets

// iterate over items in set

// logs the items in the order: 1, "some text", {"a": 1, "b": 2}, {"a": 1, "b": 2}

for (let item of mySet) console.log(item)

// logs the items in the order: 1, "some text", {"a": 1, "b": 2}, {"a": 1, "b": 2}

for (let item of mySet.keys()) console.log(item)

// logs the items in the order: 1, "some text", {"a": 1, "b": 2}, {"a": 1, "b": 2}

for (let item of mySet.values()) console.log(item)

// logs the items in the order: 1, "some text", {"a": 1, "b": 2}, {"a": 1, "b": 2}

// (key and value are the same here)

for (let [key, value] of mySet.entries()) console.log(key)

// convert Set object to an Array object, with Array.from

let myArr = Array.from(mySet) // [1, "some text", {"a": 1, "b": 2}, {"a": 1, "b": 2}]

// the following will also work if run in an HTML document

mySet.add(document.body)

mySet.has(document.querySelector('body')) // true

// converting between Set and Array

mySet2 = new Set([1, 2, 3, 4])

mySet2.size                    // 4

[...mySet2]                    // [1, 2, 3, 4]

// intersect can be simulated via

let intersection = new Set([...set1].filter(x => set2.has(x)))

// difference can be simulated via

let difference = new Set([...set1].filter(x => !set2.has(x)))

// Iterate set entries with forEach()

mySet.forEach(function(value) {

console.log(value)

})

// 1

// 2

// 3

// 4

Implementing basic set operations

function isSuperset(set, subset) {

for (let elem of subset) {

if (!set.has(elem)) {

return false

}

}

return true

}

function union(setA, setB) {

let _union = new Set(setA)

for (let elem of setB) {

_union.add(elem)

}

return _union

}

function intersection(setA, setB) {

let _intersection = new Set()

for (let elem of setB) {

if (setA.has(elem)) {

_intersection.add(elem)

}

}

return _intersection

}

function symmetricDifference(setA, setB) {

let _difference = new Set(setA)

for (let elem of setB) {

if (_difference.has(elem)) {

_difference.delete(elem)

} else {

_difference.add(elem)

}

}

return _difference

}

function difference(setA, setB) {

let _difference = new Set(setA)

for (let elem of setB) {

_difference.delete(elem)

}

return _difference

}

// Examples

let setA = new Set([1, 2, 3, 4])

let setB = new Set([2, 3])

let setC = new Set([3, 4, 5, 6])

isSuperset(setA, setB)          // => true

union(setA, setC)               // => Set [1, 2, 3, 4, 5, 6]

intersection(setA, setC)        // => Set [3, 4]

symmetricDifference(setA, setC) // => Set [1, 2, 5, 6]

difference(setA, setC)          // => Set [1, 2]

Relation with Array objects

let myArray = ['value1', 'value2', 'value3']

// Use the regular Set constructor to transform an Array into a Set

let mySet = new Set(myArray)

mySet.has('value1')     // returns true

// Use the spread operator to transform a set into an Array.

console.log([...mySet]) // Will show you exactly the same Array as myArray

Remove duplicate elements from the array

// Use to remove duplicate elements from the array

const numbers = [2,3,4,4,2,3,3,4,4,5,5,6,6,7,5,32,3,4,5]

console.log([...new Set(numbers)])

// [2, 3, 4, 5, 6, 7, 32]

Relation with Strings

let text = 'India'

let mySet = new Set(text)  // Set ['I', 'n', 'd', 'i', 'a']

mySet.size  // 5

//case sensitive & duplicate ommision

new Set("Firefox")  // Set(7) [ "F", "i", "r", "e", "f", "o", "x" ]

new Set("firefox")  // Set(6) [ "f", "i", "r", "e", "o", "x" ]

Use Set to ensure the uniqueness of a list of values

const array = Array

.from(document.querySelectorAll('[id]'))

.map(function(e) {

return e.id

});

const set = new Set(array);

console.assert(set.size == array.length);

Specifications

Specification

Browser compatibility

See also