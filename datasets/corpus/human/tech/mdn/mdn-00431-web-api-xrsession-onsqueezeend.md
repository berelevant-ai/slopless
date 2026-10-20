# XRSession.onsqueezeend

The  interface's onsqueezeend event handler property is a function to be invokedn when the  event sent to an XRSession when a primary squeeze action ends. This is sent immediately after the  event, which announces the successful completion of the squeeze action. The squeezeend event handler is where you handle closing out a squeeze action whether it was successfully completed or not.

To learn more about how the sequence of squeeze events works, see .

Syntax

xrSession.onsqueezeend = squeezeendHandlerFunction;

Value

A function to be invoked whenever the  receives a  event, indicating the ending of a primary squeeze action.

Examples

This snippet of code adds a simple handler for the squeezeend event, which responds only to events on the user's dominant hand. In response to the end of the squeeze operation, this code looks to see if there is an object currently being held by the user by checking to see if the variable user.heldObject contains a reference to an object representing the held item.

If heldObject has an object reference, that object is passed to a function called cancelObjectDrag(), which would be written to return the object to its original position. This takes care of the situation in which the drag is aborted or canceled.

xrSession.onsqueezeend = event => {

if (event.inputSource.handedness == user.handedness) {

let targetRayPose = event.frame.getPose(event.inputSource.targetRaySpace, myRefSpace;

if (user.heldObject) {

cancelObjectDrag(user.heldObject);

}

}

};

This code presumes that if the user actually intentionally completed the drag, user.heldObject will be null here. That's because (in this example, at least) the handler for the  event has already dropped the object into its new location and then cleared the value of heldObject to indicate that the user is no longer holding anything.

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

See also

Inputs and input sources

The other onsqueeze* handlers:  and

The , , and  events