# WebGLRenderingContext.getShaderInfoLog()

The WebGLRenderingContext.getShaderInfoLog returns the information log for the specified  object. It contains warnings, debugging and compile information.

Syntax

gl.getShaderInfoLog(shader);

Parameters

shader

A  to query.

Return value

A  that contains diagnostic messages, warning messages, and other information about the last compile operation. When a  object is initially created, its information log will be a string of length 0.

Examples

Checking compilation messages

/* load shader source code. */

gl.shaderSource(shader, shaderCode);

/* compile shader source code. */

gl.compileShader(shader);

var message = gl.getShaderInfoLog(shader);

if (message.length > 0) {

/* message may be an error or a warning */

throw message;

}

Specifications

Specification

Status

Comment

Initial definition.

Man page of the OpenGL API.

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also

– used with gl.COMPILE_STATUS to check for a failed compile.