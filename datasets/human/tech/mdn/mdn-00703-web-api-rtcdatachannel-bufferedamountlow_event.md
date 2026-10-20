# RTCDataChannel: bufferedamountlow event

A bufferedamountlow event is sent to an  when the number of bytes currently in the outbound data transfer buffer falls below the threshold specified in . bufferedamountlow events aren't sent if bufferedAmountLowThreshold is 0.

Bubbles

No

Cancelable

No

Interface

Event handler property

Examples

This example sets up a handler for bufferedamountlow to request more data any time the data channel's buffer falls below the number of bytes specified by , which we have set to 65536. In other words, we'll try to keep at least 64kB of data in the buffer, reading 64kB at a time from the source.

let pc = new RTCPeerConnection();

let dc = pc.createDataChannel("SendFile");

let source = /* source data object */

dc.bufferedAmountLowThreshold = 65536;

pc.addEventListener("bufferedamountlow", ev => {

if (source.position <= source.length) {

dc.send(source.readFile(65536));

}

}, false);

After creating the RTCPeerConnection, this calls  to create the data channel. Then a listener is created for bufferedamountlow to refill the incoming data buffer any time its contents fall below 65536 bytes.

You can also set up a listener for bufferedamountlow using its event handler property, :

pc.onbufferedamountlow = ev => {

if (source.position <= source.length) {

dc.send(source.readFile(65536));

}

}

Specifications

Specification

Status

Comment

Browser compatibility

See also

WebRTC API