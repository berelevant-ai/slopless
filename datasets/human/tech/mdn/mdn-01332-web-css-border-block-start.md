# border-block-start

The border-block-start CSS property is a shorthand property for setting the individual logical block-start border property values in a single place in the style sheet.

Constituent properties

This property is a shorthand for the following CSS properties:

border-block-start-color

border-block-start-style

border-block-start-width

Syntax

border-block-start: 1px;

border-block-start: 2px dotted;

border-block-start: medium dashed blue;

border-block-start can be used to set the values for one or more of , , and . The physical border to which it maps depends on the element's writing mode, directionality, and text orientation. It corresponds to the , , , or  property depending on the values defined for , , and .

Related properties are , , and , which define the other borders of the element.

Values

The border-block-start is specified with one or more of the following, in any order:

<'border-width'>

The width of the border. See .

<'border-style'>

The line style of the border. See .

<'color'>

The color of the border. See .

Formal definition

Formal syntax

Examples

Border with vertical text

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

writing-mode: vertical-rl;

border-block-start: 5px dashed blue;

}

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility

See also

This property maps to one of the physical border properties: , , , or .

, ,