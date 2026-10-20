# KeyframeEffect.KeyframeEffect()

The KeyframeEffect() constructor of the Web Animations API returns a new  object instance, and also allows you to clone an existing keyframe effect object instance.

Syntax

var keyframes = new KeyframeEffect(element, keyframeSet, keyframeOptions);

var keyframes = new KeyframeEffect(sourceKeyFrames);

Parameters

The first type of constructor (see above) creates a completely new  object instance. Its parameters are:

element

The DOM element to be animated, or null.

keyframeSet

An keyframe object or null.

keyframeOptions

Either an integer representing the animation's duration (in milliseconds), or an  containing one or more of the following:

Determines how values are combined between this animation and the element's underlying values.

Determines how values build from iteration to iteration in the current animation.

The second type of constructor (see above) creates a clone of an existing   object instance. Its parameter is as follows:

sourceKeyFrames

A  object that you want to clone.

Examples

In the Follow the White Rabbit example, the KeyframeEffect constructor is used to create a set of keyframes that dictate how the White Rabbit should animate down the hole:

var rabbitDownKeyframes = new KeyframeEffect(

whiteRabbit, // element to animate

[

{ transform: 'translateY(0%)' }, // keyframe

{ transform: 'translateY(100%)' } // keyframe

],

{ duration: 3000, fill: 'forwards' } // keyframe options

);

Specifications

Specification

Status

Comment

Added the iterationComposite option.

Editor's draft.

Browser compatibility

See also

KeyframeEffect Interface

Web Animations API