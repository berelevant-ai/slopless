# RTCSctpTransport

The RTCSctpTransport interface provides information which describes a Stream Control Transmission Protocol () transport. This provides information about limitations of the transport, but also provides a way to access the underlying Datagram Transport Layer Security () transport over which SCTP packets for all of an 's data channels are sent and received.

You don't create  objects yourself; instead, you get access to the RTCSctpTransport for a given RTCPeerConnection through its  property.

Possibly the most useful property on this interface is its  property, which you can use to determine the upper limit on the size of messages you can send over a data channel on the peer connection.

Properties

Also inherits properties from:

An integer value indicating the maximum number of  that can be open simultaneously.

An integer value indicating the maximum size, in bytes, of a message which can be sent using the  method.

A  enumerated value indicating the state of the SCTP transport.

An  object representing the  transport used for the transmission and receipt of data packets.

Event handlers

Fired when the  changes.

Methods

This interface has no methods, but inherits methods from:

Example

TBD

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

See also

WebRTC