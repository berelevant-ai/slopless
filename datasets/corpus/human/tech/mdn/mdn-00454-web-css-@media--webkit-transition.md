# -webkit-transition

The -webkit-transition Boolean CSS media feature is a Chrome extension whose value is true if the browsing context supports CSS transitions. It was never supported in browsers not based on WebKit or Blink.

Apple has a description in Safari CSS Reference; this is now called transition there.

Note: You should not use this media feature; it was never specified, has never been widely implemented, and has been removed from all browsers. Use an  feature query instead.

Syntax

@media (-webkit-transition) {

/* CSS to use if transitions are supported */

}

Examples

Use @supports instead

Do not use the -webkit-transition media feature. Instead, test for transition support using the CSS  at-rule, like this:

@supports (transition: initial) {

/* CSS to use if transitions are supported */

}

Obsolete example

Before this became obsolete, you could use -webkit-transition in your CSS like this:

@media (-webkit-transition) {

/* CSS to use if transitions are supported */

}

Specifications

Not part of any standard.

Browser compatibility

See also

Using media queries

Using CSS transitions