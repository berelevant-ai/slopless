# RTCPeerConnection.onaddstream

The RTCPeerConnection.onaddstream event handler is a property containing the code to execute when the  event, of type , is received by this . Such an event is sent when a  is added to this connection by the remote peer. The event is sent immediately after the call  and doesn't wait for the result of the SDP negotiation.

Important: This property has been removed from the specification; you should now use  to watch for  events instead. It is included here in order to help you adapt existing code and understand existing samples, which may not be up-to-date yet.

Syntax

rtcPeerConnection.onaddstream = eventHandler;

Value

A function which handles  events. These events, of type , are sent when streams are added to the connection by the remote peer. The first time an event occurs may be nearly immediately after the remote end of the connection is set using ; it doesn't wait for a particular stream to be accepted or rejected using  negotiation.

Example

This code, based on an older version of our Signaling and video calling sample, responds to  events by setting the video source for a  element to the stream specified in the event, and then enabling a "hang up" button in the app's user interface.

pc.onaddstream = function(event) {

document.getElementById("received_video").srcObject = event.stream;

document.getElementById("hangup-button").disabled = false;

};

You can also use  to add a handler for addstream events to an .

Browser compatibility

Important: This property has been removed from the specification; you should now use  to watch for  events instead. It is included here in order to help you adapt existing code and understand existing samples, which may not be up-to-date yet.

See also

Use the newer  event, its type , and the  event handler property instead of this.

The  event and its type, .