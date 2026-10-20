# XRSession: select event

The WebXR event select is sent to an  when one of the session's input sources has completed a primary action. Examples of comon kinds of primary action are users pressing triggers or buttons, tapping a touchpad, speaking a command, or performing a recognizable gesture when using a video tracking system or handheld controller with an accelerometer.

Bubbles

Yes

Cancelable

No

Interface

Event handler property

For details on how the , , and  events work, and how you should react to them, see .

Examples

The following example uses  to set up a handler for the select event. The handler fetches the pose representing the target ray for tracked-pointer inputs and sends the pose's transform to a function called myHandleSelectWithRay().

xrSession.addEventListener("select", event => {

if (event.inputSource.targetRayMode == "tracked-pointer") {

let targetRayPose = event.frame.getPose(event.inputSource.targetRaySpace,

myRefSpace);

if (targetRayPose) {

myHandleSelectWithRay(targetRayPose.transform);

}

}

});

You can of course also set up a handler for select events by setting the  object's  event handler property to a function that handles the event:

xrSession.onselect = event => {

if (event.inputSource.targetRayMode == "tracked-pointer") {

let targetRayPose = event.frame.getPose(event.inputSource.targetRaySpace,

myRefSpace);

if (targetRayPose) {

myHandleSelectWithRay(targetRayPose.transform);

}

}

};

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility