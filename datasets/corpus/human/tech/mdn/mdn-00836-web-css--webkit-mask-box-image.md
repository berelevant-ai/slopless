# -webkit-mask-box-image

-webkit-mask-box-image sets the mask image for an element's border box.

: none

Applies to: all elements

: no

Media:

: as specified

Syntax

-webkit-mask-box-image: <mask-box-image> [<top> <right> <bottom> <left> <x-repeat> <y-repeat>]

Where:

<mask-box-image>

| <gradient> | none

<top> <right> <bottom> <left>

<length> | <percentage>

<x-repeat> <y-repeat>

repeat | stretch | round | space

Values

<uri>

The location of the image resource to be used as a mask image.

<gradient>

A -webkit-gradient function to be used as a mask image.

none

Used to specify that a border box is to have no mask image.

<length>

The size of the mask image's offset. See  for possible units.

<percentage>

The mask image's offset has a percentage value relative to the border box's corresponding dimension (width or height).

repeat

The mask image is repeated as many times as is necessary to span the border box. May include a partial image if the mask image does not divide evenly into the border box.

stretch

The mask image is stretched to contain the border box exactly.

round

The mask image is stretched somewhat and repeated such that there is no partial mask image at the end of the border box.

space

The mask image is repeated as many times as possible without stretching. There is no partial mask image at the end of the border box.

Formal definition

Formal syntax

Examples

Setting an image

.exampleone {

-webkit-mask-box-image: url('mask.png');

}

Offsetting and filling an image

.exampletwo {

-webkit-mask-box-image: url('logo.png') 100 100 0 0 round round;

}

Specifications

Not part of any standard.

Browser compatibility

See also

, , ,,,,