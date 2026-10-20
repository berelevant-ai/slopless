# XMLHttpRequestResponseType

The XMLHttpRequestResponseType type is an enumerated set of strings which are used to specify the type of data contained in the  of an . These values are used when getting or setting the  on the request.

Values

""

An empty responseType string is treated the same as "text", the default type.

arraybuffer

The  is a JavaScript  containing binary data.

blob

The response is a  object containing the binary data.

document

The response is an   or  , as appropriate based on the MIME type of the received data. See HTML in XMLHttpRequest to learn more about using XHR to fetch HTML content.

json

The response is a JavaScript object created by parsing the contents of received data as .

text

The response is a text in a  object.

ms-stream

The response is part of a streaming download; this response type is only allowed for download requests, and is only supported by Internet Explorer.

Deprecated values

moz-chunked-arraybuffer

A Firefox-only value which instructs XMLHttpRequest to deliver  objects containing chunks of the incoming data. Accessing response during a progress event returns the data received so far. Outside the progress event handler, the value of response is always null. You shouldn't use this non-standard (and, as of Firefox 68, entirely removed) API; instead, consider using the Fetch API with readable streams, which offers a standard alternative to accessing the response in a streaming fashion.

Specifications

Specification

Status

Comment

Live standard, latest version

Browser compatibility

See also

Using XMLHttpRequest

HTML in XMLHttpRequest