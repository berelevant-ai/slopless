# CanvasRenderingContext2D.fillStyle

The CanvasRenderingContext2D.fillStyle property of the Canvas 2D API specifies the color, gradient, or pattern to use inside shapes. The default style is #000 (black).

For more examples of fill and stroke styles, see Applying styles and color in the Canvas tutorial.

Syntax

ctx.fillStyle = color;

ctx.fillStyle = gradient;

ctx.fillStyle = pattern;

Options

color

A  parsed as CSS  value.

gradient

A  object (a linear or radial gradient).

pattern

A  object (a repeating image).

Examples

Changing the fill color of a shape

This example applies a blue fill color to a rectangle.

HTML

<canvas id="canvas"></canvas>

JavaScript

const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');

ctx.fillStyle = 'blue';

ctx.fillRect(10, 10, 100, 100);

Result

Creating multiple fill colors using loops

In this example, we use two for loops to draw a grid of rectangles, each having a different fill color. To achieve this, we use the two variables i and j to generate a unique RGB color for each square, and only modify the red and green values. (The blue channel has a fixed value.) By modifying the channels, you can generate all kinds of palettes.

<canvas id="canvas" width="150" height="150"></canvas>

const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');

for (let i = 0; i < 6; i++) {

for (let j = 0; j < 6; j++) {

ctx.fillStyle = `rgb(

${Math.floor(255 - 42.5 * i)},

${Math.floor(255 - 42.5 * j)},

0)`;

ctx.fillRect(j * 25, i * 25, 25, 25);

}

}

The result looks like this:

Specifications

Specification

Status

Comment

Browser compatibility

WebKit/Blink-specific note

In WebKit- and Blink-based browsers, the non-standard and deprecated method ctx.setFillColor() is implemented in addition to this property.

setFillColor(color, optional alpha);

setFillColor(grayLevel, optional alpha);

setFillColor(r, g, b, a);

setFillColor(c, m, y, k, a);

See also

Canvas API

The interface defining this property:

Values used by this property:

CSS data type

object

object