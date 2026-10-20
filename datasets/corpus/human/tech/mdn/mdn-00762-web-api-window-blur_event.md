# Window: blur event

The blur event fires when an element has lost focus.

The opposite of blur is .

Bubbles

No

Cancelable

No

Interface

Event handler property

Sync / Async

Sync

Composed

Yes

Examples

Live example

This example changes the appearance of a document when it loses focus. It uses  to monitor  and blur events.

HTML

<p id="log">Click on this document to give it focus.</p>

CSS

.paused {

background: #ddd;

color: #555;

}

JavaScript

function pause() {

document.body.classList.add('paused');

log.textContent = 'FOCUS LOST!';

}

function play() {

document.body.classList.remove('paused');

log.textContent = 'This document has focus. Click outside the document to lose focus.';

}

const log = document.getElementById('log');

window.addEventListener('blur', pause);

window.addEventListener('focus', play);

Result

Specifications

Specification

Status

Comment

Added info that this event is composed.

Initial definition

Browser compatibility

The value of  varies across browsers while this event is being handled (): IE10 sets it to the element that the focus will move to, while Firefox and Chrome often set it to the body of the document.

See also

Related event:

This event on Element targets:  event