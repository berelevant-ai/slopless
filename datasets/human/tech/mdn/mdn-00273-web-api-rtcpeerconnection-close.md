# RTCPeerConnection.close()

The RTCPeerConnection.close() method closes the current peer connection.

Syntax

peerConnection.close();

This method has no parameters, and returns nothing.

Calling this method terminates the RTCPeerConnection's ICE agent, ending any ongoing ICE processing and any active streams. This also releases any resources in use by the ICE agent, including TURN permissions. All  objects are considered to be stopped once this returns (they may still be in the process of stopping, but for all intents and purposes, they're stopped).

Once this method returns, the signaling state as returned by  is closed.

Make sure that you delete all references to the previous  before attempting to create a new one that connects to the same remote peer, as not doing so might result in some errors depending on the browser.

Example

var pc = new RTCPeerConnection();

var dc = pc.createDataChannel("my channel");

dc.onmessage = function (event) {

console.log("received: " + event.data);

pc.close(); // We decided to close after the first received message

};

dc.onopen = function () {

console.log("datachannel open");

};

dc.onclose = function () {

console.log("datachannel close");

};

Specifications

Specification

Status

Comment

Initial specification.

Browser compatibility

See also

WebRTC