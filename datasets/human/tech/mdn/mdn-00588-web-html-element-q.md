# <q>: The Inline Quotation element

The HTML <q> element indicates that the enclosed text is a short inline quotation. Most modern browsers implement this by surrounding the text in quotation marks. This element is intended for short quotations that don't require paragraph breaks; for long quotations use the  element.

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone https://github.com/mdn/interactive-examples and send us a pull request.

Content categories

Flow content, phrasing content, palpable content.

Permitted content

Phrasing content.

Tag omission

Permitted parents

Any element that accepts phrasing content.

Implicit ARIA role

No corresponding role

Permitted ARIA roles

Any

DOM interface

Usage note: Most modern browsers will automatically add quotation marks around text inside a <q> element. A style rule may be needed to add quotation marks in older browsers.

Attributes

This element includes the global attributes.

The value of this attribute is a URL that designates a source document or message for the information quoted. This attribute is intended to point to information explaining the context or the reference for the quote.

Example

<p>According to Mozilla's website,

<q

cite="https://www.mozilla.org/en-US/about/history/details/">Firefox 1.0

was released in 2004 and became a big success.</q></p>

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility

See also

The  element for long quotations.

The  element for source citations.