# min-width

The min-width CSS property sets the minimum width of an element. It prevents the used value of the  property from becoming smaller than the value specified for min-width.

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone https://github.com/mdn/interactive-examples and send us a pull request.

The element's width is set to the value of min-width whenever min-width is larger than  or .

Syntax

/* <length> value */

min-width: 3.5em;

/* <percentage> value */

min-width: 10%;

/* Keyword values */

min-width: max-content;

min-width: min-content;

min-width: fit-content(20em);

/* Global values */

min-width: inherit;

min-width: initial;

min-width: unset;

Values

Defines the min-width as an absolute value.

Defines the min-width as a percentage of the containing block's width.

auto

The browser will calculate and select a min-width for the specified element.

max-content

The intrinsic preferred min-width.

min-content

The intrinsic minimum min-width.

fit-content()

Uses the fit-content formula with the available space replaced by the specified argument, i.e. min(max-content, max(min-content, argument)).

Formal definition

Formal syntax

Examples

Setting minimum element width

table { min-width: 75%; }

form { min-width: 0; }

Specifications

Specification

Status

Comment

Adds the max-content, min-content, fit-content keywords.

Adds the auto keyword and uses it as the initial value.

Initial definition.

Browser compatibility

See also

,

The box model,