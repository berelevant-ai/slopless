# ::-moz-range-progress

The ::-moz-range-progress CSS pseudo-element is a Mozilla extension that represents the lower portion of the track (i.e., groove) in which the indicator slides in an  of type="range". This portion corresponds to values lower than the value currently selected by the thumb (i.e., virtual knob).

Note: Using ::-moz-range-progress with anything but an <input type="range"> doesn't match anything and has no effect.

Syntax

Examples

HTML

<input type="range" min="0" max="100" step="5" value="50"/>

CSS

input[type=range]::-moz-range-progress {

background-color: green;

height: 1em;

}

Result

A progress bar using this style might look something like this:

Specifications

Not part of any standard.

Browser compatibility

See also

The pseudo-elements used by Gecko to style other parts of a range input:

represents the indicator that slides in the groove.

represents the groove in which the thumb slides.

Similar pseudo-elements used by other browsers:

, pseudo-element supported by Internet Explorer and Edge

CSS-Tricks: Styling Cross-Browser Compatible Range Inputs with CSS

QuirksMode: Styling and scripting sliders