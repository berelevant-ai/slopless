# Body.body

The body read-only property of the  mixin is a simple getter used to expose a  of the body contents.

Syntax

var stream = response.body;

Value

A .

Example

In our simple stream pump example we fetch an image, expose the response's stream using response.body, create a reader using , then enqueue that stream's chunks into a second, custom readable stream — effectively creating an identical copy of the image.

const image = document.getElementById('target');

// Fetch the original image

fetch('./tortoise.png')

// Retrieve its body as ReadableStream

.then(response => response.body)

.then(body => {

const reader = body.getReader();

return new ReadableStream({

start(controller) {

return pump();

function pump() {

return reader.read().then(({ done, value }) => {

// When no more data needs to be consumed, close the stream

if (done) {

controller.close();

return;

}

// Enqueue the next data chunk into our target stream

controller.enqueue(value);

return pump();

});

}

}

})

})

.then(stream => new Response(stream))

.then(response => response.blob())

.then(blob => URL.createObjectURL(blob))

.then(url => console.log(image.src = url))

.catch(err => console.error(err));

Specifications

Specification

Status

Comment

Browser compatibility

See also

Fetch API

Streams API

ServiceWorker API