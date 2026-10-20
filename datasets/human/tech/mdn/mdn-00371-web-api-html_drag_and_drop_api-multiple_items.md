# Dragging and Dropping Multiple Items

Caution:

All of the methods and properties with a moz prefix (such as mozSetDataAt() are Gecko specific interfaces. These interfaces will only work with Gecko based browsers.

Mozilla supports the ability to drag multiple items using some additional non-standard methods. These are methods that mirror the  property as well as the ,  and  methods, however, they take an additional argument that specifies the index of the item to retrieve, modify or remove.

The drag processing described in this document use the  interface. This processing does not use the  interface nor the  interface.

Setting and getting with indices

The  method allows you to add multiple items during a  event. This function similarly to

var dt = event.dataTransfer;

dt.mozSetDataAt("text/plain", "Data to drag", 0);

dt.mozSetDataAt("text/plain", "Second data to drag", 1);

This example adds two items to be dragged. The last argument specifies the index of the item to add. You should add them in order starting with 0 as you cannot add items at positions farther than the last item, however you can replace existing items by using indices you have already added. Using 0 as the index is equivalent to calling .

You can clear an item using the  method.

event.dataTransfer.mozClearDataAt("text/plain", 1);

Caution: removing the last format for a particular index will remove that item entirely, shifting the remaining items down, so the later items will have different indices. For example:

var dt = event.dataTransfer;

dt.mozSetDataAt("text/uri-list", "URL1", 0);

dt.mozSetDataAt("text/plain",    "URL1", 0);

dt.mozSetDataAt("text/uri-list", "URL2", 1);

dt.mozSetDataAt("text/plain",    "URL2", 1);

dt.mozSetDataAt("text/uri-list", "URL3", 2);

dt.mozSetDataAt("text/plain",    "URL3", 2);

// [item1] data=URL1, index=0

// [item2] data=URL2, index=1

// [item3] data=URL3, index=2

After you added three items in two different formats,

dt.mozClearDataAt("text/uri-list", 1);

dt.mozClearDataAt("text/plain", 1);

You've removed the second item clearing all types, then the old third item becomes new second item, and its index decreases.

// [item1] data=URL1, index=0

// [item2] data=URL3, index=1

Fortunately, you don't normally need to clear items often; it's more common to just add the items only when you know they are needed.

Common cases where dragging multiple items is used is when dragging multiple files or bookmarks. In this case, add the appropriate formats for each item. Although not required, you should always add the same formats for each item. The ensures that receiving drop targets can expect consistent data.

To check if multiple files are being dragged, check the  property. It will be set to the number of items being dragged. If a particular drop target only supports dropping a single item, it could either reject the dragged items or it could just use just the first item. To reject the items, either don't cancel the  event, or set the  property to none. You may wish to do both in case another listener has already cancelled the event.

To just take the first item being dropped, use the  method as with a single item. This is convenient as drop targets which only need to support a single item do not need to do anything extra.

However, use the  method to retrieve a specific item from the data transfer. The following example retrieves a set of files being dragged and adds them to an array.

function onDrop(event)

{

var files = [];

var dt = event.dataTransfer;

for (var i = 0; i < dt.mozItemCount; i++)

files.push(dt.mozGetDataAt("application/x-moz-file", i));

}

You may also wish to check if the desired format exists using the  method. As with the  property, it returns a list of strings of the types for an item.  property is equivalent to retrieving the list of types for the item at index 0.

var types = event.dataTransfer.mozTypesAt(1);

Dragging Non-String Data

The additional methods described above are also not restricted to string data; you can specify any type of data. For example, files are dragged using the application/x-moz-file type stored as nsIFile objects. As the  method only supports strings, it cannot be used to specify files for dragging in this manner. Instead the  method must be used.

dt.mozSetDataAt("application/x-moz-file", file, 0);

By using this method, you can file objects, although you do not necessarily need to support multiple items. Thus, you should pass 0 as the index.

Similarly, you will need to retrieve the file object or objects using the  method. If you use , you will receive an empty string as the data is not a string. Note that some simple types like numbers can be converted to strings, so it is safe to use  in this case.

Multiple Drop Example

The following example provides a box where the lists of items and formats dropped on it are displayed.

<html>

<head>

<script>

function dodrop(event)

{

var dt = event.dataTransfer;

var count = dt.mozItemCount;

output("Items: " + count + "\n");

for (var i = 0; i < count; i++) {

output(" Item " + i + ":\n");

var types = dt.mozTypesAt(i);

for (var t = 0; t < types.length; t++) {

output("  " + types[t] + ": ");

try {

var data = dt.mozGetDataAt(types[t], i);

output("(" + (typeof data) + ") : <" + data + " >\n");

} catch (ex) {

output("<<error>>\n");

dump(ex);

}

}

}

}

function output(text)

{

document.getElementById("output").textContent += text;

dump(text);

}

</script>

</head>

<body>

<div id="output" style="min-height: 100px; white-space: pre; border: 1px solid black;"

ondragenter="document.getElementById('output').textContent = ''; event.stopPropagation(); event.preventDefault();"

ondragover="event.stopPropagation(); event.preventDefault();"

ondrop="event.stopPropagation(); event.preventDefault(); dodrop(event);">

<div>

Fix</div>

</div>

</body>

</html>

This example cancels both the  and  events by calling the . method. This allows a drop to occur on that element.

The dodrop event hander is called when dropping an item. It checks the  property to check how many items have been dropped and iterates over them. For each item, the  method is called to get the list of types. This list is iterated over to get all of the data associated with the drag.

This processing is useful if you wish to examine the data that a drag is holding. Drop an item on the drop target in the example to see what items, formats and data was being dragged.

See also

HTML Drag and Drop API (Overview)

Drag Operations

Recommended Drag Types

HTML5 Living Standard: Drag and Drop