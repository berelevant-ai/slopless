# SpeechSynthesisUtterance.text

The text property of the  interface gets and sets the text that will be synthesised when the utterance is spoken.

The text may be provided as plain text, or a well-formed SSML document. The SSML tags will be stripped away by devices that don't support SSML.

Syntax

var myText = speechSynthesisUtteranceInstance.text;

speechSynthesisUtteranceInstance.text = 'Hello I am speaking';

Value

A  representing the text to the synthesised. The maximum length of the text that can be spoken in each utterance is 32,767 characters.

Examples

var synth = window.speechSynthesis;

var inputForm = document.querySelector('form');

var inputTxt = document.querySelector('input');

var voiceSelect = document.querySelector('select');

var voices = synth.getVoices();

...

inputForm.onsubmit = function(event) {

event.preventDefault();

var utterThis = new SpeechSynthesisUtterance(inputTxt.value);

var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');

for(i = 0; i < voices.length ; i++) {

if(voices[i].name === selectedOption) {

utterThis.voice = voices[i];

}

}

console.log(utterThis.text);

synth.speak(utterThis);

inputTxt.blur();

}

Specifications

Specification

Status

Comment

Browser compatibility

See also

Web Speech API