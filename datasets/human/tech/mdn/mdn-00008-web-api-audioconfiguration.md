# AudioConfiguration

The AudioConfiguration dictionary of the Media Capabilities API defines the audio file being tested when calling  or  to query whether a specific audio configuration is supported, smooth, and/or power efficient.

Properties

The AudioConfiguration dictionary is made up of four audio properties, including:

contentType: A valid audio MIME type, For information on possible values and what they mean, see the web audio codec guide.

channels: the number of channels used by the audio track.

bitrate: The number of bits used to encode one second of the audio file.

samplerate: The number of audio samples making up one second of the audio file.

Examples

//Create media configuration to be tested

const mediaConfig = {

type : 'file', // 'record', 'transmission', or 'media-source'

audio : {

contentType : "audio/ogg", // valid content type

channels : 2,     // audio channels used by the track

bitrate : 132700, // number of bits used to encode 1s of audio

samplerate : 5200 // number of audio samples making up that 1s.

}

};

// check support and performance

navigator.mediaCapabilities.decodingInfo(mediaConfig).then(result => {

console.log('This configuration is ' +

(result.supported ? '' : 'not ') + 'supported, ' +

(result.smooth ? '' : 'not ') + 'smooth, and ' +

(result.powerEfficient ? '' : 'not ') + 'power efficient.'

});

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility

See also

Web media technologies

Guide to media types and formats on the web

Media Capabilities API

Using the Media Capabilities API

Media Capture and Streams API

MediaStream Recording API

WebRTC