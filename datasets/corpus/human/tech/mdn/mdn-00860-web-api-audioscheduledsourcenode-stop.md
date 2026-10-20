# AudioScheduledSourceNode.stop()

The stop() method on  schedules a sound to cease playback at the specified time. If no time is specified, then the sound stops playing immediately.

Each time you call stop() on the same node, the specified time replaces any previously-scheduled stop time that hasn't occurred yet. If the node has already stopped, this method has no effect.

Note: If a scheduled stop time occurs before the node's scheduled start time, the node never starts to play.

Syntax

AudioScheduledSourceNode.stop([when]);

Parameters

when

The time, in seconds, at which the sound should stop playing. This value is specified in the same time coordinate system as the  is using for its  attribute. Omitting this parameter, specifying a value of 0, or passing a negative value causes the sound to stop playback immediately.

Return value

Exceptions

InvalidStateNode

The node has not been started by calling .

RangeError

The value specified for when is negative.

Example

This example demonstrates starting an oscillator node, scheduled to begin playing at once and to stop playing in one second. The stop time is determined by taking the audio context's current time from  and adding 1 second.

context = new AudioContext();

osc = context.createOscillator();

osc.connect(context.destination);

/* Let's play a sine wave for one second. */

osc.start();

osc.stop(context.currentTime + 1);

Specifications

Specification

Status

Comment

Browser compatibility

See also

Using the Web Audio API