# -moz-outline-radius

In Mozilla applications like Firefox, the -moz-outline-radius CSS shorthand property can be used to give an element's  rounded corners.

/* One value */

-moz-outline-radius: 25px;

/* Two values */

-moz-outline-radius: 25px 1em;

/* Three values */

-moz-outline-radius: 25px 1em 12%;

/* Four values */

-moz-outline-radius: 25px 1em 12% 4mm;

/* Global values */

-moz-outline-radius: inherit;

-moz-outline-radius: initial;

-moz-outline-radius: unset;

Constituent properties

This property is a shorthand for the following CSS properties:

-moz-outline-radius-bottomleft

-moz-outline-radius-bottomright

-moz-outline-radius-topleft

-moz-outline-radius-topright

Syntax

Values

Elliptical outlines and <percentage> values follow the syntax described in .

One, two, three or four <outline-radius> values, represents one of:

See  for possible values.

A ; see  for details.

If a single value is set, it applies to all 4 corners.

If two values are set, the first one applies to the top-left and bottom-right corners and the second one to the top-right and bottom-left corners.

If three values are set, the first one applies to the top-Left corner, the second one to the top-right and bottom-left corners and the third one to the bottom-right corner.

If four values are set, the first one applies to the top-left corner, the second one to the top-right corner, the third one to the bottom-right corner and the fourth one to the bottom-left corner.

Formal definition

Formal syntax

Examples

Rounding an outline

Note: This example will not display the desired effect if you are viewing this in a browser other than Firefox.

HTML

<p>This element has a rounded outline!</p>

CSS

p {

margin: 5px;

border: 1px solid black;

outline: dotted red;

-moz-outline-radius: 12% 1em 25px;

}

Result

Notes

dotted or dashed radiused corners were rendered as solid until Firefox 50,

Future versions of Gecko/Firefox may drop this property completely. See .

Specifications

Not part of any standard.

Browser compatibility

See also

Mozilla CSS extensions

Related CSS properties:

outline