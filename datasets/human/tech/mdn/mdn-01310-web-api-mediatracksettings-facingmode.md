# MediaTrackSettings.facingMode

The  dictionary's facingMode property is a  indicating the direction in which the camera producing the video track represented by the  is currently facing. This lets you determine what value was selected to comply with your specified constraints for this property's value as described in the  property you provided when calling either  or .

If needed, you can determine whether or not this constraint is supported by checking the value of  as returned by a call to . However, typically this is unnecessary since browsers will ignore any constraints they're unfamiliar with.

Because  doesn't include this information, tracks associated with a WebRTC  will never include this property.

Syntax

var facingMode = MediaTrackSettings.facingMode;

Value

A  whose value is one of the strings in .

VideoFacingModeEnum

The following strings are permitted values for the facing mode. These may represent separate cameras, or they may represent directions in which an adjustable camera can be pointed.

"user"

The video source is facing toward the user; this includes, for example, the front-facing camera on a smartphone.

"environment"

The video source is facing away from the user, thereby viewing their environment. This is the back camera on a smartphone.

"left"

The video source is facing toward the user but to their left, such as a camera aimed toward the user but over their left shoulder.

"right"

The video source is facing toward the user but to their right, such as a camera aimed toward the user but over their right shoulder.

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