# PaintWorklet

The PaintWorklet interface of the  programmatically generates an image where a CSS property expects a file. Access this interface through .

Properties

Returns the current device's ratio of physical pixels to logical pixels.

Event handlers

None.

Methods

This interface inherits methods from .

Registers a class programmatically generate an image where a CSS property expects a file.

The addModule() method, inhertied from the  interface loads the module in the given JavaScript file and adds it to the current PaintWorklet.

Examples

The following three examples go together to show creating, loading, and using a PaintWorklet.

Create a PaintWorklet

The following shows an example worklet module. This should be in a separate js file. Note that registerPaint() is called without a reference to PaintWorklet.

class CheckerboardPainter {

paint(ctx, geom, properties) {

// Use `ctx` as if it was a normal canvas

const colors = ['red', 'green', 'blue'];

const size = 32;

for(let y = 0; y < geom.height/size; y++) {

for(let x = 0; x < geom.width/size; x++) {

const color = colors[(x + y) % colors.length];

ctx.beginPath();

ctx.fillStyle = color;

ctx.rect(x * size, y * size, size, size);

ctx.fill();

}

}

}

}

// Register our class under a specific name

registerPaint('checkerboard', CheckerboardPainter);

Load a PaintWorklet

The following example demonstrates loading the above worklet from its js file and does so by feature detection.

<script>

if ('paintWorklet' in CSS) {

CSS.paintWorklet.addModule('checkerboard.js');

}

</script>

Use a PaintWorklet

This example shows how to use a PaintWorklet in a stylesheet, including the simplest way to provide a fallback if PaintWorklet isn't supported.

<style>

textarea {

background-image: url(checkerboard);

background-image: paint(checkerboard);

}

</style>

<textarea></textarea>

You can also use the  at-rule.

@supports (background: paint(id)) {

background-image: paint(checkerboard);

}

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

See also

CSS Painting API

Houdini APIs

Houdini overview