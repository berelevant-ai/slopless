# MediaRecorder.onresume

The MediaRecorder.onresume event handler (part of the MediaRecorder API) handles the resume event, allowing you to run code in response to the media recording being resumed after pausing.

The resume event is thrown as a result of the  method being invoked.

Syntax

MediaRecorder.onresume = function(event) { ... }

MediaRecorder.addEventListener('resume', function(event) { ... })

Example

...

pause.onclick = function() {

if(MediaRecorder.state === "recording") {

mediaRecorder.pause();

// recording paused

} else if(MediaRecorder.state === "paused") {

mediaRecorder.resume();

// resume recording

}

}

mediaRecorder.onpause = function() {

// do something in response to

// recording being paused

}

mediaRecorder.onresume = function() {

// do something in response to

// recording being resumed

}

...

Properties

None.

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility

See also

Using the MediaRecorder API

Web Dictaphone: MediaRecorder + getUserMedia + Web Audio API visualization demo, by Chris Mills (source on Github.)

simpl.info MediaStream Recording demo, by Sam Dutton.