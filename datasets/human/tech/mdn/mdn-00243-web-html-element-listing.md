# <listing>

Summary

The HTML Listing Element (<listing>) renders text between the start and end tags without interpreting the HTML in between and using a monospaced font. The HTML 2 standard recommended that lines shouldn't be broken when not greater than 132 characters.

Note: Do not use this element.

It is deprecated since HTML 3.2 and was neither implemented by all browsers, nor in a consistent way. Even more it is obsoleted in HTML5 and may be rendered by conforming user-agents as the  element, which will interpret the internal HTML!

Instead use the  element or if semantically adequate the  element, eventually escaping the HTML '<' and '>' so that they don't get interpreted.

A monospaced font can also be obtained on a simple  element, by applying an adequate CSS style using monospace as the generic-font value in a  property.

Attributes

This element has no other attributes than the global attributes, common to all elements.

DOM interface

This element implements the  interface.

Implementation note: up to Gecko 1.9.2 inclusive, Firefox implements the  interface for this element.

Browser compatibility

See also

The  and  elements to be used instead.

The  and  elements, similar to  but also obsolete.