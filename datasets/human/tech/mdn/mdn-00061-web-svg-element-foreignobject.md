# <foreignObject>

The <foreignObject> SVG element includes elements from a different XML namespace. In the context of a browser, it is most likely (X)HTML.

html,body,svg { height:100% }

<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">

<style>

div {

color: white;

font: 18px serif;

height: 100%;

overflow: auto;

}

</style>

<polygon points="5,5 195,10 185,185 10,195" />

<!-- Common use case: embed HTML text into SVG -->

<foreignObject x="20" y="20" width="160" height="160">

<!--

In the context of SVG embedded in an HTML document, the XHTML

namespace could be omitted, but it is mandatory in the

context of an SVG document

-->

<div xmlns="http://www.w3.org/1999/xhtml">

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Sed mollis mollis mi ut ultricies. Nullam magna ipsum,

porta vel dui convallis, rutrum imperdiet eros. Aliquam

erat volutpat.

</div>

</foreignObject>

</svg>

Attributes

The height of the foreignObject.

Value type: <length>|<percentage> ; Default value: auto; Animatable: yes

The width of the foreignObject.

Value type: <length>|<percentage> ; Default value: auto; Animatable: yes

The x coordinate of the foreignObject.

Value type: <length>|<percentage> ; Default value: 0; Animatable: yes

The y coordinate of the foreignObject.

Value type: <length>|<percentage> ; Default value: 0; Animatable: yes

Note: Starting with SVG2, x, y, width, and height are Geometry Properties, meaning those attributes can also be used as CSS properties for that element.

Global attributes

Core Attributes

Most notably: ,

Styling Attributes

,

Conditional Processing Attributes

Most notably: ,

Event Attributes

Global event attributes, Graphical event attributes, Document event attributes, Document element event attributes

Presentation Attributes

Most notably: , , , , , , , , , , , , , , , , , , , , , , , , ,

Aria Attributes

aria-activedescendant, aria-atomic, aria-autocomplete, aria-busy, aria-checked, aria-colcount, aria-colindex, aria-colspan, aria-controls, aria-current, aria-describedby, aria-details, aria-disabled, aria-dropeffect, aria-errormessage, aria-expanded, aria-flowto, aria-grabbed, aria-haspopup, aria-hidden, aria-invalid, aria-keyshortcuts, aria-label, aria-labelledby, aria-level, aria-live, aria-modal, aria-multiline, aria-multiselectable, aria-orientation, aria-owns, aria-placeholder, aria-posinset, aria-pressed, aria-readonly, aria-relevant, aria-required, aria-roledescription, aria-rowcount, aria-rowindex, aria-rowspan, aria-selected, aria-setsize, aria-sort, aria-valuemax, aria-valuemin, aria-valuenow, aria-valuetext, role

Usage notes

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility