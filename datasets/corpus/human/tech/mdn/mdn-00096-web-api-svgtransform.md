# SVGTransform

SVG transform interface

SVGTransform is the interface for one of the component transformations within an ; thus, an SVGTransform object corresponds to a single component (e.g., scale(…) or matrix(…)) within a  attribute.

An SVGTransform object can be designated as read only, which means that attempts to modify the object will result in an exception being thrown.

Interface overview

Also implement

None

Methods

void setMatrix(in  matrix)

void setTranslate(in float tx, in float ty)

void setScale(in float sx, in float sy)

void setRotate(in float angle, in float cx, in float cy)

void setSkewX(in float angle)

void setSkewY(in float angle)

Properties

readonly unsigned short type

readonly float angle

readonly  matrix

Constants

SVG_TRANSFORM_UNKNOWN = 0

SVG_TRANSFORM_MATRIX = 1

SVG_TRANSFORM_TRANSLATE = 2

SVG_TRANSFORM_SCALE = 3

SVG_TRANSFORM_ROTATE = 4

SVG_TRANSFORM_SKEWX = 5

SVG_TRANSFORM_SKEWY = 6

Normative document

SVG 1.1 (2nd Edition)

Constants

Name

Value

Description

SVG_TRANSFORM_UNKNOWN

0

The unit type is not one of predefined unit types. It is invalid to attempt to define a new value of this type or to attempt to switch an existing value to this type.

SVG_TRANSFORM_MATRIX

1

A matrix(…) transformation

SVG_TRANSFORM_TRANSLATE

2

A translate(…) transformation

SVG_TRANSFORM_SCALE

3

A scale(…) transformation

SVG_TRANSFORM_ROTATE

4

A rotate(…) transformation

SVG_TRANSFORM_SKEWX

5

A skewx(…) transformation

SVG_TRANSFORM_SKEWY

6

A skewy(…) transformation

Properties

Name

Type

Description

type

unsigned short

The type of the value as specified by one of the SVG_TRANSFORM_* constants defined on this interface.

angle

float

A convenience attribute for SVG_TRANSFORM_ROTATE, SVG_TRANSFORM_SKEWX and SVG_TRANSFORM_SKEWY. It holds the angle that was specified.

For SVG_TRANSFORM_MATRIX, SVG_TRANSFORM_TRANSLATE and SVG_TRANSFORM_SCALE, angle will be zero.

matrix

The matrix that represents this transformation. The matrix object is live, meaning that any changes made to the SVGTransform object are immediately reflected in the matrix object and vice versa. In case the matrix object is changed directly (i.e., without using the methods on the SVGTransform interface itself) then the type of the SVGTransform changes to SVG_TRANSFORM_MATRIX.

For SVG_TRANSFORM_MATRIX, the matrix contains the a, b, c, d, e, f values supplied by the user.

For SVG_TRANSFORM_TRANSLATE, e and f represent the translation amounts (a=1, b=0, c=0 and d=1).

For SVG_TRANSFORM_SCALE, a and d represent the scale amounts (b=0, c=0, e=0 and f=0).

For SVG_TRANSFORM_SKEWX and SVG_TRANSFORM_SKEWY, a, b, c and d represent the matrix which will result in the given skew (e=0 and f=0).

For SVG_TRANSFORM_ROTATE, a, b, c, d, e and f together represent the matrix which will result in the given rotation. When the rotation is around the center point (0, 0), e and f will be zero.

Methods

Name & Arguments

Return

Description

setMatrix(in  matrix)

void

Sets the transform type to SVG_TRANSFORM_MATRIX, with parameter matrix defining the new transformation. Note that the values from the parameter matrix are copied.

Exceptions:

a  with code NO_MODIFICATION_ALLOWED_ERR is raised when attempting to modify a read only attribute or when the object itself is read only.

setTranslate(in float tx , in float ty)

void

Sets the transform type to SVG_TRANSFORM_TRANSLATE, with parameters tx and ty defining the translation amounts.

Exceptions:

a  with code NO_MODIFICATION_ALLOWED_ERR is raised when attempting to modify a read only attribute or when the object itself is read only.

setScale(in float sx , in float sy)

void

Sets the transform type to SVG_TRANSFORM_SCALE, with parameters sx and sy defining the scale amounts.

Exceptions:

a  with code NO_MODIFICATION_ALLOWED_ERR is raised when attempting to modify a read only attribute or when the object itself is read only.

setRotate(in float angle, in float cx , in float cy)

void

Sets the transform type to SVG_TRANSFORM_ROTATE, with parameter angle defining the rotation angle and parameters cx and cy defining the optional center of rotation.

Exceptions:

a  with code NO_MODIFICATION_ALLOWED_ERR is raised when attempting to modify a read only attribute or when the object itself is read only.

setSkewX(in float angle)

void

Sets the transform type to SVG_TRANSFORM_SKEWX, with parameter angle defining the amount of skew.

Exceptions:

a  with code NO_MODIFICATION_ALLOWED_ERR is raised when attempting to modify a read only attribute or when the object itself is read only.

setSkewY(in float angle)

void

Sets the transform type to SVG_TRANSFORM_SKEWY, with parameter angle defining the amount of skew.

Exceptions:

a  with code NO_MODIFICATION_ALLOWED_ERR is raised when attempting to modify a read only attribute or when the object itself is read only.

Browser compatibility