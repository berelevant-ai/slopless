# GestureEvent

The GestureEvent is a proprietary interface specific to WebKit which gives information regarding multi-touch gestures. Events using this interface include , , and .

GestureEvent derives from , which in turn derives from .

Constructor

Creates a GestureEvent object.

Properties

This interface also inherits properties of its parents,  and .

Change in rotation (in degrees) since the event's beginning. Positive values indicate clockwise rotation; negative values indicate anticlockwise rotation. Initial value: 0.0

Distance between two digits since the event's beginning. Expressed as a floating-point multiple of the initial distance between the digits at the beginning of the gesture. Values below 1.0 indicate an inward pinch (zoom out). Values above 1.0 indicate an outward unpinch (zoom in). Initial value: 1.0

Methods

This interface also inherits methods of its parents,  and .

Initializes the value of an GestureEvent. If the event has already being dispatched, this method does nothing.

Gesture event types

Specifications

Not part of any specification. Apple has a description at the Safari Developer Library.

Browser compatibility

See also