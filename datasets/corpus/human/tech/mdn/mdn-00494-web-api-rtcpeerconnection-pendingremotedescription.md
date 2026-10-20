# RTCPeerConnection.pendingRemoteDescription

The read-only property RTCPeerConnection.pendingRemoteDescription returns an  object describing a pending configuration change for the remote end of the connection. This does not describe the connection as it currently stands, but as it may exist in the near future. Use  or  to get the current session description for the remote endpoint. For details on the difference, see .

Syntax

sessionDescription = RTCPeerConnection.pendingRemoteDescription;

Return value

If a remote description change is in progress, this is an  describing the proposed configuration. Otherwise, this returns null.

Example

This example looks at the pendingRemoteDescription to determine whether or not there's a description change being processed.

var pc = new RTCPeerConnection();

…

var sd = pc.pendingRemoteDescription;

if (sd) {

// There's a description change underway!

}

else {

// No description change pending

}

Specifications

Specification

Status

Comment

Initial specification.

Browser compatibility

The addition of pendingRemoteDescription and  to the WebRTC spec is relatively recent. In browsers which don't support them, only  is available.

See also

, ,

, , ,

WebRTC