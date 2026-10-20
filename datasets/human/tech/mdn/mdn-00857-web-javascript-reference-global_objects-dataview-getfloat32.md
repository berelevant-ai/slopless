# DataView.prototype.getFloat32()

The getFloat32() method gets a signed 32-bit float (float) at the specified byte offset from the start of the .

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone https://github.com/mdn/interactive-examples and send us a pull request.

Syntax

dataview.getFloat32(byteOffset [, littleEndian])

Parameters

byteOffset

The offset, in byte, from the start of the view where to read the data.

littleEndian

Indicates whether the 32-bit float is stored in  format. If false or undefined, a big-endian value is read.

Return value

A signed 32-bit float number.

Errors thrown

Thrown if the byteOffset is set such as it would read beyond the end of the view.

Description

There is no alignment constraint; multi-byte values may be fetched from any offset.

Examples

Using the getFloat32 method

var buffer = new ArrayBuffer(8);

var dataview = new DataView(buffer);

dataview.getFloat32(1); // 0

Specifications

Specification

Browser compatibility

See also