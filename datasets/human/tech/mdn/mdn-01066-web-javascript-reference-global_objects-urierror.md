# URIError

The URIError object represents an error when a global URI handling function was used in a wrong way.

Constructor

Creates a new URIError object.

Instance properties

Error message. Although ECMA-262 specifies that  should provide its own message property, in SpiderMonkey, it inherits .

Error name. Inherited from .

Path to file that raised this error. Inherited from .

Line number in file that raised this error. Inherited from .

Column number in line that raised this error. Inherited from .

Stack trace. Inherited from .

Examples

Catching an URIError

try {

decodeURIComponent('%')

} catch (e) {

console.log(e instanceof URIError)  // true

console.log(e.message)              // "malformed URI sequence"

console.log(e.name)                 // "URIError"

console.log(e.fileName)             // "Scratchpad/1"

console.log(e.lineNumber)           // 2

console.log(e.columnNumber)         // 2

console.log(e.stack)                // "@Scratchpad/2:2:3\n"

}

Creating an URIError

try {

throw new URIError('Hello', 'someFile.js', 10)

} catch (e) {

console.log(e instanceof URIError)  // true

console.log(e.message)              // "Hello"

console.log(e.name)                 // "URIError"

console.log(e.fileName)             // "someFile.js"

console.log(e.lineNumber)           // 10

console.log(e.columnNumber)         // 0

console.log(e.stack)                // "@Scratchpad/2:2:9\n"

}

Specifications

Specification

Browser compatibility

See also