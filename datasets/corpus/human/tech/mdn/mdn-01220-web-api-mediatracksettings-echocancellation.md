# MediaTrackSettings.echoCancellation

The  dictionary's echoCancellation property is a Boolean value whose value indicates whether or not echo cancellation is enabled on an audio track. This lets you determine what value was selected to comply with your specified constraints for this property's value as described in the  property you provided when calling either  or .

Echo cancellation is a feature which attempts to prevent echo effects on a two-way audio connection by attempting to reduce or eliminate crosstalk between the user's output device and their input device. For example, it might apply a filter that negates the sound being produced on the speakers from being included in the input track generated from the microphone.

If needed, you can determine whether or not this constraint is supported by checking the value of  as returned by a call to . However, typically this is unnecessary since browsers will ignore any constraints they're unfamiliar with.

Because  doesn't include this information, tracks associated with a WebRTC  will never include this property.

Syntax

var echoCancellation = MediaTrackSettings.echoCancellation;

Value

A Boolean value which is true if the track has echo cancellation functionality enabled or false if echo cancellation is disabled.

Example

See  for an example.

Specifications

Specification

Status

Comment

Initial specification.

Browser compatibility

See also

Media Capture and Streams API

Capabilities, constraints, and settings