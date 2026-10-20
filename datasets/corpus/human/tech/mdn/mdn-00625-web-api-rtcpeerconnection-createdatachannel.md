# RTCPeerConnection.createDataChannel()

The createDataChannel() method on the  interface creates a new channel linked with the remote peer, over which any kind of data may be transmitted. This can be useful for back-channel content such as images, file transfer, text chat, game update packets, and so forth.

If the new data channel is the first one added to the connection, renegotiation is started by delivering a  event.

Syntax

dataChannel = RTCPeerConnection.createDataChannel(label[, options]);

Parameters

label

A human-readable name for the channel. This string may not be longer than 65,535 bytes.

options

An RTCDataChannelInit dictionary providing configuration options for the data channel

RTCDataChannelInit dictionary

The RTCDataChannelInit dictionary provides the following fields, any of which may be included in the object passed as the options parameter in order to configure the data channel to suit your needs:

ordered

Indicates whether or not messages sent on the  are required to arrive at their destination in the same order in which they were sent (true), or if they're allowed to arrive out-of-order (false). Default: true.

maxPacketLifeTime

The maximum number of milliseconds that attempts to transfer a message may take in unreliable mode. While this value is a 16-bit unsigned number, each user agent may clamp it to whatever maximum it deems appropriate. Default: null.

maxRetransmits

The maximum number of times the user agent should attempt to retransmit a message which fails the first time in unreliable mode. While this value is a16-bit unsigned number, each user agent may clamp it to whatever maximum it deems appropriate. Default: null.

protocol

The name of the sub-protocol being used on the , if any; otherwise, the empty string (""). Default: empty string, "". This string may not be longer than 65,535 bytes.

negotiated

By default (false), data channels are negotiated in-band, where one side calls createDataChannel, and the other side listens to the  event using the ondatachannel EventHandler . Alternatively (true), they can be negotiated out of-band, where both sides call createDataChannel with an agreed-upon id. Default: false.

id

An 16-bit numeric ID for the channel; permitted values are 0-65534. If you don't include this option, the user agent will select an ID for you.

The options which can be configured using the RTCDataChannelInit dictionary represent the script-settable subset of the properties on the  interface.

Return value

A new  object with the specified label, configured using the options specified by options if that parameter is included; otherwise, the defaults listed above are established.

Exceptions

InvalidStateError

The  is closed.

TypeError

This can happen in a couple of situations:

The label and/or protocol string is too long; these cannot be longer than 65,535 bytes (bytes, rather than characters).

The id is 65535. While this is a valid unsigned 16-bit value, it's not a permitted value for id.

SyntaxError

Values were specified for both the maxPacketLifeTime and maxRetransmits options. You may only specify a non-null value for one of these.

ResourceInUse

An id was specified, but another  is already using the same value.

OperationError

Either the specified id is already in use or, if no id was specified, the WebRTC layer was unable to automatically generate an ID because all IDs are in use.

Examples

This example shows how to create a data channel and set up handlers for the  and  events to send and receive messages on it (For brievity, the example assumes onnegotiationneeded is set up).

// Offerer side

var pc = new RTCPeerConnection(options);

var channel = pc.createDataChannel("chat");

channel.onopen = function(event) {

channel.send('Hi you!');

}

channel.onmessage = function(event) {

console.log(event.data);

}

// Answerer side

var pc = new RTCPeerConnection(options);

pc.ondatachannel = function(event) {

var channel = event.channel;

channel.onopen = function(event) {

channel.send('Hi back!');

}

channel.onmessage = function(event) {

console.log(event.data);

}

}

Alternatively, more symmetrical out-of-band negotiation can be used, using an agreed-upon id (0 here):

// Both sides

var pc = new RTCPeerConnection(options);

var channel = pc.createDataChannel("chat", {negotiated: true, id: 0});

channel.onopen = function(event) {

channel.send('Hi!');

}

channel.onmessage = function(event) {

console.log(event.data);

}

For a more thorough example showing how the connection and channel are established, see A simple RTCDataChannel sample.

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

See also

A simple RTCDataChannel sample