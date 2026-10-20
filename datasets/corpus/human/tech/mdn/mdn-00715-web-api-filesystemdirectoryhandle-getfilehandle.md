# FileSystemDirectoryHandle.getFileHandle()

The getFileHandle() method of the  interface returns a  for a file with the specified name, within the directory the method is called.

Syntax

var FileSystemFileHandle = FileSystemDirectoryHandle.getFileHandle(name);

Parameters

name

A  representing the  of the file you wish to retrieve.

options

create: A . Default false. When set to true if the file is not found, one with the specified name will be created and returned.

Return value

A  which resolves with a .

Exceptions

NotAllowedError

If  is not 'granted'.

TypeError

If the name specified is not a valid string or contains characters that would interfere with the native file system

TypeMismatchError

If the named entry is a directory and not a file.

NotFoundError

if file doesn't exist and the create option is set to false.

Examples

The following example returns a file handle with the specified name, if the file does not exist it is created.

const fileName = 'fileToGetName';

// assuming we have a directory handle: 'currentDirHandle'

const fileHandle = currentDirHandle.getFileHandle(fileName, {create: true});

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

See also

File System Access API

The File System Access API: simplifying access to local files