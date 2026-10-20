# 406 Not Acceptable

The HyperText Transfer Protocol (HTTP) 406 Not Acceptable client error response code indicates that the server cannot produce a response matching the list of acceptable values defined in the request's proactive content negotiation headers, and that the server is unwilling to supply a default representation.

Proactive content negotiation headers include:

In practice, this error is very rarely used. Instead of responding using this error code, which would be cryptic for the end user and difficult to fix, servers ignore the relevant header and serve an actual page to the user. It is assumed that even if the user won't be completely happy, they will prefer this to an error code.

If a server returns such an error status, the body of the message should contain the list of the available representations of the resources, allowing the user to choose among them.

Status

406 Not Acceptable

Specifications

Specification

Title

Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content

Browser compatibility

The information shown below has been pulled from MDN's GitHub (https://github.com/mdn/browser-compat-data).

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also

HTTP content negotiation