# <feMorphology>

The <feMorphology> SVG filter primitive is used to erode or dilate the input image. Its usefulness lies especially in fattening or thinning effects.

Usage context

Attributes

Global attributes

Core attributes

Presentation attributes

Filter primitive attributes

Specific attributes

DOM Interface

This element implements the  interface.

Examples

Filtering SVG content

SVG

<svg xmlns="http://www.w3.org/2000/svg" width="300" height="180">

<filter id="erode">

<feMorphology operator="erode" radius="1"/>

</filter>

<filter id="dilate">

<feMorphology operator="dilate" radius="2"/>

</filter>

<text y="1em">Normal text</text>

<text id="thin" y="2em">Thinned text</text>

<text id="thick" y="3em">Fattened text</text>

</svg>

CSS

text {

font-family: Arial, Helvetica, sans-serif;

font-size: 3em;

}

#thin {

filter: url(#erode);

}

#thick {

filter: url(#dilate);

}

Filtering HTML content

SVG

<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">

<filter id="erode">

<feMorphology operator="erode" radius="1"/>

</filter>

<filter id="dilate">

<feMorphology operator="dilate" radius="2"/>

</filter>

</svg>

<p>Normal text</p>

<p id="thin">Thinned text</p>

<p id="thick">Fattened text</p>

CSS

p {

margin: 0;

font-family: Arial, Helvetica, sans-serif;

font-size: 3em;

}

#thin {

filter: url(#erode);

}

#thick {

filter: url(#dilate);

}

Specifications

Specification

Status

Comment

No change

Initial definition

Browser compatibility

See also

SVG tutorial: Filter effects