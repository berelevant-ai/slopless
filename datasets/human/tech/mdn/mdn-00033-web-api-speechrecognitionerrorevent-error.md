# SpeechRecognitionErrorEvent.error

The error read-only property of the  interface returns the type of error raised.

Syntax

var myError = event.error;

Value

A  naming the type of error. The possible error types are:

no-speech

No speech was detected.

aborted

Speech input was aborted in some manner, perhaps by some user-agent-specific behavior like a button the user can press to cancel speech input.

audio-capture

Audio capture failed.

network

Network communication required for completing the recognition failed.

not-allowed

The user agent disallowed any speech input from occurring for reasons of security, privacy or user preference.

service-not-allowed

The user agent disallowed the requested speech recognition service, either because the user agent doesn't support it or because of reasons of security, privacy or user preference. In this case it would allow another more suitable speech recognition service to be used instead.

bad-grammar

There was an error in the speech recognition grammar or semantic tags, or the chosen grammar format or semantic tag format was unsupported.

language-not-supported

The language was not supported.

Examples

var recognition = new SpeechRecognition();

recognition.onerror = function(event) {

console.log('Speech recognition error detected: ' + event.error);

console.log('Additional information: ' + event.message);

}

Specifications

Specification

Status

Comment

Browser compatibility

Firefox OS permissions

To use speech recognition in an app, you need to specify the following permissions in your manifest:

"permissions": {

"audio-capture" : {

"description" : "Audio capture"

},

"speech-recognition" : {

"description" : "Speech recognition"

}

}

You also need a privileged app, so you need to include this as well:

"type": "privileged"

See also

Web Speech API