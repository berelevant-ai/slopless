# -moz-device-pixel-ratio

The -moz-device-pixel-ratio Gecko-only CSS media feature can be used to apply styles based on the number of device pixels per CSS pixel.

Do not use this feature. Use the resolution feature with the dppx unit instead.

Note: This media feature is also implemented by Webkit and by IE 11 for Windows Phone 8.1 as -webkit-device-pixel-ratio. The min and max prefixes as implemented by Gecko are named min--moz-device-pixel-ratio and max--moz-device-pixel-ratio; but the same prefixes as implemented by Webkit are named -webkit-min-device-pixel-ratio and -webkit-max-device-pixel-ratio.

Syntax

The number of device pixels per CSS pixel.

Media:

Accepts min/max prefixes: yes

Examples

Basic compatibility example

-moz-device-pixel-ratio may be used for compatibility with Firefox older than 16, and alongside -webkit-device-pixel-ratio for compatibility with WebKit-based browsers that do not support dppx.

Example:

@media (-webkit-min-device-pixel-ratio: 2), /* Webkit-based browsers */

(min--moz-device-pixel-ratio: 2),    /* Older Firefox browsers (prior to Firefox 16) */

(min-resolution: 2dppx),             /* The standard way */

(min-resolution: 192dpi)             /* dppx fallback */

Note: See this CSSWG article for compatibility good practices regarding resolution and dppx.

Specifications

Not part of any standard.

Browser compatibility

See also

Using Media Queries

@media