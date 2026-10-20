# Array.prototype.values()

The values() method returns a new Array Iterator object that contains the values for each index in the array.

Syntax

arr.values()

Return value

A new  iterator object.

Examples

Iteration using for...of loop

var arr = ['a', 'b', 'c', 'd', 'e'];

var iterator = arr.values();

for (let letter of iterator) {

console.log(letter);

}  //"a" "b" "c" "d" "e"

Array.prototype.values is default implementation of Array.prototype[Symbol.iterator].

Array.prototype.values === Array.prototype[Symbol.iterator]      //true

Iteration using .next()

var arr = ['a', 'b', 'c', 'd', 'e'];

var iterator = arr.values();

iterator.next();               // Object { value: "a", done: false }

iterator.next().value;         // "b"

iterator.next()["value"];      // "c"

iterator.next();               // Object { value: "d", done: false }

iterator.next();               // Object { value: "e", done: false }

iterator.next();               // Object { value: undefined, done: true }

iteraror.next().value;         // undefined

One-use: the array iterator object is one use or temporary object

example:

var arr = ['a', 'b', 'c', 'd', 'e'];

var iterator = arr.values();

for (let letter of iterator) {

console.log(letter);

} //"a" "b" "c" "d" "e"

for (let letter of iterator) {

console.log(letter);

} // undefined

reason: When next().done=true  or  currentIndex>length the for..of loop ends. See Iteration protocols.

Value: there are no values stored in the array Iterator object; instead it stores the address of the array used in its creation and so depends on the values stored in that array.

var arr = ['a', 'b', 'c', 'd', 'e'];

var iterator = arr.values();

console.log(iterator);        // Array Iterator {  }

iterator.next().value;        // "a"

arr[1]='n';

iterator.next().value;        //  "n"

if the values in the array changed the array iterator object values change too.

TODO: please write about why we need it, use cases.

Specifications

Specification

Browser compatibility

See also