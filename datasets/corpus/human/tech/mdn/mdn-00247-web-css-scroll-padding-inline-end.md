# scroll-padding-inline-end

The scroll-padding-inline-end property defines offsets for the end edge in the inline dimension of the optimal viewing region of the scrollport: the region used as the target region for placing things in view of the user. This allows the author to exclude regions of the scrollport that are obscured by other content (such as fixed-positioned toolbars or sidebars) or to put more breathing room between a targeted element and the edges of the scrollport.

Syntax

/* Keyword values */

scroll-padding-inline-end: auto;

/* <length> values */

scroll-padding-inline-end: 10px;

scroll-padding-inline-end: 1em;

scroll-padding-inline-end: 10%;

/* Global values */

scroll-padding-inline-end: inherit;

scroll-padding-inline-end: initial;

scroll-padding-inline-end: unset;

Values

<length-percentage>

An inwards offset from the inline end edge of the scrollport, as a valid length or a percentage.

auto

The offset is determind by the user agent. This will generally be 0px, but a user agent is able to detect and do something else if a non-zero value is more appropriate.

Formal definition

Formal syntax

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also

CSS Scroll Snap

Well-Controlled Scrolling with CSS Scroll Snap