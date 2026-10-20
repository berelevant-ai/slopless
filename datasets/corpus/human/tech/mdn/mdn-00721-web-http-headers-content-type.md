# Content-Type

The Content-Type entity header is used to indicate the  of the resource.

In responses, a Content-Type header tells the client what the content type of the returned content actually is. Browsers will do MIME sniffing in some cases and will not necessarily follow the value of this header; to prevent this behavior, the header  can be set to nosniff.

In requests, (such as  or ), the client tells the server what type of data is actually sent.

Header type

no

yes

yes, with the additional restriction that values can't contain a CORS-unsafe request header byte: 0x00-0x1F (except 0x09 (HT)), "():<>?@[\]{}, and 0x7F (DEL).

It also needs to have a MIME type of its parsed value (ignoring parameters) of either application/x-www-form-urlencoded, multipart/form-data, or text/plain.

Syntax

Content-Type: text/html; charset=UTF-8

Content-Type: multipart/form-data; boundary=something

Directives

media-type

The MIME type of the resource or the data.

charset

The character encoding standard.

boundary

For multipart entities the boundary directive is required, which consists of 1 to 70 characters from a set of characters known to be very robust through email gateways, and not ending with white space. It is used to encapsulate the boundaries of the multiple parts of the message. Often, the header boundary is prepended with two dashes and the final boundary has two dashes appended at the end.

Examples

Content-Type in HTML forms

In a  request, resulting from an HTML form submission, the Content-Type of the request is specified by the enctype attribute on the  element.

<form action="/" method="post" enctype="multipart/form-data">

<input type="text" name="description" value="some text">

<input type="file" name="myFile">

<button type="submit">Submit</button>

</form>

The request looks something like this (less interesting headers are omitted here):

POST /foo HTTP/1.1

Content-Length: 68137

Content-Type: multipart/form-data; boundary=---------------------------974767299852498929531610575

-----------------------------974767299852498929531610575

Content-Disposition: form-data; name="description"

some text

-----------------------------974767299852498929531610575

Content-Disposition: form-data; name="myFile"; filename="foo.txt"

Content-Type: text/plain

(content of the uploaded file foo.txt)

-----------------------------974767299852498929531610575--

Specifications

Specification

Title

Hypertext Transfer Protocol (HTTP/1.1): Range Requests

Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content

Browser compatibility

See also

and

Partial Content