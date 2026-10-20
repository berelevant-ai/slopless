# -moz-float-edge

The non-standard -moz-float-edge CSS property specifies whether the height and width properties of the element include the margin, border, or padding thickness.

/* Keyword values */

-moz-float-edge: border-box;

-moz-float-edge: content-box;

-moz-float-edge: margin-box;

-moz-float-edge: padding-box;

/* Global values */

-moz-float-edge: inherit;

-moz-float-edge: initial;

-moz-float-edge: unset;

Syntax

Values

border-box

The height and width properties include the content, padding and border but not the margin.

content-box

The height and width properties include the content, but not the padding, border or margin.

margin-box

The height and width properties include the content, padding, border and margin.

padding-box

The height and width properties include the content and padding but not the border or margin.

Formal definition

Formal syntax

Examples

HTML

<div class="box">

<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

</div>

CSS

.box {

display: block;

height: 5px;

margin: 0.5em auto 0.5em auto;

color: gray;

-moz-float-edge: margin-box;

box-sizing: border-box;

}

Result

Specifications

Not part of any standard.

Browser compatibility

See also