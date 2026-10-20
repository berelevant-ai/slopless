# GlobalEventHandlers.onkeyup

The onkeyup property of the  mixin is an  that processes  events.

The keyup event fires when the user releases a key that was previously pressed.

Syntax

target.onkeyup = functionRef;

Value

functionRef is a function name or a function expression. The function receives a  object as its sole argument.

Example

This example logs the  value whenever you release a key inside the  element.

HTML

<input>

<p id="log"></p>

JavaScript

const input = document.querySelector('input');

const log = document.getElementById('log');

input.onkeyup = logKey;

function logKey(e) {

log.textContent += ` ${e.code}`;

}

Result

Specifications

Specification

Status

Comment

Browser compatibility

Compatibility notes

Since Firefox 65, the keyup and keydown events are now fired during IME composition, to improve cross-browser compatibility for CJKT users (, also see keydown and keyup events are now fired during IME composition for more useful details). To ignore all keyup events that are part of composition, do something like this (229 is a special value set for a keyCode relating to an even that has been processed by an IME):

eventTarget.addEventListener("keyup", event => {

if (event.isComposing || event.keyCode === 229) {

return;

}

// do something

});

See also

event

Related event handlers