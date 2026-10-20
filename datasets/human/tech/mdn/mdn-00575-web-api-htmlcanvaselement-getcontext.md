# HTMLCanvasElement.getContext()

The HTMLCanvasElement.getContext() method returns a drawing context on the canvas, or  if the context identifier is not supported, or the canvas has already been set to a different context mode.

Later calls to this method on the same canvas element, with the same contextType argument, will always return the same drawing context instance as was returned the first time the method was invoked. It is not possible to get a different drawing context object on a given canvas element.

Syntax

var ctx = canvas.getContext(contextType);

var ctx = canvas.getContext(contextType, contextAttributes);

Parameters

contextType

Is a  containing the context identifier defining the drawing context associated to the canvas. Possible values are:

"2d", leading to the creation of a  object representing a two-dimensional rendering context.

"webgl" (or "experimental-webgl") which will create a  object representing a three-dimensional rendering context. This context is only available on browsers that implement WebGL version 1 (OpenGL ES 2.0).

"webgl2" which will create a  object representing a three-dimensional rendering context. This context is only available on browsers that implement WebGL version 2 (OpenGL ES 3.0).

"bitmaprenderer" which will create an  which only provides functionality to replace the content of the canvas with a given .

Note: The identifier "experimental-webgl" is used in new implementations of WebGL. These implementations have either not reached test suite conformance, or the graphics drivers on the platform are not yet stable. The Khronos Group certifies WebGL implementations under certain conformance rules.

contextAttributes

You can use several context attributes when creating your rendering context, for example:

const gl = canvas.getContext('webgl', {

antialias: false,

depth: false

});

2d context attributes:

alpha: Boolean that indicates if the canvas contains an alpha channel. If set to false, the browser now knows that the backdrop is always opaque, which can speed up drawing of transparent content and images.

desynchronized: Boolean that hints the user agent to reduce the latency by desynchronizing the canvas paint cycle from the event loop

(Gecko only) willReadFrequently: Boolean that indicates whether or not a lot of read-back operations are planned. This will force the use of a software (instead of hardware accelerated) 2D canvas and can save memory when calling  frequently. This option is only available, if the flag gfx.canvas.willReadFrequently.enable is set to true (which, by default, is only the case for B2G/Firefox OS).

(Blink only) storage: String that indicates which storage is used ("persistent" by default).

WebGL context attributes:

alpha: Boolean that indicates if the canvas contains an alpha buffer.

desynchronized: Boolean that hints the user agent to reduce the latency by desynchronizing the canvas paint cycle from the event loop

antialias: Boolean that indicates whether or not to perform anti-aliasing.

depth: Boolean that indicates that the drawing buffer has a depth buffer of at least 16 bits.

failIfMajorPerformanceCaveat: Boolean that indicates if a context will be created if the system performance is low or if no hardware GPU is available.

powerPreference: A hint to the user agent indicating what configuration of GPU is suitable for the WebGL context. Possible values are:

"default": Let the user agent decide which GPU configuration is most suitable. This is the default value.

"high-performance": Prioritizes rendering performance over power consumption.

"low-power": Prioritizes power saving over rendering performance.

premultipliedAlpha: Boolean that indicates that the page compositor will assume the drawing buffer contains colors with pre-multiplied alpha.

preserveDrawingBuffer: If the value is true the buffers will not be cleared and will preserve their values until cleared or overwritten by the author.

stencil: Boolean that indicates that the drawing buffer has a stencil buffer of at least 8 bits.

Return value

A  which is either a

for "2d",

for "webgl" and "experimental-webgl",

for "webgl2" or

for "bitmaprenderer".

If the contextType doesn't match a possible drawing context, or differs from the first contextType requested, null is returned.

Examples

Given this  element:

<canvas id="canvas" width="300" height="300"></canvas>

You can get a 2d context of the canvas with the following code:

var canvas = document.getElementById('canvas');

var ctx = canvas.getContext('2d');

console.log(ctx); // CanvasRenderingContext2D { ... }

Now you have the 2D rendering context for a canvas and you can draw within it.

Specifications

Specification

Status

Comment

No change since the latest snapshot,

Snapshot of the  containing the initial definition.

Browser compatibility

See also

The interface defining it, .

Available rendering contexts: ,  and  and .