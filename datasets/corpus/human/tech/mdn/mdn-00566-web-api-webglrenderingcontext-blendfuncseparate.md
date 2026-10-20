# WebGLRenderingContext.blendFuncSeparate()

The WebGLRenderingContext.blendFuncSeparate() method of the WebGL API defines which function is used for blending pixel arithmetic for RGB and alpha components separately.

Syntax

void gl.blendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha);

Parameters

srcRGB

A  specifying a multiplier for the red, green and blue (RGB) source blending factors. The default value is gl.ONE. For possible values, see below.

dstRGB

A  specifying a multiplier for the red, green and blue (RGB) destination blending factors. The default value is gl.ZERO. For possible values, see below.

srcAlpha

A  specifying a multiplier for the alpha source blending factor. The default value is gl.ONE. For possible values, see below.

dstAlpha

A  specifying a multiplier for the alpha destination blending factor. The default value is gl.ZERO. For possible values, see below.

Return value

None.

Exceptions

If srcRGB, dstRGB, srcAlpha, or dstAlpha is not one of the listed possible values, a gl.INVALID_ENUM error is thrown.

If a constant color and a constant alpha value are used together as source (srcRGB) and destination (dstRGB) factors, a gl.INVALID_ENUM error is thrown.

Constants

The following constants can be used for srcRGB, dstRGB, srcAlpha, and dstAlpha

The formulas for the blending factors can be described like this (all RGBA values are between 0 and 1):

color(RGB) = (sourceColor * srcRGB) + (destinationColor * dstRGB)

color(A) = (sourceAlpha * srcAlpha) + (destinationAlpha * dstAlpha)

Constant

RGB factor

Alpha factor

Description

gl.ZERO

0,0,0

0

Multiplies all colors by 0.

gl.ONE

1,1,1,1

1

Multiplies all colors by 1.

gl.SRC_COLOR

RS, GS, BS

AS

Multiplies all colors by the source colors.

gl.ONE_MINUS_SRC_COLOR

1-RS, 1-GS, 1-BS

1-AS

Multiplies all colors by 1 minus each source color.

gl.DST_COLOR

RD, GD, BD

AD

Multiplies all colors by the destination color.

gl.ONE_MINUS_DST_COLOR

1-RD, 1-GD, 1-BD

1-AD

Multiplies all colors by 1 minus each destination color.

gl.SRC_ALPHA

AS, AS, AS

AS

Multiplies all colors by the source alpha color.

gl.ONE_MINUS_SRC_ALPHA

1-AS, 1-AS, 1-AS

1-AS

Multiplies all colors by 1 minus the source alpha color.

gl.DST_ALPHA

AD, AD, AD

AD

Multiplies all colors by the destination alpha color.

gl.ONE_MINUS_DST_ALPHA

1-AD, 1-AD, 1-AD

1-AD

Multiplies all colors by 1 minus the destination alpha color.

gl.CONSTANT_COLOR

RC, GC, BC

AC

Multiplies all colors by a constant color.

gl.ONE_MINUS_CONSTANT_COLOR

1-RC, 1-GC, 1-BC

1-AC

Multiplies all colors by 1 minus a constant color.

gl.CONSTANT_ALPHA

AC, AC, AC

AC

Multiplies all colors by a constant alpha value.

gl.ONE_MINUS_CONSTANT_ALPHA

1-AC, 1-AC, 1-AC

1-AC

Multiplies all colors by 1 minus a constant alpha value.

gl.SRC_ALPHA_SATURATE

min(AS, 1 - AD), min(AS, 1 - AD), min(AS, 1 - AD)

1

Multiplies the RGB colors by the smaller of either the source alpha color or the value of 1 minus the destination alpha color. The alpha value is multiplied by 1.

Examples

To use the blend function, you first have to activate blending with  with the argument gl.BLEND.

gl.enable(gl.BLEND);

gl.blendFuncSeparate(gl.SRC_COLOR, gl.DST_COLOR, gl.ONE, gl.ZERO);

To get the current blend function, query the BLEND_SRC_RGB, BLEND_SRC_ALPHA, BLEND_DST_RGB, and BLEND_DST_ALPHA constants which return one of the blend function constants.

gl.enable(gl.BLEND);

gl.blendFuncSeparate(gl.SRC_COLOR, gl.DST_COLOR, gl.ONE, gl.ZERO);

gl.getParameter(gl.BLEND_SRC_RGB) == gl.SRC_COLOR;

// true

Specifications

Specification

Status

Comment

Initial definition.

In WebGL, constant color and constant alpha cannot be used together as source and destination factors in the blend function. See section 6.13. of the specification.

Man page of the OpenGL API.

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also