# font-display

The font-display descriptor determines how a font face is displayed based on whether and when it is downloaded and ready to use.

Syntax

/* Keyword values */

font-display: auto;

font-display: block;

font-display: swap;

font-display: fallback;

font-display: optional;

Values

auto

The font display strategy is defined by the user agent.

block

Gives the font face a short block period and an infinite swap period.

swap

Gives the font face an extremely small block period and an infinite swap period.

fallback

Gives the font face an extremely small block period and a short swap period.

optional

Gives the font face an extremely small block period and no swap period.

Description

The font display timeline

The font display timeline is based on a timer that begins the moment the user agent attempts to use a given downloaded font face. The timeline is divided into the three periods below which dictate the rendering behavior of any elements using the font face.

Font block period

If the font face is not loaded, any element attempting to use it must render an invisible fallback font face. If the font face successfully loads during this period, it is used normally.

Font swap period

If the font face is not loaded, any element attempting to use it must render a fallback font face. If the font face successfully loads during this period, it is used normally.

Font failure period

If the font face is not loaded, the user agent treats it as a failed load causing normal font fallback.

Formal definition

Formal syntax

Examples

Specifying fallback font-display

@font-face {

font-family: ExampleFont;

src: url(/path/to/fonts/examplefont.woff) format('woff'),

url(/path/to/fonts/examplefont.eot) format('eot');

font-weight: 400;

font-style: normal;

font-display: fallback;

}

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility

See also