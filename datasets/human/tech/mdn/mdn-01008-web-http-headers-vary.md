# Vary

The Vary HTTP response header determines how to match future request headers to decide whether a cached response can be used rather than requesting a fresh one from the origin server. It is used by the server to indicate which headers it used when selecting a representation of a resource in a content negotiation algorithm.

The Vary header should be set on a  Not Modified response exactly like it would have been set on an equivalent  OK response.

Header type

no

Syntax

Vary: *

Vary: <header-name>, <header-name>, ...

Directives

*

Each request for a URL is supposed to be treated as a unique and uncacheable request. A better way to indicate this is to use : no-store, which is clearer to read and also signals that the object shouldn't be stored ever.

<header-name>

A comma-separated list of header names to take into account when deciding whether or not a cached response can be used.

Examples

Dynamic serving

When using the Vary: User-Agent header, caching servers should consider the user agent when deciding whether to serve the page from cache. For example, if you are serving different content to mobile users, it can help you to avoid that a cache may mistakenly serve a desktop version of your site to your mobile users. It can help Google and other search engines to discover the mobile version of a page, and might also tell them that no Cloaking is intended.

Vary: User-Agent

Specifications

Specification

Title

Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

Compatibility notes

Vary with care – Vary header problems in IE6-9

See also

Understanding The Vary Header - Smashing Magazine

Best Practices for Using the Vary Header – fastly.com

Content negotiation