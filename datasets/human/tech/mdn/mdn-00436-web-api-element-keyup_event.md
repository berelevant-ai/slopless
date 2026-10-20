# Element: keyup event

The keyup event is fired when a key is released.

Bubbles

Yes

Cancelable

Yes

Interface

Event handler property

The keydown and keyup events provide a code indicating which key is pressed, while keypress indicates which character was entered. For example, a lowercase "a" will be reported as 65 by keydown and keyup, but as 97 by keypress. An uppercase "A" is reported as 65 by all events.

Since Firefox 65, the keyup and keydown events are now fired during IME composition, to improve cross-browser compatibility for CJKT users (, also see keydown and keyup events are now fired during IME composition for more useful details). To ignore all keyup events that are part of composition, do something like this (229 is a special value set for a keyCode relating to an event that has been processed by an IME):

eventTarget.addEventListener("keyup", event => {

if (event.isComposing || event.keyCode === 229) {

return;

}

// do something

});

Examples

addEventListener keyup example

This example logs the  value whenever you release a key inside the  element.

<input placeholder="Click here, then press and release a key." size="40">

<p id="log"></p>

const input = document.querySelector('input');

const log = document.getElementById('log');

input.addEventListener('keyup', logKey);

function logKey(e) {

log.textContent += ` ${e.code}`;

}

onkeyup equivalent

input.onkeyup = logKey;

Specifications

Specification

Status

Browser compatibility

See also

input

keydown

keypress

Document keyup event