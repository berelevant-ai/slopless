# Document: scroll event

The scroll event fires when the document view or an element has been scrolled.

Bubbles

Yes

Cancelable

No

Interface

Event handler property

Note: In iOS UIWebViews, scroll events are not fired while scrolling is taking place; they are only fired after the scrolling has completed. See Bootstrap issue #16202. Safari and WKWebViews are not affected by this bug.

Examples

Scroll event throttling

Since scroll events can fire at a high rate, the event handler shouldn't execute computationally expensive operations such as DOM modifications. Instead, it is recommended to throttle the event using , , or a , as follows.

Note, however, that input events and animation frames are fired at about the same rate, and therefore the optimization below is often unnecessary. This example optimizes thescroll event for requestAnimationFrame.

// Reference: http://www.html5rocks.com/en/tutorials/speed/animations/

let last_known_scroll_position = 0;

let ticking = false;

function doSomething(scroll_pos) {

// Do something with the scroll position

}

document.addEventListener('scroll', function(e) {

last_known_scroll_position = window.scrollY;

if (!ticking) {

window.requestAnimationFrame(function() {

doSomething(last_known_scroll_position);

ticking = false;

});

ticking = true;

}

});

See more, similar examples on the resize event page.

Specifications

Specification

Status

Browser compatibility

See also

Element: scroll event