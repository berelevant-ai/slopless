# grid-auto-columns

The grid-auto-columns CSS property specifies the size of an implicitly-created grid column  or pattern of tracks.

If a grid item is positioned into a column that is not explicitly sized by , implicit  tracks are created to hold it. This can happen either by explicitly positioning into a column that is out of range, or by the auto-placement algorithm creating additional columns.

Syntax

/* Keyword values */

grid-auto-columns: min-content;

grid-auto-columns: max-content;

grid-auto-columns: auto;

/* <length> values */

grid-auto-columns: 100px;

grid-auto-columns: 20cm;

grid-auto-columns: 50vmax;

/* <percentage> values */

grid-auto-columns: 10%;

grid-auto-columns: 33.3%;

/* <flex> values */

grid-auto-columns: 0.5fr;

grid-auto-columns: 3fr;

/* minmax() values */

grid-auto-columns: minmax(100px, auto);

grid-auto-columns: minmax(max-content, 2fr);

grid-auto-columns: minmax(20%, 80vmax);

/* fit-content() values */

grid-auto-columns: fit-content(400px);

grid-auto-columns: fit-content(5cm);

grid-auto-columns: fit-content(20%);

/* multiple track-size values */

grid-auto-columns: min-content max-content auto;

grid-auto-columns: 100px 150px 390px;

grid-auto-columns: 10% 33.3%;

grid-auto-columns: 0.5fr 3fr 1fr;

grid-auto-columns: minmax(100px, auto) minmax(max-content, 2fr) minmax(20%, 80vmax);

grid-auto-columns: 100px minmax(100px, auto) 10% 0.5fr fit-content(400px);

/* Global values */

grid-auto-columns: inherit;

grid-auto-columns: initial;

grid-auto-columns: unset;

Values

Is a non-negative length.

Is a non-negative  value relative to the block size of the grid container. If the block size of the grid container is indefinite, the percentage value is treated like auto.

Is a non-negative dimension with the unit fr specifying the track’s flex factor. Each <flex>-sized track takes a share of the remaining space in proportion to its flex factor.

When appearing outside a minmax() notation, it implies an automatic minimum (i.e. minmax(auto, <flex>)).

Is a keyword representing the largest maximal content contribution of the grid items occupying the grid track.

Is a keyword representing the largest minimal content contribution of the grid items occupying the grid track.

Is a functional notation that defines a size range greater than or equal to min and less than or equal to max. If max is smaller than min, then max is ignored and the function is treated as min. As a maximum, a <flex> value sets the track’s flex factor. As a minimum, it is treated as zero (or minimal content, if the grid container is sized under a minimal content constraint).

Represents the formula min(max-content, max(auto, argument)), which is calculated similar to auto (i.e. minmax(auto, max-content)), except that the track size is clamped at argument if it is greater than the auto minimum.

auto

Is a keyword that is identical to maximal content if it's a maximum. As a minimum it represents the largest minimum size (as specified by /) of the grid items occupying the grid track.

Note: auto track sizes (and only auto track sizes) can be streched by the  and  properties.

Formal definition

Formal syntax

Examples

Setting grid column size

HTML

<div id="grid">

<div id="item1"></div>

<div id="item2"></div>

<div id="item3"></div>

</div>

CSS

#grid {

height: 100px;

display: grid;

grid-template-areas: "a a";

gap: 10px;

grid-auto-columns: 200px;

}

#grid > div {

background-color: lime;

}

Result

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility

See also

Related CSS properties: , ,

Grid Layout Guide: Auto-placement in grid layout - sizing rows in the implicit grid

Video tutorial: Introducing Grid auto-placement and order

CSS

CSS Reference

CSS Grid Layout

Guides

Basics concepts of grid layout

Relationship to other layout methods

Line-based placement

Grid template areas

Layout using named grid lines

Auto-placement in grid layout

Box alignment in grid layout

Grids, logical values and writing modes

CSS Grid Layout and Accessibility

CSS Grid Layout and Progressive Enhancement

Realizing common layouts using grids

Subgrid

Masonry layout

Properties

align-tracks

column-gap

gap

grid

grid-area

grid-auto-columns

grid-auto-flow

grid-auto-rows

grid-column

grid-column-end

grid-column-start

grid-row

grid-row-end

grid-row-start

grid-template

grid-template-areas

grid-template-columns

grid-template-rows

justify-tracks

masonry-auto-flow

row-gap

Glossary

Grid lines

Grid tracks

Grid cell

Grid areas

Gutters

Grid row

Grid column