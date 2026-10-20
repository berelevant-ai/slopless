# AudioBufferSourceNode.loop

The loop property of the  interface is a Boolean indicating if the audio asset must be replayed when the end of the  is reached.

The loop property's default value is false.

Syntax

var loopingEnabled = AudioBufferSourceNode.loop;

AudioBufferSourceNode.loop = true | false;

Value

A Boolean which is true if looping is enabled; otherwise, the value is false.

When looping is enabled, the sound begins playing at the time specified as the start point when  is called. When the time specified by the  property is reached, playback continues at the time specified by

Example

In this example, the  function is used to decode an audio track and put it into an . Buttons are provided to play and stop the audio playback, and a slider control is used to change the playbackRate property value on the fly. When the audio is played, it loops.

You can run the full example live (or view the source.)

function getData() {

source = audioCtx.createBufferSource();

request = new XMLHttpRequest();

request.open('GET', 'viper.ogg', true);

request.responseType = 'arraybuffer';

request.onload = function() {

var audioData = request.response;

audioCtx.decodeAudioData(audioData, function(buffer) {

myBuffer = buffer;

source.buffer = myBuffer;

source.playbackRate.value = playbackControl.value;

source.connect(audioCtx.destination);

source.loop = true;

},

function(e){"Error with decoding audio data" + e.err});

}

request.send();

}

// wire up buttons to stop and play audio, and range slider control

play.onclick = function() {

getData();

source.start(0);

play.setAttribute('disabled', 'disabled');

playbackControl.removeAttribute('disabled');

}

Specifications

Specification

Status

Comment

Browser compatibility

See also

Web Audio API

Using the Web Audio API