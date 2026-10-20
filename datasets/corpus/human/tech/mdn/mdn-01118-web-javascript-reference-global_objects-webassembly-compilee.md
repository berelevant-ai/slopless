# WebAssembly.CompileError

The WebAssembly.CompileError object indicates an error during WebAssembly decoding or validation.

Constructor

WebAssembly.CompileError()

Creates a new WebAssembly.CompileError object.

Instance properties

Error message. Although ECMA-262 specifies that  should provide its own message property, in SpiderMonkey, it inherits .

Error name. Inherited from .

Path to file that raised this error. Inherited from .

Line number in file that raised this error. Inherited from .

Column number in line that raised this error. Inherited from .

Stack trace. Inherited from .

Instance methods

Returns code that could eval to the same error. Inherited from .

Returns a string representing the specified Error object.. Inherited from .

Examples

Creating a new CompileError instance

The following snippet creates a new CompileError instance, and logs its details to the console:

try {

throw new WebAssembly.CompileError('Hello', 'someFile', 10);

} catch (e) {

console.log(e instanceof CompileError); // true

console.log(e.message);                 // "Hello"

console.log(e.name);                    // "CompileError"

console.log(e.fileName);                // "someFile"

console.log(e.lineNumber);              // 10

console.log(e.columnNumber);            // 0

console.log(e.stack);                   // returns the location where the code was run

}

Specifications

Specification

Browser compatibility

See also

WebAssembly overview page

WebAssembly concepts

Using the WebAssembly JavaScript API