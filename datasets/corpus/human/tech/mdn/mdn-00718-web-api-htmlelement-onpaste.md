# HTMLElement.onpaste

The HTMLElement.onpaste property of the  interface is an  that processes  events.

The paste event fires when the user attempts to paste text.

Note that there is currently no DOM-only way to obtain the text being pasted; you'll have to use an  to get that information.

Syntax

target.onpaste = functionRef;

Value

functionRef is a function name or a function expression. The function receives a  object as its sole argument.

Example

This example logs every copy and paste attempt to the .

HTML

<h3>Play with this text area:</h3>

<textarea id="editor" rows="3">Try copying and pasting text into this field!</textarea>

<h3>Log:</h3>

<p id="log"></p>

JavaScript

function logCopy(event) {

log.innerText = 'Copied!\n' + log.innerText;

}

function logPaste(event) {

log.innerText = 'Pasted!\n' + log.innerText;

}

const editor = document.getElementById('editor');

const log = document.getElementById('log');

editor.oncopy = logCopy;

editor.onpaste = logPaste;

Result

Specifications

WHATWG Standard

Browser compatibility

Since Firefox 13, the preference dom.event.clipboardevents.enabled controls this feature. It defaults to true but can be disabled.

See also

Clipboard API event

Related event handlers