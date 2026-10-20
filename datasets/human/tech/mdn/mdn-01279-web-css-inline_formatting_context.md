# Inline formatting context

This article explains the inline formatting context

Core concepts

The inline formatting context is part of the visual rendering of a web page. Inline boxes are laid out one after the other, in the direction sentences run in the writing mode in use:

In a horizontal writing mode, boxes are laid out horizontally, starting on the left.

In a vertical writing mode they would be laid out vertically starting at the top.

In the example below, the two () elements with the black borders form a block formatting context, inside which each word participates in an inline formatting context. The boxes in the horizontal writing mode run horizontally, and the vertical writing mode boxes run vertically.

Boxes forming a line are contained by a rectangular area called a line box. This box will be large enough to contain all of the inline boxes in that line; when there is no more room in the inline direction another line will be created. Therefore a paragraph is a set of inline line boxes, stacked in the block direction.

When an inline box is split, margins, borders, and padding have no visual effect where the split occurs. In the next example there is a () element wrapping a set of words wrapping onto two lines. The border on the <span> breaks at the wrapping point.

Margins, borders, and padding in the inline direction are respected. In the example below you can see how the margin, border, and padding on the inline <span> element are added.

Note: I am using the logical, flow-relative properties —  rather than  — so that they work in the inline dimension whether the text is horizontal or vertical. Read more about these properties in Logical Properties and Values.

Alignment in the block direction

Inline boxes may be aligned in the block direction in different ways, using the  property, which will align on the block axis in vertical writing modes (therefore not vertically at all!). In the example below the large text is making the line box of the first sentence larger, therefore the vertical-align property can be used to align the inline boxes either side of it. I have used the value top, try changing it to middle, bottom, or baseline.

Alignment in the inline direction

If there is additional space in the inline direction, the  property can be used to align the inline boxes within their line box. Try changing the value of text-align below to end.

Effect of floats

Line boxes usually have the same size in the inline direction, therefore the same width if working in a horizontal writing mode, or height if working in a vertical writing mode. If there is a  within the same block formatting context however, the float will cause the line boxes that wrap the float to become shorter.

See also

Block formatting context

Visual Formatting Model