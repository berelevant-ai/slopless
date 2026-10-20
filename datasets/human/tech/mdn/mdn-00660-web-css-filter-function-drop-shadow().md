# drop-shadow()

The drop-shadow() CSS function applies a drop shadow effect to the input image. Its result is a .

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone https://github.com/mdn/interactive-examples and send us a pull request.

A drop shadow is effectively a blurred, offset version of the input image's alpha mask, drawn in a specific color and composited below the image.

Note: This function is somewhat similar to the  property. The box-shadow property creates a rectangular shadow behind an element's entire box, while the drop-shadow() filter function creates a shadow that conforms to the shape (alpha channel) of the image itself.

Syntax

drop-shadow(offset-x offset-y blur-radius color)

The drop-shadow() function accepts a parameter of type <shadow> (defined in the  property), with the exception that the inset keyword and spread parameters are not allowed.

Parameters

offset-x offset-y (required)

Two  values that determine the shadow offset. offset-x specifies the horizontal distance, where negative values place the shadow to the left of the element. offset-y specifies the vertical distance, where negative values place the shadow above the element. If both values are 0, the shadow is placed directly behind the element.

blur-radius (optional)

The shadow's blur radius, specified as a . The larger the value, the larger and more blurred the shadow becomes. If unspecified, it defaults to 0, resulting in a sharp, unblurred edge. Negative values are not allowed.

color (optional)

The color of the shadow, specified as a . If unspecified, the value of the  property is used.

Examples

Setting a drop shadow using pixel offsets and blur radius

/* Black shadow with 10px blur */

drop-shadow(16px 16px 10px black)

Setting a drop shadow using rem offsets and blur radius

/* Reddish shadow with 1rem blur */

drop-shadow(.5rem .5rem 1rem #e23)

Specifications

Specification

Status

See also

CSS  property