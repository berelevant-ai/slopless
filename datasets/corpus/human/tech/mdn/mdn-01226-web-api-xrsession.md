# XRSession

The WebXR Device API's XRSession interface represents an ongoing XR session, providing methods and properties used to interact with and control the session. To open a WebXR session, use the  interface's  method.

With XRSession methods, you can poll the viewer's position and orientation (the ), gather information about the user's environment, and present imagery to the user. XRSession supports both inline and immersive virtual and augmented reality modes.

Properties

In addition to the properties listed below, XRSession inherits properties from its parent interface, .

Returns this session's blend mode which denotes how much of the real-world environment is visible through the XR device and how the device will blend the device imagery with it.

Note: environmentBlendMode() is part of the WebXR Augmented Reality Module, which has not been completed.

Returns a list of this session's s, each representing an input device used to control the camera and/or scene.

An  object which contains options affecting how the imagery is rendered. This includes things such as the near and far clipping planes (distances defining how close and how far away objects can be and still get rendered), as well as field of view information.

A  whose value is one of those found in the  enumerated type, indicating whether or not the session's imagery is visible to the user, and if so, if it's being visible but not currently the target for user events.

Methods

XRSession provides the following methods in addition to those inherited from its parent interface, .

Removes a callback from the animation frame painting callback from XRSession's set of animation frame rendering callbacks, given the identifying handle returned by a previous call to .

Ends the WebXR session. Returns a  which resolves when the session has been shut down.

Schedules the specified method to be called the next time the  is working on rendering an animation frame for the WebXR device. Returns an integer value which can be used to identify the request for the purposes of canceling the callback using cancelAnimationFrame(). This method is comparable to the  method.

Requests that a new  of the specified type be created. Returns a promise which resolves with the XRReferenceSpace or  which was requested, or throws a NotSupportedError if the requested space type isn't supported by the device.

Updates the properties of the session's render state to match the values specified in the specified  dictionary. Any properties not included in the given dictionary are left unchanged from their current values.

Events

The following events are delivered to XRSession objects.

Event

Description

Sent to the XRSession object after the WebXR session has ended and all hardware-related functions have completed. The event is represented by an object of type .

Also available through the  event handler property.

An event of type  sent to the XRSession when the list of active XR input sources has changed.

Also available through the  event handler property.

An event of type  which is sent to the session when one of the session's input sources has successfully completed a primary action. This generally corresponds to the user pressing a trigger, touchpad, or button, speaks a command, or performs a recognizable gesture. The select event is sent after the selectstart event is sent and immediately before the selectend event is sent. If select is not sent, then the select action was aborted before being completed.

Also available through the  event handler property.

An event of type  which gets sent to the session object when one of its input devices finishes its primary action or gets disconnected while in the process of handling a primary action. For example: for button or trigger actions, this means the button has been released; for spoken commands, it means the user has finished speaking. This is the last of the three select* events to be sent.

Also available through the  event handler property.

An event of type XRInputSourceEvent which is sent to the session object when one of its input devices is first engaged by the user in such a way as to cause the primary action to begin. This is the first of the session* event to be sent.

Also available through the  event handler property.

An  sent to indicate that a primary squeeze action has successfully completed. This indicates that the device being squeezed has been released, and may represent dropping a grabbed object, for example. It is sent immediately before the squeezeend event is sent to indicate that the squeeze action is over.

Also available through the  event handler property.

An  sent to the XRSession when the primary squeeze action ends, whether or not the action was successful.

Also available using the  event handler property.

An event of type  which is sent to the XRSession when the user initially squeezes a squeezable controller. This may be, for example, a trigger which is used to represent grabbing objects, or might represent actual squeezing when wearing a haptic glove.

Also available through the  event handler property.

An  which is sent to the session when its visibility state as indicated by the  changes.

Also available through the  event handler property.

Example

This example establishes a new XRSession in inline mode so that it can be displayed within an HTML element, avoiding the need for a dedicated AR or VR viewing device such as a headset.

const XR = navigator.xr;

if (XR) {

XR.requestSession("inline").then((xrSession) => {

xrSession.requestReferenceSpace("local").then((xrReferenceSpace) => {

xrSession.requestAnimationFrame((time, xrFrame) => {

let viewer = xrFrame.getViewerPose(xrReferenceSpace);

gl.bindFramebuffer(xrWebGLLayer.framebuffer);

for (xrView of viewer.views) {

let xrViewport = xrWebGLLayer.getViewport(xrView);

gl.viewport(xrViewport.x, xrViewport.y,

xrViewport.width, xrViewport.height);

}

});

});

});

} else {

/* WebXR is not available */

}

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility