# Selector list

The CSS selector list (,) selects all the matching nodes.

/* Selects all matching elements */

span,

div {

border: red 2px solid;

}

To reduce the size of style sheets, one can group selectors in comma-separated lists.

Syntax

element, element, element { style properties }

Examples

Single Line Grouping

Grouping selectors in a single line using a comma-separated lists.

h1, h2, h3, h4, h5, h6 { font-family: helvetica; }

Multi Line Grouping

Grouping selectors in a multiple lines using a comma-separated lists.

#main,

.content,

article {

font-size: 1.1em;

}

Selector list invalidation

A downside to using selector lists is that the following aren't equivalent:

h1 { font-family: sans-serif }

h2:maybe-unsupported { font-family: sans-serif }

h3 { font-family: sans-serif }

h1, h2:maybe-unsupported, h3 { font-family: sans-serif }

This is because a single unsupported selector in a selector list invalidates the whole rule.

A way to remedy this us to use the  or  selectors, which accept a forgiving selector list. This will ignore invalid selectors in the list but accept those which are valid.

h1 { font-family: sans-serif }

h2:maybe-unsupported { font-family: sans-serif }

h3 { font-family: sans-serif }

:is(h1, h2:maybe-unsupported, h3) { font-family: sans-serif }

Specifications

Specification

Status

Comment

Renamed to "selector list"

Initial definition

Browser compatibility

See also

The   and   pseudo-classes, which accept a forgiving selector list.