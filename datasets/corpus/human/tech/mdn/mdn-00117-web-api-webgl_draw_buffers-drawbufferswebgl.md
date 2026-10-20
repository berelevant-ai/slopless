# WEBGL_draw_buffers.drawBuffersWEBGL()

The WEBGL_draw_buffers.drawBuffersWEBGL() method is part of the WebGL API and allows you to define the draw buffers to which all fragment colors are written.

This method is part of the  extension.

Note: When using , this method is available as  by default and the constants are named gl.COLOR_ATTACHMENT1 etc. without the "WEBGL" suffix.

Syntax

void gl.getExtension('WEBGL_draw_buffers').drawBuffersWEBGL(buffers);

Parameters

buffers

An  of  constants defining drawing buffers. Possible values:

gl.NONE: The fragment shader is not written to any color buffer.

gl.BACK: The fragment shader is written to the back color buffer.

ext.COLOR_ATTACHMENT0_WEBGL The fragment shader is written the nth color attachment of the framebuffer.

ext.COLOR_ATTACHMENT1_WEBGL

ext.COLOR_ATTACHMENT2_WEBGL

ext.COLOR_ATTACHMENT3_WEBGL

ext.COLOR_ATTACHMENT4_WEBGL

ext.COLOR_ATTACHMENT5_WEBGL

ext.COLOR_ATTACHMENT6_WEBGL

ext.COLOR_ATTACHMENT7_WEBGL

ext.COLOR_ATTACHMENT8_WEBGL

ext.COLOR_ATTACHMENT9_WEBGL

ext.COLOR_ATTACHMENT10_WEBGL

ext.COLOR_ATTACHMENT11_WEBGL

ext.COLOR_ATTACHMENT12_WEBGL

ext.COLOR_ATTACHMENT13_WEBGL

ext.COLOR_ATTACHMENT14_WEBGL

ext.COLOR_ATTACHMENT15_WEBGL

Return value

None.

Examples

See  for more context with this example code.

ext.drawBuffersWEBGL([

ext.COLOR_ATTACHMENT0_WEBGL, // gl_FragData[0]

ext.COLOR_ATTACHMENT1_WEBGL, // gl_FragData[1]

ext.COLOR_ATTACHMENT2_WEBGL, // gl_FragData[2]

ext.COLOR_ATTACHMENT3_WEBGL  // gl_FragData[3]

]);

Specifications

Specification

Status

Comment

Initial definition.

Man page of the (similar) OpenGL API.

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also

,

,

WebGL deferred shading - Mozilla Hacks blog