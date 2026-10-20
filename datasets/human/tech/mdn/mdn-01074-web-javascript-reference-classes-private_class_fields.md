# Private class fields

Class properties are public by default and can be examined or modified outside the class. There is however a stage 3 proposal to allow defining private class fields using a hash # prefix.

Syntax

class ClassWithPrivateField {

#privateField

}

class ClassWithPrivateMethod {

#privateMethod() {

return 'hello world'

}

}

class ClassWithPrivateStaticField {

static #PRIVATE_STATIC_FIELD

}

Examples

Private static fields

Private fields are accessible on the class constructor from inside the class declaration itself.

The limitation of static variables being called by only static methods still holds.

class ClassWithPrivateStaticField {

static #PRIVATE_STATIC_FIELD

static publicStaticMethod() {

ClassWithPrivateStaticField.#PRIVATE_STATIC_FIELD = 42

return ClassWithPrivateStaticField.#PRIVATE_STATIC_FIELD

}

}

console.assert(ClassWithPrivateStaticField.publicStaticMethod() === 42)

Private static fields are added to the class constructor at class evaluation time.

There is a provenance restriction on private static fields. Only the class which defines the private static field can access the field.

This can lead to unexpected behavior when using this.

class BaseClassWithPrivateStaticField {

static #PRIVATE_STATIC_FIELD

static basePublicStaticMethod() {

this.#PRIVATE_STATIC_FIELD = 42

return this.#PRIVATE_STATIC_FIELD

}

}

class SubClass extends BaseClassWithPrivateStaticField { }

let error = null

try {

SubClass.basePublicStaticMethod()

} catch(e) { error = e}

console.assert(error instanceof TypeError)

Private instance fields

Private instance fields are declared with # names (pronounced "hash names"), which are identifiers prefixed with #. The # is a part of the name itself. It is used for declaration and accessing as well.

The encapsulation is enforced by the language. It is a syntax error to refer to # names from out of scope.

class ClassWithPrivateField {

#privateField

constructor() {

this.#privateField = 42

this.#randomField = 444 // Syntax error

}

}

const instance = new ClassWithPrivateField()

instance.#privateField === 42 // Syntax error

Private methods

Private static methods

Like their public equivalent, private static methods are called on the class itself, not instances of the class. Like private static fields, they are only accessible from inside the class declaration.

Private static methods may be generator, async, and async generator functions.

class ClassWithPrivateStaticMethod {

static #privateStaticMethod() {

return 42

}

static publicStaticMethod1() {

return ClassWithPrivateStaticMethod.#privateStaticMethod();

}

static publicStaticMethod2() {

return this.#privateStaticMethod();

}

}

console.assert(ClassWithPrivateStaticMethod.publicStaticMethod1() === 42);

console.assert(ClassWithPrivateStaticMethod.publicStaticMethod2() === 42);

This can lead to unexpected behavior when using this. In the following example this refers to the Derived class (not the Base class) when we try to call Derived.publicStaticMethod2(), and thus exhibits the same "provenance restriction" as mentioned above:

class Base {

static #privateStaticMethod() {

return 42;

}

static publicStaticMethod1() {

return Base.#privateStaticMethod();

}

static publicStaticMethod2() {

return this.#privateStaticMethod();

}

}

class Derived extends Base {}

console.log(Derived.publicStaticMethod1()); // 42

console.log(Derived.publicStaticMethod2()); // TypeError

Private instance methods

Private instance methods are methods available on class instances whose access is restricted in the same manner as private instance fields.

class ClassWithPrivateMethod {

#privateMethod() {

return 'hello world'

}

getPrivateMessage() {

return this.#privateMethod()

}

}

const instance = new ClassWithPrivateMethod()

console.log(instance.getPrivateMessage())

// expected output: "hello world"

Private instance methods may be generator, async, or async generator functions. Private getters and setters are also possible:

class ClassWithPrivateAccessor {

#message

get #decoratedMessage() {

return `✨${this.#message}✨`

}

set #decoratedMessage(msg) {

this.#message = msg

}

constructor() {

this.#decoratedMessage = 'hello world'

console.log(this.#decoratedMessage)

}

}

new ClassWithPrivateAccessor();

// expected output: "✨hello world✨"

Specifications

Specification

Browser compatibility

See also

Public class fields

The Semantics of All JS Class Elements