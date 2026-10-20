# Range

The Range HTTP request header indicates the part of a document that the server should return. Several parts can be requested with one Range header at once, and the server may send back these ranges in a multipart document. If the server sends back ranges, it uses the  Partial Content for the response. If the ranges are invalid, the server returns the  Range Not Satisfiable error. The server can also ignore the Range header and return the whole document with a  status code.

Header type

no

Syntax

Range: <unit>=<range-start>-

Range: <unit>=<range-start>-<range-end>

Range: <unit>=<range-start>-<range-end>, <range-start>-<range-end>

Range: <unit>=<range-start>-<range-end>, <range-start>-<range-end>, <range-start>-<range-end>

Range: <unit>=-<suffix-length>

Directives

<unit>

The unit in which ranges are specified. This is usually bytes.

<range-start>

An integer in the given unit indicating the beginning of the request range.

<range-end>

An integer in the given unit indicating the end of the requested range. This value is optional and, if omitted, the end of the document is taken as the end of the range.

<suffix-length>

An integer in the given unit indicating the number of units at the end of the file to return.

Examples

Requesting three ranges from the file.

Range: bytes=200-1000, 2000-6576, 19000-

Requesting the first 500 and last 500 bytes of the file. The request may be rejected by the server if the ranges overlap.

Range: bytes=0-499, -500

Specifications

Specification

Title

Hypertext Transfer Protocol (HTTP/1.1): Range Requests

Browser compatibility

See also

Partial Content

Range Not Satisfiable