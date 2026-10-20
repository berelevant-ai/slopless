# alarms.get()

Gets an alarm, given its name.

This is an asynchronous function that returns a Promise.

Syntax

var getAlarm = browser.alarms.get(

name                   // optional string

)

Parameters

name

string. The name of the alarm to get. If you don't supply this, the empty string "" will be used.

Return value

A Promise that will be fulfilled with an  object. This represents the alarm whose name matches name. If no alarms match, this will be undefined.

Examples

function gotAlarm(alarm) {

if (alarm) {

console.log(alarm.name);

}

}

var getAlarm = browser.alarms.get("my-periodic-alarm");

getAlarm.then(gotAlarm);

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

Acknowledgements

This API is based on Chromium's chrome.alarms API.

Microsoft Edge compatibility data is supplied by Microsoft Corporation and is included here under the Creative Commons Attribution 3.0 United States License.