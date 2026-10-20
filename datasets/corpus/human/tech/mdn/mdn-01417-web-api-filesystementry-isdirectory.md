# FileSystemEntry.isDirectory

The read-only isDirectory property of the  interface is true if the entry represents a directory (meaning it's a ) and false if it's not.

You can also use  to determine if the entry is a file.

You should not assume that any entry which isn't a directory is a file or vice-versa. There are other types of file descriptors on many operating systems. Be sure to use both isDirectory and isFile as needed to ensure that the entry is something you know how to work with.

Syntax

var isDirectory = FileSystemEntry.isDirectory;

Value

A Boolean indicating whether or not the  is a directory.

Example

This example shows how this property might be used to determine whether to process the entry as a directory or file. If the entry is neither, an error handler is called with an appropriate message.

if (entry.isDirectory) {

processSubdirectory(entry);

} else if (entry.isFile) {

processFile(entry);

} else {

displayErrorMessage("Unsupported file system entry specified.");

}

Specifications

Specification

Status

Comment

Initial specification.

Browser compatibility

See also

File and Directory Entries API

Introduction to the File System API