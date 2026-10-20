# FileSystemWritableFileStream.truncate()

The truncate() method of the  interface resizes the file associated with the stream to be the specified size in bytes.

If the size specified is larger than the current file size this pads the file with null bytes, otherwise it truncates the file.

The file cursor is also updated when truncate() is called. If the offset is smaller than the size, it remains unchanged. If the offset is larger than size, the offset is set to that size. This ensures that subsequent writes do not error.

No changes are written to the actual file on disk until the stream has been closed. Changes are typically written to a temporary file instead.

Syntax

FileSystemWritableFileStream.truncate().then(...);

Parameters

size

An unsigned long of the amount of bytes to resize the stream to.

Return value

A  which returns undefined.

Exceptions

NotAllowedError

If the  is not 'granted'.

TypeError

If the size is undefined or not an unsigned long.

Examples

// todo

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

See also

File System Access API

The File System Access API: simplifying access to local files