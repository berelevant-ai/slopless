# InputEvent.dataTransfer

The dataTransfer read-only property of the  interface returns a  object containing information about richtext or plaintext data being added to or removed from editible content.

Syntax

var dataTransfer = inputEvent.dataTransfer

Value

A  object.

Examples

In the following simple example we've set up an event listener on the input event so that when any content is pasted into the contenteditable  element, its HTML source is retrieved via the InputEvent.dataTransfer.getData() method and reported in the paragraph below the input.

Try copying and pasting some of the content provided to see the effects.

<p><span style="font-weight: bold; color: blue">Whoa, bold blue text!</span></p>

<p><span style="font-style: italic; color: red">Exciting: italic red text!</span></p>

<p>Boring normal text ;-(</p>

<hr>

<p contenteditable="true">Go on, try pasting some content into this editable paragraph and see what happens!</p>

<p class="result"></p>

var editable = document.querySelector('p[contenteditable]');

var result = document.querySelector('.result')

var dataTransferObj;

editable.addEventListener('input', (e) => {

result.textContent = e.dataTransfer.getData('text/html');

});

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility