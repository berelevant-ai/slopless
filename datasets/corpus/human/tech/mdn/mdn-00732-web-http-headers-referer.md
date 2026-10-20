# Referer

The Referer request header contains the address of the page making the request. When following a link, this would be the url of the page containing the link. When making AJAX requests to another domain, this would be your page's url. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.

Important: Although this header has many innocent uses it can have undesirable consequences for user security and privacy. See Referer header: privacy and security concerns for more information and mitigations.

Note that referer is actually a misspelling of the word "referrer". See  for more details.

A Referer header is not sent by browsers if:

The referring resource is a local "file" or "data" URI.

An unsecured HTTP request is used and the referring page was received with a secure protocol (HTTPS).

Header type

yes

Syntax

Referer: <url>

Directives

<url>

An absolute or partial address of the previous web page from which a link to the currently requested page was followed. URL fragments (i.e. "#section") and userinfo (i.e. "username:password" in "https://username:password@example.com/foo/bar/") are not included.

Examples

Referer: https://developer.mozilla.org/en-US/docs/Web/JavaScript

Specifications

Specification

Title

Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also