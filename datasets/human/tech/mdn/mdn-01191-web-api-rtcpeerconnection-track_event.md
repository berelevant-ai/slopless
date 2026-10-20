# RTCPeerConnection: track event

The track event is sent to the  event handler on s after a new track has been added to an  which is part of the connection.

Bubbles

Yes

Cancelable

No

Interface

Event handler property

By the time this event is delivered, the new track has been fully added to the peer connection. See  for details.

Examples

This example shows code that creates a new , then adds a new track event handler.

pc = new RTCPeerConnection({

iceServers: [

{

urls: "turn:fake.turnserver.url",

username: "someusername",

credential: "somepassword"

}

]

});

pc.addEventListener("track", e => {

videoElement.srcObject = e.streams[0];

hangupButton.disabled = false;

}, false);

The event handler assigns the new track's first stream to an existing  element, identified using the variable videoElement.

You can also assign the event handler function to the  property, rather than use .

pc.ontrack = e => {

videoElement.srcObject = e.streams[0];

hangupButton.disabled = false;

return false;

}

Specifications

Specification

Status

Comment

Initial specification.

Browser compatibility