# RTCIceCandidate.RTCIceCandidate()

The RTCIceCandidate() constructor creates and returns a new  object, which can be configured to represent a single  candidate.

Syntax

candidate = new RTCIceCandidate([candidateInfo]);

Parameters

candidateInfo

An optional  object providing information about the candidate; if this is provided, the candidate is initialized configured to represent the described candidate.

Return value

A newly-created  object, optionally configured based on the specified object based on the  dictionary.

If candidateInfo is provided, the new RTCIceCandidate is initialized as follows:

Each member of the RTCIceCandidateInit object is initialized to the value of the property by the same name from . This includes the , , , and  properties.

The candidate string (which is SDP text) is parsed; each property found is stored in the corresponding field in the RTCIceCandidate. If any of the fields is invalid, parsing of the string silently aborts without throwing an exception. The default value of candidate is the empty string, which indicates that the candidate is an "end-of-candidates" message.

The following fields are initialized to null if they are not included in the  property: , ,  , , , , , , , and .

Note: Parsing of the candidate string is performed using the candidate-attribute grammar from the WebRTC Specification.

Exceptions

TypeError

The specified RTCIceCandidateInit has values of null in both the  and  properties.

Usage notes

This constructor does not do complete validation of the specified candidateInfo object or string.

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

See also

WebRTC connectivity

Lifetime of a WebRTC session

Signaling and video calling