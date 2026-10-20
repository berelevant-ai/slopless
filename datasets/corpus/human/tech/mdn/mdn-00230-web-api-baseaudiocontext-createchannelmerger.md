# BaseAudioContext.createChannelMerger()

The createChannelMerger() method of the  interface creates a , which combines channels from multiple audio streams into a single audio stream.

Syntax

baseAudioContext.createChannelMerger(numberOfInputs);

Parameters

numberOfInputs

The number of channels in the input audio streams, which the output stream will contain; the default is 6 if this parameter is not specified.

Returns

A .

Example

The following example shows how you could separate a stereo track (say, a piece of music), and process the left and right channel differently. To use them, you need to use the second and third parameters of the  method, which allow you to specify both the index of the channel to connect from and the index of the channel to connect to.

var ac = new AudioContext();

ac.decodeAudioData(someStereoBuffer, function(data) {

var source = ac.createBufferSource();

source.buffer = data;

var splitter = ac.createChannelSplitter(2);

source.connect(splitter);

var merger = ac.createChannelMerger(2);

// Reduce the volume of the left channel only

var gainNode = ac.createGain();

gainNode.gain.setValueAtTime(0.5, ac.currentTime);

splitter.connect(gainNode, 0);

// Connect the splitter back to the second input of the merger: we

// effectively swap the channels, here, reversing the stereo image.

gainNode.connect(merger, 0, 1);

splitter.connect(merger, 1, 0);

var dest = ac.createMediaStreamDestination();

// Because we have used a ChannelMergerNode, we now have a stereo

// MediaStream we can use to pipe the Web Audio graph to WebRTC,

// MediaRecorder, etc.

merger.connect(dest);

});

Specifications

Specification

Status

Comment

Browser compatibility

See also

Using the Web Audio API