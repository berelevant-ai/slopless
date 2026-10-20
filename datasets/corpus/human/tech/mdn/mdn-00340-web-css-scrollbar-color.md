# scrollbar-color

The scrollbar-color CSS property sets the color of the scrollbar track and thumb.

The track refers to the background of the scrollbar, which is generally fixed regardless of the scrolling position.

The thumb refers to the moving part of the scrollbar, which usually floats on top of the track.

Syntax

/* Keyword values */

scrollbar-color: auto;

scrollbar-color: dark;

scrollbar-color: light;

/* <color> values */

scrollbar-color: rebeccapurple green;   /* Two valid colors.

The first applies to the thumb of the scrollbar, the second to the track. */

/* Global values */

scrollbar-color: inherit;

scrollbar-color: initial;

scrollbar-color: unset;

Values

<scrollbar-color>

Defines the color of the scrollbar.

auto

Default platform rendering for the track portion of the scrollbar, in the absence of any other related scrollbar color properties.

dark

Show a dark scrollbar, which can be either a dark variant of scrollbar provided by the platform, or a custom scrollbar with dark colors.

light

Show a light scrollbar, which can be either a light variant of scrollbar provided by the platform, or a custom scrollbar with light colors.

<color> <color>

Applies the first color to the scrollbar thumb, the second to the scrollbar track.

Note: User Agents must apply any scrollbar-color value set on the root element to the viewport.

Accessibility concerns

When using scrollbar-color property with specific color values, authors should ensure the specified colors have enough contrast between them. For keyword values, UAs should ensure the colors they use have enough contrast. See Techniques for WCAG 2.0: G183: Using a contrast ratio of 3:1.

Formal definition

Formal syntax

Examples

Coloring overflow scrollbars

CSS

.scroller {

width: 300px;

height: 100px;

overflow-y: scroll;

scrollbar-color: rebeccapurple green;

}

HTML

<div class="scroller">Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion daikon amaranth tatsoi tomatillo melon azuki bean garlic. Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini.</div>

Result

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also

scrollbar-width

overflow