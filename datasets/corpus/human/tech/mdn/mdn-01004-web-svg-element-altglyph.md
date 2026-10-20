# <altGlyph>

The <altGlyph> SVG element allows sophisticated selection of the glyphs used to render its child character data.

Usage context

Attributes

This attribute defines the corresponding absolute x-coordinates for rendering the element.

Value type: <list-of-coordinates> ; Default value: Absolute x-coordinate of ancestor  or ; Animatable: yes

This attribute defines the corresponding absolute y-coordinates for rendering the element.

Value type: <list-of-coordinates> ; Default value: Absolute y-coordinate of ancestor  or ; Animatable: yes

This attribute indicates a shift along the x-axis on the position of the element.

Value type: <list-of-coordinates> ; Default value: Relative x-coordinate of ancestor  or ; Animatable: yes

This attribute indicates a shift along the x-axis on the position of the element.

Value type: <list-of-coordinates> ; Default value: Relative y-coordinate of ancestor  or ; Animatable: yes

This attribute defines the supplemental rotation that will be applied to the element.

Value type: <list-of-numbers> ; Default value: none; Animatable: yes (non-additive)

The glyph identifier, the format of which is dependent on the format defined by the format attribute of the given font.

Value type: <string> ; Default value: none; Animatable: no

The format of the given font.

Value type: <string> ; Default value: none; Animatable: no

An <iri> reference either to a  element in an SVG document or to an  element.

If the reference is to a  element and that glyph is available, then that glyph is rendered instead of the character(s) that are inside of the  element.

If the reference is to an  element, then if an appropriate set of alternate glyphs is located from processing the  element, then those alternate glyphs are rendered instead of the character(s) that are inside of the  element.

Value type: <iri> ; Default value: none; Animatable: no

Global attributes

Core Attributes

Most notably:

Styling Attributes

,

Conditional Processing Attributes

Most notably: ,

Event Attributes

Global event attributes, Document element event attributes, Graphical event attributes

Presentation Attributes

Most notably: , , , , , , , , , , , , , , , , , , , , , , , , , , ,

XLink Attributes

, , , , , ,

DOM Interface

This element implements the  interface.

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility

See also