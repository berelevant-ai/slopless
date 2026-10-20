# BeforeUnloadEvent

The beforeunload event is fired when the window, the document and its resources are about to be unloaded.

When a non-empty string is assigned to the returnValue Event property, a dialog box appears, asking the users for confirmation to leave the page (see example below). When no value is provided, the event is processed silently. Some implementations only show the dialog box if the frame or any embedded frame receives a user gesture or user interaction. See  for more information.

Bubbles

No

Cancelable

Yes

Target objects

defaultView

Interface

Examples

window.addEventListener("beforeunload", function( event ) {

event.returnValue = "\o/";

});

// is equivalent to

window.addEventListener("beforeunload", function( event ) {

event.preventDefault();

});

WebKit-derived browsers don't follow the spec for the dialog box. An almost-cross-browser working example would be close to the below example.

window.addEventListener("beforeunload", function (e) {

var confirmationMessage = "\o/";

(e || window.event).returnValue = confirmationMessage;     // Gecko + IE

return confirmationMessage;                                /* Safari, Chrome, and other

* WebKit-derived browsers */

});

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility

See also

Unloading Documents — Prompt to unload a document