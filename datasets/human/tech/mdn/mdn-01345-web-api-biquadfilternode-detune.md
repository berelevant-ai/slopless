# BiquadFilterNode.detune

The detune property of the  interface is an a-rate  representing detuning of the frequency in cents.

Syntax

var audioCtx = new AudioContext();

var biquadFilter = audioCtx.createBiquadFilter();

biquadFilter.detune.value = 100;

Note: Though the AudioParam returned is read-only, the value it represents is not.

Value

An a-rate .

Example

The following example shows basic usage of an AudioContext to create a Biquad filter node. For a complete working example, check out our voice-change-o-matic demo (look at the source code too).

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

//set up the different audio nodes we will use for the app

var analyser = audioCtx.createAnalyser();

var distortion = audioCtx.createWaveShaper();

var gainNode = audioCtx.createGain();

var biquadFilter = audioCtx.createBiquadFilter();

var convolver = audioCtx.createConvolver();

// connect the nodes together

source = audioCtx.createMediaStreamSource(stream);

source.connect(analyser);

analyser.connect(distortion);

distortion.connect(biquadFilter);

biquadFilter.connect(convolver);

convolver.connect(gainNode);

gainNode.connect(audioCtx.destination);

// Manipulate the Biquad filter

biquadFilter.type = "lowshelf";

biquadFilter.frequency.value = 1000;

biquadFilter.gain.value = 25;

biquadFilter.detune.value = 100;

Specifications

Specification

Status

Comment

Browser compatibility

See also

Using the Web Audio API