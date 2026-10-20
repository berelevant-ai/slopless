# FileSystem

The File and Directory Entries API interface FileSystem is used to represent a file system. These objects can be obtained from the  property on any file system entry. Some browsers offer additional APIs to create and manage file systems, such as Chrome's  method.

This interface will not grant you access to the users filesystem. Instead you will have a "virtual drive" within the browser sandbox. If you want to gain access to the users filesystem you need to invoke the user by eg. installing a Chrome extension. The relevant Chrome API can be found here.

Basic concepts

There are two ways to get access to a FileSystem object:

You can directly ask for one representing a sandboxed file system created just for your web app directly by calling window.requestFileSystem().  If that call is successful, it executes a callback handler, which receives as a parameter a FileSystem object describing the file system.

You can get it from a file system entry object, through its  property.

Properties

A  representing the file system's name. This name is unique among the entire list of exposed file systems.

A  object which represents the file system's root directory. Through this object, you can gain access to all files and directories in the file system.

Specifications

Specification

Status

Comment

Browser compatibility

See also

File and Directory Entries API

Introduction to the File System API

, , and

MSDN article: WebKitFileSystem object