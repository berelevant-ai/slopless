# Document: animationiteration event

The animationiteration event is fired when an iteration of a CSS Animation ends, and another one begins. This event does not occur at the same time as the  event, and therefore does not occur for animations with an animation-iteration-count of one.

Bubbles

Yes

Cancelable

No

Interface

Event handler property

The original target for this event is the  that had the animation applied. You can listen for this event on the  interface to handle it in the capture or bubbling phases. For full details on this event please see the page on HTMLElement: animationiteration.

Examples

This code uses animationiteration to keep track of the number of iterations an animation has completed:

let iterationCount = 0;

document.addEventListener('animationiteration', () => {

iterationCount++;

console.log(`Animation iteration count: ${iterationCount}`);

});

The same, but using the onanimationiteration event handler property:

let iterationCount = 0;

document.onanimationiteration = () => {

iterationCount++;

console.log(`Animation iteration count: ${iterationCount}`);

};

See a live example of this event.

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility

See also

CSS Animations

Using CSS Animations

Related events: , ,

This event on  targets:

This event on  targets: