# DOMRect

A DOMRect describes the size and position of a rectangle.

The type of box represented by the DOMRect is specified by the method or property that returned it. For example,  from the WebVR API specifies the viewport of a canvas into which visuals for one eye of a head mounted display should be rendered.

It inherits from its parent, .

Constructor

Creates a new DOMRect object.

Properties

DOMRect inherits properties from its parent, . The difference is that they are not read-only anymore.

The x coordinate of the DOMRect's origin (typically the top-left corner of the rectangle).

The y coordinate of the DOMRect's origin (typically the top-left corner of the rectangle).

The width of the DOMRect.

The height of the DOMRect.

Returns the top coordinate value of the DOMRect (has the same value as y, or y + height if height is negative.)

Returns the right coordinate value of the DOMRect (has the same value as x + width, or x if width is negative.)

Returns the bottom coordinate value of the DOMRect (has the same value as y + height, or y if height is negative.)

Returns the left coordinate value of the DOMRect (has the same value as x, or x + width if width is negative.)

Methods

DOMRect inherits methods from its parent, .

Static methods

Creates a new DOMRect object with a given location and dimensions.

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

See also