# MediaStreamTrackAudioSourceNode()

The Web Audio API's MediaStreamTrackAudioSourceNode() constructor creates and returns a new  object whose audio is taken from the  specified in the given options object.

Another way to create a MediaStreamTrackAudioSourceNode is to call the method, specifying the   from which you want to obtain audio.

Syntax

audioTrackNode = new MediaStreamTrackAudioSourceNode(context, options);

Parameters

context

An  representing the audio context you want the node to be associated with.

options

A  object defining the properties you want the MediaStreamTrackAudioSourceNode to have:

Return value

A new  object representing the audio node whose media is obtained from the specified media track.

Exceptions

NotSupportedError

The specified context is not an .

InvalidStateError

The specified  isn't an audio track (that is, its  property isn't audio.

Example

This example uses  to obtain access to the user's camera, then creates a new  from the first audio track provided by the device.

let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

if (navigator.mediaDevices.getUserMedia) {

navigator.mediaDevices.getUserMedia (

{

audio: true,

video: false

}).then(function(stream) {

let options = {

mediaStreamTrack: stream.getAudioTracks()[0];

}

let source = new MediaStreamTrackAudioSourceNode(audioCtx, options);

source.connect(audioCtx.destination);

}).catch(function(err) {

console.log('The following gUM error occurred: ' + err);

});

} else {

console.log('new getUserMedia not supported on your browser!');

}

Specifications

Specification

Status

Comment

Browser compatibility