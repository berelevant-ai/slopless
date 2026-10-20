# Blob

The Blob object represents a blob, which is a file-like object of immutable, raw data; they can be read as text or binary data, or converted into a  so its methods can be used for processing the data.

Blobs can represent data that isn't necessarily in a JavaScript-native format. The  interface is based on Blob, inheriting blob functionality and expanding it to support files on the user's system.

Using blobs

To construct a Blob from other non-blob objects and data, use the  constructor. To create a blob that contains a subset of another blob's data, use the  method. To obtain a Blob object for a file on the user's file system, see the  documentation.

The APIs accepting Blob objects are also listed in the  documentation.

Constructor

Returns a newly created Blob object which contains a concatenation of all of the data in the array passed into the constructor.

Instance properties

The size, in bytes, of the data contained in the Blob object.

A string indicating the MIME type of the data contained in the Blob. If the type is unknown, this string is empty.

Instance methods

Returns a promise that resolves with an  containing the entire contents of the Blob as binary data.

Returns a new Blob object containing the data in the specified range of bytes of the blob on which it's called.

Returns a  that can be used to read the contents of the Blob.

Returns a promise that resolves with a  containing the entire contents of the Blob interpreted as UTF-8 text.

Examples

Creating a blob

The  constructor can create blobs from other objects. For example, to construct a blob from a JSON string:

const obj = {hello: 'world'};

const blob = new Blob([JSON.stringify(obj, null, 2)], {type : 'application/json'});

Creating a URL representing the contents of a typed array

The following code creates a JavaScript typed array and creates a new Blob containing the typed array's data. It then calls  to convert the blob into a .

HTML

<p>This example creates a typed array containing the ASCII codes

for the space character through the letter Z, then converts it

to an object URL. A link to open that object URL is created.

Click the link to see the decoded object URL.</p>

JavaScript

The main piece of this code for example purposes is the typedArrayToURL() function, which creates a Blob from the given typed array and returns an object URL for it. Having converted the data into an object URL, it can be used in a number of ways, including as the value of the  element's  attribute (assuming the data contains an image, of course).

function typedArrayToURL(typedArray, mimeType) {

return URL.createObjectURL(new Blob([typedArray.buffer], {type: mimeType}))

}

const bytes = new Uint8Array(59);

for(let i = 0; i < 59; i++) {

bytes[i] = 32 + i;

}

const url = typedArrayToURL(bytes, 'text/plain');

const link = document.createElement('a');

link.href = url;

link.innerText = 'Open the array URL';

document.body.appendChild(link);

Result

Click the link in the example to see the browser decode the object URL.

Extracting data from a blob

One way to read content from a Blob is to use a . The following code reads the content of a Blob as a typed array:

const reader = new FileReader();

reader.addEventListener('loadend', () => {

// reader.result contains the contents of blob as a typed array

});

reader.readAsArrayBuffer(blob);

Another way to read content from a Blob is to use a . The following code reads the content of a Blob as text:

const text = await (new Response(blob)).text();

Or by using :

const text = await blob.text();

By using other methods of FileReader, it is possible to read the contents of a Blob as a string or a data URL.

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

See also

Using files from web applications