# VisualViewport

The VisualViewport interface of the Visual Viewport API represents the visual viewport for a given window. For a page containing iframes, each iframe, as well as the containing page, will have a unique window object. Each window on a page will have a unique VisualViewport representing the properties associated with that window.

You can get a window's visual viewport using .

Note: Only the top-level window has a visual viewport that's distinct from the layout viewport. Therefore, it's generally only the VisualViewport object of the top-level window that's useful. For an , visual viewport metrics like  always correspond to layout viewport metrics like .

Properties

VisualViewport also inherits properties from its parent, .

Returns the offset of the left edge of the visual viewport from the left edge of the layout viewport in CSS pixels.

Returns the offset of the top edge of the visual viewport from the top edge of the layout viewport in CSS pixels.

Returns the x coordinate of the visual viewport relative to the initial containing block origin of the top edge in CSS pixels.

Returns the y coordinate of the visual viewport relative to the initial containing block origin of the top edge in CSS pixels.

Returns the width of the visual viewport in CSS pixels.

Returns the height of the visual viewport in CSS pixels.

Returns the pinch-zoom scaling factor applied to the visual viewport.

Events

Listen to these events using addEventListener() or by assigning an event listener to the relevant oneventname property of this interface.

resize

Fired when the visual viewport is resized.

Also available via the  property.

scroll

Fired when the visual viewport is scrolled.

Also available via the  property.

Examples

Hiding an overlaid box on zoom

This example, taken from the Visual Viewport README, shows how to write a simple bit of code that will hide an overlaid box (which might contain an advert, say) when the user zooms in. This is a nice way to improve the user experience when zooming in on pages. A live sample  is also available.

var bottomBar = document.getElementById('bottombar');

var viewport = window.visualViewport;

function resizeHandler() {

if (viewport.scale > 1.3)

bottomBar.style.display = "none";

else

bottomBar.style.display = "block";

}

window.visualViewport.addEventListener('resize', resizeHandler);

Simulating position: device-fixed

This example, also taken from the Visual Viewport README, shows how to use this API to simulate position: device-fixed, which fixes elements to the visual viewport. A live sample is also available.

var bottomBar = document.getElementById('bottombar');

var viewport = window.visualViewport;

function viewportHandler() {

var layoutViewport = document.getElementById('layoutViewport');

// Since the bar is position: fixed we need to offset it by the visual

// viewport's offset from the layout viewport origin.

var offsetLeft = viewport.offsetLeft;

var offsetTop = viewport.height

- layoutViewport.getBoundingClientRect().height

+ viewport.offsetTop;

// You could also do this by setting style.left and style.top if you

// use width: 100% instead.

bottomBar.style.transform = 'translate(' +

offsetLeft + 'px,' +

offsetTop + 'px) ' +

'scale(' + 1/viewport.scale + ')'

}

window.visualViewport.addEventListener('scroll', viewportHandler);

window.visualViewport.addEventListener('resize', viewportHandler);

Note: This technique should be used with care; emulating position: device-fixed in this way can result in the fixed element flickering during scrolling.

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

See also

Web Viewports Explainer — useful explanation of web viewports concepts, including the difference between visual viewport and layout viewport.