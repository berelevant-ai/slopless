# MediaDeviceInfo

The MediaDeviceInfo interface contains information that describes a single media input or output device. The list of devices obtained by calling  is an array of MediaDeviceInfo objects, one per media device.

Properties

Returns a  that is an identifier for the represented device that is persisted across sessions. It is un-guessable by other applications and unique to the origin of the calling application. It is reset when the user clears cookies (for Private Browsing, a different identifier is used that is not persisted across sessions).

Returns a  that is a group identifier. Two devices have the same group identifier if they belong to the same physical device — for example a monitor with both a built-in camera and a microphone.

Returns an enumerated value that is either "videoinput", "audioinput" or "audiooutput".

Returns a  that is a label describing this device (for example "External USB Webcam").

For security reasons, the label field is always blank unless an active media stream exists or the user has granted persistent permission for media device access. The set of device labels could otherwise be used as part of a fingerprinting mechanism to identify a user.

Methods

None.

Example

Here's an example that uses  to get a list of devices.

if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {

console.log("enumerateDevices() not supported.");

return;

}

// List cameras and microphones.

navigator.mediaDevices.enumerateDevices()

.then(function(devices) {

devices.forEach(function(device) {

console.log(device.kind + ": " + device.label +

" id = " + device.deviceId);

});

})

.catch(function(err) {

console.log(err.name + ": " + err.message);

});

This might produce:

videoinput: id = csO9c0YpAf274OuCPUA53CNE0YHlIr2yXCi+SqfBZZ8=

audioinput: id = RKxXByjnabbADGQNNZqLVLdmXlS0YkETYCIbg+XxnvM=

audioinput: id = r2/xw1xUPIyZunfV1lGrKOma5wTOvCkWfZ368XCndm0=

or if one or more media streams are active, or if persistent permissions have been granted:

videoinput: FaceTime HD Camera (Built-in) id=csO9c0YpAf274OuCPUA53CNE0YHlIr2yXCi+SqfBZZ8=

audioinput: default (Built-in Microphone) id=RKxXByjnabbADGQNNZqLVLdmXlS0YkETYCIbg+XxnvM=

audioinput: Built-in Microphone id=r2/xw1xUPIyZunfV1lGrKOma5wTOvCkWfZ368XCndm0=

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility

See also

WebRTC API