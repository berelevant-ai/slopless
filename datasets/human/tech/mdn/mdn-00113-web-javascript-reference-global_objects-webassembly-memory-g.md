# WebAssembly.Memory.prototype.grow()

The grow() protoype method of the Memory object increases the size of the memory instance by a specified number of WebAssembly pages.

Syntax

memory.grow(number);

Parameters

number

The number of WebAssembly pages you want to grow the memory by (each one is 64KiB in size).

Return value

The previous size of the memory, in units of WebAssembly pages.

Examples

Using grow

The following example creates a new WebAssembly Memory instance with an initial size of 1 page (64KiB), and a maximum size of 10 pages (640KiB).

var memory = new WebAssembly.Memory({initial:1, maximum:10});

We can then grow the instance by one page like so:

const bytesPerPage = 64 * 1024;

console.log(memory.buffer.byteLength / bytesPerPage);  // "1"

console.log(memory.grow(1));                           // "1"

console.log(memory.buffer.byteLength / bytesPerPage);  // "2"

Note the return value of grow() here is the previous number of WebAssembly pages.

Specifications

Specification

Browser compatibility

See also

WebAssembly overview page

WebAssembly concepts

Using the WebAssembly JavaScript API