# Document: transitionstart event

The transitionstart event is fired when a CSS transition has actually started, i.e., after any  has ended.

The difference is transitionstart and transitionrun is that transitionrun fires when the transition is created (i.e. at the start of any delay) and transitionstart fires when the actual animation has begun (i.e. at the end of any delay).

Bubbles

Yes

Cancelable

No

Interface

Event handler property

The original target for this event is the  that had the transition applied. You can listen for this event on the  interface to handle it in the capture or bubbling phases. For full details on this event please see the page on HTMLElement: transitionstart.

Examples

This code adds a listener to the transitionstart event:

document.addEventListener('transitionstart', () => {

console.log('Started transitioning');

});

The same, but using the  property instead of addEventListener():

document.ontransitionrun = () => {

console.log('Started transitioning');

};

See a live example of this event.

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

See also

The  event handler

The  interface

CSS properties: , , , ,

Related events: , ,

This event on  targets:

This event on  targets: