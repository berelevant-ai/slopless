# <dl>: The Description List element

The HTML <dl> element represents a description list. The element encloses a list of groups of terms (specified using the  element) and descriptions (provided by  elements). Common uses for this element are to implement a glossary or to display metadata (a list of key-value pairs).

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone https://github.com/mdn/interactive-examples  and send us a pull request.

Content categories

Flow content, and if the <dl> element's children include one name-value group, palpable content.

Permitted content

Either: Zero or more groups each consisting of one or more  elements followed by one or more  elements, optionally intermixed with  and  elements.

Or: (in  HTML,  HTML 5.2 and later) One or more  elements, optionally intermixed with  and  elements.

Tag omission

Permitted parents

Any element that accepts flow content.

Implicit ARIA role

No corresponding role

Permitted ARIA roles

, list, ,

DOM interface

Attributes

This element only includes the global attributes.

Examples

Single term and description

<dl>

<dt>Firefox</dt>

<dd>

A free, open source, cross-platform,

graphical web browser developed by the

Mozilla Corporation and hundreds of

volunteers.

</dd>

<!-- Other terms and descriptions -->

</dl>

Multiple terms, single description

<dl>

<dt>Firefox</dt>

<dt>Mozilla Firefox</dt>

<dt>Fx</dt>

<dd>

A free, open source, cross-platform,

graphical web browser developed by the

Mozilla Corporation and hundreds of

volunteers.

</dd>

<!-- Other terms and descriptions -->

</dl>

Single term, multiple descriptions

<dl>

<dt>Firefox</dt>

<dd>

A free, open source, cross-platform,

graphical web browser developed by the

Mozilla Corporation and hundreds of

volunteers.

</dd>

<dd>

The Red Panda also known as the Lesser

Panda, Wah, Bear Cat or Firefox, is a

mostly herbivorous mammal, slightly larger

than a domestic cat (60 cm long).

</dd>

<!-- Other terms and descriptions -->

</dl>

Multiple terms and descriptions

It is also possible to define multiple terms with multiple corresponding descriptions, by combining the examples above.

Metadata

Description lists are useful for displaying metadata as a list of key-value pairs.

<dl>

<dt>Name</dt>

<dd>Godzilla</dd>

<dt>Born</dt>

<dd>1952</dd>

<dt>Birthplace</dt>

<dd>Japan</dd>

<dt>Color</dt>

<dd>Green</dd>

</dl>

Tip: It can be handy to define a key-value separator in the CSS, such as:

dt::after {

content: ": ";

}

Wrapping name-value groups in  elements

WHATWG HTML allows wrapping each name-value group in a  element in a  element. This can be useful when using microdata, or when global attributes apply to a whole group, or for styling purposes.

<dl>

<div>

<dt>Name</dt>

<dd>Godzilla</dd>

</div>

<div>

<dt>Born</dt>

<dd>1952</dd>

</div>

<div>

<dt>Birthplace</dt>

<dd>Japan</dd>

</div>

<div>

<dt>Color</dt>

<dd>Green</dd>

</div>

</dl>

Notes

Do not use this element (nor  elements) to merely create indentation on a page. Although it works, this is a bad practice and obscures the meaning of description lists.

To change the indentation of a description term, use the CSS  property.

Accessibility concerns

Each screen reader announces <dl> content differently. As of iOS 14, VoiceOver will announce that <dl> content is a list when navigating with the virtual cursor (not via the read-all command). Because of this, make sure each list item's content is written in such a way that it communicates its relationship to the other list items in the list grouping.

CodePen - HTML Buddies: dt & dd

VoiceOver on iOS 14 Supports Description Lists

Specifications

Specification

Status

Comment

It can now include  elements as children to wrap <dt> and <dd> elements.

Browser compatibility

See also