# SpeechSynthesis

The SpeechSynthesis interface of the Web Speech API is the controller interface for the speech service; this can be used to retrieve information about the synthesis voices available on the device, start and pause speech, and other commands besides.

Properties

SpeechSynthesis also inherits properties from its parent interface, .

A  that returns true if the SpeechSynthesis object is in a paused state.

A  that returns true if the utterance queue contains as-yet-unspoken utterances.

A  that returns true if an utterance is currently in the process of being spoken — even if SpeechSynthesis is in a paused state.

Methods

SpeechSynthesis also inherits methods from its parent interface, .

Removes all utterances from the utterance queue.

Returns a list of  objects representing all the available voices on the current device.

Puts the SpeechSynthesis object into a paused state.

Puts the SpeechSynthesis object into a non-paused state: resumes it if it was already paused.

Adds an  to the utterance queue; it will be spoken when any other utterances queued before it have been spoken.

Events

Listen to this event using addEventListener() or by assigning an event listener to the oneventname property of this interface.

voiceschanged

Fired when the list of  objects that would be returned by the  method has changed.

Also available via the onvoiceschanged property.

Examples

First, a simple example:

let utterance = new SpeechSynthesisUtterance("Hello world!");

speechSynthesis.speak(utterance);

Now we'll look at a more fully-fledged example. In our Speech synthesiser demo, we first grab a reference to the SpeechSynthesis controller using window.speechSynthesis. After defining some necessary variables, we retrieve a list of the voices available using  and populate a select menu with them so the user can choose what voice they want.

Inside the inputForm.onsubmit handler, we stop the form submitting with preventDefault(),  create a new  instance containing the text from the text , set the utterance's voice to the voice selected in the  element, and start the utterance speaking via the  method.

var synth = window.speechSynthesis;

var inputForm = document.querySelector('form');

var inputTxt = document.querySelector('.txt');

var voiceSelect = document.querySelector('select');

var pitch = document.querySelector('#pitch');

var pitchValue = document.querySelector('.pitch-value');

var rate = document.querySelector('#rate');

var rateValue = document.querySelector('.rate-value');

var voices = [];

function populateVoiceList() {

voices = synth.getVoices();

for(var i = 0; i < voices.length ; i++) {

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

for(var i = 0; i < voices.length ; i++) {

if(voices[i].name === selectedOption) {

utterThis.voice = voices[i];

}

}

utterThis.pitch = pitch.value;

utterThis.rate = rate.value;

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