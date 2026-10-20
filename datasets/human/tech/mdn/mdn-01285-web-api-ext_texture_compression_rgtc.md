# EXT_texture_compression_rgtc

The EXT_texture_compression_rgtc extension is part of the WebGL API and exposes 4 RGTC compressed texture formats. RGTC is a block-based texture compression format suited for unsigned and signed red and red-green textures (Red-Green Texture Compression).

WebGL extensions are available using the  method. For more information, see also Using Extensions in the WebGL tutorial.

Availability: Support depends on the system's graphics driver. There is no support on Windows.

This extension is available to both,  and  contexts.

Constants

The compressed texture formats are exposed by 4 constants and can be used in two functions:  and .

ext.COMPRESSED_RED_RGTC1_EXT

Each 4x4 block of texels consists of 64 bits of unsigned red image data. See also BC4 unsigned.

ext.COMPRESSED_SIGNED_RED_RGTC1_EXT

Each 4x4 block of texels consists of 64 bits of signed red image data. See also BC4 signed.

ext.COMPRESSED_RED_GREEN_RGTC2_EXT

Each 4x4 block of texels consists of  64 bits of compressed unsigned red image data followed by 64 bits of compressed unsigned green image data. See also BC5 unsigned.

ext.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT

Each 4x4 block of texels consists of 64 bits of compressed signed red image data followed by 64 bits of compressed signed green image data. See also BC5 signed.

Examples

var ext = gl.getExtension('EXT_texture_compression_rgtc');

var texture = gl.createTexture();

gl.bindTexture(gl.TEXTURE_2D, texture);

gl.compressedTexImage2D(gl.TEXTURE_2D, 0, ext.COMPRESSED_RED_RGTC1_EXT, 128, 128, 0, textureData);

Specifications

Specification

Status

EXT_texture_compression_rgtc

Community Approved

Browser compatibility

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also