# Touch.target

Summary

Returns the  () on which the touch contact started when it was first placed on the surface, even if the touch point has since moved outside the interactive area of that element or even been removed from the document. Note that if the target element is removed from the document, events will still be targeted at it, and hence won't necessarily bubble up to the window or document anymore. If there is any risk of an element being removed while it is being touched, the best practice is to attach the touch listeners directly to the target.

Syntax

var el = touchPoint.target;

Return value

el

The target element of the  object.

Example

This example illustrates how to access the  object's  property. The  property is an  () on which a touch point is started when contact is first placed on the surface.

In following simple code snippet, we assume the user initiates one or more touch contacts on the source element. When the  event handler for this element is invoked, each touch point's  property is accessed via the event's  list.

// Register a touchmove listener for the 'source' element

var src = document.getElementById("source");

src.addEventListener('touchstart', function(e) {

// Iterate through the touch points that were activiated

// for this element.

for (var i=0; i < e.targetTouches.length; i++) {

console.log("touchpoint[" + i + "].target = " + e.targetTouches[i].target);

}

}, false);

Specifications

Specification

Status

Comment

Non-stable version.

Initial definition.

Browser compatibility