# text-anchor

The text-anchor attribute is used to align (start-, middle- or end-alignment) a string of pre-formatted text or auto-wrapped text where the wrapping area is determined from the  property relative to a given point. It is not applicable to other types of auto-wrapped text. For those cases you should use . For multi-line text, the alignment takes place for each line.

The text-anchor attribute is applied to each individual text chunk within a given  element. Each text chunk has an initial current text position, which represents the point in the user coordinate system resulting from (depending on context) application of the  and  attributes on the <text> element, any x or y attribute values on a ,  or  element assigned explicitly to the first rendered character in a text chunk, or determination of the initial current text position for a  element.

Note: As a presentation attribute, text-anchor can be used as a CSS property.

As a presentation attribute, it can be applied to any element but it has effect only on the following five elements: , , , , and

html, body, svg {

height: 100%;

}

<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">

<!-- Materialisation of anchors -->

<path d="M60,15 L60,110 M30,40 L90,40 M30,75 L90,75 M30,110 L90,110" stroke="grey" />

<!-- Anchors in action -->

<text text-anchor="start" x="60" y="40">A</text>

<text text-anchor="middle" x="60" y="75">A</text>

<text text-anchor="end" x="60" y="110">A</text>

<!-- Materialisation of anchors -->

<circle cx="60" cy="40" r="3" fill="red" />

<circle cx="60" cy="75" r="3" fill="red" />

<circle cx="60" cy="110" r="3" fill="red" />

<style><![CDATA[

text {

font: bold 36px Verdana, Helvetica, Arial, sans-serif;

}

]]></style>

</svg>

Usage notes

Default value

start

Value

start | middle | end

Animatable

discrete

start

The rendered characters are aligned such that the start of the text string is at the initial current text position. For an element with a  property value of ltr (typical for most European languages), the left side of the text is rendered at the initial text position. For an element with a direction property value of rtl (typical for Arabic and Hebrew), the right side of the text is rendered at the initial text position. For an element with a vertical primary text direction (often typical for Asian text), the top side of the text is rendered at the initial text position.

middle

The rendered characters are aligned such that the middle of the text string is at the current text position. (For text on a path, conceptually the text string is first laid out in a straight line. The midpoint between the start of the text string and the end of the text string is determined. Then, the text string is mapped onto the path with this midpoint placed at the current text position.)

end

The rendered characters are shifted such that the end of the resulting rendered text (final current text position before applying the text-anchor property) is at the initial current text position. For an element with a direction property value of ltr (typical for most European languages), the right side of the text is rendered at the initial text position. For an element with a direction property value of rtl (typical for Arabic and Hebrew), the left side of the text is rendered at the initial text position. For an element with a vertical primary text direction (often typical for Asian text), the bottom of the text is rendered at the initial text position.

Specifications

Specification

Status

Comment

No significant change

Initial definition

Browser compatibility