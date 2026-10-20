# X-XSS-Protection

The HTTP X-XSS-Protection response header is a feature of Internet Explorer, Chrome and Safari that stops pages from loading when they detect reflected cross-site scripting () attacks. Although these protections are largely unnecessary in modern browsers when sites implement a strong  that disables the use of inline JavaScript ('unsafe-inline'), they can still provide protections for users of older web browsers that don't yet support .

Chrome has removed their XSS Auditor

Firefox has not, and will not implement X-XSS-Protection

Edge has retired their XSS filter

This means that if you do not need to support legacy browsers, it is recommended that you use Content-Security-Policy without allowing unsafe-inline scripts instead.

Header type

no

Syntax

X-XSS-Protection: 0

X-XSS-Protection: 1

X-XSS-Protection: 1; mode=block

X-XSS-Protection: 1; report=<reporting-uri>

0

Disables XSS filtering.

1

Enables XSS filtering (usually default in browsers). If a cross-site scripting attack is detected, the browser will sanitize the page (remove the unsafe parts).

1; mode=block

Enables XSS filtering. Rather than sanitizing the page, the browser will prevent rendering of the page if an attack is detected.

1; report=<reporting-URI> (Chromium only)

Enables XSS filtering. If a cross-site scripting attack is detected, the browser will sanitize the page and report the violation. This uses the functionality of the CSP  directive to send a report.

Example

Block pages from loading when they detect reflected XSS attacks:

X-XSS-Protection: 1; mode=block

PHP

header("X-XSS-Protection: 1; mode=block");

Apache (.htaccess)

<IfModule mod_headers.c>

Header set X-XSS-Protection "1; mode=block"

</IfModule>

Nginx

add_header "X-XSS-Protection" "1; mode=block";

Specifications

Not part of any specifications or drafts.

Browser compatibility

See also

Controlling the XSS Filter – Microsoft

Understanding XSS Auditor – Virtue Security

The misunderstood X-XSS-Protection – blog.innerht.ml