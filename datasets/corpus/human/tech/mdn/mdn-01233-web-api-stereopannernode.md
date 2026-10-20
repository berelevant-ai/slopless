# StereoPannerNode

The StereoPannerNode interface of the Web Audio API represents a simple stereo panner node that can be used to pan an audio stream left or right. It is an  audio-processing module that positions an incoming audio stream in a stereo image using a low-cost equal-power panning algorithm.

The  property takes a unitless value between -1 (full left pan) and 1 (full right pan). This interface was introduced as a much simpler way to apply a simple panning effect than having to use a full .

Number of inputs

1

Number of outputs

1

Channel count mode

"clamped-max"

Channel count

2

Channel interpretation

"speakers"

Constructor

Creates a new instance of a StereoPannerNode object.

Properties

Inherits properties from its parent, .

Is an a-rate  representing the amount of panning to apply.

Methods

No specific method; inherits methods from its parent, .

Example

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility

See also

Using the Web Audio API