# XMLHttpRequest.response

The  response property returns the response's body content as an , , , JavaScript , or , depending on the value of the request's  property.

Syntax

var body = XMLHttpRequest.response;

Value

An appropriate object based on the value of . You may attempt to request the data be provided in a specific format by setting the value of responseType after calling  to initialize the request but before calling  to send the request to the server.

The value is null if the request is not yet complete or was unsuccessful, with the exception that when reading text data using a responseType of "text" or the empty string (""), the response can contain the response so far while the request is still in the LOADING  (3).

The response types are described below.

Example

This example presents a function, load(), which loads and processes a page from the server. It works by creating an  object and creating a listener for  events such that when readyState changes to DONE (4), the response is obtained and passed into the callback function provided to load().

The content is handled as raw text data (since nothing here is overriding the default ).

var url = 'somePage.html'; //A local page

function load(url, callback) {

var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {

if (xhr.readyState === 4) {

callback(xhr.response);

}

}

xhr.open('GET', url, true);

xhr.send('');

}

Specifications

Specification

Status

Comment

WHATWG living standard

Browser compatibility

See also

Using XMLHttpRequest

Getting text and HTML/XML data:  and