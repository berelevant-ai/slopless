# DataTransferItem.getAsString()

The DataTransferItem.getAsString() method invokes the given callback with the drag data item's string data as the argument if the item's  is a Plain unicode string (i.e. kind is string).

Syntax

dataTransferItem.getAsString(callback);

Parameters

callback

A callback function that has access to the  string data. See  below for details.

Return value

Callback

The callback parameter is a callback function which accepts one parameter:

The drag data item's string data.

The callback return value is undefined.

Example

This example shows the use of the getAsString() method as an inline function in a  event handler.

function drop_handler(ev) {

console.log("Drop");

ev.preventDefault();

var data = ev.dataTransfer.items;

for (var i = 0; i < data.length; i += 1) {

if ((data[i].kind == 'string') &&

(data[i].type.match('^text/plain'))) {

// This item is the target node

data[i].getAsString(function (s){

ev.target.appendChild(document.getElementById(s));

});

} else if ((data[i].kind == 'string') &&

(data[i].type.match('^text/html'))) {

// Drag data item is HTML

console.log("... Drop: HTML");

} else if ((data[i].kind == 'string') &&

(data[i].type.match('^text/uri-list'))) {

// Drag data item is URI

console.log("... Drop: URI");

} else if ((data[i].kind == 'file') &&

(data[i].type.match('^image/'))) {

// Drag data item is an image file

var f = data[i].getAsFile();

console.log("... Drop: File ");

}

}

}

Specifications

Specification

Status

Comment

Initial definition.

Snapshot fo HTML WHATWG document

Browser compatibility

See also