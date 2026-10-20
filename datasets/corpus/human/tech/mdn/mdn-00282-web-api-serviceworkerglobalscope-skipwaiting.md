# ServiceWorkerGlobalScope.skipWaiting()

The ServiceWorkerGlobalScope.skipWaiting() method of the  forces the waiting service worker to become the active service worker.

Use this method with  to ensure that updates to the underlying service worker take effect immediately for both the current client and all other active clients.

Syntax

ServiceWorkerGlobalScope.skipWaiting().then(function() {

//Do something

});

Returns

A  that immediately resolves with undefined.

Example

While self.skipWaiting() can be called at any point during the service worker's execution, it will only have an effect if there's a newly installed service worker that might otherwise remain in the waiting state. Therefore, it's common to call self.skipWaiting() from inside of an  handler.

The following example causes a newly installed service worker to progress into the activating state, regardless of whether there is already an active service worker.

self.addEventListener('install', function(event) {

// The promise that skipWaiting() returns can be safely ignored.

self.skipWaiting();

// Perform any other actions required for your

// service worker to install, potentially inside

// of event.waitUntil();

});

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

See also

Using Service Workers

Service workers basic code example

Is ServiceWorker ready?

Using web workers