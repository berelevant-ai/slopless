# WebGL2RenderingContext.texStorage3D()

The WebGL2RenderingContext.texStorage3D() method of the WebGL API specifies all levels of a three-dimensional texture or two-dimensional array texture.

Syntax

void gl.texStorage3D(target, levels, internalformat, width, height, depth);

Parameters

target

A  specifying the binding point (target) of the active texture. Possible values:

gl.TEXTURE_3D: A three-dimensional texture.

gl.TEXTURE_2D_ARRAY: A two-dimensional array texture.

level

A  specifying the number of texture levels.

internalformat

A  specifying the texture store format. Possible values:

gl.R8

gl.R16F

gl.R32F

gl.R8UI

gl.RG8

gl.RG16F

gl.RG32F

gl.RGUI

gl.RGB8

gl.SRGB8

gl.RGB565

gl.R11F_G11F_B10F

gl.RGB9_E5

gl.RGB16F

gl.RGB32F

gl.RGB8UI

gl.RGBA8

gl.SRGB_APLHA8

gl.RGB5_A1

gl.RGBA4444

gl.RGBA16F

gl.RGBA32F

gl.RGBA8UI

gl.COMPRESSED_R11_EAC

gl.COMPRESSED_SIGNED_R11_EAC

gl.COMPRESSED_RG11_EAC

gl.COMPRESSED_SIGNED_RG11_EAC

gl.COMPRESSED_RGB8_ETC2

gl.COMPRESSED_RGBA8_ETC2_EAC

gl.COMPRESSED_SRGB8_ETC2

gl.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC

gl.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2

gl.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2

width

A  specifying the width of the texture.

height

A  specifying the height of the texture.

depth

A  specifying the depth of the texture.

Return value

None.

Examples

gl.texStorage3D(gl.TEXTURE_3D, 1, gl.RGB8, 256, 256, 256);

Specifications

Specification

Status

Comment

Initial definition for WebGL.

Man page of the (similar) OpenGL ES 3.0 API.

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also