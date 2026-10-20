# max-width

The max-width CSS property sets the maximum width of an element. It prevents the used value of the  property from becoming larger than the value specified by max-width.

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone https://github.com/mdn/interactive-examples and send us a pull request.

max-width overrides , but  overrides max-width.

Syntax

/* <length> value */

max-width: 3.5em;

/* <percentage> value */

max-width: 75%;

/* Keyword values */

max-width: none;

max-width: max-content;

max-width: min-content;

max-width: fit-content(20em);

/* Global values */

max-width: inherit;

max-width: initial;

max-width: unset;

Values

Defines the max-width as an absolute value.

Defines the max-width as a percentage of the containing block's width.

none

No limit on the size of the box.

max-content

The intrinsic preferred max-width.

min-content

The intrinsic minimum max-width.

fit-content()

Uses the fit-content formula with the available space replaced by the specified argument, i.e. min(max-content, max(min-content, argument)).

Accessibility concerns

Ensure that elements set with a max-width are not truncated and/or do not obscure other content when the page is zoomed to increase text size.

MDN Understanding WCAG, Guideline 1.4 explanations

Understanding Success Criterion 1.4.4 | W3C Understanding WCAG 2.0

Formal definition

Formal syntax

Examples

Setting max width in pixels

In this example, the "child" will be either 150 pixels wide or the width of the "parent," whichever is smaller.

HTML

<div id="parent">

<div id="child">

Fusce pulvinar vestibulum eros, sed luctus ex lobortis quis.

</div>

</div>

CSS

#parent {

background: lightblue;

width: 300px;

}

#child {

background: gold;

width: 100%;

max-width: 150px;

}

Result

Specifications

Specification

Status

Comment

Adds the max-content, min-content, fit-content keywords.

Initial definition.

Browser compatibility

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also

The box model,

,

The mapped logical properties: ,