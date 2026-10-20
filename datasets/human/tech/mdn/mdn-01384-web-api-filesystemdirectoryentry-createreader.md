# FileSystemDirectoryEntry.createReader()

The  interface's method createReader() returns a  object which can be used to read the entries in the directory.

Syntax

directoryReader = FileSystemDirectoryEntry.createReader();

Parameters

None.

Return value

A  object which can be used to read the directory's entries.

Example

This example creates a method called readDirectory(), which fetches all of the entries in the specified  and returns them in an array.

function readDirectory(directory) {

let dirReader = directory.createReader();

let entries = [];

let getEntries = function() {

dirReader.readEntries(function(results) {

if (results.length) {

entries = entries.concat(toArray(results));

getEntries();

}

}, function(error) {

/* handle error -- error is a FileError object */

});

};

getEntries();

return entries;

}

This works by creating an internal function, getEntries(), which calls itself recursively to get all the entries in the directory, concatenating each batch to the array. Each iteration,  is called to get more entries. When it returns an empty array, the end of the directory has beenr reached, and the recursion ends. Once control is returned to readDirectory(), the array is returned to the caller.

Specifications

Specification

Status

Comment

Initial specification.

Browser compatibility

See also

File and Directory Entries API

Introduction to the File System API