# WEBGL_multi_draw.multiDrawElementsWEBGL()

The WEBGL_multi_draw.multiDrawElementsWEBGL() method of the

WebGL API renders multiple primitives from array data. It is

identical to multiple calls to the

gl.drawElements() method.

Syntax

void ext.multiDrawElementsWEBGL(mode,

countsList, countsOffset,

type,

firstsList, firstsOffset,

drawCount);

Parameters

mode

A GLenum

specifying the type primitive to render. Possible values are:

gl.POINTS: Draws a single dot.

gl.LINE_STRIP: Draws a straight line to the next vertex.

gl.LINE_LOOP: Draws a straight line to the next vertex, and connects the

last vertex back to the first.

gl.LINES: Draws a line between a pair of vertices.

gl.TRIANGLE_STRIP

gl.TRIANGLE_FAN

gl.TRIANGLES: Draws a triangle for a group of three vertices.

countsList

An Int32Array

or Array

(of GLint)

specifying a list of numbers of indices to be rendered.

countsOffset

A GLUint

defining the starting point into the countsList array.

type

A GLenum specifying the type of the values in the element array buffer. Possible values are:

gl.UNSIGNED_BYTE

gl.UNSIGNED_SHORT

When using the OES_element_index_uint extension:

gl.UNSIGNED_INT

offsetsList

An Int32Array

or Array

(of GLsizei)

specifying a list of starting indices for the arrays of vector points.

offsetsOffset

A GLuint

defining the starting point into the offsetsList array.

drawCount

A GLsizei

specifying the number of instances of the range of elements to execute.

Return value

None.

Exceptions

If mode is not one of the accepted values, a gl.INVALID_ENUM error is thrown.

If drawCount or items in countsList or offsetsList are negative,

a gl.INVALID_VALUE error is thrown.

Examples

// let counts = new Int32Array(...);

// let offsets = new Int32Array(...);

ext.multiDrawElementsWEBGL(

gl.TRIANGLES, counts, 0, gl.UNSIGNED_SHORT, offsets, 0, counts.length);

}

Specifications

Specification

Browser compatibility

The compatibility table in this page is generated from structured data.

If you'd like to contribute to the data, please check out

https://github.com/mdn/browser-compat-data

and send us a pull request.

See also

WebGLRenderingContext.drawElements()

WebGL2RenderingContext.drawElementsInstanced()