# ServiceWorkerRegistration.pushManager

The pushManager property of the  interface returns a reference to the  interface for managing push subscriptions; this includes support for subscribing, getting an active subscription, and accessing push permission status.

Syntax

var pushManager = serviceWorkerRegistration.pushManager;

Value

A  object.

Examples

this.onpush = function(event) {

console.log(event.data);

// From here we can write the data to IndexedDB, send it to any open

// windows, display a notification, etc.

}

navigator.serviceWorker.register('serviceworker.js').then(

function(serviceWorkerRegistration) {

serviceWorkerRegistration.pushManager.subscribe().then(

function(pushSubscription) {

console.log(pushSubscription.subscriptionId);

console.log(pushSubscription.endpoint);

// The push subscription details needed by the application

// server are now available, and can be sent to it using,

// for example, an XMLHttpRequest.

}, function(error) {

// During development it often helps to log errors to the

// console. In a production environment it might make sense to

// also report information about errors back to the

// application server.

console.log(error);

}

);

});

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

See also

Push API