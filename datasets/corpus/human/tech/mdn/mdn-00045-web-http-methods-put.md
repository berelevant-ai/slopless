# PUT

The HTTP PUT request method creates a new resource or replaces a representation of the target resource with the request payload.

The difference between PUT and  is that PUT is idempotent: calling it once or several times successively has the same effect (that is no side effect), whereas successive identical  requests may have additional effects, akin to placing an order several times.

Request has body

Yes

Successful response has body

No

No

Yes

No

Allowed in HTML forms

No

Syntax

PUT /new.html HTTP/1.1

Example

Request

PUT /new.html HTTP/1.1

Host: example.com

Content-type: text/html

Content-length: 16

<p>New File</p>

Responses

If the target resource does not have a current representation and the PUT request successfully creates one, then the origin server must inform the user agent by sending a  (Created) response.

HTTP/1.1 201 Created

Content-Location: /new.html

If the target resource does have a current representation and that representation is successfully modified in accordance with the state of the enclosed representation, then the origin server must send either a  (OK) or a  (No Content) response to indicate successful completion of the request.

HTTP/1.1 204 No Content

Content-Location: /existing.html

Specifications

Specification

Title

Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content

Browser compatibility

See also