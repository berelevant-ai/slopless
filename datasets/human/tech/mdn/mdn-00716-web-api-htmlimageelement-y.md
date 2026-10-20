# HTMLImageElement.y

The read-only  property y indicates the y-coordinate of the  element's top border edge relative to the root element's origin.

The  and y properties are only valid for an image if its  property has the computed value table-column or table-column-group. In other words: it has either of those values set explicitly on it, or it has inherited it from a containing element, or by being located within a column described by either  or .

Syntax

let imageY = htmlImageElement.y;

Value

An integer value indicating the distance in pixels from the top edge of the element's nearest root element to the top edge of the  element's border box. The nearest root element is the outermost  element that contains the image. If the image is in an , its y is relative to that frame.

In the diagram below, the top border edge is the top edge of the blue padding area. So the value returned by y would be the distance from that point to the top edge of the content area.

Note: The y property is only valid if the computed value of the image's  property is either table-column or table-column-group; in other words, either of those are set directly on the  or they're inherited from a containing element or by being located within a column described by either  or .

Example

Specifications

Specification

Status

Comment

Browser compatibility