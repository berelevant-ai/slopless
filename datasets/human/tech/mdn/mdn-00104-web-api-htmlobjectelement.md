# HTMLObjectElement

The HTMLObjectElement interface provides special properties and methods (beyond those on the  interface it also has available to it by inheritance) for manipulating the layout and presentation of  element, representing external resources.

Properties

Inherits properties from its parent, .

Is a  representing an enumerated property indicating alignment of the element's contents with respect to the surrounding context. The possible values are "left", "right", "justify", and "center".

Is a  that reflects the  HTML attribute, containing a list of archives for resources for this object.

Is a  that reflects the  HTML attribute, specifying the width of a border around the object.

Is a  representing the name of an applet class file, containing either the applet's subclass, or the path to get to the class, including the class file itself.

Is a  that reflects the  HTML attribute, specifying the base path to use to resolve relative URIs.

Is a  that reflects the  HTML attribute, specifying the content type of the data.

Returns a  representing the active document of the object element's nested browsing context, if any; otherwise null.

Returns a  representing the window proxy of the object element's nested browsing context, if any; otherwise null.

Returns a  that reflects the  HTML attribute, specifying the address of a resource's data.

Is a  that reflects the  HTML attribute, indicating that this is a declaration, not an instantiation, of the object.

Retuns a  representing the object element's form owner, or null if there isn't one.

Returns a  that reflects the  HTML attribute, specifying the displayed height of the resource in CSS pixels.

Is a long representing the horizontal space in pixels around the control.

Returns a  that reflects the  HTML attribute, specifying the name of the browsing context.

Is a  that reflects the  HTML attribute, specifying a message to display while the object loads.

Is a long representing the position of the element in the tabbing navigation order for the current document.

Is a  that reflects the  HTML attribute, specifying the MIME type of the resource.

Is a  that reflects the  HTML attribute, indicating if the resource specified by  must only be played if it matches the  attribute.

Is a  that reflects the  HTML attribute, specifying a  element to use.

Returns a  representing a localized message that describes the validation constraints that the control does not satisfy (if any). This is the empty string if the control is not a candidate for constraint validation (willValidate is false), or it satisfies its constraints.

Returns a  with the validity states that this element is in.

Is a long representing the horizontal space in pixels around the control.

Is a  that reflects the  HTML attribute, specifying the displayed width of the resource in CSS pixels.

Returns a  that indicates whether the element is a candidate for constraint validation. Always false for HTMLObjectElement objects.

Methods

Inherits methods from its parent, .

Retuns a  that always is true, because object objects are never candidates for constraint validation.

Sets a custom validity message for the element. If this message is not the empty string, then the element is suffering from a custom validity error, and does not validate.

Specifications

Specification

Status

Comment

The W3C specification is a latest of a previous version of

Technically, the property tabindex is now defined on .

The following properties are now obsolete: align, archive, border, code, codeBase, codeType, declare, hspace, standby, and vspace.

The following properties have been added: typeMustMatch, contentWindow, willValidate, validity, and validationMessage.

The following methods have been added: checkValidity() and setCustomValidity().

The contentDocument property has been added.

Initial definition.

Browser compatibility

See also

The HTML element implementing this interface: