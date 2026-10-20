# DataTransfer.getData()

The DataTransfer.getData() method retrieves drag data (as a ) for the specified type. If the drag operation does not include data, this method returns an empty string.

Example data types are text/plain and text/uri-list.

Syntax

dataTransfer.getData(format);

Arguments

format

A  representing the type of data to retrieve.

Return value

A  representing the drag data for the specified format. If the drag operation has no data or the operation has no data for the specified format, this method returns an empty string.

Caveats

Data availability

The HTML5 Drag and Drop Specification dictates a drag data store mode. This may result in unexpected behavior, being DataTransfer.getData() not returning an expected value.

Example

This example shows the use of the  object's  and  methods.

HTML Content

<div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)">

<span id="drag" draggable="true" ondragstart="drag(event)">drag me to the other box</span>

</div>

<div id="div2" ondrop="drop(event)" ondragover="allowDrop(event)"></div>

CSS Content

#div1, #div2 {

width:100px;

height:50px;

padding:10px;

border:1px solid #aaaaaa;

}

JavaScript Content

function allowDrop(allowdropevent) {

allowdropevent.target.style.color = 'blue';

allowdropevent.preventDefault();

}

function drag(dragevent) {

dragevent.dataTransfer.setData("text", dragevent.target.id);

dragevent.target.style.color = 'green';

}

function drop(dropevent) {

dropevent.preventDefault();

var data = dropevent.dataTransfer.getData("text");

dropevent.target.appendChild(document.getElementById(data));

document.getElementById("drag").style.color = 'black';

}

Result

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility

See also