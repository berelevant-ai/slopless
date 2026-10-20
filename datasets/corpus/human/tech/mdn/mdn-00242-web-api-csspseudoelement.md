# CSSPseudoElement

The CSSPseudoElement interface represents a pseudo-element that may be the target of an event or animated using the . Instances of this interface may be obtained by calling .

Properties

Returns the originating/parent  of the pseudo-element.

Returns the pseudo-element selector as a .

Methods

CSSPseudoElement extends , so it inherits the following methods:

Registers an event handler of a specific event type on the pseudo-element.

Dispatches an event to this pseudo-element.

Removes an event listener from the pseudo-element.

Examples

Basic example using Element.pseudo

Using pseudo-elements, most modern browsers will automatically add quotation marks around text inside a  element. (A style rule may be needed to add quotation marks in older browsers.) The example below demonstrates the basic properties of the CSSPseudoElement object representing the opening quotation mark.

const element = document.querySelector('q');

const cssPseudoElement = element.pseudo('::before');

console.log(cssPseudoElement.element); // Outputs [object HTMLQuoteElement]

console.log(cssPseudoElement.type); // Outputs '::before'

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also