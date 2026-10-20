# File and Directory Entries API support in Firefox

The original File System API was created to let browsers implement support for accessing a sandboxed virtual file system on the user's storage device. Work to standardize the specification was abandoned back in 2012, but by that point, Google Chrome included its own implementation of the API. Over time, a number of popular sites and Web applications came to use it, often without providing any means of falling back to standard APIs or even checking to be sure the API is available before using it. Mozilla instead opted to implement other APIs which can be used to solve many of the same problems, such as IndexedDB; see the blog post Why no FileSystem API in Firefox? for more insights.

This has caused a number of popular web sites not to work properly on browsers other than Chrome. Because of that, an attempt was made to create a spec offering the features of Google's API which consensus could be reached on. The result was the File and Directory Entries API. This subset of the API provided by Chrome is still not fully specified; however, for web compatibility reasons, it was decided to implement a subset of the API in Firefox; this was introduced in Firefox 50.

This article describes how the Firefox implementation of the File and Directory Entries API differs from other implementations and/or the specification.

Chrome deviations from the specification

The largest compatibility issue still remaining is that Chrome is still using older names for many of the interfaces in the API, since they implemented a related but different specification:

Name in specification

Name in Google Chrome

FileSystemDirectoryEntry

DirectoryEntry

FileSystemDirectoryEntrySync

DirectoryEntrySync

FileSystemDirectoryReader

DirectoryReader

FileSystemDirectoryReaderSync

DirectoryReaderSync

FileSystemEntry

Entry

FileSystemEntrySync

EntrySync

FileSystemFileEntry

FileEntry

FileSystemFileEntrySync

FileEntrySync

Be sure to account for this in your code by allowing for both names. Hopefully Chrome will be updated soon to use the newer names!

To ensure your code will work in both Chrome and other browsers, you can include code similar to the following:

var FileSystemDirectoryEntry = window.FileSystemDirectoryEntry || window.DirectoryEntry;

var FileSystemEntry = window.FileSystemEntry || window.Entry;

Limitations in Firefox

Next, let's look at limitations of the Firefox implementation of the API. In broad strokes, those limitations can be summarized as follows:

Content scripts can't create file systems or initiate access to a file system. There are only two ways to get access to file system entries at this time:

The  element, using the  property to access an array of  objects describing file system entries you can then read.

Using drag and drop by calling the  method, which lets you get a  or  for files dropped on a drop zone.

You can't use the LocalFileSystem.requestFileSystem() method to get access to a specified local file system.

The LocalFileSystem.resolveLocalFileSystemURL() method isn't implemented.

Only the asynchronous versions of the interfaces are implemented. Any interfaces with names that end in "Sync" aren't available.

Firefox only supports reading from files in the file system. You can't write to them. In particular, the  method, used to create a  to handle writing to a file, is not implemented and will just treturn an error.

Firefox doesn't support the "filesystem:" URL scheme.

See also

File and Directory Entries API

Introduction to the File and Directory Entries API

Latest but still early specification for the File and Directory Entries API.

Original specification for the File API: Directories and System (often called the "FileSystem API"); Google Chrome was the only browser to implement this abandoned API.