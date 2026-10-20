# <header>

The HTML <header> element represents introductory content, typically a group of introductory or navigational aids. It may contain some heading elements but also a logo, a search form, an author name, and other elements.

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone https://github.com/mdn/interactive-examples  and send us a pull request.

Content categories

Flow content, palpable content.

Permitted content

Flow content, but with no <header> or  descendant.

Tag omission

Permitted parents

Any element that accepts flow content. Note that a <header> element must not be a descendant of an ,  or another  element.

Implicit ARIA role

banner, or no corresponding role if a descendant of an article, aside, main, nav or section element, or an element with role=article, complementary, main, navigation or region

Permitted ARIA roles

,  or

DOM interface

Usage notes

The <header> element is not sectioning content and therefore does not introduce a new section in the outline. That said, a <header> element is intended to usually contain the surrounding section's heading (an h1–h6 element), but this is not required.

Historical Usage

Although the <header> element didn't make its way into specifications until , it actually existed at the very beginning of HTML. As seen in the very first website, it was originally used as the <head> element. At some point, it was decided to use a different name. This allowed <header> to be free to fill a different role later on.

Attributes

This element only includes the global attributes.

Examples

Page Header

<header>

<h1>Main Page Title</h1>

<img src="mdn-logo-sm.png" alt="MDN logo">

</header>

Article Header

<article>

<header>

<h2>The Planet Earth</h2>

<p>Posted on Wednesday, <time datetime="2017-10-04">4 October 2017</time> by Jane Smith</p>

</header>

<p>We live on a planet that's blue and green, with so many things still unseen.</p>

<p><a href="https://janesmith.com/the-planet-earth/">Continue reading....</a></p>

</article>

Specifications

Specification

Status

Comment

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also

Other section-related elements: , , , , , , , , , , , , , .

Using HTML sections and outlines