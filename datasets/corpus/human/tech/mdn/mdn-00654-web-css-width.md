# width

The width CSS property sets an element's width. By default, it sets the width of the content area, but if  is set to border-box, it sets the width of the border area.

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone https://github.com/mdn/interactive-examples and send us a pull request.

The  and  properties override width.

Syntax

/* <length> values */

width: 300px;

width: 25em;

/* <percentage> value */

width: 75%;

/* Keyword values */

width: max-content;

width: min-content;

width: fit-content(20em);

width: auto;

/* Global values */

width: inherit;

width: initial;

width: unset;

Values

Defines the width as an absolute value.

Defines the width as a percentage of the containing block's width.

auto

The browser will calculate and select a width for the specified element.

max-content

The intrinsic preferred width.

min-content

The intrinsic minimum width.

fit-content()

Uses the fit-content formula with the available space replaced by the specified argument, i.e. min(max-content, max(min-content, <length-percentage>)).

Accessibility concerns

Ensure that elements set with a width aren't truncated and/or don't obscure other content when the page is zoomed to increase text size.

MDN Understanding WCAG, Guideline 1.4 explanations

Understanding Success Criterion 1.4.4 | W3C Understanding WCAG 2.0

Formal definition

Formal syntax

Examples

Default width

p.goldie {

background: gold;

}

<p class="goldie">The Mozilla community produces a lot of great software.</p>

Pixels and ems

.px_length {

width: 200px;

background-color: red;

color: white;

border: 1px solid black;

}

.em_length {

width: 20em;

background-color: white;

color: red;

border: 1px solid black;

}

<div class="px_length">Width measured in px</div>

<div class="em_length">Width measured in em</div>

Percentage

.percent {

width: 20%;

background-color: silver;

border: 1px solid red;

}

<div class="percent">Width in percentage</div>

max-content

p.maxgreen {

background: lightgreen;

width: intrinsic;           /* Safari/WebKit uses a non-standard name */

width: -moz-max-content;    /* Firefox/Gecko */

width: -webkit-max-content; /* Chrome */

width: max-content;

}

<p class="maxgreen">The Mozilla community produces a lot of great software.</p>

min-content

p.minblue {

background: lightblue;

width: -moz-min-content;    /* Firefox */

width: -webkit-min-content; /* Chrome */

width: min-content;

}

<p class="minblue">The Mozilla community produces a lot of great software.</p>

Specifications

Specification

Status

Comment

Added the max-content, min-content, fit-content keywords.

Precises on which element it applies to.

Initial definition.

Browser compatibility

See also

The box model

,

The mapped logical properties: ,