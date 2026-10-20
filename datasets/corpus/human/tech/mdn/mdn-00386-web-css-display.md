# display

The display CSS property sets whether an element is treated as a block or inline element and the layout used for its children, such as flow layout, grid or flex.

Formally, the display property sets an element's inner and outer display types. The outer type sets an element's participation in flow layout; the inner type sets the layout of children. Some values of display are fully defined in their own individual specifications; for example the detail of what happens when display: flex is declared is defined in the CSS Flexible Box Model specification. See the table at the end of this document for all of the individual specifications.

Syntax

The CSS display property is specified using keyword values. Keyword values are grouped into six value categories:

.container {

display:  [ <display-outside> | <display-inside> ] | <display-listitem> | <display-internal> | <display-box> | <display-legacy> ;

}

Outside

These keywords specify the element’s outer display type, which is essentially its role in flow layout.

Inside

These keywords specify the element’s inner display type, which defines the type of formatting context that its contents are laid out in (assuming it is a non-replaced element).

List Item

The element generates a block box for the content and a separate list-item inline box.

Internal

Some layout models such as table and ruby have a complex internal structure, with several different roles that their children and descendants can fill. This section defines those "internal" display values, which only have meaning within that particular layout mode.

Box

These values define whether an element generates display boxes at all.

Legacy

CSS 2 used a single-keyword syntax for the display property, requiring separate keywords for block-level and inline-level variants of the same layout mode.

Which syntax should you use now?

The Level 3 specification details two values for the display property — enabling the specification of the outer and inner display type explicitly — but this is not yet well-supported by browsers.

The <display-legacy> methods allow the same results with single keyword values, and should be favoured by developers until the two keyword values are better supported. For example, using two values you might specify an inline flex container as follows:

.container {

display: inline flex;

}

This can currently be specified using a single value.

.container {

display: inline-flex;

}

For more information on these changes to the specification, see the article Adapting to the new two-value syntax of display.

Global

/* Global values */

display: inherit;

display: initial;

display: unset;

Description

The individual pages for the different types of value that display can have set on it feature multiple examples of those values in action — see the  section. In addition, see the following material, which covers the various values of display in depth.

Adapting to the new two-value syntax of display

CSS Flow Layout (display: block, display: inline)

Block and Inline Layout in Normal Flow

Flow Layout and Overflow

Flow Layout and Writing Modes

Formatting Contexts Explained

In Flow and Out of Flow

display: flex

Basic concepts of flexbox

Aligning Items in a Flex Container

Controlling Ratios of Flex Items Along the Main Axis

Cross-browser Flexbox mixins

Mastering Wrapping of Flex Items

Ordering Flex Items

Relationship of flexbox to other layout methods

Backwards Compatibility of Flexbox

Typical use cases of Flexbox

display: grid

Basic Concepts of Grid Layout

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

Accessibility concerns

display: none

Using a display value of none on an element will remove it from the accessibility tree. This will cause the element and all its descendant elements to no longer be announced by screen reading technology.

If you want to visually hide the element, a more accessible alternative is to use a combination of properties to remove it visually from the screen but keep it parsable by assistive technology such as screen readers.

display: contents

Current implementations in most browsers will remove from the accessibility tree any element with a display value of contents (but descendants will remain). This will cause the element itself to no longer be announced by screen reading technology. This is incorrect behavior according to the CSS specification.

More accessible markup with display: contents | Hidde de Vries

Display: Contents Is Not a CSS Reset | Adrian Roselli

Tables

Changing the display value of a  element to block, grid, or flex will alter its representation in the accessibility tree. This will cause the table to no longer be announced properly by screen reading technology.

Short note on what CSS display properties do to table semantics — The Paciello Group

Hidden content for better a11y | Go Make Things

MDN Understanding WCAG, Guideline 1.3 explanations

Understanding Success Criterion 1.3.1 | W3C Understanding WCAG 2.0

Formal definition

Formal syntax

Examples

display value comparison

In this example we have two block-level container elements, each one with three inline children. Below that, we have a select menu that allows you to apply different display values to the containers, allowing you to compare and contrast how the different values affect the element's layout, and that of their children.

We've included  and  on the containers and their children, so that it is easier to see the effect the display values are having.

Note: We've not included any of the modern two-value syntax, as support for that is still fairly limited.

HTML

<article class="container">

<span>First</span>

<span>Second</span>

<span>Third</span>

</article>

<article class="container">

<span>First</span>

<span>Second</span>

<span>Third</span>

</article>

<div>

<label for="display">Choose a display value:</label>

<select id="display">

<option selected>block</option>

<option>inline</option>

<option>inline-block</option>

<option>none</option>

<option>flex</option>

<option>inline-flex</option>

<option>grid</option>

<option>inline-grid</option>

<option>table</option>

<option>list-item</option>

</select>

</div>

CSS

html {

font-family: helvetica, arial, sans-serif;

letter-spacing: 1px;

padding-top: 10px;

}

article {

background-color: red;

}

article span {

background-color: black;

color: white;

margin: 1px;

}

article, span {

padding: 10px;

border-radius: 7px;

}

article, div {

margin: 20px;

}

JavaScript

const articles = document.querySelectorAll('.container');

const select = document.querySelector('select');

function updateDisplay() {

articles.forEach((article) => {

article.style.display = select.value;

});

}

select.addEventListener('change', updateDisplay);

updateDisplay();

Result

Note: You can find more examples in the pages for each separate display data type, linked above.

Specifications

Specification

Status

Comment

Added run-in, flow, flow-root, contents, and multi-keyword values.

Added ruby, ruby-base, ruby-text, ruby-base-container, and ruby-text-container.

Added the grid box model values.

Added the flexible box model values.

Added the table model values and inline-block.

Initial definition. Basic values: none, block, inline, and list-item.

Browser compatibility

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also

Block and inline layout in normal flow

Introduction to formatting contexts

, ,

,