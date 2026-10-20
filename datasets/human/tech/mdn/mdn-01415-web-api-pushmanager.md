# PushManager

The PushManager interface of the Push API provides a way to receive notifications from third-party servers as well as request URLs for push notifications.

This interface is accessed via the  property.

Note: This interface replaces functionality previously offered by the obsolete  interface.

Properties

Returns an array of supported content codings that can be used to encrypt the payload of a push message.

Methods

Retrieves an existing push subscription. It returns a  that resolves to a  object containing details of an existing subscription. If no existing subscription exists, this resolves to a null value.

Returns a  that resolves to the permission state of the current , which will be one of 'granted', 'denied', or 'prompt'.

Subscribes to a push service. It returns a  that resolves to a  object containing details of a push subscription. A new push subscription is created if the current service worker does not have an existing subscription.

Deprecated methods

Returns a  that resolves to the PushPermissionStatus of the requesting webapp, which will be one of granted, denied, or default. Replaced by .

Subscribes to a push subscription. Replaced by .

Retrieves existing push subscriptions. Replaced by .

Unregisters and deletes a specified subscription endpoint. In the updated API, a subscription is unregistered by calling the  method.

Example

this.onpush = function(event) {

console.log(event.data);

// From here we can write the data to IndexedDB, send it to any open

// windows, display a notification, etc.

}

navigator.serviceWorker.register('serviceworker.js').then(

function(serviceWorkerRegistration) {

serviceWorkerRegistration.pushManager.subscribe().then(

function(pushSubscription) {

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

Service Worker API