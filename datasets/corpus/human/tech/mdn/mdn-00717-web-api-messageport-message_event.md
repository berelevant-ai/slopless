# MessagePort: message event

The message event is fired on a  object when a message arrives on that channel.

Bubbles

No

Cancelable

No

Interface

Event handler property

onmessage

Examples

Suppose a script creates a MessageChannel and sends one of the ports to a different browsing context, such as another <iframe>, using code like this:

const channel = new MessageChannel();

const myPort = channel.port1;

const targetFrame = window.top.frames[1];

const targetOrigin = 'https://example.org';

const messageControl = document.querySelector('#message');

const channelMessageButton = document.querySelector('#channel-message');

channelMessageButton.addEventListener('click', () => {

myPort.postMessage(messageControl.value);

})

targetFrame.postMessage('init', targetOrigin, [channel.port2]);

The target can receive the port and start listening for messages on it using code like this:

window.addEventListener('message', (event) => {

const myPort = event.ports[0];

myPort.addEventListener('message', (event) => {

received.textContent = event.data;

});

myPort.start();

});

Note that the listener must call MessagePort.start() before any messages will be delivered to this port. This is only needed when using the addEventListener() method: if the receiver uses onmessage instead, start() is called implicitly:

window.addEventListener('message', (event) => {

const myPort = event.ports[0];

myPort.onmessage = (event) => {

received.textContent = event.data;

};

});

Specifications

Specification

Status

Browser compatibility

See also

Related events: messageerror.

Using channel messaging