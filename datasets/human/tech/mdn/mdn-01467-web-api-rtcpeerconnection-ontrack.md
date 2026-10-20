# RTCPeerConnection.ontrack

The  property ontrack is an  which specifies a function to be called when the  event occurs, indicating that a track has been added to the . The function receives as input the event object, of type ; this event is sent when a new incoming  has been created and associated with an  object which has been added to the set of receivers on connection.

Syntax

RTCPeerConnection.ontrack = eventHandler;

Value

Set ontrack to be a function you provide that accepts as input a  object describing the new track and how it's being used. This information includes the  object representing the new track, the  and , and a list of  objects which indicates which stream or streams the track is part of..

Example

This example, taken from the code for the article Signaling and video calling, connects the incoming track to the  element which will be used to display the incoming video.

pc.ontrack = function(event) {

document.getElementById("received_video").srcObject = event.streams[0];

document.getElementById("hangup-button").disabled = false;

};

The first line of our ontrack event handler takes the first stream in the incoming track and sets the  attribute to that. This connects that stream of video to the element so that it begins to be presented to the user. The second line of code enables a "hang up" button, which the user can use to disconnect from the call.

Specifications

Specification

Status

Comment

Initial specification.

Browser compatibility

See also

The  event and its type, .