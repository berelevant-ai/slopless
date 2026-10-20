# CSSStyleDeclaration

The CSSStyleDeclaration interface represents an object that is a CSS declaration block, and exposes style information and various style-related methods and properties.

A CSSStyleDeclaration object can be exposed using three different APIs:

Via , which deals with the inline styles of a single element (e.g., <div style="...">).

Via the  API. For example, document.styleSheets[0].cssRules[0].style returns a CSSStyleDeclaration object on the first CSS rule in the document's first stylesheet.

Via , which exposes the CSSStyleDeclaration object as a read-only interface.

Attributes

Textual representation of the declaration block. Setting this attribute changes the style.

The number of properties. See the  method below.

The containing .

CSS Properties

Special alias for the  CSS property.

Dashed and camel-cased attributes for all supported CSS properties.

Methods

Returns the optional priority, "important".

Returns the property value given a property name.

Returns a CSS property name by its index, or the empty string if the index is out-of-bounds.

An alternative to accessing nodeList[i] (which instead returns undefined when i is out-of-bounds). This is mostly useful for non-JavaScript DOM implementations.

Removes a property from the CSS declaration block.

Modifies an existing CSS property or creates a new CSS property in the declaration block.

Only supported via getComputedStyle in Firefox. Returns the property value as a  or null for shorthand properties.

Example

var styleObj = document.styleSheets[0].cssRules[0].style;

console.log(styleObj.cssText);

for (var i = styleObj.length; i--;) {

var nameString = styleObj[i];

styleObj.removeProperty(nameString);

}

console.log(styleObj.cssText);

Specifications

Specification

Status

Comment

Merged the DOM Level 2 Style CSS2Properties interface into CSSStyleDeclaration.

Initial definition

Browser compatibility

See also

CSS Properties Reference