# mask-repeat

The mask-repeat CSS property sets how mask images are repeated. A mask image can be repeated along the horizontal axis, the vertical axis, both axes, or not repeated at all.

/* One-value syntax */

mask-repeat: repeat-x;

mask-repeat: repeat-y;

mask-repeat: repeat;

mask-repeat: space;

mask-repeat: round;

mask-repeat: no-repeat;

/* Two-value syntax: horizontal | vertical */

mask-repeat: repeat space;

mask-repeat: repeat repeat;

mask-repeat: round space;

mask-repeat: no-repeat round;

/* Multiple values */

mask-repeat: space round, no-repeat;

mask-repeat: round repeat, space, repeat-x;

/* Global values */

mask-repeat: inherit;

mask-repeat: initial;

mask-repeat: unset;

By default, the repeated images are clipped to the size of the element, but they can be scaled to fit (using round) or evenly distributed from end to end (using space).

Syntax

One or more <repeat-style> values, separated by commas.

Values

<repeat-style>

The one-value syntax is a shorthand for the full two-value syntax:

Single value

Two-value equivalent

repeat-x

repeat no-repeat

repeat-y

no-repeat repeat

repeat

repeat repeat

space

space space

round

round round

no-repeat

no-repeat no-repeat

In the two-value syntax, the first value represents the horizontal repetition behavior and the second value represents the vertical behavior. Here is an explanation of how each option works for either direction:

repeat

The image is repeated as much as needed to cover the whole mask painting area. The last image will be clipped if it doesn't fit.

space

The image is repeated as much as possible without clipping. The first and last images are pinned to either side of the element, and whitespace is distributed evenly between the images. The  property is ignored unless only one image can be displayed without clipping. The only case where clipping happens using space is when there isn't enough room to display one image.

round

As the allowed space increases in size, the repeated images will stretch (leaving no gaps) until there is room for another one to be added. When the next image is added, all of the current ones compress to allow room. Example: An image with an original width of 260px, repeated three times, might stretch until each repetition is 300px wide, and then another image will be added. They will then compress to 225px.

no-repeat

The image is not repeated (and hence the mask painting area will not necessarily be entirely covered). The position of the non-repeated mask image is defined by the  CSS property.

Formal definition

Formal syntax

Examples

Setting repeat for a single mask

CSS

#masked {

width: 250px;

height: 250px;

background: blue linear-gradient(red, blue);

mask-image: url(https://mdn.mozillademos.org/files/12676/star.svg);

mask-repeat: repeat; /* Can be changed in the live sample */

margin-bottom: 10px;

}

HTML Content

<div id="masked">

</div>

<select id="repetition">

<option value="repeat-x">repeat-x</option>

<option value="repeat-y">repeat-y</option>

<option value="repeat" selected>repeat</option>

<option value="space">space</option>

<option value="round">round</option>

<option value="no-repeat">no-repeat</option>

</select>

JavaScript Content

var repetition = document.getElementById("repetition");

repetition.addEventListener("change", function (evt) {

document.getElementById("masked").style.maskRepeat = evt.target.value;

});

Result

Multiple mask image support

You can specify a different <repeat-style> for each mask image, separated by commas:

.examplethree {

mask-image: url('mask1.png'), url('mask2.png');

mask-repeat: repeat-x, repeat-y;

}

Each image is matched with the corresponding repeat style, from first specified to last.

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility

See also

Clipping and Masking in CSS