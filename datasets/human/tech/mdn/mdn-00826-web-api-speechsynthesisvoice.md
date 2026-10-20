# SpeechSynthesisVoice

The SpeechSynthesisVoice interface of the Web Speech API represents a voice that the system supports. Every SpeechSynthesisVoice has its own relative speech service including information about language, name and URI.

Properties

A  indicating whether the voice is the default voice for the current app language (true), or not (false.)

Returns a BCP 47 language tag indicating the language of the voice.

A  indicating whether the voice is supplied by a local speech synthesizer service (true), or a remote speech synthesizer service (false.)

Returns a human-readable name that represents the voice.

Returns the type of URI and location of the speech synthesis service for this voice.

Examples

The following snippet is excerpted from our Speech synthesiser demo.

function populateVoiceList() {

voices = synth.getVoices();

for(i = 0; i < voices.length ; i++) {

var option = document.createElement('option');

option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

if(voices[i].default) {

option.textContent += ' -- DEFAULT';

}

option.setAttribute('data-lang', voices[i].lang);

option.setAttribute('data-name', voices[i].name);

voiceSelect.appendChild(option);

}

}

populateVoiceList();

if (speechSynthesis.onvoiceschanged !== undefined) {

speechSynthesis.onvoiceschanged = populateVoiceList;

}

inputForm.onsubmit = function(event) {

event.preventDefault();

var utterThis = new SpeechSynthesisUtterance(inputTxt.value);

var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');

for(i = 0; i < voices.length ; i++) {

if(voices[i].name === selectedOption) {

utterThis.voice = voices[i];

}

}

utterThis.pitch = pitch.value;

utterThis.rate = rate.value;

synth.speak(utterThis);

utterThis.onpause = function(event) {

var char = event.utterance.text.charAt(event.charIndex);

console.log('Speech paused at character ' + event.charIndex + ' of "' +

event.utterance.text + '", which is "' + char + '".');

}

inputTxt.blur();

}

Specifications

Specification

Status

Comment

Browser compatibility

See also

Web Speech API