# WebGLRenderingContext.lineWidth()

The WebGLRenderingContext.lineWidth() method of the WebGL API sets the line width of rasterized lines.

The webgl spec, based on the OpenGL ES 2.0/3.0 specs points out that the minimum and maximum width for a line is implementation defined. The maximum minimum width is allowed to be 1.0. The minimum maximum width is also allowed to be 1.0. Because of these implementation defined limits it is not recommended to use line widths other than 1.0 since there is no guarantee any user's browser will display any other width.

As of January 2017 most implementations of WebGL only support a minimum of 1 and a maximum of 1 as the technology they are based on has these same limits.

Syntax

void gl.lineWidth(width);

Parameters

width

A  specifying the width of rasterized lines. Default value: 1.

Return value

None.

Examples

Setting the line width:

gl.lineWidth(5);

Getting the line width:

gl.getParameter(gl.LINE_WIDTH);

Getting the range of available widths. Returns a .

gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE);

Specifications

Specification

Status

Comment

Initial definition.

Man page of the OpenGL API.

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also