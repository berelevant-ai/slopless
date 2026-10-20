# height

The height CSS media feature can be used to apply styles based on the height of the  (or the page box, for paged media).

Syntax

The height feature is specified as a  value representing the viewport height. It is a range feature, meaning that you can also use the prefixed min-height and max-height variants to query minimum and maximum values, respectively.

Examples

HTML

<div>Watch this element as you resize your viewport's height.</div>

CSS

/* Exact height */

@media (height: 360px) {

div {

color: red;

}

}

/* Minimum height */

@media (min-height: 25rem) {

div {

background: yellow;

}

}

/* Maximum height */

@media (max-height: 40rem) {

div {

border: 2px solid blue;

}

}

Result

Specifications

Specification

Status

Comment

The value can now be negative, in which case it computes to false.

Initial definition. The value must be nonnegative.

Browser compatibility

See also

Using Media Queries

@media