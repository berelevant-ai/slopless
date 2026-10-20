# RTCIceCandidate.type

The  interface's read-only type specifies the type of candidate the object represents.

The type field's value is set when the  constructor is used. You can't specify the value of type in the options object, but the address is automatically extracted from the  a-line, if it's formatted properly, being taken from its cand-type field.

Syntax

var type = RTCIceCandidate.type;

Value

A  whose value is one of those defined by the  enumerated type.

If type is null, that information was missing from the 's a-line, which will cause  to throw an OperationError exception.

Example

In this example, the candidate's  is used to present a modified user interface for host candidates (those where the  refers directly to the remote peer, rather than an intermediary).

if (candidate.type == "host") {

showHostControls();

} else {

hideHostControls();

}

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

See also

WebRTC API

Introduction to WebRTC protocols

WebRTC connectivity