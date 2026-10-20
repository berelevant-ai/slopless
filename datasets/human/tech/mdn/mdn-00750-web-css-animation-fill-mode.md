# animation-fill-mode

The animation-fill-mode CSS property sets how a CSS animation applies styles to its target before and after its execution.

It is often convenient to use the shorthand property  to set all animation properties at once.

Syntax

/* Single animation */

animation-fill-mode: none;

animation-fill-mode: forwards;

animation-fill-mode: backwards;

animation-fill-mode: both;

/* Multiple animations */

animation-fill-mode: none, backwards;

animation-fill-mode: both, forwards, none;

Values

none

The animation will not apply any styles to the target when it's not executing. The element will instead be displayed using any other CSS rules applied to it. This is the default value.

forwards

The target will retain the computed values set by the last keyframe encountered during execution. The last keyframe depends on the value of  and :

animation-direction

animation-iteration-count

last keyframe encountered

normal

even or odd

100% or to

reverse

even or odd

0% or from

alternate

even

0% or from

alternate

odd

100% or to

alternate-reverse

even

100% or to

alternate-reverse

odd

0% or from

backwards

The animation will apply the values defined in the first relevant keyframe as soon as it is applied to the target, and retain this during the  period. The first relevant keyframe depends on the value of :

animation-direction

first relevant keyframe

normal or alternate

0% or from

reverse or alternate-reverse

100% or to

both

The animation will follow the rules for both forwards and backwards, thus extending the animation properties in both directions.

Note: When you specify multiple comma-separated values on an animation-* property, they will be assigned to the animations specified in the  property in different ways depending on how many there are. For more information, see Setting multiple animation property values.

Formal definition

Formal syntax

Examples

You can see the effect of animation-fill-mode in the following example. It demonstrates how, for an animation that runs for an infinite time, you can cause it to remain in its final state rather than reverting to the original state (which is the default).

HTML

<p>Move your mouse over the gray box!</p>

<div class="demo">

<div class="growsandstays">This grows and stays big.</div>

<div class="grows">This just grows.</div>

</div>

CSS

.demo {

border-top: 100px solid #ccc;

height: 300px;

}

@keyframes grow {

0% { font-size: 0; }

100% { font-size: 40px; }

}

.demo:hover .grows {

animation-name: grow;

animation-duration: 3s;

}

.demo:hover .growsandstays {

animation-name: grow;

animation-duration: 3s;

animation-fill-mode: forwards;

}

See CSS animations for more examples.

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

See also

Using CSS animations

JavaScript  API