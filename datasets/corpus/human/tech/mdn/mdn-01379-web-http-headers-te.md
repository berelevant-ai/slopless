# TE

The TE request header specifies the transfer encodings the user agent is willing to accept. (you could informally call it Accept-Transfer-Encoding, which would be more intuitive).

In HTTP/2 - the TE header field is only accepted if the trailers value is set.

See also the  response header for more details on transfer encodings. Note that chunked is always acceptable for HTTP/1.1 recipients and you don't have to specify "chunked" using the TE header. However, it is useful for setting if the client is accepting trailer fields in a chunked transfer coding using the "trailers" value.

Header type

yes

Syntax

TE: compress

TE: deflate

TE: gzip

TE: trailers

// Multiple directives, weighted with the  syntax:

TE: trailers, deflate;q=0.5

Directives

compress

A format using the Lempel-Ziv-Welch (LZW) algorithm is accepted as a transfer coding name.

deflate

Using the zlib structure is accepted as a transfer coding name.

gzip

A format using the Lempel-Ziv coding (LZ77), with a 32-bit CRC is accepted as a transfer coding name.

trailers

Indicates that the client is willing to accept trailer fields in a chunked transfer coding.

q

When multiple transfer codings are acceptable, the q parameter of the quality value syntax can rank codings by preference.

Specifications

Specification

Title

Hypertext Transfer Protocol (HTTP/1.1): Message Syntax and Routing

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also

Chunked transfer encoding