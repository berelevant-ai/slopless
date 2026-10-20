# WebGLRenderingContext.isEnabled()

The WebGLRenderingContext.isEnabled() method of the WebGL API tests whether a specific WebGL capability is enabled or not for this context.

By default, all capabilities except gl.DITHER are disabled.

Syntax

GLboolean gl.isEnabled(cap);

Parameters

cap

A  specifying which WebGL capability to test. Possible values:

Constant

Description

gl.BLEND

Blending of the computed fragment color values. See .

gl.CULL_FACE

Culling of polygons. See .

gl.DEPTH_TEST

Depth comparisons and updates to the depth buffer. See .

gl.DITHER

Dithering of color components before they get written to the color buffer.

gl.POLYGON_OFFSET_FILL

Adding an offset to depth values of polygon's fragments. See .

gl.SAMPLE_ALPHA_TO_COVERAGE

Computation of a temporary coverage value determined by the alpha value.

gl.SAMPLE_COVERAGE

ANDing the fragment's coverage with the temporary coverage value. See .

gl.SCISSOR_TEST

Scissor test that discards fragments that are outside of the scissor rectangle. See .

gl.STENCIL_TEST

Stencil testing and updates to the stencil buffer. See .

When using a , the following values are available additionally:

Constant

Description

gl.RASTERIZER_DISCARD

Primitives are discarded immediately before the rasterization stage, but after the optional transform feedback stage. gl.clear() commands are ignored.

Return value

A  indicating if the capability cap is enabled (true), or not (false).

Examples

gl.isEnabled(gl.STENCIL_TEST);

// false

To activate or deactivate a specific capability, use the  and   methods:

gl.enable(gl.STENCIL_TEST);

gl.disable(gl.STENCIL_TEST);

Specifications

Specification

Status

Comment

Initial definition for WebGL.

Man page of the (similar) OpenGL ES 2.0 API.

Updated definition for WebGL 2.

Man page of the (similar) OpenGL ES 3.0 API.

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also