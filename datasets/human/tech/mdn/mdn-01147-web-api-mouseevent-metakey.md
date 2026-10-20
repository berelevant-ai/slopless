# MouseEvent.metaKey

The MouseEvent.metaKey read-only property is a  that indicates whether the meta key was pressed or not when a given mouse event occurs.

Be aware that many operating systems bind special functionality to the meta key, so this property may be false even when the key is actually pressed. On Windows, for example, this key may open the Start menu.

Note: On Macintosh keyboards, this key is the command key (⌘). On Windows keyboards, this key is the Windows key (⊞).

Syntax

var metaKeyPressed = instanceOfMouseEvent.metaKey

Return value

A , where true indicates that the key is pressed, and false indicates that the key is not pressed.

Example

This example logs the metaKey property when you trigger a  event.

HTML

<p>Click anywhere to test the <code>metaKey</code> property.</p>

<p id="log"></p>

JavaScript

let log = document.querySelector('#log');

document.addEventListener('click', logKey);

function logKey(e) {

log.textContent = `The meta key is pressed: ${e.metaKey}`;

}

Result

Specifications

Specification

Status

Comment

No change from .

Initial definition.

Browser compatibility

See also