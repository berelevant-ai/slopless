# TransitionEvent

The TransitionEvent interface represents events providing information related to transitions.

Constructor

Creates a TransitionEvent event with the given parameters.

Properties

Also inherits properties from its parent .

Is a  containing the name CSS property associated with the transition.

Is a float giving the amount of time the transition has been running, in seconds, when this event fired. This value is not affected by the  property.

Is a , starting with ::, containing the name of the pseudo-element the animation runs on. If the transition doesn't run on a pseudo-element but on the element, an empty string: ''.

Types of TransitionEvent

An  fired when a CSS transition has been cancelled.

An  fired when a CSS transition has finished playing.

An  fired when a CSS transition is created, when it is added to a set of running transitions, though not nessarilty started

An  fired when a CSS transition has started transitioning.

Methods

Also inherits properties from its parent .

Initializes a TransitionEvent created using the deprecated  method.

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

See also

Using CSS transitions

CSS properties: , , , , .