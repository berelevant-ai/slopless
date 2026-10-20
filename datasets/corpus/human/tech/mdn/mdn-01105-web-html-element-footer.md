# <footer>

The HTML <footer> element represents a footer for its nearest sectioning content or sectioning root element. A footer typically contains information about the author of the section, copyright data or links to related documents.

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone https://github.com/mdn/interactive-examples  and send us a pull request.

Content categories

Flow content, palpable content.

Permitted content

Flow content, but with no <footer> or  descendants.

Tag omission

Permitted parents

Any element that accepts flow content. Note that a <footer> element must not be a descendant of an ,  or another <footer> element.

Implicit ARIA role

contentinfo, or no corresponding role if a descendant of an article, aside, main, nav or section element, or an element with role=article, complementary, main, navigation or region

Permitted ARIA roles

,  or

DOM interface

Attributes

This element only includes the global attributes.

Usage notes

Enclose information about the author in an  element that can be included into the <footer> element.

The <footer> element is not sectioning content and therefore doesn't introduce a new section in the outline.

Examples

<footer>

Some copyright info or perhaps some author

info for an <article>?

</footer>

Accessibility concerns

Prior to the release of Safari 13, the contentinfo landmark role was not properly exposed by VoiceOver. If needing to support legacy Safari browsers, add role="contentinfo" to the footer element to ensure the landmark will be properly exposed.

Related: WebKit Bugzilla: 146930 – AX: HTML native elements (header, footer, main, aside, nav) should work the same as ARIA landmarks, sometimes they don't

Specifications

Specification

Status

Comment

Browser compatibility

See also

Other section-related elements: , , , , , , , , , , , , , ;

Using HTML sections and outlines

ARIA: Contentinfo role