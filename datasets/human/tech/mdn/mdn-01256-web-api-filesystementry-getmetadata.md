# FileSystemEntry.getMetadata()

The  interface's method getMetadata() obtains a  object with information about the file system entry, such as its modification date and time and its size.

Syntax

FileSystemEntry.getMetadata(successCallback[, errorCallback]);

Parameters

successCallback

A function which is called when the copy operation is succesfully completed. Receives a single input parameter: a  object with information about the file.

errorCallback

An optional callback which is executed if an error occurs while looking up the metadata. There's a single parameter: a  describing what went wrong.

Return value

.

Errors

FileError.NOT_FOUND_ERR

The  refers to an item which doesn't exist.

FileError.SECURITY_ERR

Security restrictions prohibit obtaining the requested metadata.

Example

This example checks the size of a log file in a temporary folder and, if it exceeds a megabyte, moves it into a different directory.

workingDirectory.getFile("tmp/log.txt", {}, function(fileEntry) {

fileEntry.getMetadata(function(metadata) {

if (metadata.size > 1048576) {

workingDirectory.getDirectory("log", {}, function(dirEntry) {

fileEntry.moveTo(dirEntry);

}, handleError);

}

});

}, handleError);

Browser compatibility

See also

File and Directory Entries API

Introduction to the File System API