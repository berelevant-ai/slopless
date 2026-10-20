# -webkit-line-clamp

The -webkit-line-clamp CSS property allows limiting of the contents of a  to the specified number of lines.

It only works in combination with the  property set to -webkit-box or -webkit-inline-box and the  property set to vertical.

In most cases you will also want to set  to hidden, otherwise the contents won't be clipped but an ellipsis will still be shown after the specified number of lines.

When applied to anchor elements, the truncating can happen in the middle of the text, not necessarily at the end.

Note: This property was originally implemented in WebKit and has some issues. It got standardized for legacy support. The CSS Overflow Module Level 3 specification also defines a  property, which is meant to replace this property and avoid its issues.

Syntax

/* Keyword value */

-webkit-line-clamp: none;

/* <integer> values */

-webkit-line-clamp: 3;

-webkit-line-clamp: 10;

/* Global values */

-webkit-line-clamp: inherit;

-webkit-line-clamp: initial;

-webkit-line-clamp: unset;

none

This value specifies that the content wonʼt be clamped.

This value specifies the number of lines after which the content will be clamped. It must be greater than 0.

Formal definition

Formal syntax

Examples

Truncating a paragraph

HTML

<p>

In this example the <code>-webkit-line-clamp</code> property is set to <code>3</code>, which means the text is clamped after three lines.

An ellipsis will be shown at the point where the text is clamped.

</p>

CSS

p {

width: 300px;

display: -webkit-box;

-webkit-box-orient: vertical;

-webkit-line-clamp: 3;

overflow: hidden;

}

Result

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility

See also

Line Clampin’ (Truncating Multiple Line Text)