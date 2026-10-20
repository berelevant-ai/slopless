# RTCDataChannel

The RTCDataChannel interface represents a network channel which can be used for bidirectional peer-to-peer transfers of arbitrary data. Every data channel is associated with an , and each peer connection can have up to a theoretical maximum of 65,534 data channels (the actual limit may vary from browser to browser).

To create a data channel and ask a remote peer to join you, call the 's  method. The peer being invited to exchange data receives a  event (which has type ) to let it know the data channel has been added to the connection.

Events

Sent to the channel's  event handler when the number of bytes of data in the outgoing data buffer falls below the value specified by .

Sent to the  event handler when the underlying data transport closes.

Sent to the  event handler when an error occurs on the data channel.

Sent to the  event handler when a message has been received from the remote peer. The message contents can be found in the event's  property.

Sent to the  event handler when the data channel is first opened, or when an existing data channel's underlying connection re-opens.

Data format

The underlying data format is defined by the IEEE draft specification draft-ietf-mmusic-sctp-sdp. The current format specifies its protocol as either "UDP/DTLS/SCTP" (UDP carrying DTLS carrying SCTP) or "TCP/DTLS/SCTP" (TCP carrying DTLS carrying SCTP). Older browsers may only specify "DTLS/SCTP".

Example

var pc = new RTCPeerConnection();

var dc = pc.createDataChannel("my channel");

dc.onmessage = function (event) {

console.log("received: " + event.data);

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

WebRTC API