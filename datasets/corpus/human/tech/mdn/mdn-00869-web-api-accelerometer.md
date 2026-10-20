# Accelerometer

The Accelerometer interface of the Sensor APIs provides on each reading the acceleration applied to the device along all three axes.

To use this sensor, the user must grant permission to the 'accelerometer', device sensor through the Permissions API.

If a feature policy blocks the use of a feature, it is because your code is inconsistent with the policies set on your server. This is not something that would ever be shown to a user. See  for implementation instructions.

Constructor

Creates a new Accelerometer object.

Properties

Returns a double containing the acceleration of the device along the device's x axis.

Returns a double containing the acceleration of the device along the device's y axis.

Returns a double containing the acceleration of the device along the device's z axis.

Example

Acceleration is typically read in the  event callback. In the example below this occurs sixty times a second.

let acl = new Accelerometer({frequency: 60});

acl.addEventListener('reading', () => {

console.log("Acceleration along the X-axis " + acl.x);

console.log("Acceleration along the Y-axis " + acl.y);

console.log("Acceleration along the Z-axis " + acl.z);

});

acl.start();

Specifications

Specification

Status

Comment

Defines sensors in general.

Browser compatibility