# <pre>: The Preformatted Text element

The HTML <pre> element represents preformatted text which is to be presented exactly as written in the HTML file. The text is typically rendered using a non-proportional ("monospace") font. Whitespace inside this element is displayed as written.

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone https://github.com/mdn/interactive-examples  and send us a pull request.

Content categories

Flow content, palpable content.

Permitted content

Phrasing content.

Tag omission

Permitted parents

Any element that accepts flow content.

Implicit ARIA role

No corresponding role

Permitted ARIA roles

Any

DOM interface

Attributes

This element only includes the global attributes.

Contains the preferred count of characters that a line should have. It was a non-standard synonym of . To achieve such an effect, use CSS  instead.

Contains the preferred count of characters that a line should have. Though technically still implemented, this attribute has no visual effect; to achieve such an effect, use CSS  instead.

Is a hint indicating how the overflow must happen. In modern browser this hint is ignored and no visual effect results in its present; to achieve such an effect, use CSS  instead.

Example

HTML

<p>Using CSS to change the font color is easy.</p>

<pre>

body {

color: red;

}

</pre>

Result

Accessibility concerns

It is important to provide an alternate description for any images or diagrams created using preformatted text. The alternate description should clearly and concisely describe the image or diagram's content.

People experiencing low vision conditions and browsing with the aid of assistive technology such as a screen reader may not understand what the preformatted text characters are representing when they are read out in sequence.

A combination of the  and  elements, supplemented by a combination of an  and the ARIA role and aria-labelledby attributes allow the preformatted text to be announced as an image, with the figcaption serving as the image's alternate description.

Example

<figure role="img" aria-labelledby="cow-caption">

<pre>

___________________________

< I'm an expert in my field. >

---------------------------

\   ^__^

\  (oo)\_______

(__)\       )\/\

||----w |

||     ||

</pre>

<figcaption id="cow-caption">

A cow saying, "I'm an expert in my field." The cow is illustrated using preformatted text characters.

</figcaption>

</figure>

MDN Understanding WCAG, Guideline 1.1 explanations

H86: Providing text alternatives for ASCII art, emoticons, and leetspeak | W3C Techniques for WCAG 2.0

Specifications

Specification

Status

Comment

No significant change from

No significant change from

Deprecated the cols attribute

Browser compatibility

See also

CSS: ,

Related element: