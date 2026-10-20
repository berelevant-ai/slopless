# initial-letter

The initial-letter CSS property sets styling for dropped, raised, and sunken initial letters.

/* Keyword values */

initial-letter: normal;

/* Numeric values */

initial-letter: 1.5;    /* Initial letter occupies 1.5 lines */

initial-letter: 3.0;    /* Initial letter occupies 3 lines */

initial-letter: 3.0 2;  /* Initial letter occupies 3 lines and

sinks 2 lines */

/* Global values */

initial-letter: inherit;

initial-letter: initial;

initial-letter: unset;

Syntax

The keyword value normal, or a <number> optionally followed by an <integer>.

Values

normal

No special initial-letter effect. Text behaves as normal.

<number>

Defines the size of the initial letter, in terms of how many lines it occupies. Negative values are not allowed.

<integer>

Defines the number of lines the initial letter should sink when the size of it is given. Values must be greater than zero. If omitted, it duplicates the size value, floored to the nearest positive whole number.

Formal definition

Formal syntax

Examples

Setting initial letter size

HTML

<p class="normal">Initial letter is normal</p>

<p class="onefive">Initial letter occupies 1.5 lines</p>

<p class="three">Initial letter occupies 3 lines</p>

CSS

.normal {

-webkit-initial-letter: normal;

initial-letter: normal;

}

.onefive {

-webkit-initial-letter: 1.5;

initial-letter: 1.5;

}

.three {

-webkit-initial-letter: 3.0;

initial-letter: 3.0;

}

Result

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility

Drop caps in CSS