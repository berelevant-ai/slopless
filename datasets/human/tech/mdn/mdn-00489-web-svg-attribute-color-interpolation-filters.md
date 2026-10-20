# color-interpolation-filters

The color-interpolation-filters attribute specifies the color space for imaging operations performed via filter effects.

Notes: This property just has an affect on filter operations. Therefore, it has no effect on filter primitives like , ,  or .

color-interpolation-filters has a different initial value than . color-interpolation-filters has an initial value of linearRGB, whereas color-interpolation has an initial value of sRGB. Thus, in the default case, filter effects operations occur in the linearRGB color space, whereas all other color interpolations occur by default in the sRGB color space.

It has no affect on filter functions, which operate in the  color space.

Note: As a presentation attribute, color-interpolation can be used as a CSS property.

As a presentation attribute, it can be applied to any element but it only has an effect on the following eighteen elements: , , , , , , , , , , , , , , , , ,

Usage notes

Value

auto | sRGB | linearRGB

Default value

linearRGB

Animatable

discrete

auto

Indicates that the user agent can choose either the sRGB or linearRGB spaces for color interpolation. This option indicates that the author doesn't require that color interpolation occur in a particular color space.

sRGB

Indicates that color interpolation should occur in the sRGB color space.

linearRGB

Indicates that color interpolation should occur in the linearized RGB color space as described in the sRGB specification.

Specifications

Specification

Status

Comment

No significant change

Initial definition

Browser compatibility

See also

sRGB specification