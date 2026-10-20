# :first-child

The :first-child CSS pseudo-class represents the first element among a group of sibling elements.

/* Selects any <p> that is the first element

among its siblings */

p:first-child {

color: lime;

}

Note: As originally defined, the selected element had to have a parent. Beginning with Selectors Level 4, this is no longer required.

Syntax

Examples

Basic example

HTML

<div>

<p>This text is selected!</p>

<p>This text isn't selected.</p>

</div>

<div>

<h2>This text isn't selected: it's not a `p`.</h2>

<p>This text isn't selected.</p>

</div>

CSS

p:first-child {

color: lime;

background-color: black;

padding: 5px;

}

Result

Styling a list

HTML

<ul>

<li>Item 1</li>

<li>Item 2</li>

<li>Item 3

<ul>

<li>Item 3.1</li>

<li>Item 3.2</li>

<li>Item 3.3</li>

</ul>

</li>

</ul>

CSS

ul li {

color: blue;

}

ul li:first-child {

color: red;

font-weight: bold;

}

Result

Specifications

Specification

Status

Comment

Matching elements are not required to have a parent.

No change.

Initial definition.

Browser compatibility

See also