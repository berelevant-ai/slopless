# notifications.onButtonClicked

Fired when the user clicks one of the notification's buttons.

Syntax

browser.notifications.onButtonClicked.addListener(listener)

browser.notifications.onButtonClicked.removeListener(listener)

browser.notifications.onButtonClicked.hasListener(listener)

Events have three functions:

addListener(callback)

Adds a listener to this event.

removeListener(listener)

Stop listening to this event. The listener argument is the listener to remove.

hasListener(listener)

Check whether listener is registered for this event. Returns true if it is listening, false otherwise.

addListener syntax

Parameters

callback

Function that will be called when this event occurs. The function will be passed the following arguments:

notificationId

string. ID of the notification whose button was clicked.

buttonIndex

integer. The zero-based index of the button that was clicked.

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

Acknowledgements

This API is based on Chromium's chrome.notifications API.

Microsoft Edge compatibility data is supplied by Microsoft Corporation and is included here under the Creative Commons Attribution 3.0 United States License.