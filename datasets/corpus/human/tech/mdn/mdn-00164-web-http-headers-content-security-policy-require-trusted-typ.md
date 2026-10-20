# CSP: require-trusted-types-for

The HTTP  (CSP) require-trusted-types-for  directive instructs user agents to control the data passed to DOM XSS sink functions, like  setter.

When used, those functions only accept non-spoofable, typed values created by Trusted Type policies, and reject strings. Together with trusted-types directive, which guards creation of Trusted Type policies, this allows authors to define rules guarding writing values to the DOM and thus reducing the DOM XSS attack surface to small, isolated parts of the web application codebase, facilitating their monitoring and code review.

Syntax

Content-Security-Policy: require-trusted-types-for 'script';

'script'

Disallows using strings with DOM XSS injection sink functions, and requires matching types created by Trusted Type policies.

Examples

// Content-Security-Policy: require-trusted-types-for 'script'; trusted-types foo;

const attackerInput = '<svg onload="alert(/cross-site-scripting/)" />';

const el = document.createElement('div');

if (typeof trustedTypes !== 'undefined') {

// Create a policy that can create TrustedHTML values

// after sanitizing the input strings with DOMPurify library.

const sanitizer = trustedTypes.createPolicy('foo', {

createHTML: (input) => DOMPurify.sanitize(input)

});

el.innerHTML = sanitizer.createHTML(attackerInput);  // Puts the sanitized value into the DOM.

el.innerHTML = attackerInput;                        // Rejects a string value; throws a TypeError.

}

Polyfill

A polyfill for Trusted Types is available on Github.

Specifications

Specification

Status

Comment

Trusted Types

Draft

Initial definition.

Browser compatibility

See also

Cross-Site Scripting (XSS)

DOM XSS injection sinks covered by Trusted Types

Prevent DOM-based cross-site scripting vulnerabilities with Trusted Types

Trusted Types with DOMPurify XSS sanitizer