# Element.scrollLeft

The Element.scrollLeft property gets or sets the number of pixels that an element's content is scrolled from its left edge.

If the element's  is rtl (right-to-left), then scrollLeft is 0 when the scrollbar is at its rightmost position (at the start of the scrolled content), and then increasingly negative as you scroll towards the end of the content.

On systems using display scaling, scrollLeft may give you a decimal value.

Syntax

Getting the value

// Get the number of pixels scrolled

var sLeft = element.scrollLeft;

sLeft is an integer representing the number of pixels that element has been scrolled from the left edge.

Setting the value

// Set the number of pixels scrolled

element.scrollLeft = 10;

scrollLeft can be specified as any integer value. However:

If the element can't be scrolled (e.g., it has no overflow), scrollLeft is set to 0.

If specified as a value less than 0 (greater than 0 for right-to-left elements), scrollLeft is set to 0.

If specified as a value greater than the maximum that the content can be scrolled, scrollLeft is set to the maximum.

Example

HTML

<div id="container">

<div id="content">Click the button to slide right!</div>

</div>

<button id="slide" type="button">Slide right</button>

CSS

#container {

width: 100px;

height: 100px;

border: 1px solid #ccc;

overflow-x: scroll;

}

#content {

width: 250px;

background-color: #ccc;

}

JavaScript

const button = document.getElementById('slide');

button.onclick = function () {

document.getElementById('container').scrollLeft += 20;

};

Result

Specifications

Specification

Status

Comment

Browser compatibility

See also

MSDN's Measuring Element Dimension and Location