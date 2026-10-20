# font-feature-settings

The font-feature-settings CSS property controls advanced typographic features in OpenType fonts.

Syntax

/* Use the default settings */

font-feature-settings: normal;

/* Set values for OpenType feature tags */

font-feature-settings: "smcp";

font-feature-settings: "smcp" on;

font-feature-settings: "swsh" 2;

font-feature-settings: "smcp", "swsh" 2;

/* Global values */

font-feature-settings: inherit;

font-feature-settings: initial;

font-feature-settings: unset;

Whenever possible, Web authors should instead use the  shorthand property or an associated longhand property such as , , , ,  or .

These lead to more effective, predictable, understandable results than font-feature-settings, which is a low-level feature designed to handle special cases where no other way exists to enable or access an OpenType font feature. In particular, font-feature-settings shouldn't be used to enable small caps.

Values

normal

Text is laid out using default settings.

<feature-tag-value>

When rendering text, the list of OpenType feature tag value is passed to the text layout engine to enable or disable font features. The tag is always a  of 4 ASCII characters. If it has more or less characters, or if it contains characters outside the U+20 – U+7E codepoint range, the whole property is invalid.

The value is a positive integer. The two keywords on and off are synonyms for 1 and 0 respectively. If no value is set, the default is 1. For non-Boolean OpenType features (e.g. stylistic alternates), the value implies a particular glyph to be selected; for Boolean values, it is a switch.

Formal definition

Formal syntax

Examples

Enabling various font features

/* use small-cap alternate glyphs */

.smallcaps { font-feature-settings: "smcp" on; }

/* convert both upper and lowercase to small caps (affects punctuation also) */

.allsmallcaps { font-feature-settings: "c2sc", "smcp"; }

/* use zeros with a slash through them to differentiate from "O" */

.nicezero { font-feature-settings: "zero"; }

/* enable historical forms */

.hist { font-feature-settings: "hist"; }

/* disable common ligatures, usually on by default */

.noligs { font-feature-settings: "liga" 0; }

/* enable tabular (monospaced) figures */

td.tabular { font-feature-settings: "tnum"; }

/* enable automatic fractions */

.fractions { font-feature-settings: "frac"; }

/* use the second available swash character */

.swash { font-feature-settings: "swsh" 2; }

/* enable stylistic set 7 */

.fancystyle {

font-family: Gabriola; /* available on Windows 7, and on Mac OS */

font-feature-settings: "ss07";

}

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility

See also

OpenType Feature Tags list

Using the whole font

(Note: The -moz syntax is the old one. On Gecko, use the -ms syntax but with -moz.)