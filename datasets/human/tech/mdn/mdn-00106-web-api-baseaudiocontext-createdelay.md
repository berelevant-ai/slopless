# BaseAudioContext.createDelay()

The createDelay() method of the  Interface is used to create a , which is used to delay the incoming audio signal by a certain amount of time.

Syntax

var delayNode = audioCtx.createDelay(maxDelayTime);

Parameters

maxDelayTime

The maximum amount of time, in seconds, that the audio signal can be delayed by. Must be less than 180 seconds, and defaults to 1 second if not specified.

Returns

A . The default  is 0 seconds.

Example

We have created a simple example that allows you to play three different samples on a constant loop — see create-delay (you can also view the source code). If you just press the play buttons, the loops will start immediately; if you slide the sliders up to the right, then press the play buttons, a delay will be introduced, so the looping sounds don't start playing for a short amount of time.

var AudioContext = window.AudioContext || window.webkitAudioContext;

var audioCtx = new AudioContext();

var synthDelay = audioCtx.createDelay(5.0);

...

var synthSource;

playSynth.onclick = function() {

synthSource = audioCtx.createBufferSource();

synthSource.buffer = buffers[2];

synthSource.loop = true;

synthSource.start();

synthSource.connect(synthDelay);

synthDelay.connect(destination);

this.setAttribute('disabled', 'disabled');

}

stopSynth.onclick = function() {

synthSource.disconnect(synthDelay);

synthDelay.disconnect(destination);

synthSource.stop();

playSynth.removeAttribute('disabled');

}

...

var delay1;

rangeSynth.oninput = function() {

delay1 = rangeSynth.value;

synthDelay.delayTime.setValueAtTime(delay1, audioCtx.currentTime);

}

Specifications

Specification

Status

Comment

Browser compatibility

See also

Using the Web Audio API