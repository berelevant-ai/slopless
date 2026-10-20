# DataTransfer.mozClearDataAt()

The DataTransfer.mozClearDataAt() method removes the data associated with the given format for an item at the specified index. The index must be in the range from zero to the number of items minus one.

If the format argument is not provided, then the data associated with all formats is removed. If the format is not found, then this method has no effect. If the last format for the item is removed, the entire item is removed, reducing  by one.

Removing the last format for a particular index removes that item entirely, shifting the remaining items down and changing their indices.

Note: This method is Gecko-specific.

Syntax

void dataTransfer.mozClearDataAt([type], index);

Arguments

type

A  representing the type of the drag data to remove from the .

index

A unsigned long representing the index of the data to remove.

Return value

void

Example

This example shows the use of the mozClearDataAt() method in a  event handler.

function dragend_handler(event)

{

var dt = event.dataTransfer;

// Remove a text/html item

dt.mozClearDataAt("text/html", 1);

}

Specifications

This method is not defined in any Web standard.

Browser compatibility

See also