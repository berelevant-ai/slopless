# padding-block-start

The padding-block-start CSS property defines the logical block start padding of an element, which maps to a physical padding depending on the element's writing mode, directionality, and text orientation.

Syntax

/* <length> values */

padding-block-start: 10px;      /* An absolute length */

padding-block-start: 1em;       /* A length relative to the text size */

/* <percentage> value */

padding-block-start: 5%;        /* A padding relative to the block container's width */

/* Global values */

padding-block-start: inherit;

padding-block-start: initial;

padding-block-start: unset;

Values

The padding-block-start property takes the same values as the  property.

Description

This property corresponds to the , , , or  property depending on the values defined for , , and .

It relates to , , and , which define the other paddings of the element.

Formal definition

Formal syntax

Examples

Setting block start padding for vertical text

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

padding-block-start: 20px;

background-color: #C8C800;

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

, ,