# Body.blob()

The blob() method of the  mixin takes a  stream and reads it to completion. It returns a promise that resolves with a .

Syntax

response.blob().then(function(myBlob) {

// do something with myBlob

});

Parameters

None.

Note: If the  has a  of "opaque", the resulting  will have a  of 0 and a  of empty string "", which renders it useless for methods like .

Return value

A promise that resolves with a .

Example

In our fetch request example (run fetch request live), we create a new request using the  constructor, then use it to fetch a JPG. When the fetch is successful, we read a  out of the response using blob(), put it into an object URL using , and then set that URL as the source of an  element to display the image.

var myImage = document.querySelector('img');

var myRequest = new Request('flowers.jpg');

fetch(myRequest)

.then(response => response.blob())

.then(function(myBlob) {

var objectURL = URL.createObjectURL(myBlob);

myImage.src = objectURL;

});

Specifications

Specification

Status

Comment

Browser compatibility

See also

ServiceWorker API

HTTP access control (CORS)

HTTP