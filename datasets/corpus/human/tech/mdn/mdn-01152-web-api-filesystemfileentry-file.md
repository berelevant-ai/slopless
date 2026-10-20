# FileSystemFileEntry.file()

The  interface's method file() returns a  object which can be used to read data from the file represented by the directory entry.

Syntax

FileSystemFileEntry.file(successCallback[, errorCallback]);

Parameters

successCallback

A callback function which is called when the  has been created successfully; the File is passed into the callback as the only parameter.

errorCallback

If provided, this must be a method which is called when an error occurs while trying to create the . This callback receives as input a  object describing the error.

Editor's note: We need to find out what kinds of errors can occur and document them.

Return value

.

Example

This example establishes a method, readFile(), reads a text file and calls a specified callback function with the received text (in a  object) once the read is completed. If an error occurs, a specified (optional) error callback is called.

function readFile(entry, successCallback, errorCallback) {

entry.file(function(file) {

let reader = new FileReader();

reader.onload = function() {

successCallback(reader.result);

};

reader.onerror = function() {

errorCallback(reader.error);

}

reader.readAsText(file);

}, errorCallback);

}

This function calls file(), specifying as its success callback a method which proceeds to use a  to read the file as text. The FileReader's  event handler is set up to deliver the loaded string to the successCallback specified when the readFile() method was called; similarly, its  handler is set up to call the errorCallback specified.

Specifications

Specification

Status

Comment

Initial specification.

Browser compatibility

See also

File and Directory Entries API

Introduction to the File System API