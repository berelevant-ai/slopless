# <mfenced>

The deprecated MathML <mfenced> element used to provide the possibility to add custom opening and closing parentheses (such as brackets) and separators (such as commas or semicolons) to an expression. It has been removed from the latest MathML standard and modern browsers no longer support it. Use the  and  elements instead.

Attributes

class, id, style

Provided for use with stylesheets.

close

A string for the closing delimiter. The default value is ")" and any white space is trimmed.

href

Used to set a hyperlink to a specified URI.

mathbackground

The background color. You can use #rgb, #rrggbb and HTML color names.

mathcolor

The text color and also the fraction line color. You can use #rgb, #rrggbb and HTML color names.

open

A string for the opening delimiter. The default value is "(" and any white space is trimmed.

separators

A sequence of zero or more characters to be used for different separators, optionally divided by white space, which is ignored. The default value is ",". By specifying more than one character, it is possible to set different separators for each argument in the expression. If there are too many separators, all excess is ignored. If there are too few separators in the expression, the last specified separator is repeated.

Examples

The last separator is repeated (,)

Sample rendering:

Rendering in your browser:   a b c d e

<math>

<mfenced open="{" close="}" separators=";;,">

<mi>a</mi>

<mi>b</mi>

<mi>c</mi>

<mi>d</mi>

<mi>e</mi>

</mfenced>

</math>

All excess is ignored (,)

Sample rendering:

Rendering in your browser:   a b c d e

<math>

<mfenced open="[" close="]" separators="||||,">

<mi>a</mi>

<mi>b</mi>

<mi>c</mi>

<mi>d</mi>

<mi>e</mi>

</mfenced>

</math>

Specifications

The <mfenced> element is no longer part of the latest MathML standard. Use the  and  elements instead, or, for backwards compatibility, see mathml-polyfills/mfenced.

Browser compatibility