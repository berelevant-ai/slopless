# PannerNode.orientationX

The orientationX property of the  interface indicates the X (horizontal) component of the direction in which the audio source is facing, in a 3D Cartesian coordinate space.

The complete vector is defined by the position of the audio source, given as (, , ), and the orientation of the audio source (that is, the direction in which it's facing), given as (, , ).

Depending on the directionality of the sound (as specified using the attributes , , and ), the orientation of the sound may alter the perceived volume of the sound as it's being played. If the sound is pointing toward the listener, it will be louder than if the sound is pointed away from the listener.

The  contained by this property is read only; however, you can still change the value of the parameter by assigning a new value to its  property.

Syntax

var orientationX = PannerNode.orientationX;

PannerNode.orientationX.value = newOrientationX;

Value

An  whose value is the X component of the direction in which the audio source is facing, in 3D Cartesian coordinate space.

Example

In this example, we'll demonstrate how changing the orientation parameters of a  in combination with  and  affects volume. To help us visualise how the orientation vector affects, we can use the Right-hand rule:

First, let's start by writing a utility function to figure out our orientation vector. The X and Z components are always at a 90° to each other, so we can use the sine and cosine functions, which are offset by the same amount in radians. However, normally this would mean the  points to the left of the listener at 0° rotation – since `x = cos(0) = 1` and `z = sin(0) = 0`. It's more useful to offset the angle by -90°, which means the  will point directly at the listener at 0° rotation.

// this utility converts amount of rotation around the Y axis

// (i.e. rotation in the 'horizontal plane') to an orientation vector

const yRotationToVector = degrees => {

// convert degrees to radians and offset the angle so 0 points towards the listener

const radians = (degrees - 90) * (Math.PI / 180);

// using cosine and sine here ensures the output values are always normalised

// i.e. they range between -1 and 1

const x = Math.cos(radians);

const z = Math.sin(radians);

// we hard-code the Y component to 0, as Y is the axis of rotation

return [x, 0, z];

};

Now we can create our , an oscillator and a :

const context = new AudioContext();

const osc = new OscillatorNode(context);

osc.type = 'sawtooth';

const panner = new PannerNode(context);

panner.panningModel = 'HRTF';

Next, we set up the cone of our spatialised sound, determining the area in which it can be heard:

// this value determines the size of the area in which the sound volume is constant

// if coneInnerAngle == 30, it means that when the sound is rotated

// by at most 15 (30/2) degrees either direction, the volume won't change

panner.coneInnerAngle = 30;

// this value determines the size of the area in which the sound volume decreases gradually

// if coneOuterAngle == 45 and coneInnerAngle == 30, it means that when the sound is rotated

// by between 15 (30/2) and 22.5 (45/2) degrees either direction,

// the volume will decrease gradually

panner.coneOuterAngle = 45;

// this value determines the volume of the sound outside of both inner and outer cone

// setting it to 0 means there is no sound, so we can clearly hear when we leave the cone

// 0 is also the default

panner.coneOuterGain = 0;

// increase the Z position to ensure the cone has an effect

// (otherwise the sound is located at the same position as the listener)

panner.positionZ.setValueAtTime(1, context.currentTime);

Having set up the , we can now schedule some updates to its Y-axis rotation:

// calculate the vector for no rotation

// this means the sound will play at full volume

const [x1, y1, z1] = yRotationToVector(0);

// schedule the no-rotation vector immediately

panner.orientationX.setValueAtTime(x1, context.currentTime);

panner.orientationY.setValueAtTime(y1, context.currentTime);

panner.orientationZ.setValueAtTime(z1, context.currentTime);

// calculate the vector for -22.4 degrees

// since our coneOuterAngle is 45, this will just about make the sound audible

// if we set it to +/-22.5, the sound volume will be 0, as the threshold is exclusive

const [x2, y2, z2] = yRotationToVector(-22.4);

panner.orientationX.setValueAtTime(x2, context.currentTime + 2);

panner.orientationY.setValueAtTime(y2, context.currentTime + 2);

panner.orientationZ.setValueAtTime(z2, context.currentTime + 2);

Finally, let's connect all our nodes and start the oscillator!

osc.connect(panner)

.connect(context.destination);

osc.start(0);

Specifications

Specification

Status

Comment

Browser compatibility

See also

Using the Web Audio API

Web Audio spatialisation basics