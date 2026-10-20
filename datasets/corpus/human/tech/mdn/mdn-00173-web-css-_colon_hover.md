# :hover

The :hover CSS pseudo-class matches when the user interacts with an element with a pointing device, but does not necessarily activate it. It is generally triggered when the user hovers over an element with the cursor (mouse pointer).

/* Selects any <a> element when "hovered" */

a:hover {

color: orange;

}

Styles defined by the :active pseudo-class will be overridden by any subsequent link-related pseudo-class (, , or ) that has at least equal specificity. To style links appropriately, put the :hover rule after the :link and :visited rules but before the :active one, as defined by the LVHA-order: :link — :visited — :hover — :active.

Note: The :hover pseudo-class is problematic on touchscreens. Depending on the browser, the :hover pseudo-class might never match, match only for a moment after touching an element, or continue to match even after the user has stopped touching and until the user touches another element. Web developers should make sure that content is accessible on devices with limited or non-existent hovering capabilities.

Syntax

Examples

Basic example

HTML

<a href="#">Try hovering over this link.</a>

CSS

a {

background-color: powderblue;

transition: background-color .5s;

}

a:hover {

background-color: gold;

}

Result

Image gallery

You can use the :hover pseudo-class to build an image gallery with full-size images that show only when the mouse moves over a thumbnail. See this demo for a possible cue.

Note: For an analogous effect, but based on the :checked pseudo-class (applied to hidden radioboxes), see this demo, taken from the :checked reference page.

Specifications

Specification

Comment

Feedback

WHATWG HTML GitHub issues

Allows :hover to be applied to any pseudo-element.

CSS Working Group drafts GitHub issues

Initial definition.

Browser compatibility

See also

Chromium bug #370155: Don't make :hover sticky on tap on sites that set a mobile viewport

Chromium bug #306581: Immediately show hover and active states on touch when page isn't scrollable.