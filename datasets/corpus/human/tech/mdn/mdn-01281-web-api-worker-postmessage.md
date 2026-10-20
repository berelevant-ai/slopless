# Worker.prototype.postMessage()

The postMessage() method of the  interface sends a message to the worker's inner scope. This accepts a single parameter, which is the data to send to the worker. The data may be any value or JavaScript object handled by the structured clone algorithm, which includes cyclical references.

The Worker can send back information to the thread that spawned it using the  method.

Syntax

worker.postMessage(message, [transfer]);

Parameters

message

The object to deliver to the worker; this will be in the data field in the event delivered to the  handler. This may be any value or JavaScript object handled by the structured clone algorithm, which includes cyclical references.

If the message parameter is not provided, a TypeError will be thrown. If the data to be passed to the worker is unimportant, null or undefined can be passed explicitly.

transfer

An optional array of  objects to transfer ownership of. If the ownership of an object is transferred, it becomes unusable (neutered) in the context it was sent from and becomes available only to the worker it was sent to.

Transferable objects are instances of classes like ,  or  objects that can be transferred. null is not an acceptable value for transfer.

Returns

Void.

Example

The following code snippet shows the creation of a  object using the  constructor. When either of two form inputs (first and second) have their values changed,  events invoke postMessage() to send the value of both inputs to the current worker.

var myWorker = new Worker('worker.js');

first.onchange = function() {

myWorker.postMessage([first.value,second.value]);

console.log('Message posted to worker');

}

second.onchange = function() {

myWorker.postMessage([first.value,second.value]);

console.log('Message posted to worker');

}

For a full example, see ourBasic dedicated worker example (run dedicated worker).

Note: postMessage() can only send a single object at once. As seen above, if you want to pass multiple values you can send an array.

Transfer Example

This example shows a Firefox add-on that transfers an ArrayBuffer from the main thread to the ChromeWorker, and then the ChromeWorker transfers it back to the main thread.

Main thread code:

var myWorker = new ChromeWorker(self.path + 'myWorker.js');

function handleMessageFromWorker(msg) {

console.log('incoming message from worker, msg:', msg);

switch (msg.data.aTopic) {

case 'do_sendMainArrBuff':

sendMainArrBuff(msg.data.aBuf)

break;

default:

throw 'no aTopic on incoming message to ChromeWorker';

}

}

myWorker.addEventListener('message', handleMessageFromWorker);

// Ok lets create the buffer and send it

var arrBuf = new ArrayBuffer(8);

console.info('arrBuf.byteLength pre transfer:', arrBuf.byteLength);

myWorker.postMessage(

{

aTopic: 'do_sendWorkerArrBuff',

aBuf: arrBuf // The array buffer that we passed to the transferrable section 3 lines below

},

[

arrBuf // The array buffer we created 9 lines above

]

);

console.info('arrBuf.byteLength post transfer:', arrBuf.byteLength);

Worker code

self.onmessage = function (msg) {

switch (msg.data.aTopic) {

case 'do_sendWorkerArrBuff':

sendWorkerArrBuff(msg.data.aBuf)

break;

default:

throw 'no aTopic on incoming message to ChromeWorker';

}

}

function sendWorkerArrBuff(aBuf) {

console.info('from worker, PRE send back aBuf.byteLength:', aBuf.byteLength);

self.postMessage({aTopic:'do_sendMainArrBuff', aBuf:aBuf}, [aBuf]);

console.info('from worker, POST send back aBuf.byteLength:', aBuf.byteLength);

}

Output logged

arrBuf.byteLength pre transfer: 8                              bootstrap.js:40

arrBuf.byteLength post transfer: 0                             bootstrap.js:42

from worker, PRE send back aBuf.byteLength: 8                  myWorker.js:5:2

incoming message from worker, msg: message { ... }             bootstrap.js:20

got back buf in main thread, aBuf.byteLength: 8                bootstrap.js:12

from worker, POST send back aBuf.byteLength: 0                 myWorker.js:7:2

byteLength goes to 0 as it is transferred. To see a full working example of this Firefox demo add-on see here: GitHub :: ChromeWorker - demo-transfer-arraybuffer

Specifications

Specification

Status

Comment

Browser compatibility

[1] Internet Explorer does not support  objects.

See also

The  interface it belongs to.