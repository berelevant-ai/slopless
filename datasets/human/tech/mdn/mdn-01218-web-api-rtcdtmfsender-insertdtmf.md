# RTCDTMFSender.insertDTMF()

The insertDTMF() method on the  interface starts sending  tones to the remote peer over the . Sending of the tones is performed asynchronously, with  events sent to the RTCDTMFSender every time a tone starts or ends.

As long as the connection is active, you can send tones at any time. Calling insertDTMF() will append the specified tones to the end of the current tone buffer, so that those tones play after the previously-enqueued tones.

Syntax

RTCDTMFSender.insertDTMF(tones[, duration[, interToneGap]]);

Parameters

tones

A  containing the DTMF codes to be transmitted to the recipient. Specifying an empty string as the tones parameter clears the tone buffer, aborting any currently queued tones. A "," character inserts a two second delay.

duration

The amount of time, in milliseconds, that each DTMF tone should last. This value must be between 40 ms and 6000 ms (6 seconds), inclusive. The default is 100 ms.

interToneGap

The length of time, in milliseconds, to wait between tones. The browser will enforce a minimum value of 30 ms (that is, if you specify a lower value, 30 ms will be used instead); the default is 70 ms.

Return value

Exceptions

InvalidStateError

The DTMF tones couldn't be sent because the track has been stopped, or is in a read-only or inactive state.

InvalidCharacterError

One or more of the characters in tones is not valid DTMF.

Example

tbd

Specifications

Specification

Status

Comment

Browser compatibility

See also

WebRTC API

Using DTMF with WebRTC