# DOMMatrixReadOnly.flipX()

The flipX() method of the  interface creates a new matrix being the result of the original matrix flipped about the x-axis.

Syntax

DOMMatrix.flipX()

Return value

Returns a DOMMatrix containing a new matrix being the result of the original matrix flipped about the x-axis, which is equivalent to multiplying the matrix by DOMMatrix(-1, 0, 0, 1, 0, 0).  The original matrix is not modified.

Examples

This SVG contains two paths in the shape of a triangle, both drawn to the same position.  Note that the x co-ordinate of the viewBox attribute is negative, showing us content from both sides of the x-axis.

<svg width="100" height="100" viewBox="-50 0 100 100">

<path fill="red" d="M 0 50 L 50 0 L 50 100 Z" />

<path id="flipped" fill="blue" d="M 0 50 L 50 0 L 50 100 Z" />

</svg>

This JavaScript first creates an identity matrix, then uses the `flipX()` method to create a new matrix, which is then applied to the blue triangle, inverting it across the x-axis.  The red triangle is left in place.

const flipped = document.getElementById('flipped');

const matrix = new DOMMatrixReadOnly();

const flippedMatrix = matrix.flipX();

flipped.setAttribute('transform', flippedMatrix.toString());

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility