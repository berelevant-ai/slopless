# WebGLRenderingContext.uniformMatrix[234]fv()

The WebGLRenderingContext.uniformMatrix[234]fv() methods of the WebGL API specify matrix values for uniform variables.

The three versions of this method (uniformMatrix2fv(), uniformMatrix3fv(), and uniformMatrix4fv()) take as the input value 2-component, 3-component, and 4-component square matrices, respectively.  They are expected to have 4, 9 or 16 floats.

Syntax

WebGLRenderingContext.uniformMatrix2fv(location, transpose, value);

WebGLRenderingContext.uniformMatrix3fv(location, transpose, value);

WebGLRenderingContext.uniformMatrix4fv(location, transpose, value);

Parameters

location

A  object containing the location of the uniform attribute to modify. The location is obtained using .

transpose

A  specifying whether to transpose the matrix. Must be false.

value

A  or sequence of GLfloat values. The values are assumed to be supplied in column major order.

Return value

undefined

Examples

gl.uniformMatrix2fv(loc, false, [2,1, 2,2]);

Specifications

Specification

Status

Comment

Initial definition.

Man page of the OpenGL API.

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also

– WebGL 2 versions of these methods.