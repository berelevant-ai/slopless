# RTCDataChannel.close()

The RTCDataChannel.close() method closes the . Either peer is permitted to call this method to initiate closure of the channel.

Closure of the data channel is not instantaneous. Most of the process of closing the connection is handled asynchronously; you can detect when the channel has finished closing by watching for a  event on the data channel.

The sequence of events which occurs in response to this method being called:

is set to "closing".

A background task is established to handle the remainder of the steps below, and close() returns to the caller.

The transport layer deals with any buffered messages; the protocol layer decides whether to send them or discard them.

The underlying data transport is closed.

The  property is set to "closed".

If the transport was closed with an error, the RTCDataChannel is sent a  event.

A  event is sent to the channel.

In Firefox, the  interface was implemented under the name DataChannel until Firefox 24, so this method was called DataChannel.close().

Syntax

RTCDataChannel.close();

Parameters

None.

Return value

undefined.

Example

var pc = new RTCPeerConnection();

var dc = pc.createDataChannel("my channel");

dc.onmessage = function (event) {

console.log("received: " + event.data);

dc.close(); // We decided to close after the first received message

};

dc.onopen = function () {

console.log("datachannel open");

};

dc.onclose = function (

console.log("datachannel close");

};

// Now negotiate the connection and so forth...

Specifications

Specification

Status

Comment

Initial specification.

Browser compatibility

See also

WebRTC

event