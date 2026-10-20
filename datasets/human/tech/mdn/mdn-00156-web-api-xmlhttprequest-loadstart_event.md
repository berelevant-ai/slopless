# XMLHttpRequest: loadstart event

The loadstart event is fired when a request has started to load data.

Bubbles

No

Cancelable

No

Interface

Event handler property

Examples

Live example

HTML

<div class="controls">

<input class="xhr success" type="button" name="xhr" value="Click to start XHR (success)" />

<input class="xhr error" type="button" name="xhr" value="Click to start XHR (error)" />

<input class="xhr abort" type="button" name="xhr" value="Click to start XHR (abort)" />

</div>

<textarea readonly class="event-log"></textarea>

CSS

.event-log {

width: 25rem;

height: 4rem;

border: 1px solid black;

margin: .5rem;

padding: .2rem;

}

input {

width: 11rem;

margin: .5rem;

}

JS

const xhrButtonSuccess = document.querySelector('.xhr.success');

const xhrButtonError = document.querySelector('.xhr.error');

const xhrButtonAbort = document.querySelector('.xhr.abort');

const log = document.querySelector('.event-log');

function handleEvent(e) {

log.textContent = log.textContent + `${e.type}: ${e.loaded} bytes transferred\n`;

}

function addListeners(xhr) {

xhr.addEventListener('loadstart', handleEvent);

xhr.addEventListener('load', handleEvent);

xhr.addEventListener('loadend', handleEvent);

xhr.addEventListener('progress', handleEvent);

xhr.addEventListener('error', handleEvent);

xhr.addEventListener('abort', handleEvent);

}

function runXHR(url) {

log.textContent = '';

const xhr = new XMLHttpRequest();

addListeners(xhr);

xhr.open("GET", url);

xhr.send();

return xhr;

}

xhrButtonSuccess.addEventListener('click', () => {

runXHR('https://mdn.mozillademos.org/files/16553/DgsZYJNXcAIPwzy.jpg');

});

xhrButtonError.addEventListener('click', () => {

runXHR('https://somewhere.org/i-dont-exist');

});

xhrButtonAbort.addEventListener('click', () => {

runXHR('https://mdn.mozillademos.org/files/16553/DgsZYJNXcAIPwzy.jpg').abort();

});

Result

Specifications

Specification

Status

Comment

Browser compatibility

See also

Related events: , , , ,

Monitoring progress