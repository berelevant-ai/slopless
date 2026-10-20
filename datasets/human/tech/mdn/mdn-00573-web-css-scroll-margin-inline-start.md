# scroll-margin-inline-start

The scroll-margin-inline-start property defines the margin of the scroll snap area at the start of the inline dimension that is used for snapping this box to the snapport. The scroll snap area is determined by taking the transformed border box, finding its rectangular bounding box (axis-aligned in the scroll container’s coordinate space), then adding the specified outsets.

Syntax

/* <length> values */

scroll-margin-inline-start: 10px;

scroll-margin-inline-start: 1em;

/* Global values */

scroll-margin-inline-start: inherit;

scroll-margin-inline-start: initial;

scroll-margin-inline-start: unset;

Values

<length>

An outset from the inline start edge of the scroll container.

Formal definition

Formal syntax

Examples

Simple demonstration

This example implements something very similar to the interactive example above, except that here we'll explain to you how it's implemented.

The aim here is to create four horizontally-scrolling blocks, the second and third of which snap into place, near but not quite at the left of each block.

HTML

The HTML that represents the blocks is very simple:

<div class="scroller">

<div>1</div>

<div>2</div>

<div>3</div>

<div>4</div>

</div>

CSS

Let's walk through the CSS. the outer container is styled like this:

.scroller {

text-align: left;

width: 250px;

height: 250px;

overflow-x: scroll;

display: flex;

box-sizing: border-box;

border: 1px solid #000;

scroll-snap-type: x mandatory;

}

The main parts relevant to the scroll snapping are overflow-x: scroll, which makes sure the contents will scroll and not be hidden, and scroll-snap-type: x mandatory, which dictates that scroll snapping must occur along the horizontal axis, and the scrolling will always come to rest on a snap point.

The child elements are styled as follows:

.scroller > div {

flex: 0 0 250px;

width: 250px;

background-color: #663399;

color: #fff;

font-size: 30px;

display: flex;

align-items: center;

justify-content: center;

scroll-snap-align: start;

}

.scroller > div:nth-child(2n) {

background-color: #fff;

color: #663399;

}

The most relevant part here is scroll-snap-align: start, which specifies that the left-hand edges (the "starts" along the x axis, in our case) are the designated snap points.

Last of all we specify the scroll margin-values, a different one for the second and third child elements:

.scroller > div:nth-child(2) {

scroll-margin-inline-start: 1rem;

}

.scroller > div:nth-child(3) {

scroll-margin-inline-start: 2rem;

}

This means that when scrolling past the middle child elements, the scrolling will snap to 1rem outside the inline start edge of the second <div>, and 2rems outside the inline start edge of the third <div>.

Result

Try it for yourself:

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