# scroll-snap-align

The scroll-snap-align property specifies the box’s snap position as an alignment of its snap area (as the alignment subject) within its snap container’s snapport (as the alignment container). The two values specify the snapping alignment in the block axis and inline axis, respectively. If only one value is specified, the second value defaults to the same value.

Syntax

/* Keyword values */

scroll-snap-align: none;

scroll-snap-align: start end; /* when two values set first is block, second inline */

scroll-snap-align: center;

/* Global values */

scroll-snap-align: inherit;

scroll-snap-align: initial;

scroll-snap-align: unset;

Values

none

The box does not define a snap position in that axis.

start

The start alignment of this box's scroll snap area, within the scroll container's snapport is a snap position in this axis.

end

The end alignment of this box's scroll snap area, within the scroll container's snapport is a snap position in this axis.

center

The center alignment of this box's scroll snap area, within the scroll container's snapport is a snap position in this axis.

Safari currently has the two value syntax in the wrong order, the first value being inline the second block. See bug #191865.

Formal definition

Formal syntax

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility

See also

CSS Scroll Snap

Well-Controlled Scrolling with CSS Scroll Snap