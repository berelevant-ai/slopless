# WebGL2RenderingContext.invalidateSubFramebuffer()

The WebGL2RenderingContext.invalidateSubFramebuffer() method of the WebGL 2 API invalidates portions of the contents of attachments in a framebuffer.

Syntax

void gl.invalidateSubFramebuffer(target, attachments, x, y, width, height);

Parameters

target

A  specifying the binding point (target). Possible values:

gl.FRAMEBUFFER: Collection buffer data storage of color, alpha, depth and stencil buffers used to render an image.

gl.DRAW_FRAMEBUFFER: Equivalent to gl.FRAMEBUFFER.

gl.READ_FRAMEBUFFER: Used as a source for reading operations.

attachments

An  of  specifying the attachment points to invalidate. Possible values:

gl.COLOR_ATTACHMENT{0-15}: Invalidates one of the framebuffer's color buffers.

gl.DEPTH_ATTACHMENT: Invalidates the framebuffer's depth buffer.

gl.STENCIL_ATTACHMENT: Invalidates the framebuffer's stencil buffer.

gl.DEPTH_STENCIL_ATTACHMENT: Invalidates both the framebuffer's depth and stencil buffer.

x

A  specifying the left origin of the pixel rectangle to invalidate.

y

A  specifying the bottom origin of the pixel rectangle to invalidate.

width

A  specifying the width of the pixel rectangle to invalidate.

height

A  specifying the height of the pixel rectangle to invalidate.

Return value

None.

Examples

gl.invalidateSubFramebuffer(gl.READ_FRAMEBUFFER,

[gl.COLOR_ATTACHMENT0, gl.COLOR_ATTACHMENT1],

0, 0, 256, 256);

Specifications

Specification

Status

Comment

Initial definition for WebGL.

Man page of the (similar) OpenGL API.

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also