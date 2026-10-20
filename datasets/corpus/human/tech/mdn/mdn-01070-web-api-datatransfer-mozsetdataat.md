# DataTransfer.mozSetDataAt()

The DataTransfer.mozSetDataAt() method is used to add data to a specific index in the drag event's  object.

A data transfer may store multiple items, each at a given zero-based index. mozSetDataAt() may only be called with an index argument less than  in which case an existing item is modified, or equal to  in which case a new item is added, and the  is incremented by one.

Data should be added in order of preference, with the most specific format added first and the least specific format added last. If data of the given format already exists, it is replaced in the same position as the old data.

The data should be either a , a  or number type (which will be converted into a string) or an .

Note: This method is Gecko-specific.

Syntax

void dataTransfer.mozSetDataAt([type], data, index);

Arguments

type

A  representing the type of the drag data to add to the .

data

A  representing the data to add to the .

index

A unsigned long representing the index of the data to add.

Return value

void

Example

This example shows the use of the mozSetDataAt() method in a  handler.

function dragstart_handler(event)

{

var dt = event.dataTransfer;

var idx = dt.mozItemCount;

// Add two new items to the drag transfer

if (idx >= 0) {

dt.mozSetDataAt("text/uri-list","http://www.example.com/", idx);

dt.mozSetDataAt("text/html", "Hello World", idx+1);

}

}

Specifications

This method is not defined in any Web standard.

Browser compatibility

See also