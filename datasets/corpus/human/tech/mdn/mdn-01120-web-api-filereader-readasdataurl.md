# FileReader.readAsDataURL()

The readAsDataURL method is used to read the contents of the specified  or . When the read operation is finished, the  becomes DONE, and the  is triggered. At that time, the  attribute contains the data as a data: URL representing the file's data as a base64 encoded string.

Note: The blob's  cannot be directly decoded as Base64 without first removing the Data-URL declaration preceding the Base64-encoded data. To retrieve only the Base64 encoded string, first remove data:*/*;base64, from the result.

Syntax

instanceOfFileReader.readAsDataURL(blob);

Parameters

blob

The  or  from which to read.

Example

HTML

<input type="file" onchange="previewFile()"><br>

<img src="" height="200" alt="Image preview...">

JavaScript

function previewFile() {

const preview = document.querySelector('img');

const file = document.querySelector('input[type=file]').files[0];

const reader = new FileReader();

reader.addEventListener("load", function () {

// convert image file to base64 string

preview.src = reader.result;

}, false);

if (file) {

reader.readAsDataURL(file);

}

}

Live Result

Example reading multiple files

HTML

<input id="browse" type="file" onchange="previewFiles()" multiple>

<div id="preview"></div>

JavaScript

function previewFiles() {

var preview = document.querySelector('#preview');

var files   = document.querySelector('input[type=file]').files;

function readAndPreview(file) {

// Make sure `file.name` matches our extensions criteria

if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {

var reader = new FileReader();

reader.addEventListener("load", function () {

var image = new Image();

image.height = 100;

image.title = file.name;

image.src = this.result;

preview.appendChild( image );

}, false);

reader.readAsDataURL(file);

}

}

if (files) {

[].forEach.call(files, readAndPreview);

}

}

Note: The FileReader() constructor was not supported by Internet Explorer for versions before 10. For a full compatibility code you can see our crossbrowser possible solution for image preview. See also this more powerful example.

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility

See also