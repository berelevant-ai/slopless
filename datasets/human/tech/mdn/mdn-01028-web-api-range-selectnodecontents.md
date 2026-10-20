# Range.selectNodeContents()

The Range.selectNodeContents() method sets the  to contain the contents of a .

The parent Node of the start and end of the Range will be the reference node. The startOffset is 0, and the endOffset is the number of child Nodes or number of characters contained in the reference node.

Syntax

range.selectNodeContents(referenceNode);

Parameters

referenceNode

The  whose contents will be selected within a .

Example

range = document.createRange();

referenceNode = document.getElementsByTagName("div")[0];

range.selectNodeContents(referenceNode);

Live sample

This example lets the user select and deselect a paragraph with buttons. , Range.selectNodeContents(), and  are used to select the content.  and  are used to deselect it.

HTML

<p id="p"><b>Use the buttons below</b> to select or deselect the contents of this paragraph.</p>

<button id="select-button">Select paragraph</button>

<button id="deselect-button">Deselect paragraph</button>

JavaScript

const p = document.getElementById('p');

const selectButton = document.getElementById('select-button');

const deselectButton = document.getElementById('deselect-button');

selectButton.addEventListener('click', e => {

// Clear any current selection

const selection = window.getSelection();

selection.removeAllRanges();

// Select paragraph

const range = document.createRange();

range.selectNodeContents(p);

selection.addRange(range);

});

deselectButton.addEventListener('click', e => {

const selection = window.getSelection();

selection.removeAllRanges();

});

Result

Specifications

Specification

Status

Comment

No change.

Initial specification.

Browser compatibility

See also

The DOM interfaces index