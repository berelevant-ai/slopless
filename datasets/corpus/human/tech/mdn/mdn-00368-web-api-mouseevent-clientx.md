# MouseEvent.clientX

The clientX read-only property of the  interface provides the horizontal coordinate within the application's  at which the event occurred (as opposed to the coordinate within the page).

For example, clicking on the left edge of the viewport will always result in a mouse event with a clientX value of 0, regardless of whether the page is scrolled horizontally.

Syntax

var x = instanceOfMouseEvent.clientX

Return value

A double floating point value, as redefined by the CSSOM View Module. Originally, this property was defined as a long integer. See the "Browser compatibility" section for details.

Example

This example displays your mouse's coordinates whenever you trigger the  event.

HTML

<p>Move your mouse to see its position.</p>

<p id="screen-log"></p>

JavaScript

let screenLog = document.querySelector('#screen-log');

document.addEventListener('mousemove', logKey);

function logKey(e) {

screenLog.innerText = `

Screen X/Y: ${e.screenX}, ${e.screenY}

Client X/Y: ${e.clientX}, ${e.clientY}`;

}

Result

Specifications

Specification

Status

Comment

Redefines  from long to double.

No change from .

Initial definition.

Browser compatibility

See also

/