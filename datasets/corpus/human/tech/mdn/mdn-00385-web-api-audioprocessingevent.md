# AudioProcessingEvent

The Web Audio API AudioProcessingEvent represents events that occur when a  input buffer is ready to be processed.

Note: As of the August 29 2014 Web Audio API spec publication, this feature has been marked as deprecated, and is soon to be replaced by AudioWorklet.

Properties

The list below includes the properties inherited from its parent, .

Property

Type

Description

target

The event target (the topmost target in the DOM tree).

type

The type of event.

bubbles

boolean

Does the event normally bubble?

cancelable

boolean

Is it possible to cancel the event?

playbackTime

double

The time when the audio will be played, as defined by the time of

inputBuffer

The buffer containing the input audio data to be processed. The number of channels is defined as a parameter, numberOfInputChannels, of the factory method . Note the returned AudioBuffer is only valid in the scope of the onaudioprocess function.

outputBuffer

The buffer where the output audio data should be written. The number of channels is defined as a parameter, numberOfOutputChannels, of the factory method . Note the returned AudioBuffer is only valid in the scope of the onaudioprocess function.

Example

Browser compatibility

See also

Using the Web Audio API