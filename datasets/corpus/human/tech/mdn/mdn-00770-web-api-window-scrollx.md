# Window.scrollX

The read-only scrollX property of the  interface returns the number of pixels that the document is currently scrolled horizontally. This value is subpixel precise in modern browsers, meaning that it isn't necessarily a whole number. You can get the number of pixels the document is scrolled vertically from the  property.

Syntax

var x = window.scrollX;

Value

In practice, the returned value is a double-precision floating-point value indicating the number of pixels the document is currently scrolled horizontally from the origin, where a positive value means the content is scrolled to the left. If the document is rendered on a subpixel-precise device, then the returned value is also subpixel-precise and may contain a decimal component. If the document isn't scrolled at all left or right, then scrollX is 0.

If you need an integer value, you can use  to round it off.

In more technical terms, scrollX returns the X coordinate of the left edge of the current . If there is no viewport, the returned value is 0.

Example

This example checks the current horizontal scroll position of the document. If it's greater than 400 pixels, the window is scrolled back to the beginning.

if (window.scrollX > 400) {

window.scroll(0,0);

}

Notes

The pageXOffset property is an alias for the scrollX property:

window.pageXOffset == window.scrollX; // always true

For cross-browser compatibility, use window.pageXOffset instead of window.scrollX. Additionally, older versions of Internet Explorer (< 9) do not support either property and must be worked around by checking other non-standard properties. A fully compatible example:

var x = (window.pageXOffset !== undefined)

? window.pageXOffset

: (document.documentElement || document.body.parentNode || document.body).scrollLeft;

var y = (window.pageYOffset !== undefined)

? window.pageYOffset

: (document.documentElement || document.body.parentNode || document.body).scrollTop;

Specifications

Specification

Status

Comment

Browser compatibility

See also