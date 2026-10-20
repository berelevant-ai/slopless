# pointer-events

The pointer-events CSS property sets under what circumstances (if any) a particular graphic element can become the target of pointer events.

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone https://github.com/mdn/interactive-examples and send us a pull request.

Syntax

/* Keyword values */

pointer-events: auto;

pointer-events: none;

pointer-events: visiblePainted; /* SVG only */

pointer-events: visibleFill;    /* SVG only */

pointer-events: visibleStroke;  /* SVG only */

pointer-events: visible;        /* SVG only */

pointer-events: painted;        /* SVG only */

pointer-events: fill;           /* SVG only */

pointer-events: stroke;         /* SVG only */

pointer-events: all;            /* SVG only */

/* Global values */

pointer-events: inherit;

pointer-events: initial;

pointer-events: unset;

The pointer-events property is specified as a single keyword chosen from the list of values below.

Values

auto

The element behaves as it would if the pointer-events property were not specified. In SVG content, this value and the value visiblePainted have the same effect.

none

The element is never the target of pointer events; however, pointer events may target its descendant elements if those descendants have pointer-events set to some other value. In these circumstances, pointer events will trigger event listeners on this parent element as appropriate on their way to/from the descendant during the event capture/bubble phases.

SVG only (experimental for HTML)

visiblePainted

SVG only (experimental for HTML). The element can only be the target of a pointer event when the visibility property is set to visible and e.g. when a mouse cursor is over the interior (i.e., 'fill') of the element and the fill property is set to a value other than none, or when a mouse cursor is over the perimeter (i.e., 'stroke') of the element and the stroke property is set to a value other than none.

visibleFill

SVG only. The element can only be the target of a pointer event when the visibility property is set to visible and when e.g. a mouse cursor is over the interior (i.e., fill) of the element. The value of the fill property does not affect event processing.

visibleStroke

SVG only. The element can only be the target of a pointer event when the visibility property is set to visible and e.g. when the mouse cursor is over the perimeter (i.e., stroke) of the element. The value of the stroke property does not affect event processing.

visible

SVG only (experimental for HTML). The element can be the target of a pointer event when the visibility property is set to visible and e.g. the mouse cursor is over either the interior (i.e., fill) or the perimeter (i.e., stroke) of the element. The values of the fill and stroke do not affect event processing.

painted

SVG only (experimental for HTML). The element can only be the target of a pointer event when e.g. the mouse cursor is over the interior (i.e., 'fill') of the element and the fill property is set to a value other than none, or when the mouse cursor is over the perimeter (i.e., 'stroke') of the element and the stroke property is set to a value other than none. The value of the visibility property does not affect event processing.

fill

SVG only. The element can only be the target of a pointer event when the pointer is over the interior (i.e., fill) of the element. The values of the fill and visibility properties do not affect event processing.

stroke

SVG only. The element can only be the target of a pointer event when the pointer is over the perimeter (i.e., stroke) of the element. The values of the stroke and visibility properties do not affect event processing.

all

SVG only  (experimental for HTML). The element can only be the target of a pointer event when the pointer is over the interior (i.e., fill) or the perimeter (i.e., stroke) of the element. The values of the fill, stroke, and visibility properties do not affect event processing.

Description

When this property is unspecified, the same characteristics of the visiblePainted value apply to SVG content.

In addition to indicating that the element is not the target of pointer events, the value none instructs the pointer event to go "through" the element and target whatever is "underneath" that element instead.

Note that preventing an element from being the target of pointer events by using pointer-events does not necessarily mean that pointer event listeners on that element cannot or will not be triggered. If one of the element's children has pointer-events explicitly set to allow that child to be the target of pointer events, then any events targeting that child will pass through the parent as the event travels along the parent chain, and trigger event listeners on the parent as appropriate. Of course any pointer activity at a point on the screen that is covered by the parent but not by the child will not be caught by either the child or the parent (it will go "through" the parent and target whatever is underneath).

Elements with pointer-events: none will still receive focus through sequential keyboard navigation using the Tab key.

We would like to provide finer grained control (than just auto and none) in HTML for which parts of an element will cause it to "catch" pointer events, and when. To help us in deciding how pointer-events should be further extended for HTML, if you have any particular things that you would like to be able to do with this property, then please add them to the Use Cases section of this wiki page (don't worry about keeping it tidy).

Formal definition

Formal syntax

Examples

Disabling pointer events on all images

This example disables pointer events (clicking, dragging, hovering, etc.) on all images.

img {

pointer-events: none;

}

Disabling pointer events on a single link

This example disables pointer events on the link to http://example.com.

HTML

<ul>

<li><a href="https://developer.mozilla.org">MDN</a></li>

<li><a href="http://example.com">example.com</a></li>

</ul>

CSS

a[href="http://example.com"] {

pointer-events: none;

}

Result

Specifications

Specification

Status

Comment

Initial definition

Its extension to HTML elements, though present in early drafts of CSS Basic User Interface Module Level 3, has been pushed to its level 4.

Browser compatibility

See also

The SVG attribute

The SVG attribute

WebKit Specs PointerEventsProperty extended for use in (X)HTML content

- controls whether the user can select text