# AudioListener.setOrientation()

The setOrientation() method of the  interface defines the orientation of the listener.

It consists of two direction vectors:

The front vector, defined by the three unitless parameters x, y and z, describes the direction of the face of the listener, that is the direction the nose of the person is pointing towards. The front vector's default value is (0, 0, -1).

The up vector, defined by three unitless parameters xUp, yUp and zUp, describes the direction of the top of the listener's head. The up vector's default value is (0, 1, 0).

The two vectors must be separated by an angle of 90° — in linear analysis terms, they must be perpendicular to each other.

Syntax

var audioCtx = new AudioContext();

var myListener = audioCtx.listener;

myListener.setOrientation(0,0,-1,0,1,0);

Returns

Void.

Example

Parameters

x

The x value of the front vector of the listener.

y

The y value of the front vector of the listener.

z

The z value of the front vector of the listener.

xUp

The x value of the up vector of the listener.

yUp

The y value of the up vector of the listener.

zUp

The z value of the up vector of the listener.

Browser compatibility

See also

Using the Web Audio API