# KeyboardEvent.initKeyEvent()

The KeyboardEvent.initKeyEvent() method is used to initialize the value of an event created using ("KeyboardEvent"). Events initialized in this way must have been created with the ("KeyboardEvent") method. initKeyEvent() must be called to set the event before it is dispatched.

Do not use this method anymore, use the  constructor instead.

This method is based on early drafts of  and is implemented in Gecko-based browsers; other browsers implemented  based on early drafts of . Favor the modern constructor structure as the only cross-browser way of building events.

Syntax

event.initKeyEvent (type, bubbles, cancelable, viewArg,

ctrlKeyArg, altKeyArg, shiftKeyArg, metaKeyArg,

keyCodeArg, charCodeArg)

Parameters

type

Is a  representing the type of event.

bubbles

Is a  indicating whether the event should bubble up through the event chain or not (see bubbles).

cancelable

Is a  i indicating whether the event can be canceled (see cancelable).

viewArg

Specifies the ; this value may be null.

ctrlKeyArg

Is a  that is true if the virtual key to be generated is a combination of keys containing the Ctrl key.

altKeyArg

Is a  that is true if the virtual key to be generated is a combination of keys containing the Alt key.

shiftKeyArg

A  that is true if the virtual key to be generated is a combination of keys containing the Shift key.

metaKeyArg

Is a  that is true if the virtual key to be generated is a combination of keys containing the Meta key.

keyCodeArg

Is a unsigned long representing the virtual key code value of the key which was depressed, otherwise 0. See  for the list of key codes.

charCodeArg

Is a unsigned long representingthe Unicode character associated with the depressed key otherwise 0.

Example

var event = document.createEvent('KeyboardEvent'); // create a key event

// define the event

event.initKeyEvent("keypress",       // typeArg,

true,             // canBubbleArg,

true,             // cancelableArg,

null,             // viewArg,  Specifies UIEvent.view. This value may be null.

false,            // ctrlKeyArg,

false,            // altKeyArg,

false,            // shiftKeyArg,

false,            // metaKeyArg,

9,               // keyCodeArg,

0);              // charCodeArg);

document.getElementById('blah').dispatchEvent(event);

Specifications

This implementation of keyboard events is based on the key events spec in the early versions of DOM 2 Events, later removed from that spec.

The initKeyEvent is the current Gecko equivalent of the DOM Level 3 Events (initially drafted and also deprecated in favor of   method with the following arguments :

typeArg of type DOMString

canBubbleArg of type boolean

cancelableArg of type boolean

viewArg of type views::AbstractView

keyIdentifierArg of type DOMString

keyLocationArg of type unsigned long

modifiersList of type DOMString);