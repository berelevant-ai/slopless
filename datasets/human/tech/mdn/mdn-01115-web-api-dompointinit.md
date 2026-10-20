# DOMPointInit

The DOMPointInit dictionary is used to provide the values of the coordinates and perspective when creating and JSONifying a  or  object.

It's used as an input parameter to the DOMPoint/DOMPointReadOnly method . It's used as the return value when calling .

Properties

An unrestricted floating-point value indicating the x-coordinate of the point in space. This is generally the horizontal coordinate, with positive values being to the right and negative values to the left. The default value is 0.

An unrestricted floating-point number providing the point's y-coordinate. This is the vertical coordinate, and barring any transforms applied to the coordinate system, positive values are downward and negative values upward toward the top of the screen. The default is 0.

An unrestricted floating-point value which gives the point's z-coordinate, which is (assuming no transformations that alter the situation) the depth coordinate; positive values are closer to the user and negative values retreat back into the screen. The default value is 0.

The point's w perspective value, given as an unrestricted floating-point number. The default is 1.

Example

This example creates a new DOMPoint representing the top-left corner of the current window, with a z component added to move the point closer to the user. This same code will work to create a DOMPointReadOnly object; just change the interface name in the code.

const pointDesc = {

x: window.screenX,

y: window.screenY,

z: 5.0

};

const windTopLeft = DOMPoint.fromPoint(pointDesc)

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility