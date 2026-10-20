# <resolution>

The <resolution> CSS data type, used for describing resolutions in media queries, denotes the pixel density of an output device, i.e., its resolution.

On screens, the units are related to CSS inches, centimeters, or pixels, not physical values.

Syntax

The <resolution> data type consists of a strictly positive  followed by one of the units listed below. As with all CSS dimensions, there is no space between the unit literal and the number.

Units

dpi

Represents the number of dots per inch. Screens typically contains 72 or 96 dots per inch, but the dpi for printed documents is usually much greater. As 1 inch is 2.54 cm, 1dpi ≈ 0.39dpcm.

dpcm

Represents the number of dots per centimeter. As 1 inch is 2.54 cm, 1dpcm ≈ 2.54dpi.

dppx

Represents the number of dots per px unit. Due to the 1:96 fixed ratio of CSS in to CSS px, 1dppx is equivalent to 96dpi, which corresponds to the default resolution of images displayed in CSS as defined by .

x

Alias for dppx.

Note: Although the number 0 is always the same regardless of unit, the unit may not be omitted. In other words, 0 is invalid and does not represent 0dpi, 0dpcm, or 0dppx.

Examples

Use in a media query

@media print and (min-resolution: 300dpi) { ... }

Valid resolutions

96dpi

50.82dpcm

3dppx

Invalid resolutions

72 dpi     Spaces are not allowed between the number and the unit.

ten dpi    The number must use digits only.

0          The unit is required.

Specifications

Specification

Status

Comment

Adds the x unit.

Adds the dppx unit.

Initial definition.

Browser compatibility

See also

resolution media feature

Using @media queries