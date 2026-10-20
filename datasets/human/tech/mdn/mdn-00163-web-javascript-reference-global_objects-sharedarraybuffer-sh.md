# SharedArrayBuffer() constructor

Note that SharedArrayBuffer was disabled by default in all major browsers on 5 January, 2018 in response to Spectre. Chrome re-enabled it in v67 on platforms where its site-isolation feature is enabled to protect against Spectre-style vulnerabilities.

The SharedArrayBuffer() constructor is used to create a  object representing a generic, fixed-length raw binary data buffer, similar to the  object.

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone https://github.com/mdn/interactive-examples and send us a pull request.

Syntax

new SharedArrayBuffer([length])

Parameters

length

The size, in bytes, of the array buffer to create.

Return value

A new SharedArrayBuffer object of the specified size. Its contents are initialized to 0.

Examples

Always use the new operator to create a SharedArrayBuffer

SharedArrayBuffer constructors are required to be constructed with a  operator. Calling a SharedArrayBuffer constructor as a function without new will throw a .

var sab = SharedArrayBuffer(1024);

// TypeError: calling a builtin SharedArrayBuffer constructor

// without new is forbidden

var sab = new SharedArrayBuffer(1024);

Specifications

Specification

Browser compatibility

See also

JavaScript typed arrays