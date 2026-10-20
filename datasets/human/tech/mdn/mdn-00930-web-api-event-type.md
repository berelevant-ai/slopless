# Event.type

The type read-only property of the  interface returns a string containing the event's type. It is set when the event is constructed and is the name commonly used to refer to the specific event, such as click, load, or error.

For a list of available event types, see the event reference.

Syntax

let eventType = event.type;

Value

A  containing the type of .

Example

This example logs the event type whenever you press a keyboard key or click a mouse button.

HTML

<p>Press any key or click the mouse to get the event type.</p>

<p id="log"></p>

JavaScript

function getEventType(event) {

const log = document.getElementById('log');

log.innerText = event.type + '\n' + log.innerText;

}

// Keyboard events

document.addEventListener('keydown', getEventType, false);  // first

document.addEventListener('keypress', getEventType, false); // second

document.addEventListener('keyup', getEventType, false);    // third

// Mouse events

document.addEventListener('mousedown', getEventType, false); // first

document.addEventListener('mouseup', getEventType, false);   // second

document.addEventListener('click', getEventType, false);     // third

Result

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

See also