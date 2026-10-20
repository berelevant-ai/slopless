# box-orient

This is a property of the original CSS Flexible Box Layout Module draft, and has been replaced by a newer standard. See flexbox for information about the current standard.

The box-orient CSS property sets whether an element lays out its contents horizontally or vertically.

/* Keyword values */

box-orient: horizontal;

box-orient: vertical;

box-orient: inline-axis;

box-orient: block-axis;

/* Global values */

box-orient: inherit;

box-orient: initial;

box-orient: unset;

Syntax

The box-orient property is specified as one of the keyword values listed below.

Values

horizontal

The box lays out its contents horizontally.

vertical

The box lays out its contents vertically.

inline-axis (HTML)

The box displays its children along the inline axis.

block-axis (HTML)

The box displays its children along the block axis.

The inline and block axes are the writing-mode dependent keywords which, in English, map to horizontal and vertical respectively.

Description

HTML DOM elements lay out their contents along the inline-axis by default. This CSS property will only apply to HTML elements with a CSS  value of  or .

Formal definition

Formal syntax

Examples

Setting horizontal box orientation

Here, he box-orient property will cause the two  sections in the example to display in the same line.

HTML

<div class="example">

<p>I will be to the left of my sibling.</p>

<p>I will be to the right of my sibling.</p>

</div>

CSS

div.example {

display: -moz-box;                /* Mozilla */

display: -webkit-box;             /* WebKit */

display: box;                     /* As specified */

/* Children should be oriented vertically */

-moz-box-orient: horizontal;      /* Mozilla */

-webkit-box-orient: horizontal;   /* WebKit */

box-orient: horizontal;           /* As specified */

}

Result

Specifications

Not part of any standard.

Browser compatibility

See also