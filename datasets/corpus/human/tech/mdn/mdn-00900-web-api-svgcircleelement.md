# SVGCircleElement

The SVGCircleElement interface is an interface for the  element.

Properties

This interface also inherits properties from its parent, .

This property defines the x-coordinate of the center of the  element. It is denoted by the  attribute of the element.

This property defines the y-coordinate of the center of the <circle> element. It is denoted by the  attribute of the element.

This property defines the radius of the <circle> element. It is denoted by the  of the element.

Methods

This interface has no methods but inherits methods from its parent, .

Example

SVG content

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250" width="250" height="250">

<circle cx="100" cy="100" r="50" fill="gold" id="circle"

onclick="clickCircle();"/>

</svg>

JavaScript content

This function clickCircle() is called when the circle is clicked. It randomly increases or decreases the radius of the circle element.

function clickCircle() {

var circle = document.getElementById("circle");

// Randomly determine if the circle radius will increase or decrease

var change = Math.random() > 0.5 ? 10 : -10;

// Clamp the circle radius to a minimum of 10 and a maximum of 250,

// so it won't disappear or get bigger than the viewport

var newValue = Math.min(Math.max(circle.r.baseVal.value + change, 10), 250);

circle.setAttribute("r", newValue);

}

Click on the circle.

Specifications

Specification

Status

Comment

Replaced the inheritance from , , , , , and  by

Initial definition

Browser compatibility

See also

SVG element