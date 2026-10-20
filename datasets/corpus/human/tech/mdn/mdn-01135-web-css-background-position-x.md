# background-position-x

The background-position-x CSS property sets the initial horizontal position for each background image. The position is relative to the position layer set by .

The value of this property is overridden by any declaration of the  or  shorthand properties applied to the element after it.

Syntax

/* Keyword values */

background-position-x: left;

background-position-x: center;

background-position-x: right;

/* <percentage> values */

background-position-x: 25%;

/* <length> values */

background-position-x: 0px;

background-position-x: 1cm;

background-position-x: 8em;

/* Side-relative values */

background-position-x: right 3px;

background-position-x: left 25%;

/* Multiple values */

background-position-x: 0px, center;

/* Global values */

background-position-x: inherit;

background-position-x: initial;

background-position-x: unset;

The background-position-x property is specified as one or more values, separated by commas.

Values

left

Aligns the left edge of the background image with the left edge of the background position layer.

center

Aligns the center of the background image with the center of the background position layer.

right

Aligns the right edge of the background image with the right edge of the background position layer.

The offset of the given background image's left vertical edge from the background position layer's left vertical edge. (Some browsers allow assigning the right edge for offset).

The offset of the given background image's horizontal position relative to the container. A value of 0% means that the left edge of the background image is aligned with the left edge of the container, and a value of 100% means that the right edge of the background image is aligned with the right edge of the container, thus a value of 50% horizontally centers the background image.

Formal definition

Formal syntax

Examples

Basic example

The following example shows a simple background image implementation, with background-position-x and background-position-y used to define the image's horizontal and vertical positions separately.

HTML

<div></div>

CSS

div {

width: 300px;

height: 300px;

background-color: skyblue;

background-image: url(https://media.prod.mdn.mozit.cloud/attachments/2020/07/29/17350/3b4892b7e820122ac6dd7678891d4507/firefox.png);

background-repeat: no-repeat;

background-position-x: center;

background-position-y: bottom 10px;

}

Result

Specifications

Specification

Status

Comment

Initial specification of longhand sub-properties of  to match longstanding implementations.

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also

Using multiple backgrounds