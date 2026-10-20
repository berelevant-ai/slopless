# Element.animate()

The  interface's animate() method is a shortcut method which creates a new , applies it to the element, then plays the animation. It returns the created  object instance.

Elements can have multiple animations applied to them. You can get a list of the animations that affect an element by calling .

Syntax

var animation = element.animate(keyframes, options);

Parameters

keyframes

Either an array of keyframe objects, or a keyframe object whose property are arrays of values to iterate over. See Keyframe Formats for more details.

options

Either an integer representing the animation's duration (in milliseconds), or an Object containing one or more timing properties:

id

A property unique to animate(): a DOMString with which to reference the animation.

You can also include a composite operation or iteration composite operation in your options list:

composite

Determines how values are combined between this animation and other, separate animations that do not specify their own specific composite operation. Defaults to replace.

add dictates an additive effect, where each successive iteration builds on the last. For instance with transform, a translateX(-200px) would not override an earlier rotate(20deg) value but result in translateX(-200px) rotate(20deg).

accumulate is similar but a little smarter: blur(2) and blur(5) become blur(7), not blur(2) blur(5).

replace overwrites the previous value with the new one.

iterationComposite

Determines how values build from iteration to iteration in this animation. Can be set to accumulate or replace (see above). Defaults to replace.

Return value

Returns an .

Examples

In the demo Down the Rabbit Hole (with the Web Animation API), we use the convenient animate() method to immediately create and play an animation on the #tunnel element to make it flow upwards, infinitely. Notice the array of objects passed as keyframes and also the timing options block.

document.getElementById("tunnel").animate([

// keyframes

{ transform: 'translateY(0px)' },

{ transform: 'translateY(-300px)' }

], {

// timing options

duration: 1000,

iterations: Infinity

});

Implicit to/from keyframes

In newer browser versions, you are able to set a beginning or end state for an animation only (i.e. a single keyframe), and the browser will infer the other end of the animation if it is able to. For example, consider this simple animation — the Keyframe object looks like so:

let rotate360 = [

{ transform: 'rotate(360deg)' }

];

We have only specified the end state of the animation, and the beginning state is implied.

Specifications

Specification

Status

Comment

Added the iterationComposite option.

Initial definition

Browser compatibility

See also

Web Animations API