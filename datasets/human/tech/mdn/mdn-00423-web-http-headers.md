# HTTP headers

HTTP headers let the client and the server pass additional information with an HTTP request or response. An HTTP header consists of its case-insensitive name followed by a colon (:), then by its value.  before the value is ignored.

Custom proprietary headers have historically been used with an X- prefix, but this convention was deprecated in June 2012 because of the inconveniences it caused when nonstandard fields became standard in RFC 6648; others are listed in an IANA registry, whose original content was defined in RFC 4229. IANA also maintains a registry of proposed new HTTP headers.

Headers can be grouped according to their contexts:

apply to both requests and responses, but with no relation to the data transmitted in the body.

contain more information about the resource to be fetched, or about the client requesting the resource.

hold additional information about the response, like its location or about the server providing it.

contain information about the body of the resource, like its content length or MIME type.

Headers can also be grouped according to how  handle them:

(see also Protocol upgrade mechanism).

End-to-end headers

These headers must be transmitted to the final recipient of the message: the server for a request, or the client for a response. Intermediate proxies must retransmit these headers unmodified and caches must store them.

Hop-by-hop headers

These headers are meaningful only for a single transport-level connection, and must not be retransmitted by proxies or cached. Note that only hop-by-hop headers may be set using the  general header.

Authentication

Defines the authentication method that should be used to access a resource.

Contains the credentials to authenticate a user-agent with a server.

Defines the authentication method that should be used to access a resource behind a proxy server.

Contains the credentials to authenticate a user agent with a proxy server.

Caching

The time, in seconds, that the object has been in a proxy cache.

Directives for caching mechanisms in both requests and responses.

Clears browsing data (e.g. cookies, storage, cache) associated with the requesting website.

The date/time after which the response is considered stale.

Implementation-specific header that may have various effects anywhere along the request-response chain. Used for backwards compatibility with HTTP/1.0 caches where the Cache-Control header is not yet present.

General warning information about possible problems.

Client hints

HTTP  are a work in progress. Actual documentation can be found on the website of the HTTP working group.

Servers can advertise support for Client Hints using the Accept-CH header field or an equivalent HTML <meta> element with http-equiv attribute ([HTML5]).

Servers can ask the client to remember the set of Client Hints that the server supports for a specified period of time, to enable delivery of Client Hints on subsequent requests to the server’s origin ([RFC6454]).

Indicates that the request has been conveyed in early data.

Technically a part of Device Memory API, this header represents an approximate amount of RAM client has.

A boolean that indicates the user agent's preference for reduced data usage.

A number that indicates the layout viewport width in CSS pixels. The provided pixel value is a number rounded to the smallest following integer (i.e. ceiling value).

If Viewport-Width occurs in a message more than once, the last value overrides all previous occurrences.

The Width request header field is a number that indicates the desired resource width in physical pixels (i.e. intrinsic size of an image). The provided pixel value is a number rounded to the smallest following integer (i.e. ceiling value).

If the desired resource width is not known at the time of the request or the resource does not have a display width, the Width header field can be omitted. If Width occurs in a message more than once, the last value overrides all previous occurrences

Conditionals

The last modification date of the resource, used to compare several versions of the same resource. It is less accurate than , but easier to calculate in some environments. Conditional requests using  and  use this value to change the behavior of the request.

A unique string identifying the version of the resource. Conditional requests using  and  use this value to change the behavior of the request.

Makes the request conditional, and applies the method only if the stored resource matches one of the given ETags.

Makes the request conditional, and applies the method only if the stored resource doesn't match any of the given ETags. This is used to update caches (for safe requests), or to prevent to upload a new resource when one already exists.

Makes the request conditional, and expects the entity to be transmitted only if it has been modified after the given date. This is used to transmit data only when the cache is out of date.

Makes the request conditional, and expects the entity to be transmitted only if it has not been modified after the given date. This ensures the coherence of a new fragment of a specific range with previous ones, or to implement an optimistic concurrency control system when modifying existing documents.

Determines how to match request headers to decide whether a cached response can be used rather than requesting a fresh one from the origin server.

Connection management

Controls whether the network connection stays open after the current transaction finishes.

Controls how long a persistent connection should stay open.

Content negotiation

Informs the server about the  of data that can be sent back.

Which  the client understands.

The encoding algorithm, usually a compression algorithm, that can be used on the resource sent back.

Informs the server about the human language the server is expected to send back. This is a hint and is not necessarily under the full control of the user: the server should always pay attention not to override an explicit user choice (like selecting a language from a dropdown).

Controls

Indicates expectations that need to be fulfilled by the server to properly handle the request.

Cookies

Contains stored HTTP cookies previously sent by the server with the  header.

Send cookies from the server to the user-agent.

Contains an HTTP cookie previously sent by the server with the  header, but has been obsoleted. Use  instead.

Sends cookies from the server to the user-agent, but has been obsoleted. Use  instead.

CORS

Learn more about CORS here.

Indicates whether the response can be shared.

Indicates whether the response to the request can be exposed when the credentials flag is true.

Used in response to a  to indicate which HTTP headers can be used when making the actual request.

Specifies the methods allowed when accessing the resource in response to a preflight request.

Indicates which headers can be exposed as part of the response by listing their names.

Indicates how long the results of a preflight request can be cached.

Used when issuing a preflight request to let the server know which HTTP headers will be used when the actual request is made.

Used when issuing a preflight request to let the server know which HTTP method will be used when the actual request is made.

Indicates where a fetch originates from.

Specifies origins that are allowed to see values of attributes retrieved via features of the Resource Timing API, which would otherwise be reported as zero due to cross-origin restrictions.

Do Not Track

Expresses the user's tracking preference.

Indicates the tracking status of the corresponding response.

Downloads

Indicates if the resource transmitted should be displayed inline (default behavior without the header), or if it should be handled like a download and the browser should present a “Save As” dialog.

Message body information

The size of the resource, in decimal number of bytes.

Indicates the media type of the resource.

Used to specify the compression algorithm.

Describes the human language(s) intended for the audience, so that it allows a user to differentiate according to the users' own preferred language.

Indicates an alternate location for the returned data.

Proxies

Contains information from the client-facing side of proxy servers that is altered or lost when a proxy is involved in the path of the request.

Identifies the originating IP addresses of a client connecting to a web server through an HTTP proxy or a load balancer.

Identifies the original host requested that a client used to connect to your proxy or load balancer.

Identifies the protocol (HTTP or HTTPS) that a client used to connect to your proxy or load balancer.

Added by proxies, both forward and reverse proxies, and can appear in the request headers and the response headers.

Redirects

Indicates the URL to redirect a page to.

Request context

Contains an Internet email address for a human user who controls the requesting user agent.

Specifies the domain name of the server (for virtual hosting), and (optionally) the TCP port number on which the server is listening.

The address of the previous web page from which a link to the currently requested page was followed.

Governs which referrer information sent in the  header should be included with requests made.

Contains a characteristic string that allows the network protocol peers to identify the application type, operating system, software vendor or software version of the requesting software user agent. See also the Firefox user agent string reference.

Response context

Lists the set of HTTP request methods supported by a resource.

Contains information about the software used by the origin server to handle the request.

Range requests

Indicates if the server supports range requests, and if so in which unit the range can be expressed.

Indicates the part of a document that the server should return.

Creates a conditional range request that is only fulfilled if the given etag or date matches the remote resource. Used to prevent downloading two ranges from incompatible version of the resource.

Indicates where in a full body message a partial message belongs.

Security

()

Allows a server to declare an embedder policy for a given document.

()

Prevents other domains from opening/controlling a window.

()

Prevents other domains from reading the response of the resources to which this header is applied.

()

Controls resources the user agent is allowed to load for a given page.

Allows web developers to experiment with policies by monitoring, but not enforcing, their effects. These violation reports consist of  documents sent via an HTTP POST request to the specified URI.

Allows sites to opt in to reporting and/or enforcement of Certificate Transparency requirements, which prevents the use of misissued certificates for that site from going unnoticed. When a site enables the Expect-CT header, they are requesting that Chrome check that any certificate for that site appears in public CT logs.

Provides a mechanism to allow and deny the use of browser features in its own frame, and in iframes that it embeds.

Provides a mechanism to allow web applications to isolate their origins.

()

Force communication using HTTPS instead of HTTP.

Sends a signal to the server expressing the client’s preference for an encrypted and authenticated response, and that it can successfully handle the  directive.

Disables MIME sniffing and forces browser to use the type given in .

The X-Download-Options HTTP header indicates that the browser (Internet Explorer) should not display the option to "Open" a file that has been downloaded from an application, to prevent phishing attacks as the file otherwise would gain access to execute in the context of the application. (Note: related MS Edge bug).

(XFO)

Indicates whether a browser should be allowed to render a page in a , ,  or .

Specifies if a cross-domain policy file (crossdomain.xml) is allowed. The file may define a policy to grant clients, such as Adobe's Flash Player (now obsolete), Adobe Acrobat, Microsoft Silverlight (now obsolete), or Apache Flex, permission to handle data across domains that would otherwise be restricted due to the Same-Origin Policy. See the Cross-domain Policy File Specification for more information.

May be set by hosting environments or other frameworks and contains information about them while not providing any usefulness to the application or its visitors. Unset this header to avoid exposing potential vulnerabilities.

Enables cross-site scripting filtering.

HTTP Public Key Pinning ()

HTTP Public Key Pinning has been deprecated and removed in favor of Certificate Transparency and .

Associates a specific cryptographic public key with a certain web server to decrease the risk of  attacks with forged certificates.

Sends reports to the report-uri specified in the header and does still allow clients to connect to the server even if the pinning is violated.

Fetch metadata request headers

It is a request header that indicates the relationship between a request initiator's origin and its target's origin. It is a Structured Header whose value is a token with possible values cross-site, same-origin, same-site, and none.

It is a request header that indicates the request's mode to a server. It is a Structured Header whose value is a token with possible values cors, navigate, nested-navigate, no-cors, same-origin, and websocket.

It is a request header that indicates whether or not a navigation request was triggered by user activation. It is a Structured Header whose value is a boolean so possible values are ?0 for false and ?1 for true.

It is a request header that indicates the request's destination to a server. It is a Structured Header whose value is a token with possible values audio, audioworklet, document, embed, empty, font, image, manifest, object, paintworklet, report, script, serviceworker, sharedworker, style, track, video, worker, xslt, and nested-document.

Server-sent events

...

Defines a mechanism that enables developers to declare a network error reporting policy.

...

...

Used to specify a server endpoint for the browser to send warning and error reports to.

Transfer coding

Specifies the form of encoding used to safely transfer the entity to the user.

Specifies the transfer encodings the user agent is willing to accept.

Allows the sender to include additional fields at the end of chunked message.

WebSockets

...

...

...

...

...

Other

A client can express the desired push policy for a request by sending an Accept-Push-Policy header field in the request.

A client can send the Accept-Signature header field to indicate intention to take advantage of any available signatures and to indicate what kinds of signatures it supports.

Used to list alternate ways to reach this service.

Contains the date and time at which the message was originated.

Tells the browser that the page being loaded is going to want to perform a large allocation.

The Link entity-header field provides a means for serialising one or more links in HTTP headers. It is semantically equivalent to the HTML  element.

A Push-Policy defines the server behavior regarding push when processing a request.

Indicates how long the user agent should wait before making a follow-up request.

The Signature header field conveys a list of signatures for an exchange, each one accompanied by information about how to determine the authority of and refresh that signature.

The Signed-Headers header field identifies an ordered list of response header fields to include in a signature.

Communicates one or more metrics and descriptions for the given request-response cycle.

Used to remove the path restriction by including this header in the response of the Service Worker script.

Links generated code to a source map.

The relevant RFC document for the Upgrade header field is RFC 7230, section 6.7. The standard establishes rules for upgrading or changing to a different protocol on the current client, server, transport protocol connection. For example, this header standard allows a client to change from HTTP 1.1 to HTTP 2.0, assuming the server decides to acknowledge and implement the Upgrade header field. Neither party is required to accept the terms specified in the Upgrade header field. It can be used in both client and server headers. If the Upgrade header field is specified, then the sender MUST also send the Connection header field with the upgrade option specified. For details on the Connection header field please see section 6.1 of the aforementioned RFC.

Controls DNS prefetching, a feature by which browsers proactively perform domain name resolution on both links that the user may choose to follow as well as URLs for items referenced by the document, including images, CSS, JavaScript, and so forth.

...

...

...

The X-Robots-Tag HTTP header is used to indicate how a web page is to be indexed within public search engine results. The header is effectively equivalent to <meta name="robots" content="...">.

Used by Internet Explorer to signal which document mode to use.

Contributing

You can help by writing new entries or improving the existing ones.

See also

Wikipedia page on List of HTTP headers

IANA registry

HTTP Working Group