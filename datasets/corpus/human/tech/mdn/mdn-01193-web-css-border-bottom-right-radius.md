# border-bottom-right-radius

The border-bottom-right-radius CSS property rounds the bottom-right corner of an element by specifying the radius (or the radius of the semi-major and semi-minor axes) of the ellipse defining the curvature of the corner.

The rounding can be a circle or an ellipse, or if one of the value is 0 no rounding is done and the corner is square.

A background, being an image or a color, is clipped at the border, even a rounded one; the exact location of the clipping is defined by the value of the  property.

Note: If the value of this property is not set in a  shorthand property that is applied to the element after the border-bottom-right-radius CSS property, the value of this property is then reset to its initial value by the shorthand property.

Syntax

/* The corner is a circle */

/* border-bottom-right-radius: radius */

border-bottom-right-radius: 3px;

/* Percentage values */

border-bottom-right-radius: 20%; /* corner of a circle if box is a square or else corner of a rectangle */

border-bottom-right-radius: 20% 20%; /* same as above */ /* 20% of horizontal(width) and vertical(height) */

border-bottom-right-radius: 20% 10%; /* 20% of horizontal(width) and 10% of vertical(height) */

/*The corner is an ellipse */

/* border-bottom-right-radius: horizontal vertical */

border-bottom-right-radius: 0.5em 1em;

border-bottom-right-radius: inherit;

With one value:

the value is a  or a  denoting the radius of the circle to use for the border in that corner.

With two values:

the first value is a  or a  denoting the horizontal semi-major axis of the ellipse to use for the border in that corner.

the second value is a  or a  denoting the vertical semi-major axis of the ellipse to use for the border in that corner.

Values

<length-percentage>

Denotes the size of the circle radius or the semi-major and semi-minor axes of the ellipse. As absolute length it can be expressed in any unit allowed by the CSS  data type. Percentages for the horizontal axis refer to the width of the box, percentages for the vertical axis refer to the height of the box. Negative values are invalid.

Formal definition

Formal syntax

Examples

Examples of different border-bottom-right-radius values

Live example

Code

.

An arc of circle is used as the border

div {

border-bottom-right-radius: 40px 40px;

}

.

An arc of ellipse is used as the border

div {

border-bottom-right-radius: 40px 20px;

}

.

The box is a square: an arc of circle is used as the border

div {

border-bottom-right-radius: 40%;

}

.

The box is not a square: an arc of ellipse is used as the border

div {

border-bottom-right-radius: 40%;

}

.

The background color is clipped at the border

div {

border-bottom-right-radius:40%;

border-style: black 3px double;

background-color: rgb(250,20,70);

background-clip: content-box;

}

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility

See also

shorthand property

, , and