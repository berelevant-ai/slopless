# FileSystemFileHandle.createWritable()

The createWritable() method of the  interface creates a  that can be used to write to a file.

Any changes made through the stream won’t be reflected in the file represented by the file handle until the stream has been closed. This is typically implemented by writing data to a temporary file, and only replacing the file represented by file handle with the temporary file when the writable filestream is closed.

Syntax

var FileSystemWritableFileStream = FileSystemFileHandle.createWritable();

Parameters

FileSystemCreateWritableOptions

An object representing options to pass into the method. Options are:

keepExistingData: If false or not specified, the temporary file starts out empty, otherwise the existing file is first copied to this temporary file.

Return value

A Promise which resolves with a .

Exceptions

NotAllowedError

Thrown if the  for the handle is not 'granted' in readwrite mode.

Examples

The following asynchronous function writes the given contents to the file handle, and thus to disk.

async function writeFile(fileHandle, contents) {

// Create a FileSystemWritableFileStream to write to.

const writable = await fileHandle.createWritable();

// Write the contents of the file to the stream.

await writable.write(contents);

// Close the file and write the contents to disk.

await writable.close();

}

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

See also

File System Access API

The File System Access API: simplifying access to local files