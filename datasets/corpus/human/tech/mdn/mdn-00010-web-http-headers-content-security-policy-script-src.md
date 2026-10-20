# CSP: script-src

The HTTP  (CSP) script-src directive specifies valid sources for JavaScript. This includes not only URLs loaded directly into  elements, but also things like inline script event handlers (onclick) and XSLT stylesheets which can trigger script execution.

CSP version

1

Directive type

fallback

Yes. If this directive is absent, the user agent will look for the default-src directive.

Syntax

One or more sources can be allowed for the script-src policy:

Content-Security-Policy: script-src <source>;

Content-Security-Policy: script-src <source> <source>;

Sources

Examples

Violation case

Given this CSP header:

Content-Security-Policy: script-src https://example.com/

the following script is blocked and won't be loaded or executed:

<script src="https://not-example.com/js/library.js"></script>

Note that inline event handlers are blocked as well:

<button id="btn" onclick="doSomething()">

You should replace them with  calls:

document.getElementById("btn").addEventListener('click', doSomething);

Unsafe inline script

Note: Disallowing inline styles and inline scripts is one of the biggest security wins CSP provides. However, if you absolutely have to use it, there are a few mechanisms that will allow them.

To allow inline scripts and inline event handlers, 'unsafe-inline', a nonce-source or a hash-source that matches the inline block can be specified.

Content-Security-Policy: script-src 'unsafe-inline';

The above Content Security Policy will allow inline  elements

<script>

var inline = 1;

</script>

You can use a nonce-source to only allow specific inline script blocks:

Content-Security-Policy: script-src 'nonce-2726c7f26c'

You will have to set the same nonce on the  element:

<script nonce="2726c7f26c">

var inline = 1;

</script>

Alternatively, you can create hashes from your inline scripts. CSP supports sha256, sha384 and sha512.

Content-Security-Policy: script-src 'sha256-B2yPHKaXnvFWtRChIbabYmUBFZdVfKKXHbWtWidDVF8='

When generating the hash, don't include the  tags and note that capitalization and whitespace matter, including leading or trailing whitespace.

<script>var inline = 1;</script>

Unsafe eval expressions

The 'unsafe-eval' source expression controls several script execution methods that create code from strings. If 'unsafe-eval' isn't specified with the script-src directive, the following methods are blocked and won't have any effect:

When passing a string literal like to methods like: window.setTimeout("alert(\"Hello World!\");", 500);

(IE < 11 only)

strict-dynamic

The 'strict-dynamic' source expression specifies that the trust explicitly given to a script present in the markup, by accompanying it with a nonce or a hash, shall be propagated to all the scripts loaded by that root script. At the same time, any whitelist or source expressions such as 'self' or 'unsafe-inline' will be ignored. For example, a policy such as script-src 'strict-dynamic' 'nonce-R4nd0m' https://whitelisted.com/ would allow loading of a root script with <script nonce="R4nd0m" src="https://example.com/loader.js"> and propagate that trust to any script loaded by loader.js, but disallow loading scripts from https://whitelisted.com/ unless accompanied by a nonce or loaded from a trusted script.

script-src 'strict-dynamic' 'nonce-someNonce'

Or

script-src 'strict-dynamic' 'sha256-base64EncodedHash'

It is possible to deploy strict-dynamic in a backwards compatible way, without requiring user-agent sniffing.

The policy:

script-src 'unsafe-inline' https: 'nonce-abcdefg' 'strict-dynamic'

will act like 'unsafe-inline' https: in browsers that support CSP1, https: 'nonce-abcdefg' in browsers that support CSP2, and 'nonce-abcdefg' 'strict-dynamic' in browsers that support CSP3.

Specifications

Specification

Status

Comment

No changes.

Initial definition.

Browser compatibility

See also