# Document.domain

The domain property of the  interface gets/sets the domain portion of the  of the current document, as used by the same-origin policy.

Syntax

Getter

const domainString = document.domain

The getter for this property returns the domain portion of the current document's origin. In most cases, this will be the hostname portion of the document's URL. However, there are some exceptions:

If the page has an opaque , e.g. for a page with a data URL, then it will return the empty string.

If the document.domain setter has been used, then it will return the value that was set.

Usually it is better to use the  property instead.

Setter

document.domain = domainString

The setter for this property can be used to change a page's , and thus modify how certain security checks are performed. It can only be set to the same or a parent domain. For example, if https://a.example.com and https://b.example.com both use

document.domain = "example.com";

then they have both modified their origin to have the same domain, and they can now access each other's DOM directly—despite being cross-origin, which would normally prevent such access.

Note that setting document.domain to its current value is not a no-op. It still changes the origin. For example, if one page sets

document.domain = document.domain;

then it will be counted as cross-origin from any other normally-same-origin pages that have not done the same thing.

Deprecation

The document.domain setter is deprecated. It undermines the security protections provided by the same origin policy, and complicates the origin model in browsers, leading to interoperability problems and security bugs.

Attempting to set document.domain is dangerous. It opens up full access to a page's DOM from all subdomains, which is likely not be what is intended. It also removes the port component from the origin, so now your page can be accessed by other pages with the same IP address or same host component, even on a different port.

This is especially insecure on shared hosting. For example, another shared hosting customer is able to host a site at the same IP address but on a different port, then setting document.domain will remove the same-origin protection that normally protects you from that other customer's site accessing your site's data.

Similar problems occur with shared hosting sites that give each customer a different subdomain. If a site sets document.domain, any other customer on a different subdomain can now do the same thing, and start accessing the data of the original site.

Instead of using document.domain to facilitate cross-origin communication, you should use  to send an asynchronous message to the other origin. This controlled access via message-passing is much more secure than the blanket exposure of all data caused by document.domain.

Failures

The setter will throw a "SecurityError"  in several cases:

The   is enabled

The document is inside a sandboxed

The document has no

The document's effective domain is null

The given value is neither the same as the page's current hostname, nor a parent domain of it

As an example of this last failure case, trying to set document.domain to "example.org" when on https://example.com/ will throw.

Additionally, as part of its deprecation, it will do nothing when combined with certain modern isolation features:

If used on a cross-origin isolated page, i.e. one that uses the appropriate values for the  and  HTTP headers

If used on an origin-isolated page, i.e. one that uses the  HTTP header

Finally, setting document.domain does not change the origin used for origin-checks by some Web APIs, preventing sub-domain access via this mechanism. Affected APIs include (but are not limited to): , , ,  .

Examples

Getting the domain

For code running at the URL https://developer.mozilla.org/en-US/docs/Web, this example would set currentDomain to the string "developer.mozilla.org".

const currentDomain = document.domain;

Although the getter is not dangerous in the same way that the setter is, it is likely simpler and more useful to use the  property instead. Then you can avoid document.domain entirely:

const currentHostname = location.hostname;

For the URL https://developer.mozilla.org/en-US/docs/Web, currentHostname is also the string "developer.mozilla.org". Other alternatives that provide slightly different information are , which includes the port, and , which provides the full origin.

Specifications

Specification

Status

Comment

Browser compatibility

See also

Same-origin policy