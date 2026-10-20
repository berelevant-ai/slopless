# MediaTrackSupportedConstraints.deviceId

The  dictionary's deviceId property is a read-only Boolean value which is present (and set to true) in the object returned by  if and only if the  supports the deviceId constraint. If the constraint isn't supported, it's not included in the list, so this value will never be false.

You can access the supported constraints dictionary by calling navigator.mediaDevices.getSupportedConstraints().

Syntax

deviceIdConstraintSupported = supportedConstraintsDictionary.deviceId;

Value

This property is present in the dictionary (and its value is always true) if the user agent supports the deviceId constraint. If the property isn't present, this property is missing from the supported constraints dictionary, and you'll get  if you try to look at its value.

Example

HTML content

<div id="result">

</div>

CSS content

#result {

font: 14px "Arial", sans-serif;

}

JavaScript content

let result = document.getElementById("result");

if (navigator.mediaDevices.getSupportedConstraints().deviceId) {

result.textContent = "Supported!";

} else {

result.textContent = "Not supported!";

}

Result

Specifications

Specification

Status

Comment

Initial specification.

Browser compatibility

See also

Media Capture and Streams API