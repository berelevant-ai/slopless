# HTMLStyleElement

The HTMLStyleElement interface represents a  element. It inherits properties and methods from its parent, , and from .

This interface doesn't allow to manipulate the CSS it contains (in most case). To manipulate CSS, see Using dynamic styling information for an overview of the objects used to manipulate specified CSS properties using the DOM.

Properties

Inherits properties from its parent, , and implements .

Is a  representing the intended destination medium for style information.

Is a  representing the type of style being applied by this statement.

Is a  value representing whether or not the stylesheet is disabled (true) or not (false).

Returns the  object associated with the given element, or null if there is none

Is a  value indicating if the element applies to the whole document (false) or only to the parent's sub-tree (true).

Methods

No specific method; inherits properties from its parent, , and .

Specifications

Specification

Status

Comment

The following property has been added: scoped.

Added a second inheritence, the  interface.

Initial definition

Browser compatibility

See also

The HTML element implementing this interface: .

Using dynamic styling information to see how to manipulate CSS.