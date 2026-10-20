# SpeechRecognitionAlternative

The SpeechRecognitionAlternative interface of the Web Speech API represents a single word that has been recognised by the speech recognition service.

Properties

Returns a string containing the transcript of the recognised word.

Returns a numeric estimate of how confident the speech recognition system is that the recognition is correct.

Examples

This code is excerpted from our Speech color changer example.

recognition.onresult = function(event) {

// The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object

// The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.

// It has a getter so it can be accessed like an array

// The first [0] returns the SpeechRecognitionResult at position 0.

// Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.

// These also have getters so they can be accessed like arrays.

// The second [0] returns the SpeechRecognitionAlternative at position 0.

// We then return the transcript property of the SpeechRecognitionAlternative object

var color = event.results[0][0].transcript;

diagnostic.textContent = 'Result received: ' + color + '.';

bg.style.backgroundColor = color;

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