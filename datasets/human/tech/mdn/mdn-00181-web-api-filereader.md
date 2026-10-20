# FileReader

The FileReader object lets web applications asynchronously read the contents of files (or raw data buffers) stored on the user's computer, using  or  objects to specify the file or data to read.

File objects may be obtained from a  object returned as a result of a user selecting files using the  element, from a drag and drop operation's  object, or from the mozGetAsFile() API on an .

Important note: FileReader is used to read file content from the user's (remote) system in secure ways only. It cannot be used to read a file by pathname from a file system. To read files by pathname in JavaScript, standard Ajax solutions should be used to do server-side file reading, with CORS permission if reading cross-domain.

Constructor

Returns a newly constructed FileReader.

See Using files from web applications for details and examples.

Properties

A  representing the error that occurred while reading the file.

A number indicating the state of the FileReader. This is one of the following:

EMPTY

0

No data has been loaded yet.

LOADING

1

Data is currently being loaded.

DONE

2

The entire read request has been completed.

The file's contents. This property is only valid after the read operation is complete, and the format of the data depends on which of the methods was used to initiate the read operation.

Event handlers

A handler for the  event. This event is triggered each time the reading operation is aborted.

A handler for the  event. This event is triggered each time the reading operation encounter an error.

A handler for the  event. This event is triggered each time the reading operation is successfully completed.

A handler for the  event. This event is triggered each time the reading is starting.

A handler for the  event. This event is triggered each time the reading operation is completed (either in success or failure).

A handler for the  event. This event is triggered while reading a  content.

As FileReader inherits from , all those events can also be listened for by using the  method.

Methods

Aborts the read operation. Upon return, the readyState will be DONE.

Starts reading the contents of the specified , once finished, the result attribute contains an  representing the file's data.

Starts reading the contents of the specified , once finished, the result attribute contains the raw binary data from the file as a string.

Starts reading the contents of the specified , once finished, the result attribute contains a data: URL representing the file's data.

Starts reading the contents of the specified , once finished, the result attribute contains the contents of the file as a text string. An optional encoding name can be specified.

Events

Listen to these events using  or by assigning an event listener to the oneventname property of this interface.

Fired when a read has been aborted, for example because the program called .

Also available via the  property.

Fired when the read failed due to an error.

Also available via the  property.

Fired when a read has completed successfully.

Also available via the  property.

Fired when a read has completed, successfully or not.

Also available via the  property.

Fired when a read has started.

Also available via the  property.

Fired periodically as data is read.

Also available via the  property.

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility

See also

Using files from web applications