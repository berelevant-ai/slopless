# ServiceWorker

The ServiceWorker interface of the Service Worker API provides a reference to a service worker. Multiple  (e.g. pages, workers, etc.) can be associated with the same service worker, each through a unique ServiceWorker object.

A ServiceWorker object is available in the  property, and the  property — this is a service worker that has been activated and is controlling the page (the service worker has been successfully registered, and the controlled page has been reloaded.)

The ServiceWorker interface is dispatched a set of lifecycle events — install and activate — and functional events including fetch. A ServiceWorker object has an associated , related to its lifecycle.

Properties

The ServiceWorker interface inherits properties from its parent, .

Returns the ServiceWorker serialized script URL defined as part of . The URL must be on the same origin as the document that registers the ServiceWorker.

Returns the state of the service worker. It returns one of the following values: installing, installed, activating, activated, or redundant.

Event handlers

An  property called whenever an event of type statechange is fired; it is basically fired anytime the  changes.

Methods

The ServiceWorker interface inherits methods from its parent, , with the exception of  — this should not be accessible from service workers.

Examples

This code snippet is from the service worker registration-events sample (live demo). The code listens for any change in the  and returns its value.

if ('serviceWorker' in navigator) {

navigator.serviceWorker.register('service-worker.js', {

scope: './'

}).then(function (registration) {

var serviceWorker;

if (registration.installing) {

serviceWorker = registration.installing;

document.querySelector('#kind').textContent = 'installing';

} else if (registration.waiting) {

serviceWorker = registration.waiting;

document.querySelector('#kind').textContent = 'waiting';

} else if (registration.active) {

serviceWorker = registration.active;

document.querySelector('#kind').textContent = 'active';

}

if (serviceWorker) {

// logState(serviceWorker.state);

serviceWorker.addEventListener('statechange', function (e) {

// logState(e.target.state);

});

}

}).catch (function (error) {

// Something went wrong during registration. The service-worker.js file

// might be unavailable or contain a syntax error.

});

} else {

// The current browser doesn't support service workers.

}

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

See also

ServiceWorker Cookbook

Using Service Workers

Service worker basic code example

Is ServiceWorker ready?

Using web workers