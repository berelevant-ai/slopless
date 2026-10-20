# EventTarget.dispatchEvent()

Dispatches an  at the specified , (synchronously) invoking the affected s in the appropriate order. The normal event processing rules (including the capturing and optional bubbling phase) also apply to events dispatched manually with dispatchEvent().

Syntax

cancelled = !target.dispatchEvent(event)

Parameter

event is the  object to be dispatched.

target is used to initialize the  and determine which event listeners to invoke.

Return Value

The return value is false if event is cancelable and at least one of the event handlers which received event called . Otherwise it returns true.

The dispatchEvent() method throws UNSPECIFIED_EVENT_TYPE_ERR if the event's type was not specified by initializing the event before the method was called, or if the event's type is null or an empty string.

Exceptions

Exceptions thrown by event handlers are reported as uncaught exceptions. The event handlers run on a nested callstack; they block the caller until they complete, but exceptions do not propagate to the caller.

Notes

Unlike "native" events, which are fired by the DOM and invoke event handlers asynchronously via the event loop, dispatchEvent() invokes event handlers synchronously. All applicable event handlers will execute and return before the code continues on after the call to dispatchEvent().

dispatchEvent() is the last step of the create-init-dispatch process, which is used for dispatching events into the implementation's event model. The event can be created using Event constructor.

See also the Event object reference.

Example

See Creating and triggering events.

Specifications

Specification

Status

Comment

Initial definition in the DOM 2 Events specification.

Browser compatibility