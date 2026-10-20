# Default parameters

Default function parameters allow named parameters to be initialized with default values if no value or undefined is passed.

Syntax

function [name]([param1[ = defaultValue1 ][, ..., paramN[ = defaultValueN ]]]) {

statements

}

Description

In JavaScript, function parameters default to . However, it's often useful to set a different default value. This is where default parameters can help.

In the past, the general strategy for setting defaults was to test parameter values in the function body and assign a value if they are undefined.

In the following example, if no value is provided for b when multiply is called, b's value would be undefined when evaluating a * b and multiply would return NaN.

function multiply(a, b) {

return a * b

}

multiply(5, 2)  // 10

multiply(5)     // NaN !

To guard against this, something like the second line would be used, where b is set to 1 if multiply is called with only one argument:

function multiply(a, b) {

b = (typeof b !== 'undefined') ?  b : 1

return a * b

}

multiply(5, 2)  // 10

multiply(5)     // 5

With default parameters in ES2015, checks in the function body are no longer necessary. Now, you can assign 1 as the default value for b in the function head:

function multiply(a, b = 1) {

return a * b

}

multiply(5, 2)          // 10

multiply(5)             // 5

multiply(5, undefined)  // 5

Examples

Passing undefined vs. other falsy values

In the second call in this example, even if the first argument is set explicitly to undefined (though not null or other  values), the value of the num argument is still the default.

function test(num = 1) {

console.log(typeof num)

}

test()           // 'number' (num is set to 1)

test(undefined)  // 'number' (num is set to 1 too)

// test with other falsy values:

test('')         // 'string' (num is set to '')

test(null)       // 'object' (num is set to null)

Evaluated at call time

The default argument is evaluated at call time. So, unlike (for example) Python, a new object is created each time the function is called.

function append(value, array = []) {

array.push(value)

return array

}

append(1)  // [1]

append(2)  // [2], not [1, 2]

This even applies to functions and variables:

function callSomething(thing = something()) {

return thing

}

let numberOfTimesCalled = 0

function something() {

numberOfTimesCalled += 1

return numberOfTimesCalled

}

callSomething()  // 1

callSomething()  // 2

Earlier parameters are available to later default parameters

Parameters defined earlier (to the left) are available to later default parameters:

function greet(name, greeting, message = greeting + ' ' + name) {

return [name, greeting, message]

}

greet('David', 'Hi')                     // ["David", "Hi", "Hi David"]

greet('David', 'Hi', 'Happy Birthday!')  // ["David", "Hi", "Happy Birthday!"]

This functionality can be approximated like this, which demonstrates how many edge cases are handled:

function go() {

return ':P'

}

function withDefaults(a, b = 5, c = b, d = go(), e = this,

f = arguments, g = this.value) {

return [a, b, c, d, e, f, g]

}

function withoutDefaults(a, b, c, d, e, f, g) {

switch (arguments.length) {

case 0:

a;

case 1:

b = 5;

case 2:

c = b;

case 3:

d = go();

case 4:

e = this;

case 5:

f = arguments;

case 6:

g = this.value;

default:

}

return [a, b, c, d, e, f, g];

}

withDefaults.call({value: '=^_^='});

// [undefined, 5, 5, ":P", {value:"=^_^="}, arguments, "=^_^="]

withoutDefaults.call({value: '=^_^='});

// [undefined, 5, 5, ":P", {value:"=^_^="}, arguments, "=^_^="]

Scope Effects

If default parameters are defined for one or more parameter, then a second scope (Environment Record) is created, specifically for the identifiers within the parameter list. This scope is a parent of the scope created for the function body.

This means that functions and variables declared in the function body cannot be referred to from default value parameter initializers; attempting to do so throws a run-time .

It also means that variables declared inside the function body using var will mask parameters of the same name, instead of the usual behavior of duplicate var declarations having no effect.

The following function will throw a ReferenceError when invoked, because the default parameter value does not have access to the child scope of the function body:

function f(a = go()) { // Throws a `ReferenceError` when `f` is invoked.

function go() { return ':P' }

}

...and this function will print undefined because variable var a is hoisted only to the top of the scope created for the function body (and not the parent scope created for the parameter list):

function f(a, b = () => console.log(a)) {

var a = 1

b() // Prints `undefined`, because default parameter values exist in their own scope

}

Parameters without defaults after default parameters

Parameters are still set left-to-right, overwriting default parameters even if there are later parameters without defaults.

function f(x = 1, y) {

return [x, y]

}

f()   // [1, undefined]

f(2)  // [2, undefined]

Destructured parameter with default value assignment

You can use default value assignment with the  notation:

function f([x, y] = [1, 2], {z: z} = {z: 3}) {

return x + y + z

}

f()  // 6

Specifications

Specification

Browser compatibility

See also

Original proposal at ecmascript.org