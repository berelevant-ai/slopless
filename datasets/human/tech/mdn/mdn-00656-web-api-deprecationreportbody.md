# DeprecationReportBody

The DeprecationReportBody interface of the Reporting API represents the body of a deprecation report (the return value of its  property).

A deprecation report is generated when a deprecated feature (e.g. a deprecated API method) is used on a document being observed by a .

Properties

id

A string representing the deprecated feature that generated the report, for example NavigatorGetUserMedia. This can be used to group reports by deprecated feature.

anticipatedRemoval

A  object (rendered as a string) representing the date when the feature is expected to be removed from the current browser. If the date is not known, this property will return null.

message

A string containing a human-readable description of the deprecation, including information such as what newer feature has superseded it, if any. This typically matches the message a browser will display in its DevTools console when a deprecated feature is used, if one is available.

sourceFile

A string containing the path to the source file where the deprecated feature was used, if known, or null otherwise.

lineNumber

A number representing the line in the source file in which the deprecated feature was used, if known, or null otherwise.

columnNumber

A number representing the column in the source file in which the deprecated feature was used, if known, or null otherwise.

Examples

In our deprecation_report.html example, we create a simple reporting observer to observe usage of deprecated features on our web page:

let options = {

types: ['deprecation'],

buffered: true

}

let observer = new ReportingObserver(function(reports, observer) {

reportBtn.onclick = () => displayReports(reports);

}, options);

We then tell it to start observing reports using ; this tells the observer to start collecting reports in its report queue, and runs the callback function specified inside the constructor:

observer.observe();

Because of the event handler we set up inside the ReportingObserver() constructor, we can now click the button to display the report details.

The report details are displayed via the displayReports() fuction, which takes the observer callback's reports parameter as its parameter:

function displayReports(reports) {

const outputElem = document.querySelector('.output');

const list = document.createElement('ul');

outputElem.appendChild(list);

for(let i = 0; i < reports.length; i++) {

let listItem = document.createElement('li');

let textNode = document.createTextNode('Report ' + (i + 1) + ', type: ' + reports[i].type);

listItem.appendChild(textNode);

let innerList = document.createElement('ul');

listItem.appendChild(innerList);

list.appendChild(listItem);

for (let key in reports[i].body) {

let innerListItem = document.createElement('li');

let keyValue = reports[i].body[key];

innerListItem.textContent = key + ': ' + keyValue;

innerList.appendChild(innerListItem);

}

}

}

The reports parameter contains an array of all the reports in the observer's report queue. We loop over each report using a basic for loop, then iterate over each entry of in the report's body (a DeprecationReportBody instance) using a for...in structure, displaying each key/value pair inside a list item.

Specifications

Specification

Status

Comment

Browser compatibility

See also

Reporting API