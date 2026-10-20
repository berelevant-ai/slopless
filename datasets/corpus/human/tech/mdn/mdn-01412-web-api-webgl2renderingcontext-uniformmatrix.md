# WebGL2RenderingContext.uniformMatrix[234]x[234]fv()

The WebGL2RenderingContext.uniformMatrix[234]x[234]fv() methods of the WebGL 2 API specify matrix values for uniform variables.

There are no 2x2, 3x3, and 4x4 versions of this method. They are abbreviated in 2, 3, and 4, respectively. See the syntax below.

Syntax

void gl.uniformMatrix2fv(location, transpose, data, optional srcOffset, optional srcLength);

void gl.uniformMatrix3x2fv(location, transpose, data, optional srcOffset, optional srcLength);

void gl.uniformMatrix4x2fv(location, transpose, data, optional srcOffset, optional srcLength);

void gl.uniformMatrix2x3fv(location, transpose, data, optional srcOffset, optional srcLength);

void gl.uniformMatrix3fv(location, transpose, data, optional srcOffset, optional srcLength);

void gl.uniformMatrix4x3fv(location, transpose, data, optional srcOffset, optional srcLength);

void gl.uniformMatrix2x4fv(location, transpose, data, optional srcOffset, optional srcLength);

void gl.uniformMatrix3x4fv(location, transpose, data, optional srcOffset, optional srcLength);

void gl.uniformMatrix4fv(location, transpose, data, optional srcOffset, optional srcLength);

Parameters

location

A  object containing the location of the uniform attribute to modify.

transpose

A  specifying whether to transpose the matrix. Must be false.

data

A  of float values.

Return value

None.

Examples

gl.uniformMatrix2x3fv(loc, false, [1, 2, 3, 4, 5, 6]);

Specifications

Specification

Status

Comment

Initial definition for WebGL.

Man page of the (similar) OpenGL API.

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also