# TransitionEvent.initTransitionEvent()

The TransitionEvent.initTransitionEvent() method Initializes a transition event created using the deprecated  method.

TransitionEvent created that way are untrusted.

Note: this method has been dropped during the standard process. It has been deprecated and is in the progress of been removed from most implementation. Do not use it anymore, use the standard constructor, , to create a synthetic

Syntax

transitionEvent.initTransitionEvent(typeArg, canBubbleArg, cancelableArg, transitionNameArg, elapsedTimeArg);

Parameters

typeArg

Is a  identifying the specific type of transition event that occurred. The following value is allowed:

Value

Meaning

transitionend

The transition completed.

canBubbleArg

Is a  flag indicating if the event can bubble (true) or not (false).

cancelableArg

Is a  flag indicating if the event associated action can be avoided (true) or not (false).

transitionNameArg

Is a  containing the name of the CSS property associated with the transition. This value is not affected by the  property.

elapsedTimeArg

Is float giving the amount of time the transition has been running, in seconds, when this event fired.

Specifications

This method is non-standard and not part of any specification, though it was present in early drafts of .

Browser compatibility

See also

Using CSS transitions

CSS properties: , , , , .