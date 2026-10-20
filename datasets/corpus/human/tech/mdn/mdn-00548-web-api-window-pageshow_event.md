# Window: pageshow event

The pageshow event is sent to a  when the browser displays the window's document due to navigation. This includes:

Initially loading the page

Navigating to the page from another page in the same window or tab

Restoring a frozen page on mobile OSes

Returning to the page using the browser's forward or back buttons

During the initial page load, the pageshow event fires after the  event.

Bubbles

No

Cancelable

No

Interface

Event handler property

Examples

This example sets up event handlers for events listed in the array events. The handler, eventLogger(), logs the type of event that occurred to the console, and includes the value of the  flag on pageshow and pagehide events.

JavaScript

const events = [

"pagehide", "pageshow",

"unload", "load"

];

const eventLogger = event => {

switch (event.type) {

case "pagehide":

case "pageshow":

let isPersisted = event.persisted ? "persisted" : "not persisted";

console.log('Event:', event.type, '-', isPersisted);

break;

default:

console.log('Event:', event.type);

break;

}

};

events.forEach(eventName =>

window.addEventListener(eventName, eventLogger)

);

HTML

<p>Open the console and watch the output as you navigate to and from

this page. Try loading new pages into this tab, then navigating forward

and backward through history, noting the events’ output to the log.</p>

Results

Specifications

Specification

Status

Comment

Initial specification.

Browser compatibility

See also