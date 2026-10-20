# VRPose.position

The position read-only property of the  interface returns the position of the  at the current  as a 3D vector.

The coordinate system is as follows:

Positive X is to the user’s right.

Positive Y is up.

Positive Z is behind the user.

Positions are measured in meters from an origin point — this point is either the position the sensor was first read at, or the position of the sensor at the point that  was last called.

Note: By default, all positions are given as a sitting space position. Transforming this point with  — when you are working with a room display for example — converts this to a standing space position.

Syntax

var myPosition = VRPose.position;

Value

A , or null if the VR sensor is not able to provide position data.

Note: User agents may provide emulated position values through techniques such as neck modeling; when doing so they should still report  as false.

Examples

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility

See also

WebVR API homepage

https://mixedreality.mozilla.org/ — demos, downloads, and other resources from the Mozilla VR team.