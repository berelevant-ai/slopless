# block-size

The block-size CSS property defines the horizontal or vertical size of an element's block, depending on its writing mode. It corresponds to either the  or the  property, depending on the value of .

If the writing mode is vertically oriented, the value of block-size relates to the width of the element; otherwise, it relates to the height of the element. A related property is , which defines the other dimension of the element.

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone https://github.com/mdn/interactive-examples and send us a pull request.

Syntax

/* <length> values */

block-size: 300px;

block-size: 25em;

/* <percentage> values */

block-size: 75%;

/* Keyword values */

block-size: max-content;

block-size: min-content;

block-size: fit-content(20em);

block-size: auto;

/* Global values */

block-size: inherit;

block-size: initial;

block-size: unset;

Values

The block-size property takes the same values as the  and  properties.

Formal definition

Formal syntax

Examples

Block size with vertical text

HTML

<p class="exampleText">Example text</p>

CSS

.exampleText {

writing-mode: vertical-rl;

background-color: yellow;

block-size: 200px;

}

Result

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility

See also

The mapped physical properties:  and