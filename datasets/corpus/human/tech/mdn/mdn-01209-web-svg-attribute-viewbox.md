# viewBox

The viewBox attribute defines the position and dimension, in user space, of an SVG viewport.

The value of the viewBox attribute is a list of four numbers: min-x, min-y, width and height. The numbers separated by whitespace and/or a comma, which specify a rectangle in user space which is mapped to the bounds of the viewport established for the associated SVG element (not the browser viewport).

html,body,svg { height:100% }

svg:not(:root) { display: inline-block; }

<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">

<!--

with relative unit such as percentage, the visual size

of the square looks unchanged regardless of the viewBox

-->

<rect x="0" y="0" width="100%" height="100%"/>

<!--

with a large viewBox the circle looks small

as it is using user units for the r attribute:

4 resolved against 100 as set in the viewBox

-->

<circle cx="50%" cy="50%" r="4" fill="white"/>

</svg>

<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">

<!--

with relative unit such as percentage, the visual size

of the square looks unchanged regardless of the viewBox`

-->

<rect x="0" y="0" width="100%" height="100%"/>

<!--

with a small viewBox the circle looks large

as it is using user units for the r attribute:

4 resolved against 10 as set in the viewBox

-->

<circle cx="50%" cy="50%" r="4" fill="white"/>

</svg>

<svg viewBox="-5 -5 10 10" xmlns="http://www.w3.org/2000/svg">

<!--

The point of coordinate 0,0 is now in the center of the viewport,

and 100% is still resolve to a width or height of 10 user units so

the rectangle looks shifted to the bottom/right corner of the viewport

-->

<rect x="0" y="0" width="100%" height="100%"/>

<!--

With the point of coordinate 0,0 in the center of the viewport the

value 50% is resolve to 5 which means the center of the circle is

in the bottom/right corner of the viewport.

-->

<circle cx="50%" cy="50%" r="4" fill="white"/>

</svg>

The exact effect of this attribute is influenced by the  attribute.

Note: Values for width or height lower or equal to 0 disable rendering of the element.

Five elements are using this attribute: , , , , and .

marker

For , viewBox defines the position and dimension for the content of the <marker> element.

Value

<number>?, <number>?, <number>?, <number>

Default value

none

Animatable

Yes

pattern

For , viewBox defines the position and dimension for the content of the pattern tile.

Value

<number>?, <number>?, <number>?, <number>

Default value

none

Animatable

Yes

svg

For , viewBox defines the position and dimension for the content of the <svg> element.

Value

<number>?, <number>?, <number>?, <number>

Default value

none

Animatable

Yes

symbol

For , viewBox defines the position and dimension for the content of the <symbol> element.

Value

<number>?, <number>?, <number>?, <number>

Default value

none

Animatable

Yes

view

For , viewBox defines the position and dimension for the content of the <view> element.

Value

<number>?, <number>?, <number>?, <number>

Default value

none

Animatable

Yes

Specifications

Specification

Status

Comment

Initial definition