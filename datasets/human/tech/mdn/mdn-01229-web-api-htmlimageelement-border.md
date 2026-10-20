# HTMLImageElement.border

The obsolete  property border specifies the number of pixels thick the border surrounding the image should be. A value of 0, the default, indicates that no border should be drawn.

You should not use this property! Instead, you should use CSS to style the border. The  property or its longhand properties to not only set the thickness of the border but to potentially apply a wide variety of other styling options to it.

The width, specifically, is controlled using the writing-mode aware , , , and  properties.

For compatibility (or perhaps other) reasons, you can use the older properties instead (or in addition): , , , and .

Syntax

htmlImageElement.border = thickness;

let thickness = htmlImageElement.border;

Value

A  containing an integer value specifying the thickness of the border that should surround the image, in CSS pixels. A value of 0, or an empty string, indicates that there should  be no border drawn. The default value of border is 0

Usage notes

Do not use border. It is obsolete. Instead, use the CSS  property and its longhand properties to establish borders around images.

For example, if you have the following HTML:

<img src="image.png" border="2">

The following will provide the same appearance using CSS instead of this obsolete property:

<img src="image.png" style="border: 2px;">

You can further provide additional information to change the color and other features of the border:

<img src="image.png" style="border: dashed 2px #333388;">

Specifications

Specification

Status

Comment

Browser compatibility