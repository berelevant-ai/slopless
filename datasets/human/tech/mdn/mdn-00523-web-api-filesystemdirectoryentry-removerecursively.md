# FileSystemDirectoryEntry.removeRecursively()

The  interface's method removeRecursively() removes the directory as well as all of its content, hierarchically iterating over its entire subtree of descendant files and directories.

To remove a single file, or an empty directory, you can also use .

Syntax

FileSystemDirectoryEntry.removeRecursively(successCallback[, errorCallback]);

Parameters

successCallback

A function to call once the directory removal process has completed. The callback has no parameters.

errorCallback

A function to be called if an error occurs while attempting to remove the directory subtree. Receives a  describing the error which occurred as input.

Return value

.

Errors

If an error occurs and an errorCallback was specified, it gets called with a single parameter: a  object describing the error. The  specifies what type of error occurred, as follows:

FileError.INVALID_MODIFICATION_ERR

An attempt was made to remove the root directory; this is not permitted.

FileError.NO_MODIFICATION_ALLOWED_ERR

The file system's state doesn't permit modification.

FileError.NOT_FOUND_ERR

The directory represented by the  no longer exists.

FileError.NOT_READABLE_ERR

The directory is not accessible; perhaps it's in use by another application or is locked at the operating system level.

FileError.SECURITY_ERR

The directory could not be removed for security reasons. Possible reasons include:

The directory and/or its contents may not be safe to access from a Web application.

Too many file system calls are being made.

Other security concerns as raised by the user agent or the operating system.

If you try to delete a directory which contains one or more files that can't be removed, or if an error occurs while deletion of a number of files is underway, some files may not be deleted. You should provide an errorCallback to watch for and handle this, perhaps by trying again.

Example

directory.removeRecursively(function() {

/* The directory was removed successfully */

}, function() {

/* an error occurred while removing the directory */

});

Browser compatibility

See also

File and Directory Entries API

Introduction to the File System API