# top

The top CSS property participates in specifying the vertical position of a positioned element. It has no effect on non-positioned elements.

The effect of top depends on how the element is positioned (i.e., the value of the  property):

When position is set to absolute or fixed, the top property specifies the distance between the element's outer margin of top edge and the inner boarder of the top edge of its containing block.

When position is set to relative, the top property specifies the distance the element's top edge is moved below its normal position.

When position is set to sticky, the top property is used to compute the sticky-constraint rectangle.

When position is set to static, the top property has no effect.

When both top and  are specified, position is set to absolute or fixed, and  is unspecified (either auto or 100%) both the top and bottom distances are respected. In all other situations, if  is constrained in any way or position is set to relative, the top property takes precedence and the bottom property is ignored.

Syntax

/* <length> values */

top: 3px;

top: 2.4em;

/* <percentage>s of the height of the containing block */

top: 10%;

/* Keyword value */

top: auto;

/* Global values */

top: inherit;

top: initial;

top: unset;

Values

A negative, null, or positive  that represents:

for absolutely positioned elements, the distance to the top edge of the containing block.

for relatively positioned elements, the distance that the element is moved below its normal position.

A  of the containing block's height.

auto

Specifies that:

for absolutely positioned elements, the position of the element is based on the  property, while height: auto is treated as a height based on the content; or if bottom is also auto, the element is positioned where it should vertically be positioned if it were a static element.

for relatively positioned elements, the distance of the element from its normal position is based on the  property; or if bottom is also auto, the element is not moved vertically at all.

inherit

Specifies that the value is the same as the computed value from its parent element (which might not be its containing block). This computed value is then handled as if it were a , , or the auto keyword.

Formal definition

Formal syntax

Examples

A positioned element set 10% from the top

body {

background: beige;

}

div {

position: absolute;

top: 10%;

right: 40%;

bottom: 20%;

left: 15%;

background: gold;

border: 1px solid blue;

}

<div>The size of this content is determined by the position of its edges.</div>

Specifications

Specification

Status

Comment

Adds behavior for sticky positioning.

Initial definition.

Browser compatibility

See also

, the shorthand for all related properties: , , , and

The mapped logical properties: , , , and  and the shorthands  and