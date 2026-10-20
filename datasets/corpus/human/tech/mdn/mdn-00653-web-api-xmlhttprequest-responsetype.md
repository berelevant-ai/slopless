# XMLHttpRequest.responseType

The  property responseType is an enumerated string value specifying the type of data contained in the response. It also lets the author change the response type. If an empty string is set as the value of responseType, the default value of text is used.

Syntax

var type = XMLHttpRequest.responseType;

XMLHttpRequest.responseType = type;

Value

A string taken from the  enum which specifies what type of data the response contains.

When setting responseType to a particular value, the author should make sure that the server is actually sending a response compatible with that format. If the server returns data that is not compatible with the responseType that was set, the value of  will be null.

The values supported by responseType are the following:

Exceptions

InvalidAccessError

An attempt was made to change the value of responseType on anXMLHttpRequest which is in synchronous mode but not in a . For additional details, see  below.

Usage notes

Synchronous XHR restrictions

You cannot change the value of responseType in a synchronous XMLHttpRequest except when the request belongs to a . This restriction is designed in part to help ensure that synchronous operations aren't used for large transactions that block the browser's main thread, thereby bogging down the user experience.

XMLHttpRequests are asynchronous by default; they are only placed in synchronous mode by passing false as the value of the optional async parameter when calling .

Restrictions in Workers

Attempts to set the value of responseType to document are ignored in a .

Specifications

Specification

Status

Comment

WHATWG living standard

Browser compatibility

See also

Using XMLHttpRequest

HTML in XMLHttpRequest

The response data: , , and