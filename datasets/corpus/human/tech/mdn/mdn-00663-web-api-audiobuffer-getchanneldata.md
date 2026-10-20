# AudioBuffer.getChannelData()

The getChannelData() method of the  Interface returns a  containing the PCM data associated with the channel, defined by the channel parameter (with 0 representing the first channel).

Syntax

var myArrayBuffer = audioCtx.createBuffer(2, frameCount, audioCtx.sampleRate);

var nowBuffering = myArrayBuffer.getChannelData(channel);

Parameters

channel

The channel property is an index representing the particular channel to get data for. An index value of 0 represents the first channel. If the channel index value is greater than of equal to , an INDEX_SIZE_ERR exception will be thrown.

Return value

A .

Example

In the following example we create a two second buffer, fill it with white noise, and then play it via an . The comments should clearly explain what is going on. You can also run the code live, or view the source.

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

var button = document.querySelector('button');

var pre = document.querySelector('pre');

var myScript = document.querySelector('script');

pre.innerHTML = myScript.innerHTML;

// Stereo

var channels = 2;

// Create an empty two second stereo buffer at the

// sample rate of the AudioContext

var frameCount = audioCtx.sampleRate * 2.0;

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

// connect the AudioBufferSourceNode to the

// destination so we can hear the sound

source.connect(audioCtx.destination);

// start the source playing

source.start();

}

Specifications

Specification

Status

Comment

Browser compatibility

See also

Using the Web Audio API