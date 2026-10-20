# BaseAudioContext.createStereoPanner()

The createStereoPanner() method of the  interface creates a , which can be used to apply stereo panning to an audio source. It positions an incoming audio stream in a stereo image using a low-cost equal-power panning algorithm.

Syntax

baseAudioContext.createStereoPanner();

Returns

A .

Example

In our StereoPannerNode example (see source code) HTML we have a simple  element along with a slider  to increase and decrease pan value. In the JavaScript we create a  and a , and connect the two together using the connect() method. We then use an oninput event handler to change the value of the  parameter and update the pan value display when the slider is moved.

Moving the slider left and right while the music is playing pans the music across to the left and right speakers of the output, respectively.

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

var myAudio = document.querySelector('audio');

var panControl = document.querySelector('.panning-control');

var panValue = document.querySelector('.panning-value');

pre.innerHTML = myScript.innerHTML;

// Create a MediaElementAudioSourceNode

// Feed the HTMLMediaElement into it

var source = audioCtx.createMediaElementSource(myAudio);

// Create a stereo panner

var panNode = audioCtx.createStereoPanner();

// Event handler function to increase panning to the right and left

// when the slider is moved

panControl.oninput = function() {

panNode.pan.setValueAtTime(panControl.value, audioCtx.currentTime);

panValue.innerHTML = panControl.value;

}

// connect the MediaElementAudioSourceNode to the panNode

// and the panNode to the destination, so we can play the

// music and adjust the panning using the controls

source.connect(panNode);

panNode.connect(audioCtx.destination);

Specifications

Specification

Status

Comment

Browser compatibility

See also

Using the Web Audio API