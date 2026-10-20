# MediaTrackConstraints.cursor

The  dictionary's cursor property is a  describing the requested or mandatory constraints placed upon the value of the  constrainable property, which is used to specify whether or not the cursor should be included in the captured video.

If needed, you can determine whether or not this constraint is supported by checking the value of  as returned by a call to . However, typically this is unnecessary since browsers will ignore any constraints they're unfamiliar with.

Syntax

var constraintsObject = { cursor: constraint };

constraintsObject.cursor = constraint;

Value

A  which specifies whether or not the mouse cursor should be rendered into the video track in the  returned by the call to . See  for an explanation of how to define constraints.

Usage notes

You can check the setting selected by the user agent after the display media has been created by  by calling  on the display media's video , then checking the value of  the returned  object's  object.

For example, if your app needs to alter the stream by inserting a representation of the cursor position if the stream doesn't include the rendered cursor, you can determine the need to do so by using code like this:

let insertFakeCursorFlag = false;

if (displayStream.getVideoTracks()[0].getSettings().cursor === "never") {

insertFakeCursorFlag = true;

}

Following this code, insertFakeCursorFlag is true if there's no cursor rendered into the stream already. Later code can detect this flag's value and if it's true, can manually look at some metadata that might be provided and insert a fake representation of the cursor at the correct position.

Examples

Here are some example constraints objects for getDisplayMedia() that make use of the cursor property. In addition, see  for a complete example showing how constraints are used.

Example: Cursor always visible

This example sets up the constraints to request that the cursor always be visible.

let displayMediaOptions = {

cursor: "always"

};

Example: Cursor visible during motion with fallback

In this example, the cursor property is configured to request that the cursor be visible when in motion, falling back to always being visible if the user agent doesn't support in-motion only cursor rendering.

let displayMediaOptions = {

cursor: ["motion", "always"]

};

Example: Require that the cursor not be visible

This constraints object explicitly requires that the cursor not be rendered into the video track.

let displayMediaOptions = {

cursor: {

exact: "none"

}

};

Specifications

Specification

Status

Comment

Initial specification.

Browser compatibility

See also

Screen Capture API

Using the Screen Capture API

Capabilities, constraints, and settings