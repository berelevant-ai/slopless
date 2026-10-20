# max()

The max() CSS function lets you set the largest (most positive) value from a list of comma-separated expressions as the value of a CSS property value. The max() function can be used anywhere a , , , , , , or  is allowed.

In the first above example, the width will be at least 400px, but will be wider if the viewport is more than 2000px wide (in which case 1vw would be 20px, so 20vw would be 400px). Think of the max() value as providing the minimum value a property can have.

Syntax

The max() function takes one or more comma-separated expressions as its parameter, with the largest (most positive) expression value used as the value of the property to which it is assigned.

The expressions can be math expressions (using arithmetic operators), literal values, or other expressions, such as , that evaluate to a valid argument type (like ), or nested  and max() functions.

You can use different units for each value in your expression. You may also use parentheses to establish computation order when needed.

Notes

Math expressions involving percentages for widths and heights on table columns, table column groups, table rows, table row groups, and table cells in both auto and fixed layout tables may be treated as if auto had been specified.

It is permitted to nest min() and other max() functions as expression values. The expressions are full math expressions, so you can use direct addition, subtraction, multiplication and division without using the calc() function itself.

The expression can be values combining the addition ( + ), subtraction ( - ), multiplication ( * ) and division ( / ) operators, using standard operator precedence rules. Make sure to put a space on each side of the + and - operands. The operands in the expression may be any <length> syntax value.

You can (and often need to) combine min() and max() values, or use max() within a clamp() or calc() function.

Formal syntax

Examples

Setting a minimum size for a font

Another use case for CSS functions is allow a font size to grow while ensuring it is at least a mimum size, enabling responsive font sizes while ensuring legibility.

Let's look at some CSS:

h1 {

font-size: 2rem;

}

h1.responsive {

font-size: max(4vw, 2em, 2rem);

}

The font-size will at minimum be 2rems, or twice the default size of font for the page. This ensure it is legible and ensures accessibility

<h1>This text is always legible, but doesn't change size</h1>

<h1 class="responsive">This text is always legible, and is responsive, to a point</h1>

Think of the max() function as finding the minimum value allowed for a property.

Accessibility concerns

When max() is used for controlling text size, make sure the text is always large enough to read. A suggestion is to use the  function nested within a max() that has as its second value a relative length unit that is always large enough to read. For example:

small {

font-size: max(min(0.5vw, 0.5em), 1rem);

}

This ensures a minimum size of 1rem, with a text size that scales if the page is zoomed.

MDN Understanding WCAG, Guideline 1.4 explanations

Understanding Success Criterion 1.4.4 | W3C Understanding WCAG 2.0

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility

See also

CSS Values