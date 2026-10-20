# Set.prototype.entries()

The entries() method returns a new Iterator object that contains an array of [value, value] for each element in the Set object, in insertion order. For Set objects there is no key like in Map objects. However, to keep the API similar to the Map object, each entry has the same value for its key and value here, so that an array [value, value] is returned.

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone https://github.com/mdn/interactive-examples and send us a pull request.

Syntax

mySet.entries()

Return value

A new iterator object that contains an array of [value, value] for each element in the given Set, in insertion order.

Examples

Using entries()

var mySet = new Set();

mySet.add('foobar');

mySet.add(1);

mySet.add('baz');

var setIter = mySet.entries();

console.log(setIter.next().value); // ["foobar", "foobar"]

console.log(setIter.next().value); // [1, 1]

console.log(setIter.next().value); // ["baz", "baz"]

Specifications

Specification

Browser compatibility

See also