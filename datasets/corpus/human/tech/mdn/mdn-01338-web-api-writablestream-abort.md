# WritableStream.abort()

The abort() method of the  interface aborts the stream, signaling that the producer can no longer successfully write to the stream and it is to be immediately moved to an error state, with any queued writes discarded.

Syntax

var promise = writableStream.abort(reason);

Parameters

reason

A  providing a human-readable reason for the abort.

Return value

A , which fulfills with the value given in the reason parameter.

Exceptions

TypeError

The stream you are trying to abort is not a , or it is locked.

Examples

const writableStream = new WritableStream({

write(chunk) {

...

},

close() {

...

},

abort(err) {

...

}

}, queuingStrategy);

...

// abort the stream later on, when required

writableStream.abort();

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.