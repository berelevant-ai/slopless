# AudioBufferSourceNode.buffer

The buffer property of the  interface provides the ability to play back audio using an  as the source of the sound data.

If the buffer property is set to the value null, the node generates a single channel containing silence (that is, every sample is 0).

Syntax

AudioBufferSourceNode.buffer = soundBuffer;

Value

An  which contains the data representing the sound which the node will play.

Example

For a full working example, see this code running live, or view the source.

var myArrayBuffer = audioCtx.createBuffer(2, frameCount, audioCtx.sampleRate);

button.onclick = function() {

// Fill the buffer with white noise;

//just random values between -1.0 and 1.0

for (var channel = 0; channel < channels; channel++) {

// This gives us the actual ArrayBuffer that contains the data

var nowBuffering = myArrayBuffer.getChannelData(channel);

for (var i = 0; i < frameCount; i++) {

// Math.random() is in [0; 1.0]

// audio needs to be in [-1.0; 1.0]

nowBuffering[i] = Math.random() * 2 - 1;

}

}

// Get an AudioBufferSourceNode.

// This is the AudioNode to use when we want to play an AudioBuffer

var source = audioCtx.createBufferSource();

// set the buffer in the AudioBufferSourceNode

source.buffer = myArrayBuffer;

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility

See also