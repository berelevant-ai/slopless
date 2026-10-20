# inset-inline

The inset-inline CSS property defines the logical start and end offsets of an element in the inline direction, which maps to physical offsets depending on the element's writing mode, directionality, and text orientation. It corresponds to the  and , or  and  properties depending on the values defined for , , and .

/* <length> values */

inset-inline: 3px 10px;

inset-inline: 2.4em 3em;

inset-inline: 10px; /* value applied to start and end */

/* <percentage>s of the width or height of the containing block */

inset-inline: 10% 5%;

/* Keyword value */

inset-inline: auto;

/* Global values */

inset-inline: inherit;

inset-inline: initial;

inset-inline: unset;

Constituent properties

This property is a shorthand for the following CSS properties:

Syntax

Values

The inset-inline property takes the same values as the  property.

Formal definition

Formal syntax

Examples

Setting inline start and end offsets

HTML

<div>

<p class="exampleText">Example text</p>

</div>

CSS

div {

background-color: yellow;

width: 120px;

height: 120px;

}

.exampleText {

writing-mode: vertical-lr;

position: relative;

inset-inline: 20px 50px;

background-color: #c8c800;

}

Result

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility

See also

The mapped physical properties: , , , and

The mapped physical shortcut:

The mapped block shortcut:

, ,