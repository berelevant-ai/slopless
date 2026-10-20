# Clients.claim()

The claim() method of the  interface allows an active service worker to set itself as the  for all clients within its . This triggers a "controllerchange" event on  in any clients that become controlled by this service worker.

When a service worker is initially registered, pages won't use it until they next load. The claim() method causes those pages to be controlled immediately. Be aware that this results in your service worker controlling pages that loaded regularly over the network, or possibly via a different service worker.

Syntax

await clients.claim();

Parameters

None.

Return value

A  that resolves to undefined.

Example

The following example uses claim() inside service worker's "activate" event listener so that clients loaded in the same scope do not need to be reloaded before their fetches will go through this service worker.

self.addEventListener('activate', event => {

event.waitUntil(clients.claim());

});

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

See also

Using Service Workers

The service worker lifecycle

Is ServiceWorker ready?

- skip the service worker's waiting phase