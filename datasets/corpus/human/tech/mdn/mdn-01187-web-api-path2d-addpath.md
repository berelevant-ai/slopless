# Path2D.addPath()

The Path2D.addPath() method of the Canvas 2D API adds one  object to another Path2D object.

Syntax

void path.addPath(path [, transform]);

Parameters

path

A  path to add.

transform

A  to be used as the transformation matrix for the path that is added. (Technically a DOMMatrixInit object).

Examples

Adding a path to an existing path

This example adds one path to another.

HTML

<canvas id="canvas"></canvas>

JavaScript

First, we create two separate  objects, each of which contains a rectangle made using the  method. We then create a matrix using  and createSVGMatrix(). We then add the second path to the first using addPath(), also applying the matrix to move the second path to the right. Finally, we draw the first path (which now contains both rectangles) using .

const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');

// Create first path and add a rectangle

let p1 = new Path2D();

p1.rect(0, 0, 100, 150);

// Create second path and add a rectangle

let p2 = new Path2D();

p2.rect(0, 0, 100, 75);

// Create transformation matrix that moves 200 points to the right

let m = document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGMatrix();

m.a = 1; m.b = 0;

m.c = 0; m.d = 1;

m.e = 200; m.f = 0;

// Add second path to the first path

p1.addPath(p2, m);

// Draw the first path

ctx.fill(p1);

Result

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

See also

The interface defining this method: