# margin-left

The margin-left CSS property sets the margin area on the left side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone https://github.com/mdn/interactive-examples and send us a pull request.

The vertical margins of two adjacent boxes may fuse. This is called margin collapsing.

In the rare cases where width is overconstrained (i.e., when all of width, margin-left, border, padding, the content area, and margin-right are defined), margin-left is ignored, and will have the same calculated value as if the auto value was specified.

Syntax

/* <length> values */

margin-left: 10px;  /* An absolute length */

margin-left: 1em;   /* relative to the text size */

margin-left: 5%;    /* relative to the nearest block container's width */

/* Keyword values */

margin-left: auto;

/* Global values */

margin-left: inherit;

margin-left: initial;

margin-left: unset;

The margin-left property is specified as the keyword auto, or a <length>, or a <percentage>. Its value can be positive, zero, or negative.

Values

The size of the margin as a fixed value.

The size of the margin as a percentage, relative to the width of the containing block.

auto

The left margin receives a share of the unused horizontal space, as determined mainly by the layout mode that is used. If the values of margin-left and margin-right are both auto, the calculated space is evenly distributed. This table summarizes the different cases:

Value of

Value of

Value of

Computed value of auto

Comment

inline, inline-block, inline-table

any

static or relative

0

Inline layout mode

block, inline, inline-block, block, table, inline-table, list-item, table-caption

any

static or relative

0, except if both margin-left and margin-right are set to auto. In this case, it is set to the value centering the element inside its parent.

Block layout mode

block, inline, inline-block, block, table, inline-table, list-item, table-caption

left or right

static or relative

0

Block layout mode (floating element)

any table-*, except table-caption

any

any

0

Internal table-* elements don't have margins, use  instead

any, except flex, inline-flex, or table-*

any

fixed or absolute

0, except if both margin-left and margin-right are set to auto. In this case, it is set to the value centering the border area inside the available width, if fixed.

Absolutely positioned layout mode

flex, inline-flex

any

any

0, except if there is any positive horizontal free space. In this case, it is evenly distributed to all horizontal auto margins.

Flexbox layout mode

Formal definition

Formal syntax

Examples

Setting left margin using pixels and percentages

.content { margin-left: 5%; }

.sidebox { margin-left: 10px; }

.logo    { margin-left: -5px; }

Specifications

Specification

Status

Comment

No significant change from CSS 2.1.

Defines the behavior of margin-left on flex items.

Like in CSS1, but removes its effect on inline elements.

Initial definition.

Browser compatibility

See also

, , and  and the  shorthand

The mapped logical properties: , , , and  and the shorthands  and