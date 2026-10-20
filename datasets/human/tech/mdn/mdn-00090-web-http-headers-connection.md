# Connection

The Connection general header controls whether or not the network connection stays open after the current transaction finishes. If the value sent is keep-alive, the connection is persistent and not closed, allowing for subsequent requests to the same server to be done.

Connection-specific header fields such as  and  are prohibited in HTTP/2. Chrome and Firefox ignore them in HTTP/2 responses, but Safari conforms to the HTTP/2 spec requirements and won’t load any response which contains them.

Except for the standard hop-by-hop headers (, , , , , ,  and ), any hop-by-hop headers used by the message must be listed in the Connection header, so that the first proxy knows it has to consume them and not forward them further. Standard hop-by-hop headers can be listed too (it is often the case of , but this is not mandatory).

Header type

yes

Syntax

Connection: keep-alive

Connection: close

Directives

close

Indicates that either the client or the server would like to close the connection. This is the default on HTTP/1.0 requests.

any comma-separated list of HTTP headers [Usually keep-alive only]

Indicates that the client would like to keep the connection open. Having a persistent connection is the default on HTTP/1.1 requests. The list of headers are the name of the header to be removed by the first non-transparent proxy or cache in-between: these headers define the connection between the emitter and the first entity, not the destination node.

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.