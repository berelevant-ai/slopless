# MediaStreamTrack: unmute event

The unmute event is sent to a  when the track's source is once again able to provide media data after a period of not being able to do so. This ends the  state that began with the  event.

Bubbles

No

Cancelable

No

Interface

Event handler property

Note: The condition that most people think of as "muted" (that is, a user-controllable way to silence a track) is actually managed using the  property, for which there are no events.

Examples

In this example, event handlers are established for the  and unmute events in order to detect when the media is not flowing from the source for the  stored in the variable musicTrack.

musicTrack.addEventListener("mute", event => {

document.getElementById("timeline-widget").style.backgroundColor = "#aaa";

}, false);

musicTrack.addEventListener("unmute", event => {

document.getElementById("timeline-widget").style.backgroundColor = "#fff";

}, false);

With these event handlers in place, when the track musicTrack enters its  state, the element with the ID timeline-widget gets its background color changed to #aaa. When the track exits the muted state—detected by the arrival of an unmuted event—the background color is restored to white.

You can also use the  event handler property to set up a handler for this event; similarly, the  event handler is available for setting up a handler for the mute event. The following example shows this:

musicTrack.onmute = event => {

document.getElementById("timeline-widget").style.backgroundColor = "#aaa";

}

musicTrack.mute = event = > {

document.getElementById("timeline-widget").style.backgroundColor = "#fff";

}

Specifications

Specification

Status

Comment

Initial specification.

Browser compatibility

See also

event handler property

event