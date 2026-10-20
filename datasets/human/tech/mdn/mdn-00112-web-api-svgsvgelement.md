# SVGSVGElement

The SVGSVGElement interface provides access to the properties of  elements, as well as methods to manipulate them. This interface contains also various miscellaneous commonly-used utility methods, such as matrix operations and the ability to control the time of redraw on visual rendering devices.

Properties

This interface also inherits properties from its parent,  and also implements the ones from , , and .

An  corresponding to the  attribute of the given  element.

An  corresponding to the  attribute of the given  element.

An  corresponding to the  attribute of the given  element.

An  corresponding to the  attribute of the given  element.

An  corresponding to the  attribute of the given  element.

An  corresponding to the  attribute of the given  element.

An  containing the position and size of the viewport (implicit or explicit) that corresponds to the given  element. When the browser is actually rendering the content, then the position and size values represent the actual values when rendering. The position and size values are unitless values in the coordinate system of the parent element. If no parent element exists (i.e.,  element represents the root of the document tree), if this SVG document is embedded as part of another document (e.g., via the HTML  element), then the position and size are unitless values in the coordinate system of the parent document. (If the parent uses CSS or XSL layout, then unitless values represent pixel units for the current CSS or XSL viewport.)

A float representing the size of the pixel unit (as defined by CSS2) along the x-axis of the viewport, which represents a unit somewhere in the range of 70dpi to 120dpi, and, on systems that support this, might actually match the characteristics of the target medium. On systems where it is impossible to know the size of a pixel, a suitable default pixel size is provided.

A float representing the size of a pixel unit along the y-axis of the viewport.

User interface (UI) events in DOM Level 2 indicate the screen positions at which the given UI event occurred. When the browser actually knows the physical size of a "screen unit", this float attribute will express that information; otherwise, user agents will provide a suitable default value (such as .28mm).

Corresponding size of a screen pixel along the y-axis of the viewport.

The initial view (i.e., before magnification and panning) of the current innermost SVG document fragment can be either the "standard" view, i.e., based on attributes on the  element such as ) or on a "custom" view (i.e., a hyperlink into a particular  or other element). If the initial view is the "standard" view, then this attribute is false. If the initial view is a "custom" view, then this attribute is true.

An  defining the initial view (i.e., before magnification and panning) of the current innermost SVG document fragment. The meaning depends on the situation: If the initial view was a "standard" view, then:

the values for ,  and  within  will match the values for the corresponding DOM attributes that are on SVGSVGElement directly

the values for  and  within  will be null

If the initial view was a link into a  element, then:

the values for ,  and  within  will correspond to the corresponding attributes for the given  element

the values for  and  within  will be null

If the initial view was a link into another element (i.e., other than a ), then:

the values for ,  and  within  will match the values for the corresponding DOM attributes that are on SVGSVGElement directly for the closest ancestor  element

the values for  within  will be null

the  within  will represent the target of the link

If the initial view was a link into the SVG document fragment using an SVG view specification fragment identifier (i.e., #svgView(…)), then:

the values for , , ,  and  within  will correspond to the values from the SVG view specification fragment identifier

On an outermost  element, this float attribute indicates the current scale factor relative to the initial view to take into account user magnification and panning operations. DOM attributes currentScale and currentTranslate are equivalent to the 2×3 matrix [a b c d e f] = [currentScale 0 0 currentScale currentTranslate.x currentTranslate.y]. If "magnification" is enabled (i.e., zoomAndPan="magnify"), then the effect is as if an extra transformation were placed at the outermost level on the SVG document fragment (i.e., outside the outermost  element).

An  representing the translation factor that takes into account user "magnification" corresponding to an outermost  element. The behavior is undefined for <svg> elements that are not at the outermost level.

Methods

This interface also inherits methods from its parent,  and also implements the ones from , , and .

Takes a time-out value which indicates that redraw shall not occur until:

the corresponding unsuspendRedraw() call has been made, an unsuspendRedrawAll() call has been made, or its timer has timed out.

In environments that do not support interactivity (e.g., print media), then redraw shall not be suspended. Calls to suspendRedraw() and unsuspendRedraw() should, but need not be, made in balanced pairs.

To suspend redraw actions as a collection of SVG DOM changes occur, precede the changes to the SVG DOM with a method call similar to:

const suspendHandleID = suspendRedraw(maxWaitMilliseconds)

and follow the changes with a method call similar to:

unsuspendRedraw(suspendHandleID)

Note that multiple suspendRedraw() calls can be used at once, and that each such method call is treated independently of the other suspendRedraw() method calls.

Cancels a specified suspendRedraw() by providing a unique suspend handle ID that was returned by a previous suspendRedraw() call.

Cancels all currently active suspendRedraw() method calls. This method is most useful at the very end of a set of SVG DOM calls to ensure that all pending suspendRedraw() method calls have been cancelled.

In rendering environments supporting interactivity, forces the user agent to immediately redraw all regions of the viewport that require updating.

Suspends (i.e., pauses) all currently running animations that are defined within the SVG document fragment corresponding to this  element, causing the animation clock corresponding to this document fragment to stand still until it is unpaused.

Unsuspends (i.e., unpauses) currently running animations that are defined within the SVG document fragment, causing the animation clock to continue from the time at which it was suspended.

Returns true if this SVG document fragment is in a paused state.

Returns the current time in seconds relative to the start time for the current SVG document fragment. If getCurrentTime() is called before the document timeline has begun (for example, by script running in a  element before the document's SVGLoad event is dispatched), then 0 is returned.

Adjusts the clock for this SVG document fragment, establishing a new current time. If setCurrentTime() is called before the document timeline has begun (for example, by script running in a  element before the document's SVGLoad event is dispatched), then the value of seconds in the last invocation of the method gives the time that the document will seek to once the document timeline has begun.

Returns a  of graphics elements whose rendered content intersects the supplied rectangle. Each candidate graphics element is to be considered a match only if the same graphics element can be a target of pointer events as defined in  processing.

Returns a  of graphics elements whose rendered content is entirely contained within the supplied rectangle. Each candidate graphics element is to be considered a match only if the same graphics element can be a target of pointer events as defined in  processing.

Returns true if the rendered content of the given element intersects the supplied rectangle. Each candidate graphics element is to be considered a match only if the same graphics element can be a target of pointer events as defined in  processing.

Returns true if the rendered content of the given element is entirely contained within the supplied rectangle. Each candidate graphics element is to be considered a match only if the same graphics element can be a target of pointer events as defined in  processing.

Unselects any selected objects, including any selections of text strings and type-in bars.

Creates an  object outside of any document trees. The object is initialized to 0.

Creates an  object outside of any document trees. The object is initialized to 0 user units.

Creates an  object outside of any document trees. The object is initialized to a value of 0 degrees (unitless).

Creates an  object outside of any document trees. The object is initialized to the point (0,0) in the user coordinate system.

Creates an  object outside of any document trees. The object is initialized to the identity matrix.

Creates an  object outside of any document trees. The object is initialized such that all values are set to 0 user units.

Creates an  object outside of any document trees. The object is initialized to an identity matrix transform (SVG_TRANSFORM_MATRIX).

Creates an  object outside of any document trees. The object is initialized to the given matrix transform (i.e., SVG_TRANSFORM_MATRIX). The values from the parameter matrix are copied, the matrix parameter is not adopted as SVGTransform::matrix.

Searches this SVG document fragment (i.e., the search is restricted to a subset of the document tree) for an Element whose id is given by elementId. If an Element is found, that Element is returned. If no such element exists, returns null. Behavior is not defined if more than one element has this id.

Specifications

Specification

Status

Comment

Replaced the inheritance from  by , removed the implemented interfaces , , , , , , , and  and added implemented interface .

Initial definition

Browser compatibility

See also