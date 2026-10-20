# CSP: worker-src

The HTTP  (CSP) worker-src directive specifies valid sources for , , or  scripts.

CSP version

3

Directive type

Fallback

If this directive is absent, the user agent will first look for the  directive, then the  directive, then finally for the  directive, when governing worker execution.

Chrome 59 and higher skips the  directive.

Edge 17 skips the  directive (bug).

Syntax

One or more sources can be allowed for the worker-src policy:

Content-Security-Policy: worker-src <source>;

Content-Security-Policy: worker-src <source> <source>;

Sources

Examples

Violation cases

Given this CSP header:

Content-Security-Policy: worker-src https://example.com/

, ,  are blocked and won't load:

<script>

var blockedWorker = new Worker("data:application/javascript,...");

blockedWorker = new SharedWorker("https://not-example.com/");

navigator.serviceWorker.register('https://not-example.com/sw.js');

</script>

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also

CSP for Web Workers

, ,