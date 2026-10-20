# Element.scrollIntoViewIfNeeded()

The Element.scrollIntoViewIfNeeded() method scrolls the current element into the visible area of the browser window if it's not already within the visible area of the browser window. If the element is already within the visible area of the browser window, then no scrolling takes place. This method is a proprietary variation of the standard Element.scrollIntoView() method.

Syntax

TODO

Parameters

opt_center

Is an optional  value with a default value of true:

If true, the element will be aligned so it is centered within the visible area of the scrollable ancestor.

If false, the element will be aligned to the nearest edge of the visible area of the scrollable ancestor. Depending on which edge of the visible area is closest to the element, either the top of the element will be aligned to the top edge of the visible area, or the bottom edge of the element will be aligned to the bottom edge of the visible area.

Example

var element = document.getElementById("my-el");

element.scrollIntoViewIfNeeded();

element.scrollIntoViewIfNeeded(true); // Centers the element in the visible area

Specifications

Not part of any specification. This is a proprietary, WebKit-specific method.

Browser compatibility

See also

W3C CSSOM bug 17152: Support centering an element when scrolling into view. (feature request for a standardized equivalent to scrollIntoViewIfNeeded)