# EffectTiming.iterations

The Web Animations API dictionary 's iterations property specifies the number of times the animation should repeat. The default value is 1, indicating that it should only play once, but you can set it to any floating-point value (including positive  defaults to 1, and can also take a value of Infinity to make it loop infinitely.

, , and  all accept an object of timing properties including iterations. The value of iterations corresponds directly to  in  objects returned by , , and .

Syntax

var timingProperties = {

iterations: numberOfIterations

};

timingProperties.iterations = numberOfIterations;

Value

A floating-point value specifying the number of times the animation sequence will play through. Any value from 0 (don't play the animation at all) to positive  (run the animation indefinitely) is supported. Defaults to 1, meaning the animation sequence plays through once then stops automatically.

Exceptions

TypeError

An attempt was made to set the value of this property to a negative number or . The property's value is left unchanged.

Examples

In the Forgotten Key example, Alice waves her arm up and down the entire time the page is open by passing Infinity as the value for her iterations property:

// Get Alice's arm, and wave it up and down

document.getElementById("alice_arm").animate([

{ transform: 'rotate(10deg)' },

{ transform: 'rotate(-40deg)' }

], {

easing: 'steps(2, end)',

iterations: Infinity,

direction: 'alternate',

duration: 600

});

Specifications

Specification

Status

Comment

Editor's draft.

Browser compatibility

See also

Web Animations API

, , and  all accept an object of timing properties including this one.

The value of this property corresponds to the one in  (which is the  object for , , and ).

CSS's