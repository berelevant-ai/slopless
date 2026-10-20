# background-image

The background-image CSS property sets one or more background images on an element.

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone https://github.com/mdn/interactive-examples and send us a pull request.

The background images are drawn on stacking context layers on top of each other. The first layer specified is drawn as if it is closest to the user.

The borders of the element are then drawn on top of them, and the  is drawn beneath them. How the images are drawn relative to the box and its borders is defined by the  and  CSS properties.

If a specified image cannot be drawn (for example, when the file denoted by the specified URI cannot be loaded), browsers handle it as they would a none value.

Note: Even if the images are opaque and the color won't be displayed in normal circumstances, web developers should always specify a . If the images cannot be loaded—for instance, when the network is down—the background color will be used as a fallback.

Syntax

Each background image is specified either as the keyword none or as an  value.

To specify multiple background images, supply multiple values, separated by a comma:

background-image:

linear-gradient(to bottom, rgba(255,255,0,0.5), rgba(0,0,255,0.5)),

url('https://mdn.mozillademos.org/files/7693/catfront.png');

Values

none

Is a keyword denoting the absence of images.

<image>

Is an  denoting the image to display. There can be several of them, separated by commas, as multiple backgrounds are supported.

Accessibility concerns

Browsers do not provide any special information on background images to assistive technology. This is important primarily for screen readers, as a screen reader will not announce its presence and therefore convey nothing to its users. If the image contains information critical to understanding the page's overall purpose, it is better to describe it semantically in the document.

MDN Understanding WCAG, Guideline 1.1 explanations

Understanding Success Criterion 1.1.1 | W3C Understanding WCAG 2.0

Formal definition

Formal syntax

Examples

Layering background images

Note that the star image is partially transparent and is layered over the cat image.

HTML

<div>

<p class="catsandstars">

This paragraph is full of cats<br />and stars.

</p>

<p>This paragraph is not.</p>

<p class="catsandstars">

Here are more cats for you.<br />Look at them!

</p>

<p>And no more.</p>

</div>

CSS

p {

font-size: 1.5em;

color: #FE7F88;

background-image: none;

background-color: transparent;

}

div {

background-image:

url("https://mdn.mozillademos.org/files/6457/mdn_logo_only_color.png");

}

.catsandstars {

background-image:

url("https://mdn.mozillademos.org/files/11991/startransparent.gif"),

url("https://mdn.mozillademos.org/files/7693/catfront.png");

background-color: transparent;

}

Result

Specifications

Specification

Status

Comment

From CSS2 Revision 1, the property has been extended to support multiple backgrounds and any  CSS data type.

From CSS1, the way images with and without intrinsic dimensions are handled is now described.

Initial definition.

Browser compatibility

See also

Implementing image sprites in CSS

Image-related data types: ,

Image-related functions: