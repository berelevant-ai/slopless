# HTMLIFrameElement.referrerPolicy

The HTMLIFrameElement.referrerPolicy property reflects the HTML  attribute of the  element defining which referrer is sent when fetching the resource.

Syntax

refStr = iframeElt.referrerPolicy;

iframeElt.referrerPolicy = refStr;

Values

no-referrer

The  header will be omitted entirely. No referrer information is sent along with requests.

no-referrer-when-downgrade (default)

This is the user agent's default behavior if no policy is specified. The URL is sent as a referrer when the protocol security level stays the same (HTTP→HTTP, HTTPS→HTTPS), but isn't sent to a less secure destination (HTTPS→HTTP).

origin

Only send the origin of the document as the referrer in all cases.

The document https://example.com/page.html will send the referrer https://example.com/.

origin-when-cross-origin

Send a full URL when performing a same-origin request, but only send the origin of the document for other cases.

same-origin

A referrer will be sent for same-site origins, but cross-origin requests will contain no referrer information.

strict-origin

Only send the origin of the document as the referrer when the protocol security level stays the same (HTTPS→HTTPS), but don't send it to a less secure destination (HTTPS→HTTP).

strict-origin-when-cross-origin

Send a full URL when performing a same-origin request, only send the origin when the protocol security level stays the same (HTTPS→HTTPS), and send no header to a less secure destination (HTTPS→HTTP).

unsafe-url

Send a full URL when performing a same-origin or cross-origin request.

This policy will leak origins and paths from TLS-protected resources to insecure origins. Carefully consider the impact of this setting.

Examples

var iframe = document.createElement("iframe");

iframe.src = "/";

iframe.referrerPolicy = "unsafe-url";

var body = document.getElementsByTagName("body")[0];

body.appendChild(iframe); // Fetch the image using the complete URL as the referrer

Specifications

Specification

Status

Comment

Added the referrerPolicy attribute.

Browser compatibility

See also

, , and .