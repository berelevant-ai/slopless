# @viewport

Note: See https://github.com/w3c/csswg-drafts/issues/4766 for discussion around @viewport's removal from the standards track.

The @viewport CSS at-rule lets you configure the  through which the document is viewed. It's primarily used for mobile devices, but is also used by desktop browsers that support features like "snap to edge" (such as Microsoft Edge).

Lengths specified as percentages are calculated relative to the initial viewport, which is the viewport before any user agent or authored styles have had an opportunity to adjust the viewport. This is typically based on the size of the window on desktop browsers that aren't in full screen mode.

On mobile devices (or desktop devices that are in full screen mode), the initial viewport is usually the portion of a device's screen that is available for application use. This may be either the full screen or the full screen area minus areas controlled by the operating system (such as a taskbar) or the application-available screen area (either the full screen or the screen minus any areas owned by the operating system or other applications).

@viewport {

width: 100vw; /*Sets the width of the actual viewport to the device width*/

}

Note: The use of <meta name="viewport"> tag overrides @viewport

Syntax

The at-rule contains a set of nested s in a CSS block that is delimited by curly braces.

A zoom factor of 1.0 or 100% corresponds to no zooming. Larger values zoom in. Smaller values zoom out.

Descriptors

Browser support for @viewport is weak at this time, with support being largely available in Internet Explorer and Edge. Even in those browsers, only a small number of descriptors are available. Browsers will ignore @viewport if they don't support it, and will ignore any descriptors that they don't recognize.

min-width

Used in the determination of the width of the viewport when the document is first displayed.

max-width

Used in the determination of the width of the viewport when the document is first displayed.

width

A shorthand descriptor for setting both min-width and max-width.

min-height

Used in the determination of the height of the viewport when the document is first displayed.

max-height

Used in the determination of the height of the viewport when the document is first displayed.

height

A shorthand descriptor for setting both min-height and max-height.

zoom

Sets the initial zoom factor.

min-zoom

Sets the minimum zoom factor.

max-zoom

Sets the maximum zoom factor.

user-zoom

Controls whether or not the user should be able to change the zoom factor.

orientation

Controls the document's orientation.

Controls the display of the document on non-rectangular displays.

Formal syntax

Examples

Setting viewport size, zoom, and orientation

@viewport {

min-width: 640px;

max-width: 800px;

}

@viewport {

zoom: 0.75;

min-zoom: 0.5;

max-zoom: 0.9;

}

@viewport {

orientation: landscape;

}

Specifications

Specification

Status

Comment

Defined the  descriptor.

Initial definition

Browser compatibility

See also

, specifically <meta name="viewport">

Using the viewport meta tag to control layout on mobile browsers