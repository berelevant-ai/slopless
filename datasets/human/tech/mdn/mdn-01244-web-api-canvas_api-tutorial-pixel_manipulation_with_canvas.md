# Pixel manipulation with canvas

Until now we haven't looked at the actual pixels of our canvas. With the ImageData object you can directly read and write a data array to manipulate pixel data. We will also look into how image smoothing (anti-aliasing) can be controlled and how to save images from your canvas.

The ImageData object

The  object represents the underlying pixel data of an area of a canvas object. It contains the following read-only attributes:

width

The width of the image in pixels.

height

The height of the image in pixels.

data

A  representing a one-dimensional array containing the data in the RGBA order, with integer values between 0 and 255 (included).

The data property returns a  which can be accessed to look at the raw pixel data; each pixel is represented by four one-byte values (red, green, blue, and alpha, in that order; that is, "RGBA" format). Each color component is represented by an integer between 0 and 255. Each component is assigned a consecutive index within the array, with the top left pixel's red component being at index 0 within the array. Pixels then proceed from left to right, then downward, throughout the array.

The  contains height × width × 4 bytes of data, with index values ranging from 0 to (height×width×4)-1.

For example, to read the blue component's value from the pixel at column 200, row 50 in the image, you would do the following:

blueComponent = imageData.data[((50 * (imageData.width * 4)) + (200 * 4)) + 2];

If given a set of coordinates (X and Y), you may end up doing something like this:

var xCoord = 50;

var yCoord = 100;

var canvasWidth = 1024;

function getColorIndicesForCoord(x, y, width) {

var red = y * (width * 4) + x * 4;

return [red, red + 1, red + 2, red + 3];

}

var colorIndices = getColorIndicesForCoord(xCoord, yCoord, canvasWidth);

var redIndex = colorIndices[0];

var greenIndex = colorIndices[1];

var blueIndex = colorIndices[2];

var alphaIndex = colorIndices[3];

var redForCoord = imageData.data[redIndex];

var greenForCoord = imageData.data[greenIndex];

var blueForCoord = imageData.data[blueIndex];

var alphaForCoord = imageData.data[alphaIndex];

Or, if ES2015 is appropriate:

const xCoord = 50;

const yCoord = 100;

const canvasWidth = 1024;

const getColorIndicesForCoord = (x, y, width) => {

const red = y * (width * 4) + x * 4;

return [red, red + 1, red + 2, red + 3];

};

const colorIndices = getColorIndicesForCoord(xCoord, yCoord, canvasWidth);

const [redIndex, greenIndex, blueIndex, alphaIndex] = colorIndices;

You may also access the size of the pixel array in bytes by reading the Uint8ClampedArray.length attribute:

var numBytes = imageData.data.length;

Creating an ImageData object

To create a new, blank ImageData object, you should use the  method. There are two versions of the createImageData() method:

var myImageData = ctx.createImageData(width, height);

This creates a new ImageData object with the specified dimensions. All pixels are preset to transparent black (all zeroes i.e rgba(0,0,0,0)).

You can also create a new ImageData object with the same dimensions as the object specified by anotherImageData. The new object's pixels are all preset to transparent black. This does not copy the image data!

var myImageData = ctx.createImageData(anotherImageData);

Getting the pixel data for a context

To obtain an ImageData object containing a copy of the pixel data for a canvas context, you can use the getImageData() method:

var myImageData = ctx.getImageData(left, top, width, height);

This method returns an ImageData object representing the pixel data for the area of the canvas whose corners are represented by the points (left,top), (left+width, top), (left, top+height), and (left+width, top+height). The coordinates are specified in canvas coordinate space units.

Note: Any pixels outside the canvas are returned as transparent black in the resulting ImageData object.

This method is also demonstrated in the article Manipulating video using canvas.

A color picker

In this example we are using the getImageData() method to display the color under the mouse cursor. For this, we need the current position of the mouse with layerX and layerY, then we look up the pixel data on that position in the pixel array that getImageData() provides us. Finally, we use the array data to set a background color and a text in the <div> to display the color. Clicking on the image will do the same operation but remember what the selected color was.

var img = new Image();

img.crossOrigin = 'anonymous';

img.src = './assets/rhino.jpg';

var canvas = document.getElementById('canvas');

var ctx = canvas.getContext('2d');

img.onload = function() {

ctx.drawImage(img, 0, 0);

img.style.display = 'none';

};

var hoveredColor = document.getElementById('hovered-color');

var selectedColor = document.getElementById('selected-color');

function pick(event, destination) {

var x = event.layerX;

var y = event.layerY;

var pixel = ctx.getImageData(x, y, 1, 1);

var data = pixel.data;

const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;

destination.style.background = rgba;

destination.textContent = rgba;

return rgba;

}

canvas.addEventListener('mousemove', function(event) {

pick(event, hoveredColor);

});

canvas.addEventListener('click', function(event) {

pick(event, selectedColor);

});

The code's usage is demonstrated in the following live example:

Also see the source code — HTML, JavaScript.

Painting pixel data into a context

You can use the putImageData() method to paint pixel data into a context:

ctx.putImageData(myImageData, dx, dy);

The dx and dy parameters indicate the device coordinates within the context at which to paint the top left corner of the pixel data you wish to draw.

For example, to paint the entire image represented by myImageData to the top left corner of the context, you can do the following:

ctx.putImageData(myImageData, 0, 0);

Grayscaling and inverting colors

In this example we iterate over all pixels to change their values, then we put the modified pixel array back to the canvas using putImageData(). The invert function subtracts each color from the max value 255. The grayscale function uses the average of red, green and blue. You can also use a weighted average, given by the formula x = 0.299r + 0.587g + 0.114b, for example. See Grayscale on Wikipedia for more information.

var img = new Image();

img.crossOrigin = 'anonymous';

img.src = './assets/rhino.jpg';

var canvas = document.getElementById('canvas');

var ctx = canvas.getContext('2d');

img.onload = function() {

ctx.drawImage(img, 0, 0);

};

var original = function() {

ctx.drawImage(img, 0, 0);

};

var invert = function() {

ctx.drawImage(img, 0, 0);

const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

const data = imageData.data;

for (var i = 0; i < data.length; i += 4) {

data[i]     = 255 - data[i];     // red

data[i + 1] = 255 - data[i + 1]; // green

data[i + 2] = 255 - data[i + 2]; // blue

}

ctx.putImageData(imageData, 0, 0);

};

var grayscale = function() {

ctx.drawImage(img, 0, 0);

const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

const data = imageData.data;

for (var i = 0; i < data.length; i += 4) {

var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;

data[i]     = avg; // red

data[i + 1] = avg; // green

data[i + 2] = avg; // blue

}

ctx.putImageData(imageData, 0, 0);

};

const inputs = document.querySelectorAll('[name=color]');

for (const input of inputs) {

input.addEventListener("change", function(evt) {

switch (evt.target.value) {

case "inverted":

return invert();

case "grayscale":

return grayscale();

default:

return original();

}

});

}

The code's usage is demonstrated in the following live example:

Also see the source code — HTML, JavaScript.

Zooming and anti-aliasing

With the help of the  method, a second canvas and the  property, we are able to zoom into our picture and see the details. A third canvas without  is also drawn onto to be able to have a side by side comparison

We get the position of the mouse and crop an image of 5 pixels left and above to 5 pixels right and below. Then we copy that one over to another canvas and resize the image to the size we want it to. In the zoom canvas we resize a 10×10 pixel crop of the original canvas to 200×200.

zoomctx.drawImage(canvas,

Math.min(Math.max(0, x - 5), img.width - 10),

Math.min(Math.max(0, y - 5), img.height - 10),

10, 10, 0, 0, 200, 200);

Zoom example:

var img = new Image();

img.crossOrigin = 'anonymous';

img.src = './assets/rhino.jpg';

img.onload = function() {

draw(this);

};

function draw(img) {

var canvas = document.getElementById('canvas');

var ctx = canvas.getContext('2d');

ctx.drawImage(img, 0, 0);

var smoothedZoomCtx = document.getElementById('smoothed-zoom').getContext('2d');

smoothedZoomCtx.imageSmoothingEnabled = true;

smoothedZoomCtx.mozImageSmoothingEnabled = true;

smoothedZoomCtx.webkitImageSmoothingEnabled = true;

smoothedZoomCtx.msImageSmoothingEnabled = true;

var pixelatedZoomCtx = document.getElementById('pixelated-zoom').getContext('2d');

pixelatedZoomCtx.imageSmoothingEnabled = false;

pixelatedZoomCtx.mozImageSmoothingEnabled = false;

pixelatedZoomCtx.webkitImageSmoothingEnabled = false;

pixelatedZoomCtx.msImageSmoothingEnabled = false;

var zoom = function(ctx, x, y) {

ctx.drawImage(canvas,

Math.min(Math.max(0, x - 5), img.width - 10),

Math.min(Math.max(0, y - 5), img.height - 10),

10, 10,

0, 0,

200, 200);

};

canvas.addEventListener('mousemove', function(event) {

const x = event.layerX;

const y = event.layerY;

zoom(smoothedZoomCtx, x, y);

zoom(pixelatedZoomCtx, x, y);

});

}

The code's usage is demonstrated in the following live example:

Also see the source code — HTML, JavaScript.

Saving images

The  provides a toDataURL() method, which is useful when saving images. It returns a data URI containing a representation of the image in the format specified by the type parameter (defaults to PNG). The returned image is in a resolution of 96 dpi.

Note: Be aware that if the canvas contains any pixels that were obtained from another  without using CORS, the canvas is tainted and its contents can no longer be read and saved. See

Default setting. Creates a PNG image.

Creates a JPG image. Optionally, you can provide a quality in the range from 0 to 1, with one being the best quality and with 0 almost not recognizable but small in file size.

Once you have generated a data URI from you canvas, you are able to use it as the source of any  or put it into a hyper link with a download attribute to save it to disc, for example.

You can also create a  from the canvas.

Creates a Blob object representing the image contained in the canvas.

See also

Manipulating video using canvas

Canvas, images and pixels – by Christian Heilmann