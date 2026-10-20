# DOMMatrixReadOnly.translate()

The translate() method of the  interface creates a new matrix being the result of the original matrix with a translation applied.

Syntax

The translate() method accepts two or three values.

DOMMatrix.translate(translateX, translateY[, translateZ])

Parameters

translateX

A number representing the abscissa (x-coordinate) of the translating vector.

translateY

A number representing the ordinate (y-coordinate) of the translating vector.

translateZ Optional

A number representing the z component of the translating vector.  If not supplied, this defaults to 0.  If this is anything other than 0, the resulting matrix will be 3D.

Return value

Returns a DOMMatrix containing a new matrix being the result of the matrix being translated by the given vector. The original matrix is not modified.

If a translation is applied about the z-axis, the resulting matrix will be a 4x4 3D matrix.

Examples

This SVG contains two squares, one red and one blue, each positioned at the document origin:

<svg width="250" height="250" viewBox="0 0 50 50">

<rect width="25" height="25" fill="red" />

<rect id="transformed" width="25" height="25" fill="blue" />

</svg>

The following JavaScript first creates an identity matrix, then uses the translate() method to create a new, translated matrix — which is then applied to the blue square as a transform. The red square is left in place.

const matrix = new DOMMatrixReadOnly().translate(25, 25);

document.querySelector('#transformed').setAttribute('transform', matrix.toString());

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility