# <rt>: The Ruby Text element

The HTML Ruby Text (<rt>) element specifies the ruby text component of a ruby annotation, which is used to provide pronunciation, translation, or transliteration information for East Asian typography. The <rt> element must always be contained within a  element.

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone https://github.com/mdn/interactive-examples and send us a pull request.

See the article about the  element for more examples.

Content categories

None.

Permitted content

Phrasing content.

Tag omission

The end tag may be omitted if the <rt> element is immediately followed by an <rt> or  element, or if there is no more content in the parent element

Permitted parents

A  element.

Implicit ARIA role

No corresponding role

Permitted ARIA roles

Any

DOM interface

Attributes

This element only includes the global attributes.

Examples

This simple example provides Romaji transliteration for the kanji characters within the  element:

<ruby>

漢 <rt>Kan</rt>

字 <rt>ji</rt>

</ruby>

body {

font-size: 22px;

}

The output looks like this in your browser:

On a browser without ruby support, this example might look like this:

漢 Kan 字 ji

body {

font-size: 22px;

}

Specifications

Specification

Status

Comment

Browser compatibility

See also