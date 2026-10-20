# handler.has()

The handler.has() method is a trap for the  operator.

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone https://github.com/mdn/interactive-examples and send us a pull request.

Syntax

const p = new Proxy(target, {

has: function(target, prop) {

}

});

Parameters

The following parameters are passed to has() method. this is bound to the handler.

target

The target object.

prop

The name or  of the property to check for existence.

Return value

The has() method must return a boolean value.

Description

The handler.has() method is a trap for the  operator.

Interceptions

This trap can intercept these operations:

Property query: foo in proxy

Inherited property query: foo in Object.create(proxy)

with check: with(proxy) { (foo); }

Invariants

If the following invariants are violated, the proxy will throw a :

A property cannot be reported as non-existent, if it exists as a non-configurable own property of the target object.

A property cannot be reported as non-existent, if it exists as an own property of the target object and the target object is not extensible.

Examples

Trapping the in operator

The following code traps the  operator.

const p = new Proxy({}, {

has: function(target, prop) {

console.log('called: ' + prop);

return true;

}

});

console.log('a' in p); // "called: a"

// true

The following code violates an invariant.

const obj = { a: 10 };

Object.preventExtensions(obj);

const p = new Proxy(obj, {

has: function(target, prop) {

return false;

}

});

'a' in p; // TypeError is thrown

Specifications

Specification

Browser compatibility

See also

operator