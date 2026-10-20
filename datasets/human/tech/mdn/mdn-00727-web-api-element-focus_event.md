# Element: focus event

The focus event fires when an element has received focus. The main difference between this event and  is that focusin bubbles while focus does not.

The opposite of focus is .

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

Simple example

HTML

<form id="form">

<input type="text" placeholder="text input">

<input type="password" placeholder="password">

</form>

JavaScript

const password = document.querySelector('input[type="password"]');

password.addEventListener('focus', (event) => {

event.target.style.background = 'pink';

});

password.addEventListener('blur', (event) => {

event.target.style.background = '';

});

Result

Event delegation

There are two ways of implementing event delegation for this event: by using the  event, or by setting the useCapture parameter of  to true.

HTML

<form id="form">

<input type="text" placeholder="text input">

<input type="password" placeholder="password">

</form>

JavaScript

const form = document.getElementById('form');

form.addEventListener('focus', (event) => {

event.target.style.background = 'pink';

}, true);

form.addEventListener('blur', (event) => {

event.target.style.background = '';

}, true);

Result

Specifications

Specification

Status

Comment

Added info that this event is composed.

Initial definition

Browser compatibility

See also

Related events: , ,

This event on Window targets:  event