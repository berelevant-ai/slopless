# Reflect.ownKeys()

The static Reflect.ownKeys() method returns an array of the target object's own property keys.

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone https://github.com/mdn/interactive-examples and send us a pull request.

Syntax

Reflect.ownKeys(target)

Parameters

target

The target object from which to get the own keys.

Return value

An  of the target object's own property keys.

Exceptions

A , if target is not an .

Description

The Reflect.ownKeys method returns an array of the target object's own property keys. Its return value is equivalent to .concat().

Examples

Using Reflect.ownKeys()

Reflect.ownKeys({z: 3, y: 2, x: 1})  // [ "z", "y", "x" ]

Reflect.ownKeys([])                  // ["length"]

let sym = Symbol.for('comet')

let sym2 = Symbol.for('meteor')

let obj = {[sym]: 0, 'str': 0, '773': 0, '0': 0,

[sym2]: 0, '-1': 0, '8': 0, 'second str': 0}

Reflect.ownKeys(obj)

// [ "0", "8", "773", "str", "-1", "second str", Symbol(comet), Symbol(meteor) ]

// Indexes in numeric order,

// strings in insertion order,

// symbols in insertion order

Specifications

Specification

Browser compatibility

See also