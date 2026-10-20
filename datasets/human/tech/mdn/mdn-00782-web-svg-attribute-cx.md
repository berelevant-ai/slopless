# cx

The cx attribute define the x-axis coordinate of a center point.

Three elements are using this attribute: , , and

html,body,svg { height:100% }

<svg viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">

<radialGradient cx="25%" id="myGradient">

<stop offset="0"    stop-color="white" />

<stop offset="100%" stop-color="black" />

</radialGradient>

<circle cx="50" cy="50" r="45"/>

<ellipse cx="150" cy="50" rx="45" ry="25" />

<rect x="205" y="5" width="90" height="90" fill="url(#myGradient)" />

</svg>

circle

For , cx defines the x-axis coordinate of the center of the shape.

Value

Default value

0

Animatable

Yes

Note: Starting with SVG2 cx, is a Geometry Property, meaning this attribute can also be used as CSS property for circles.

ellipse

For , cx defines the x-axis coordinate of the center of the shape.

Value

Default value

0

Animatable

Yes

Note: Starting with SVG2 cx, is a Geometry Property, meaning this attribute can also be used as CSS property for ellipses.

radialGradient

For , cx defines the x-axis coordinate of the end circle for the radial gradient.

Value

Default value

50%

Animatable

Yes

Example

html,body,svg { height:100% }

<svg viewBox="0 0 34 10" xmlns="http://www.w3.org/2000/svg">

<defs>

<radialGradient cx="0" id="myGradient000">

<stop offset="0%"   stop-color="gold" />

<stop offset="50%"  stop-color="green" />

<stop offset="100%" stop-color="white" />

</radialGradient>

<radialGradient cx="50%" id="myGradient050">

<stop offset="0%"   stop-color="gold" />

<stop offset="50%"  stop-color="green" />

<stop offset="100%" stop-color="white" />

</radialGradient>

<radialGradient cx="100%" id="myGradient100">

<stop offset="0%"   stop-color="gold" />

<stop offset="50%"  stop-color="green" />

<stop offset="100%" stop-color="white" />

</radialGradient>

</defs>

<rect x="1"  y="1" width="8" height="8" fill="url(#myGradient000)" stroke="black" />

<rect x="13" y="1" width="8" height="8" fill="url(#myGradient050)" stroke="black" />

<rect x="25" y="1" width="8" height="8" fill="url(#myGradient100)" stroke="black" />

</svg>

Specifications

Specification

Status

Comment

Definition as a geometry property

Definition for SVG2 paint servers.

Initial definition for <radialGradient>

Initial definition for <ellipse>

Initial definition for <circle>

See also

cy

r