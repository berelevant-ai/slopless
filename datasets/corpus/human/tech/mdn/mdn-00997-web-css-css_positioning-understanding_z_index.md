# Understanding CSS z-index

In the most basic cases, HTML pages can be considered two-dimensional, because text, images, and other elements are arranged on the page without overlapping. In this case, there is a single rendering flow, and all elements are aware of the space taken by others. The  attribute lets you adjust the order of the layering of objects when rendering content.

In CSS 2.1, each box has a position in three dimensions. In addition to their horizontal and vertical positions, boxes lie along a "z-axis" and are formatted one on top of the other. Z-axis positions are particularly relevant when boxes overlap visually.

(from CSS 2.1 Section 9.9.1 - Layered presentation)

This means that CSS style rules allow you to position boxes on layers in addition to the normal rendering layer (layer 0). The Z position of each layer is expressed as an integer representing the stacking order for rendering. Greater numbers mean closer to the observer. Z position can be controlled with the CSS z-index property.

Using z-index appears extremely easy: a single property, assigned a single integer number, with an easy-to-understand behavior. However, when z-index is applied to complex hierarchies of HTML elements, its behavior can be hard to understand or predict. This is due to complex stacking rules. In fact a dedicated section has been reserved in the CSS specification CSS-2.1 Appendix E to explain these rules better.

This article will try to explain those rules, with some simplification and several examples.

Stacking without the z-index property: The stacking rules that apply when z-index is not used.

Stacking with floated blocks: How floating elements are handled with stacking.

Using z-index: How to use z-index to change default stacking.

The stacking context: Notes on the stacking context.

Stacking context example 1: 2-level HTML hierarchy, z-index on the last level

Stacking context example 2: 2-level HTML hierarchy, z-index on all levels

Stacking context example 3: 3-level HTML hierarchy, z-index on the second level

Original Document Information

Author(s): Paolo Lombardi

This article is the English translation of an article I wrote in Italian for YappY. I grant the right to share all the content under the Creative Commons: Attribution-Sharealike license.

Last Updated Date: July 9, 2005

Author's note: Thanks to Wladimir Palant and Rod Whiteley for the review.