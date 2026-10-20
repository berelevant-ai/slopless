# word-spacing

The word-spacing CSS property sets the length of space between words and between tags.

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone https://github.com/mdn/interactive-examples and send us a pull request.

Syntax

/* Keyword value */

word-spacing: normal;

/* <length> values */

word-spacing: 3px;

word-spacing: 0.3em;

/* <percentage> values */

word-spacing: 50%;

word-spacing: 200%;

/* Global values */

word-spacing: inherit;

word-spacing: initial;

word-spacing: unset;

Values

normal

The normal inter-word spacing, as defined by the current font and/or the browser.

Specifies extra spacing in addition to the intrinsic inter-word spacing defined by the font.

Specifies extra spacing as a percentage of the affected character’s advance width.

Examples

HTML

<div id="mozdiv1">Here are many words...</div>

<div id="mozdiv2">...and many more!</div>

CSS

#mozdiv1 {

word-spacing: 15px;

}

#mozdiv2 {

word-spacing: 5em;

}

Accessibility concerns

A large positive or negative word-spacing value will make the sentences the styling is applied to unreadable. For text styled with a very large positive value, the words will be so far apart that it will no longer appear to be a sentence. For text styled with a large negative value, the words will overlap each other to the point where the beginning and end of each word is unrecognizable.

Legible word-spacing must be determined on a case-by-case basis, as different font families have different character widths. There is no one value that can ensure all font families automatically maintain their legibility.

MDN Understanding WCAG, Guideline 1.4 explanations

Understanding Success Criterion 1.4.8 | W3C Understanding WCAG 2.0

Formal definition

Formal syntax

Specifications

Specification

Status

Comment

Replaces the previous values with a <spacing-limit> value that defines the same thing, plus the <percentage> value. Allows up to three values describing the optimum, minimum, and maximum value.

No change.

Initial definition.

Browser compatibility

See also