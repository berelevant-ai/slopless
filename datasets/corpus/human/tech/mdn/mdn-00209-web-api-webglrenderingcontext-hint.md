# WebGLRenderingContext.hint()

The WebGLRenderingContext.hint() method of the WebGL API specifies hints for certain behaviors. The interpretation of these hints depend on the implementation.

Syntax

void gl.hint(target, mode);

Parameters

target

Sets which behavior to be controlled. Possible values:

gl.GENERATE_MIPMAP_HINT: Quality of filtering when generating mipmap images with .

When using the  extension:

ext.FRAGMENT_SHADER_DERIVATIVE_HINT_OES: Accuracy of the derivative calculation for the GLSL built-in functions: dFdx, dFdy, and fwidth.

When using a , the following values are available additionally:

gl.FRAGMENT_SHADER_DERIVATIVE_HINT: Same as ext.FRAGMENT_SHADER_DERIVATIVE_HINT_OES

mode

Sets the behavior. The default value is gl.DONT_CARE. The possible values are:

gl.FASTEST: The most efficient behavior should be used.

gl.NICEST: The most correct or the highest quality option should be used.

gl.DONT_CARE: There is no preference for this behavior.

Return value

None.

Examples

The following example hints that the quality of filtering when generating mipmap images should be most efficient instead of best quality.

gl.hint(gl.GENERATE_MIPMAP_HINT, gl.FASTEST);

Specifications

Specification

Status

Comment

Initial definition.

Man page of the OpenGL API.

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also