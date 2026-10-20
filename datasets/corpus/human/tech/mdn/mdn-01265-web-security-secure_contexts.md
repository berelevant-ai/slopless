# Secure contexts

A secure context is a Window or Worker for which certain minimum standards of authentication and confidentiality are met. Many Web APIs and features are accessible only in a secure context. The primary goal of secure contexts is to prevent  from accessing powerful APIs that could further compromise the victim of an attack.

Why should some features be restricted?

Some APIs on the web are very powerful, giving an attacker the ability to do the following and more:

Invade a user's privacy.

Get low-level access to a user's computer.

Get access to data such as user credentials.

When is a context considered secure?

A context is considered secure when it meets certain minimum standards of authentication and confidentiality defined in the Secure Contexts specification. A particular document is considered to be in a secure context when it is the active document of a top-level browsing context (basically, a containing window or tab) that is a secure context.

For example, even for a document delivered over TLS within an , its context is not considered secure if it has an ancestor that was not also delivered over TLS.

However, it’s important to note that if a non-secure context causes a new window to be created (with or without specifying noopener), then the fact that the opener was insecure has no effect on whether the new window is considered secure. That’s because the determination of whether or not a particular document is in a secure context is based only on considering it within the top-level browsing context with which it is associated — and not whether a non-secure context happened to be used to create it.

Locally-delivered resources such as those with http://127.0.0.1 URLs, http://localhost and  http://*.localhost URLs (e.g. http://dev.whatever.localhost/), and file:// URLs are also considered to have been delivered securely.

Note: Firefox 84 and later support http://localhost and http://*.localhost URLs as trustworthy origins (earlier versions did not, because localhost was not guaranteed to map to a local/loopback address).

Resources that are not local, to be considered secure, must meet the following criteria:

must be served over https:// or wss:// URLs

the security properties of the network channel used to deliver the resource must not be considered deprecated

Feature detection

Pages can use feature detection to check whether they are in a secure context or not by using the  boolean, which is exposed on the global scope.

if (window.isSecureContext) {

// Page is a secure context so service workers are now available

navigator.serviceWorker.register("/offline-worker.js").then(function () {

...

});

}

Specifications

Specification

Status

Comment

Editor’s Draft

See also

Platform features restricted to secure contexts — a list of the features available only in secure contexts

https://permission.site — A site that allows you to check what API permission checks your browser employs, over HTTP and HTTPS

Strict-Transport-Security HTTP header