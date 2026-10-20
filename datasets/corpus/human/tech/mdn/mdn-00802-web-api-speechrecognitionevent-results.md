# SpeechRecognitionEvent.results

The results read-only property of the  interface returns a  object representing all the speech recognition results for the current session.

Specifically this object will contain all final results that have been returned, followed by the current best hypothesis for all interim results. When subsequent  events are fired, interim results may be overwritten by a newer interim result or by a final result — they may even be removed, if they are at the end of the "results" array and the array length decreases. Final results  on the other hand will not be overwritten or removed.

Syntax

var myResults = event.results;

Value

A  object.

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