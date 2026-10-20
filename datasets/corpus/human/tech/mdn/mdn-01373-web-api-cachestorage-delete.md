# CacheStorage.delete()

The delete() method of the  interface finds the  object matching the cacheName, and if found, deletes the  object and returns a  that resolves to true. If no  object is found, it resolves to false.

You can access CacheStorage through the global  property.

Syntax

caches.delete(cacheName).then(function(boolean) {

// your cache is now deleted

});

Parameters

cacheName

The name of the cache you want to delete.

Return value

a  that resolves to true if the  object is found and deleted, and false otherwise.

Examples

In this code snippet we wait for an activate event, and then run a  block that clears up any old, unused caches before a new service worker is activated. Here we have an array of cache names we want to keep (cachesToKeep). We return the keys of the caches in the  object using , then check each key to see if it is in the array. If not, we delete it using delete().

this.addEventListener('activate', function(event) {

var cachesToKeep = ['v2'];

event.waitUntil(

caches.keys().then(function(keyList) {

return Promise.all(keyList.map(function(key) {

if (cachesToKeep.indexOf(key) === -1) {

return caches.delete(key);

}

}));

})

);

});

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

See also

Using Service Workers