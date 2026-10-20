# FileList

An object of this type is returned by the files property of the HTML  element; this lets you access the list of files selected with the <input type="file"> element. It's also used for a list of files dropped into web content when using the drag and drop API; see the DataTransfer object for details on this usage.

Note: Prior to , the input element only supported a single file being selected at a time, meaning that the FileList would contain only one file. Starting with , if the input element's multiple attribute is true, the FileList may contain multiple files.

Using the file list

All <input> element nodes have a files attribute of type FileList on them which allows access to the items in this list. For example, if the HTML includes the following file input:

<input id="fileItem" type="file">

The following line of code fetches the first file in the node's file list as a File object:

var file = document.getElementById('fileItem').files[0];

Method overview

File item(index);

Properties

Attribute

Type

Description

length

integer

A read-only value indicating the number of files in the list.

Methods

item()

Returns a File object representing the file at the specified index in the file list.

File item(

index

);

Parameters

index

The zero-based index of the file to retrieve from the list.

Return value

The File representing the requested file.

Example

This example iterates over all the files selected by the user using an input element:

// fileInput is an HTML input element: <input type="file" id="myfileinput" multiple>

var fileInput = document.getElementById("myfileinput");

// files is a FileList object (similar to NodeList)

var files = fileInput.files;

var file;

// loop through files

for (var i = 0; i < files.length; i++) {

// get item

file = files.item(i);

//or

file = files[i];

alert(file.name);

}

Here is a complete example.

<!DOCTYPE HTML>

<html>

<head>

</head>

<body>

<!--multiple is set to allow multiple files to be selected-->

<input id="myfiles" multiple type="file">

</body>

<script>

var pullfiles=function(){

// love the query selector

var fileInput = document.querySelector("#myfiles");

var files = fileInput.files;

// cache files.length

var fl = files.length;

var i = 0;

while ( i < fl) {

// localize file var in the loop

var file = files[i];

alert(file.name);

i++;

}

}

// set the input element onchange to call pullfiles

document.querySelector("#myfiles").onchange=pullfiles;

//a.t

</script>

</html>

Specifications

Specification

Status

Comment

Browser compatibility

See also

Using files from web applications

File

FileReader