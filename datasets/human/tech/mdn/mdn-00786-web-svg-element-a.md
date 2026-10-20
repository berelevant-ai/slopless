# <a>

The <a> SVG element creates a hyperlink to other web pages, files, locations in the same page, email addresses, or any other URL. It is very similar to HTML’s  element.

SVG's <a> element is a container, which means you can create a link around text (like in HTML) but also around any shape.

@namespace svg url(http://www.w3.org/2000/svg);

html,body,svg { height:100% }

<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">

<!-- A link around a shape -->

<a href="/docs/Web/SVG/Element/circle">

<circle cx="50" cy="40" r="35"/>

</a>

<!-- A link around a text -->

<a href="/docs/Web/SVG/Element/text">

<text x="50" y="90" text-anchor="middle">

<circle>

</text>

</a>

</svg>

/* As SVG does not provide a default visual style for links,

it's considered best practice to add some */

@namespace svg url(http://www.w3.org/2000/svg);

/* Necessary to select only SVG <a> elements, and not also HTML’s.

See warning below */

svg|a:link, svg|a:visited {

cursor: pointer;

}

svg|a text,

text svg|a {

fill: blue; /* Even for text, SVG uses fill over color */

text-decoration: underline;

}

svg|a:hover, svg|a:active {

outline: dotted 1px blue;

}

Since this element shares its tag name with HTML's <a> element, selecting a with CSS or  may apply to the wrong kind of element. Try the @namespace rule to distinguish the two.

Attributes

Instructs browsers to download a  instead of navigating to it, so the user will be prompted to save it as a local file.

Value type: <string> ; Default value: none; Animatable: no

The  or URL fragment the hyperlink points to.

Value type: <URL> ; Default value: none; Animatable: yes

The human language of the URL or URL fragment that the hyperlink points to.

Value type: <string> ; Default value: none; Animatable: yes

A space-separated list of URLs to which, when the hyperlink is followed,  requests with the body PING will be sent by the browser (in the background). Typically used for tracking. For a more widely-supported feature addressing the same use cases, see .

Value type: <list-of-URLs> ; Default value: none; Animatable: no

Which referrer to send when fetching the .

Value type: no-referrer|no-referrer-when-downgrade|same-origin|origin|strict-origin|origin-when-cross-origin|strict-origin-when-cross-origin|unsafe-url ; Default value: none; Animatable: no

The relationship of the target object to the link object.

Value type: <list-of-Link-Types> ; Default value: none; Animatable: yes

Where to display the linked .

Value type: _self|_parent|_top|_blank|<name> ; Default value: _self; Animatable: yes

A  for the linked URL.

Value type: <string> ; Default value: none; Animatable: yes

The URL or URL fragment that the hyperlink points to. May be required for backwards compatibility for older browsers.

Value type: <URL> ; Default value: none; Animatable: yes

Global attributes

Core Attributes

Most notably: , ,

Styling Attributes

,

Conditional Processing Attributes

Most notably: ,

Event Attributes

Global event attributes, Document element event attributes, Graphical event attributes

Presentation Attributes

Most notably: , , , , , , , , , , , , , , , , , , , , , , , , ,

XLink Attributes

Most notably:

ARIA Attributes

aria-activedescendant, aria-atomic, aria-autocomplete, aria-busy, aria-checked, aria-colcount, aria-colindex, aria-colspan, aria-controls, aria-current, aria-describedby, aria-details, aria-disabled, aria-dropeffect, aria-errormessage, aria-expanded, aria-flowto, aria-grabbed, aria-haspopup, aria-hidden, aria-invalid, aria-keyshortcuts, aria-label, aria-labelledby, aria-level, aria-live, aria-modal, aria-multiline, aria-multiselectable, aria-orientation, aria-owns, aria-placeholder, aria-posinset, aria-pressed, aria-readonly, aria-relevant, aria-required, aria-roledescription, aria-rowcount, aria-rowindex, aria-rowspan, aria-selected, aria-setsize, aria-sort, aria-valuemax, aria-valuemin, aria-valuenow, aria-valuetext, role

Usage notes

Specifications

Specification

Status

Comment

Replaced  attribute by

Initial definition

Browser compatibility