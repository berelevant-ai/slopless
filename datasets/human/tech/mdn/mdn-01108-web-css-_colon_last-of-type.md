# :last-of-type

The :last-of-type CSS pseudo-class represents the last element of its type among a group of sibling elements.

/* Selects any <p> that is the last element

of its type among its siblings */

p:last-of-type {

color: lime;

}

Note: As originally defined, the selected element had to have a parent. Beginning with Selectors Level 4, this is no longer required.

Syntax

Examples

Styling the last paragraph

HTML

<h2>Heading</h2>

<p>Paragraph 1</p>

<p>Paragraph 2</p>

CSS

p:last-of-type {

color: red;

font-style: italic;

}

Result

Nested elements

This example shows how nested elements can also be targeted. Note that the universal selector (*) is implied when no simple selector is written.

HTML

<article>

<div>This `div` is first.</div>

<div>This <span>nested `span` is last</span>!</div>

<div>This <em>nested `em` is first</em>, but this <em>nested `em` is last</em>!</div>

<b>This `b` qualifies!</b>

<div>This is the final `div`!</div>

</article>

CSS

article :last-of-type {

background-color: pink;

}

Result

Specifications

Specification

Status

Comment

Matching elements are not required to have a parent.

Initial definition.

Browser compatibility

See also

,