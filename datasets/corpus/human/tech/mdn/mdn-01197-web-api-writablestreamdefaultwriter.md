# WritableStreamDefaultWriter

The WritableStreamDefaultWriter interface of the Streams API is the object returned by  and once created locks the writer to the WritableStream ensuring that no other streams can write to the underlying sink.

Constructor

Creates a new WritableStreamDefaultWriter object instance.

Properties

Allows you to write code that responds to an end to the streaming process. Returns a promise that fulfills if the stream becomes closed or the writer's lock is released, or rejects if the stream errors.

Returns the desired size required to fill the stream's internal queue.

Returns a  that resolves when the desired size of the stream's internal queue transitions from non-positive to positive, signaling that it is no longer applying backpressure.

Methods

Aborts the stream, signaling that the producer can no longer successfully write to the stream and it is to be immediately moved to an error state, with any queued writes discarded.

Closes the associated writable stream.

Releases the writer's lock on the corresponding stream. After the lock is released, the writer is no longer active. If the associated stream is errored when the lock is released, the writer will appear errored in the same way from now on; otherwise, the writer will appear closed.

Writes a passed chunk of data to a  and its underlying sink, then returns a  that resolves to indicate the success or failure of the write operation.

Examples

The following example shows the creation of a WritableStream with a custom sink and an API-supplied queuing strategy. It then calls a function called sendMessage(), passing the newly created stream and a string. Inside this function it calls the stream's getWriter() method, which returns an instance of . A forEach() call is used to write each chunk of the string to the stream. Finally, write() and close() return promises that are processed to deal with success or failure of chunks and streams.

const list = document.querySelector('ul');

function sendMessage(message, writableStream) {

// defaultWriter is of type WritableStreamDefaultWriter

const defaultWriter = writableStream.getWriter();

const encoder = new TextEncoder();

const encoded = encoder.encode(message, { stream: true });

encoded.forEach((chunk) => {

defaultWriter.ready

.then(() => {

return defaultWriter.write(chunk);

})

.then(() => {

console.log("Chunk written to sink.");

})

.catch((err) => {

console.log("Chunk error:", err);

});

});

// Call ready again to ensure that all chunks are written

//   before closing the writer.

defaultWriter.ready

.then(() => {

defaultWriter.close();

})

.then(() => {

console.log("All chunks written");

})

.catch((err) => {

console.log("Stream error:", err);

});

}

const decoder = new TextDecoder("utf-8");

const queuingStrategy = new CountQueuingStrategy({ highWaterMark: 1 });

let result = "";

const writableStream = new WritableStream({

// Implement the sink

write(chunk) {

return new Promise((resolve, reject) => {

var buffer = new ArrayBuffer(2);

var view = new Uint16Array(buffer);

view[0] = chunk;

var decoded = decoder.decode(view, { stream: true });

var listItem = document.createElement('li');

listItem.textContent = "Chunk decoded: " + decoded;

list.appendChild(listItem);

result += decoded;

resolve();

});

},

close() {

var listItem = document.createElement('li');

listItem.textContent = "[MESSAGE RECEIVED] " + result;

list.appendChild(listItem);

},

abort(err) {

console.log("Sink error:", err);

}

}, queuingStrategy);

sendMessage("Hello, world.", writableStream);

You can find the full code in our Simple writer example.

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

twitch viewer bot