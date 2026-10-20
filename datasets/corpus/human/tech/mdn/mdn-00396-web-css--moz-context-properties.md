# -moz-context-properties

The -moz-context-properties property can be used within privileged contexts in Firefox to share the values of specified properties of the element with a child SVG image.

If you reference an SVG image in a webpage (such as with the  element or as a background image), the SVG image can coordinate with the embedding element (its context) to have the image adopt property values set on the embedding element. To do this the embedding element needs to list the properties that are to be made available to the image by listing them as values of the -moz-context-properties property, and the image needs to opt in to using those properties by using values such as the context-fill value.

Syntax

/* Keyword values */

-moz-context-properties: fill;

-moz-context-properties: fill, stroke;

/* Global values */

-moz-context-properties: inherit;

-moz-context-properties: initial;

-moz-context-properties: unset;

Values

fill

Expose the fill value set on the image to the embedded SVG.

stroke

Expose the stroke value set on the image to the embedded SVG.

fill-opacity

Expose the fill-opacity value set on the image to the embedded SVG.

stroke-opacity

Expose the stoke-opacity value set on the image to the embedded SVG.

Formal definition

Formal syntax

Examples

Exposing fill and stroke to an SVG image

In this example we have a simple SVG embedded using an <img> element.

You first need to specify on the embedding element the properties whose values you wish to expose to the embedded SVG, using the -moz-context-properties property. For example:

.img1 {

width: 100px;

height: 100px;

-moz-context-properties: fill, stroke;

fill: lime;

stroke: purple;

}

Now that you've done this, the SVG image can use the values of the  and  properties, for example:

<img class="img1" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'>

<rect width='100%' height='100%' stroke-width='30px'

fill='context-fill red' stroke='context-stroke' fill-opacity='0.5'/></svg>">

Here we've set the image src to a data URI containing a simple SVG image; the <rect> inside has been made to take its fill and stroke values from the  and  set on the <img> element by giving them the context-fill/context-stroke keywords in their values, along with a fallback color for the fill (red) which will be used in the case that the SVG is loaded standalone in a top-level window (where it will have no context element to provide context values). Note that if a color is set directly on the SVG, but then the context color is also specified, the context color overrides the direct color.

Note: You can find a working example on Github.

Specifications

Not part of any standard.

Browser compatibility

See also

Mozilla CSS extensions

Using images in HTML

Adding vector graphics to the web

SVG as an image

Responsive images