# Function.arguments

The function.arguments property refers to an array-like object corresponding to the arguments passed to a function. Use the simple variable  instead. This property is restricted to non-strict functions.

Description

The syntax function.arguments is deprecated. The recommended way to access the  object available within functions is to refer to the variable .

In the case of recursion, i.e. if function f appears several times on the call stack, the value of f.arguments represents the arguments corresponding to the most recent invocation of the function.

The value of the arguments property is normally null if there is no outstanding invocation of the function in progress (that is, the function has been called but has not yet returned.

Examples

Using the arguments object

function f(n) { g(n - 1) }

function g(n) {

console.log('before: ' + g.arguments[0])

if (n > 0) { f(n) }

console.log('after: ' + g.arguments[0])

}

f(2)

console.log('returned: ' + g.arguments)

// Output

// before: 1

// before: 0

// after: 0

// after: 1

// returned: null

Specifications

Not part of any standard. Deprecated in favor of  in ECMAScript 3.

Browser compatibility

See also

object