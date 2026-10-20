# Element: click event

An element receives a click event when a pointing device button (such as a mouse's primary mouse button) is both pressed and released while the pointer is located inside the element.

Bubbles

Yes

Cancelable

Yes

Interface

Event handler property

If the button is pressed on one element and the pointer is moved outside the element before the button is released, the event is fired on the most specific ancestor element that contained both elements.

click fires after both the  and  events have fired, in that order.

Usage notes

The  object passed into the event handler for click has its  property set to the number of times the  was clicked. In other words, detail will be 2 for a double-click, 3 for triple-click, and so forth. This counter resets after a short interval without any clicks occurring; the specifics of how long that interval is may vary from browser to browser and across platforms. The interval is also likely to be affected by user preferences; for example, accessibility options may extend this interval to make it easier to perform multiple clicks with adaptive interfaces.

Internet Explorer

Internet Explorer 8 & 9 suffer from a bug where elements with a computed  of transparent that are overlaid on top of other element(s) won't receive click events. Any click events will be fired at the underlying element(s) instead. See this live example for a demonstration.

Known workarounds for this bug:

For IE9 only:

Set : rgba(0,0,0,0)

Set : 0 and an explicit  other than transparent

For IE8 and IE9: Set filter: alpha(opacity=0); and an explicit  other than transparent

Safari Mobile

Safari Mobile 7.0+ (and likely earlier versions too) suffers from a bug where click events aren't fired on elements that aren't typically interactive (e.g. ) and which also don't have event listeners directly attached to the elements themselves (i.e. event delegation is being used). See this live example for a demonstration. See also Safari's docs on making elements clickable and the definition of "clickable element".

Known workarounds for this bug:

Set : pointer; on the element or any of its ancestors.

Add a dummy onclick="void(0)" attribute to the element or any of its ancestors up to but not including .

Use a typically interactive element (e.g., ) instead of one that isn't typically interactive (e.g., ).

Stop using click event delegation.

Safari Mobile considers the following elements to be typically interactive (and thus they aren't affected by this bug):

(but it must have an href)

(but it must have an href)

(but it must be associated with a form control)

This list is incomplete; you can help MDN by doing further testing/research and expanding it.

Examples

This example displays the number of consecutive clicks on a .

HTML

<button>Click</button>

JavaScript

const button = document.querySelector('button');

button.addEventListener('click', event => {

button.textContent = `Click count: ${event.detail}`;

});

Result

Try making rapid, repeated clicks on the button to increase the click count. If you take a break between clicks, the count will reset.

Specifications

Specification

Status

Browser compatibility

See also

Introduction to events