# CanvasRenderingContext2D.strokeStyle

The CanvasRenderingContext2D.strokeStyle property of the Canvas 2D API specifies the color, gradient, or pattern to use for the strokes (outlines) around shapes. The default is #000 (black).

For more examples of stroke and fill styles, see Applying styles and color in the Canvas tutorial.

Syntax

ctx.strokeStyle = color;

ctx.strokeStyle = gradient;

ctx.strokeStyle = pattern;

Options

color

A  parsed as CSS  value.

gradient

A  object (a linear or radial gradient).

pattern

A  object (a repeating image).

Examples

Changing the stroke color of a shape

This example applies a blue stroke color to a rectangle.

HTML

<canvas id="canvas"></canvas>

JavaScript

var canvas = document.getElementById('canvas');

var ctx = canvas.getContext('2d');

ctx.strokeStyle = 'blue';

ctx.strokeRect(10, 10, 100, 100);

Result

Creating multiple stroke colors using loops

In this example, we use two for loops and the  method to draw a grid of circles, each having a different stroke color. To achieve this, we use the two variables i and j to generate a unique RGB color for each circle, and only modify the green and blue values. (The red channel has a fixed value.)

<canvas id="canvas" width="150" height="150"></canvas>

var ctx = document.getElementById('canvas').getContext('2d');

for (let i = 0; i < 6; i++) {

for (let j = 0; j < 6; j++) {

ctx.strokeStyle = `rgb(

0,

${Math.floor(255 - 42.5 * i)},

${Math.floor(255 - 42.5 * j)})`;

ctx.beginPath();

ctx.arc(12.5 + j * 25, 12.5 + i * 25, 10, 0, Math.PI * 2, true);

ctx.stroke();

}

}

The result looks like this:

Specifications

Specification

Status

Comment

Browser compatibility

WebKit/Blink-specific note

In WebKit- and Blink-based browsers, the non-standard and deprecated method ctx.setStrokeColor() is implemented in addition to this property.

setStrokeColor(color, optional alpha);

setStrokeColor(grayLevel, optional alpha);

setStrokeColor(r, g, b, a);

setStrokeColor(c, m, y, k, a);

See also

The interface defining this property: