# <xmp>

Summary

The HTML Example Element (<xmp>) renders text between the start and end tags without interpreting the HTML in between and using a monospaced font. The HTML2 specification recommended that it should be rendered wide enough to allow 80 characters per line.

Note: Do not use this element.

It has been deprecated since HTML3.2 and was not implemented in a consistent way. It was completely removed from the language in HTML5.

Use the  element or, if semantically adequate, the  element instead. Note that you will need to escape the '<' character as '<' to make sure it is not interpreted as markup.

A monospaced font can also be obtained on any element, by applying an adequate CSS style using monospace as the generic-font value for the  property.

Attributes

This element has no other attributes than the global attributes, common to all elements.

DOM interface

This element implements the  interface.

Implementation note: up to Gecko 1.9.2 inclusive, Firefox implements the  interface for this element.

Browser compatibility

See also

The  and  elements to be used instead.

The  and  elements, similar to  but also obsolete.