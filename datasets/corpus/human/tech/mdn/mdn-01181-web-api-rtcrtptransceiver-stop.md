# RTCRtpTransceiver.stop()

The stop() method in the  interface permanently stops the transceiver by stopping both the associated  and .

Note: Until recently, the  property was provided to return true if the connection is stopped. That property has been deprecated and will be removed at some point. Instead, check the value of . If it's stopped, the transceiver has been stopped.

This method does nothing if the transceiver is already stopped.

Syntax

RTCRtpTransceiver.stop()

Paramters

None.

Return value

undefined

Exceptions

InvalidStateError

The RTCPeerConnection of which the transceiver is a member is closed.

Usage notes

When you call stop() on a transceiver, the sender immediately stops sending media and each of its RTP streams are closed using the  "BYE" message. The receiver then stops receiving media; the receiver's  is stopped, and the transceiver's  is changed to stopped, and renegotiation is triggered by sending a negotiationneeded event to the RTCPeerConnection.

The negotiation process causes  to be set to stopped, finally indicating that the transceiver has been fully stopped.

Note: Stopping the transceiver causes a  event to be sent to the transceiver's , so the connection can adapt to the change.

Specifications

Specification

Status

Comment

Browser compatibility

See also

WebRTC API

Introduction to the Real-time Transport Protocol (RTP)