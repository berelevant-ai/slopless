# PositionSensorVRDevice.getImmediateState()

The getImmediateState() method of the  interface returns the current instantaneous position sensor state. This is intended to only be used rarely, for certain special uses, for example sampling the immediate position of a hand orientation sensor — or at least it will be, in the future.

For most standard uses, you'll probably want to use  instead.

Syntax

var myPositionstate = PositionSensorVRDevice.getImmediateState();

Parameters

None.

Returns

A  object.

Examples

Our positionsensorvrdevice demo uses the WebVR API to update the view of a simple  scene on each frame of a  loop. The main function that updates the view data is as follows:

function setView() {

var posState = gPositionSensor.getImmediateState();

if(posState.hasPosition) {

posPara.textContent = 'Position: x' + roundToTwo(posState.position.x) + " y"

+ roundToTwo(posState.position.y) + " z"

+ roundToTwo(posState.position.z);

xPos = -posState.position.x * WIDTH * 2;

yPos = posState.position.y * HEIGHT * 2;

if(-posState.position.z > 0.01) {

zPos = -posState.position.z;

} else {

zPos = 0.01;

}

}

if(posState.hasOrientation) {

orientPara.textContent = 'Orientation: x' + roundToTwo(posState.orientation.x) + " y"

+ roundToTwo(posState.orientation.y) + " z"

+ roundToTwo(posState.orientation.z);

xOrient = posState.orientation.x * WIDTH;

yOrient = -posState.orientation.y * HEIGHT * 2;

zOrient = posState.orientation.z * 180;

}

}

Here we are grabbing a  object using getImmediateState() and storing it in posState (the actual live demo uses getState(), but both seem to do the same thing currently.) We then check to make sure that position and orientation info is present in the current frame using  and  (these return null if, for example the head mounted display is turned off or not pointing at the position sensor, which would cause an error.)

We then output the x, y and z position and orientation values for informational purposes, and use those values to update the xPos, yPos, zPos, xOrient, yOrient, and zOrient variables, which are used to update the scene rendering on each frame.

Browser compatibility

See also

WebVR API homepage.

https://mixedreality.mozilla.org/ — demos, downloads, and other resources from the Mozilla VR team.