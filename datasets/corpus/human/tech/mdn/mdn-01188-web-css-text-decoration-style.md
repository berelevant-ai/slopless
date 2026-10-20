# text-decoration-style

The text-decoration-style CSS property sets the style of the lines specified by . The style applies to all lines that are set with text-decoration-line.

If the specified decoration has a specific semantic meaning, like a line-through line meaning that some text has been deleted, authors are encouraged to denote this meaning using an HTML tag, like  or . As browsers can disable styling in some cases, the semantic meaning won't disappear in such a situation.

When setting multiple line-decoration properties at once, it may be more convenient to use the  shorthand property instead.

Syntax

/* Keyword values */

text-decoration-style: solid;

text-decoration-style: double;

text-decoration-style: dotted;

text-decoration-style: dashed;

text-decoration-style: wavy;

/* Global values */

text-decoration-style: inherit;

text-decoration-style: initial;

text-decoration-style: unset;

Values

solid

Draws a single line.

double

Draws a double line.

dotted

Draws a dotted line.

dashed

Draws a dashed line.

wavy

Draws a wavy line.

-moz-none

Draws no line. Use : none instead.

Formal definition

Formal syntax

Examples

Setting a wavy underline

.example {

-moz-text-decoration-line: underline;

-moz-text-decoration-style: wavy;

-moz-text-decoration-color: red;

-webkit-text-decoration-line: underline;

-webkit-text-decoration-style: wavy;

-webkit-text-decoration-color: red;

}

CSS

.wavy {

text-decoration-line: underline;

text-decoration-style: wavy;

text-decoration-color: red;

}

HTML

<p class="wavy">This text has a wavy red line beneath it.</p>

Results

Specifications

Specification

Status

Comment

Initial definition. The  property is now a shorthand to define multiple related properties.

Browser compatibility

See also

When setting multiple line-decoration properties at once, it may be more convenient to use the  shorthand property instead.