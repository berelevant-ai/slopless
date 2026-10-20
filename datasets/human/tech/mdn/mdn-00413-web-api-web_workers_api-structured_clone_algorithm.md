# The structured clone algorithm

The structured clone algorithm copies complex JavaScript objects. It is used internally to transfer data between Workers via , storing objects with IndexedDB, or copying objects for other APIs. It clones by recursing through the input object while maintaining a map of previously visited references, to avoid infinitely traversing cycles.

Things that don't work with structured clone

Function objects cannot be duplicated by the structured clone algorithm; attempting to throws a DATA_CLONE_ERR exception.

Cloning DOM nodes likewise throws a DATA_CLONE_ERR exception.

Certain object properties are not preserved:

The lastIndex property of RegExp objects is not preserved.

Property descriptors, setters, getters, and similar metadata-like features are not duplicated. For example, if an object is marked readonly with a property descriptor, it will be read/write in the duplicate, since that's the default.

The prototype chain is not walked or duplicated.

Note: Native Error types can be cloned in Chrome, and Firefox is working on it.

Supported types

Object type

Notes

All primitive types

However, not symbols.

Boolean objects

String objects

Date

RegExp

lastIndex is not preserved.

ArrayBuffer

ArrayBufferView

Including other typed arrays.

Array

Object

Only plain objects (e.g. from object literals)

Map

Set

See also

HTML Specification: Safe passing of structured data

Web Workers

IndexedDB

Components.utils.cloneInto