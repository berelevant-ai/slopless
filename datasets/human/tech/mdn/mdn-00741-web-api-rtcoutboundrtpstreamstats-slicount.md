# RTCOutboundRtpStreamStats.sliCount

The sliCount property of the  dictionary indicates how many Slice Loss Indication (SLI) packets the  received from the remote  for the RTP stream described by this object.

An SLI packet is used by a decoder to let the encoder (the sender) know that it's detected corruption of one or more consecutive macroblocks, in scan order, in the received media.In general, what's usually of interest is that the higher this number is, the more the stream data is becoming corrupted between the sender and the receiver, causing the receiver to request retransmits or to drop frames entirely.

Syntax

var sliCount = RTCOutboundRtpStreamStats.sliCount;

Value

An unsigned integer indicating the number of SLI packets the sender received from the receiver due to lost runs of macroblocks. A high value of sliCount may be an indication of an unreliable network.

This is a very technical part of how video codecs work. For details, see .

Note: This value is only present for video media.

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

See also

: Definition of "Slice Loss Indication" in the document Extended RTP Profile for Real-time Transport Control Protocol (RTCP)-Based Feedback (RTP/AVPF).