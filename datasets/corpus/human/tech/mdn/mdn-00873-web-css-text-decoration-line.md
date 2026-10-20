# text-decoration-line

The text-decoration-line CSS property sets the kind of decoration that is used on text in an element, such as an underline or overline.

When setting multiple line-decoration properties at once, it may be more convenient to use the  shorthand property instead.

Syntax

/* Single keyword */

text-decoration-line: none;

text-decoration-line: underline;

text-decoration-line: overline;

text-decoration-line: line-through;

text-decoration-line: blink;

/* Multiple keywords */

text-decoration-line: underline overline;               /* Two decoration lines */

text-decoration-line: overline underline line-through;  /* Multiple decoration lines */

/* Global values */

text-decoration-line: inherit;

text-decoration-line: initial;

text-decoration-line: unset;

The text-decoration-line property is specified as none, or one or more space-separated values from the list below.

Values

none

Produces no text decoration.

underline

Each line of text has a decorative line beneath it.

overline

Each line of text has a decorative line above it.

line-through

Each line of text has a decorative line going through its middle.

blink

The text blinks (alternates between visible and invisible). Conforming user agents may not blink the text. This value is deprecated in favor of CSS animations.

Formal definition

Formal syntax

Examples

Basic example

<p class="wavy">Here's some text with wavy red underline!</p>

<p class="both">This text has lines both above and below it.</p>

.wavy {

text-decoration-line: underline;

text-decoration-style: wavy;

text-decoration-color: red;

}

.both {

text-decoration-line: underline overline;

}

Specifications

Specification

Status

Comment

Initial definition. The  property is now a shorthand to define multiple related properties.

Browser compatibility

See also

When setting multiple line-decoration properties at once, it may be more convenient to use the  shorthand property instead.