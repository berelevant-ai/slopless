# DataTransferItem

The DataTransferItem object represents one drag data item. During a drag operation, each  has a  property which contains a  of drag data items. Each item in the list is a DataTransferItem object.

This interface has no constructor.

Properties

The kind of drag data item, string or file.

The drag data item's type, typically a MIME type.

Methods

Returns the  object associated with the drag data item (or null if the drag item is not a file).

Returns a  if the dragged item is a file, or a  if the dragged item is a directory.

Invokes the specified callback with the drag data item string as its argument.

Returns an object based on  representing the selected file's entry in its file system. This will generally be either a  or  object.

Example

All of this interface's methods and properties have their own reference page, and each reference page has an example of its usage.

Specifications

Specification

Status

Comment

Initial definition.

W3C snapshot of WHATWG

Definition of webkitGetAsEntry() as part of the File and Directory Entries API.

Browser compatibility