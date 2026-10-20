# DELETE

The HTTP DELETE request method deletes the specified resource.

Request has body

May

Successful response has body

May

No

Yes

No

Allowed in HTML forms

No

Syntax

DELETE /file.html HTTP/1.1

Example

Request

DELETE /file.html HTTP/1.1

Responses

If a DELETE method is successfully applied, there are several response status codes possible:

A  (Accepted) status code if the action will likely succeed but has not yet been enacted.

A  (No Content) status code if the action has been enacted and no further information is to be supplied.

A  (OK) status code if the action has been enacted and the response message includes a representation describing the status.

HTTP/1.1 200 OK

Date: Wed, 21 Oct 2015 07:28:00 GMT

<html>

<body>

<h1>File deleted.</h1>

</body>

</html>

Specifications

Specification

Title

Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also

HTTP status: , ,