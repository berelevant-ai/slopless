# BeforeInstallPromptEvent

The BeforeInstallPromptEvent is fired at the  handler before a user is prompted to "install" a web site to a home screen on mobile.

This interface inherits from the  interface.

Constructor

Creates a new BeforeInstallPromptEvent.

Properties

Inherits properties from its parent, .

Returns an array of  items containing the platforms on which the event was dispatched. This is provided for user agents that want to present a choice of versions to the user such as, for example, "web" or "play" which would allow the user to chose between a web version or an Android version.

Returns a  that resolves to a  containing either "accepted" or "dismissed".

Methods

Allows a developer to show the install prompt at a time of their own choosing. This method returns a  .

Example

window.addEventListener("beforeinstallprompt", function(e) {

// log the platforms provided as options in an install prompt

console.log(e.platforms); // e.g., ["web", "android", "windows"]

e.userChoice.then(function(choiceResult) {

console.log(choiceResult.outcome); // either "accepted" or "dismissed"

}, handleError);

});

Browser compatibility