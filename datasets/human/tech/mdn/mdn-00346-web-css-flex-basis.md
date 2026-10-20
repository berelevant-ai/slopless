# flex-basis

The flex-basis CSS property sets the initial main size of a flex item. It sets the size of the content box unless otherwise set with .

Note: in case both flex-basis (other than auto) and width (or height in case of flex-direction: column) are set for an element, flex-basis has priority.

Syntax

/* Specify <'width'> */

flex-basis: 10em;

flex-basis: 3px;

flex-basis: auto;

/* Intrinsic sizing keywords */

flex-basis: fill;

flex-basis: max-content;

flex-basis: min-content;

flex-basis: fit-content;

/* Automatically size based on the flex item’s content */

flex-basis: content;

/* Global values */

flex-basis: inherit;

flex-basis: initial;

flex-basis: unset;

The flex-basis property is specified as either the keyword content or a "><'width'>.

Values

<'width'>

An absolute , a  of the parent flex container's main size property, or the keyword auto. Negative values are invalid. Defaults to auto.

content

Indicates automatic sizing, based on the flex item’s content.

Note: This value was not present in the initial release of Flexible Box Layout, and thus some older implementations will not support it. The equivalent effect can be had by using auto together with a main size (width or height) of auto.

History:

Originally, flex-basis:auto meant "look at my width or height property".

Then, flex-basis:auto was changed to mean automatic sizing, and "main-size" was introduced as the "look at my width or height property" keyword. It was implemented in .

Then, that change was reverted in , so auto once again means "look at my width or height property"; and a new content keyword is being introduced to trigger automatic sizing. ( covers adding that keyword).

Formal definition

Formal syntax

Examples

Setting flex item initial sizes

HTML

<ul class="container">

<li class="flex flex1">1: flex-basis test</li>

<li class="flex flex2">2: flex-basis test</li>

<li class="flex flex3">3: flex-basis test</li>

<li class="flex flex4">4: flex-basis test</li>

<li class="flex flex5">5: flex-basis test</li>

</ul>

<ul class="container">

<li class="flex flex6">6: flex-basis test</li>

</ul>

CSS

.container {

font-family: arial, sans-serif;

margin: 0;

padding: 0;

list-style-type: none;

display: flex;

flex-wrap: wrap;

}

.flex {

background: #6AB6D8;

padding: 10px;

margin-bottom: 50px;

border: 3px solid #2E86BB;

color: white;

font-size: 14px;

text-align: center;

position: relative;

}

.flex:after {

position: absolute;

z-index: 1;

left: 0;

top: 100%;

margin-top: 10px;

width: 100%;

color: #333;

font-size: 12px;

}

.flex1 {

flex-basis: auto;

}

.flex1:after {

content: 'auto';

}

.flex2 {

flex-basis: max-content;

}

.flex2:after {

content: 'max-content';

}

.flex3 {

flex-basis: min-content;

}

.flex3:after {

content: 'min-content';

}

.flex4 {

flex-basis: fit-content;

}

.flex4:after {

content: 'fit-content';

}

.flex5 {

flex-basis: content;

}

.flex5:after {

content: 'content';

}

.flex6 {

flex-basis: fill;

}

.flex6:after {

content: 'fill';

}

Results

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility

See also

CSS Flexbox Guide: Basic Concepts of Flexbox

CSS Flexbox Guide: Controlling Ratios of flex items along the main axis