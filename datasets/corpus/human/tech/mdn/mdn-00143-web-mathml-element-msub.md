# <msub>

The MathML <msub> element is used to attach a subscript to an expression.

It uses the following syntax: <msub> base subscript </msub>.

Attributes

class, id, style

Provided for use with stylesheets.

displaystyle

A Boolean value specifying whether more vertical space is used for displayed equations or, if set to false, a more compact layout is used to display formulas. The main effect is that larger versions of operators are displayed, when displaystyle is set to true. See also largeop and movablelimits on .

href

Used to set a hyperlink to a specified URI.

mathbackground

The background color. You can use #rgb, #rrggbb and HTML color names.

mathcolor

The text color. You can use #rgb, #rrggbb and HTML color names.

subscriptshift

The minimum space by which to shift the subscript below the baseline of the expression, as a length value.

This attribute is deprecated and will be removed in the future.

Examples

Sample rendering:

Rendering in your browser:   X 1

<math>

<msub>

<mi>X</mi>

<mn>1</mn>

</msub>

</math>

Specifications

Specification

Status

Comment

Draft specification

Current specification

Initial specification

Browser compatibility

See also

(Superscript)

(Subscript-superscript pair)

(Prescripts and tensor indices)