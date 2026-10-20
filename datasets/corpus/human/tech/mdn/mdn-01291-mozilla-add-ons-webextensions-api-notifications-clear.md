# notifications.clear()

Clears a notification, given its ID.

This is an asynchronous function that returns a Promise.

Syntax

var clearing = browser.notifications.clear(

id                            // string

)

Parameters

id

string. The ID of the notification to clear. This is the same as the ID passed into 's callback.

Return value

A Promise that will be fulfilled with a boolean: true if the notification was cleared, or false if it was not (for example, because the notification referenced by id did not exist).

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

Examples

This example shows a notification when the user clicks a browser action, unless the notification was already being shown, in which case it clears the notification:

var myNotification = "my-notification";

function toggleAlarm(all) {

if (myNotification in all) {

browser.notifications.clear(myNotification);

} else {

browser.notifications.create(myNotification, {

"type": "basic",

"iconUrl": browser.runtime.getURL("icons/cake-48.png"),

"title": "Am imposing title",

"message": "Some interesting content"

});

}

}

function handleClick() {

var gettingAll = browser.notifications.getAll();

gettingAll.then(toggleAlarm);

}

browser.browserAction.onClicked.addListener(handleClick);

Acknowledgements

This API is based on Chromium's chrome.notifications API.

Microsoft Edge compatibility data is supplied by Microsoft Corporation and is included here under the Creative Commons Attribution 3.0 United States License.