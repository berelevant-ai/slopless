# RTCDataChannel.onbufferedamountlow

The RTCDataChannel.onbufferedamountlow property is an  which specifies a function the browser calls when the  event is sent to the . This event, which is represented by a simple  object, is sent when the amount of data buffered to be sent falls to or below the threshold specified by the channel's .

See  to learn more about how to work with the data channel buffer.

Syntax

RTCDataChannel.onbufferedamountlow = function;

Value

A function which the browser will call to handle the  event. This function receives as its only input parameter a simple  object representing the event which has occurred.

Example

This example responds to the  event by fetching up to 64kB of a file represented by an object source and calling  to queue up the retrieved data for sending on the data channel.

pc = new RTCPeerConnection();

dc = pc.createDataChannel("SendFile");

/* ... */

dc.onbufferedamountlow = function() {

if (source.position <= source.length) {

dc.send(source.readFile(65536));

}

}

Specifications

Specification

Status

Comment

Initial specification.

Browser compatibility