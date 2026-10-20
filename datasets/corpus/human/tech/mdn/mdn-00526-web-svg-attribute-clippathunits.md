# clipPathUnits

The clipPathUnits attribute indicates which coordinate system to use for the contents of the  element.

Only one element is using this attribute:

html,body,svg { height:100% }

<svg viewBox="0 0 100 100">

<clipPath id="myClip1" clipPathUnits="userSpaceOnUse">

<circle cx="50" cy="50" r="35" />

</clipPath>

<clipPath id="myClip2" clipPathUnits="objectBoundingBox">

<circle cx=".5" cy=".5" r=".35" />

</clipPath>

<!-- Some reference rect to materialized to clip path -->

<rect id="r1" x="0"  y="0"  width="45" height="45" />

<rect id="r2" x="0"  y="55" width="45" height="45" />

<rect id="r3" x="55" y="55" width="45" height="45" />

<rect id="r4" x="55" y="0"  width="45" height="45" />

<!-- The first 3 rect are clipped with useSpaceOnUse units -->

<use clip-path="url(#myClip1)" xlink:href="#r1" fill="red" />

<use clip-path="url(#myClip1)" xlink:href="#r2" fill="red" />

<use clip-path="url(#myClip1)" xlink:href="#r3" fill="red" />

<!-- The last rect is clipped with objectBoundingBox units -->

<use clip-path="url(#myClip2)" xlink:href="#r4" fill="red" />

</svg>

clipPath

For , clipPathUnits define the coordinate system in use for the content of the element.

Value

userSpaceOnUse | objectBoundingBox

Default value

userSpaceOnUse

Animatable

Yes

userSpaceOnUse

This value indicates that all coordinates inside the  element refer to the user coordinate system as defined when the clipping path was created.

objectBoundingBox

This value indicates that all coordinates inside the  element are relative to the bounding box of the element the clipping path is applied to. It means that the origin of the coordinate system is the top left corner of the object bounding box and the width and height of the object bounding box are considered to have a length of 1 unit value.

Specifications

Specification

Status

Comment

Initial definition