# ServiceWorkerGlobalScope: message event

The message event of the  interface occurs when incoming messages are received. Controlled pages can use the  method to send messages to service workers.

The service worker can optionally send a response back via the , corresponding to the controlled page.

Bubbles

No

Cancelable

No

Interface

Event handler property

onmessage

Examples

In the below example a page gets a handle to the  object via , and then calls its postMessage() function.

// in the page being controlled

if (navigator.serviceWorker) {

navigator.serviceWorker.register('service-worker.js');

navigator.serviceWorker.addEventListener('message', event => {

// event is a MessageEvent object

console.log(`The service worker sent me a message: ${event.data}`);

});

navigator.serviceWorker.ready.then( registration => {

registration.active.postMessage("Hi service worker");

});

}

The service worker can receive the message by listening to the message event:

// in the service worker

addEventListener('message', event => {

// event is an ExtendableMessageEvent object

console.log(`The client sent me a message: ${event.data}`);

event.source.postMessage("Hi client");

});

Specifications

Specification

Status

Browser compatibility

See also

Using Service Workers

Service workers basic code example

Is ServiceWorker ready?

Using web workers