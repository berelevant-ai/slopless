# DedicatedWorkerGlobalScope

The DedicatedWorkerGlobalScope object (the  global scope) is accessible through the  keyword. Some additional global functions, namespaces objects, and constructors, not typically associated with the worker global scope, but available on it, are listed in the JavaScript Reference. See also: Functions available to workers.

Properties

This interface inherits properties from the  interface, and its parent , and therefore implements properties from , , and .

The name that the  was (optionally) given when it was created using the  constructor. This is mainly useful for debugging purposes.

Properties inherited from WorkerGlobalScope

Returns an object reference to the DedicatedWorkerGlobalScope object itself.

Returns the  associated with the worker.

Returns the  associated with the worker. WorkerLocation is a specific location object, mostly a subset of the  for browsing scopes, but adapted to workers.

Returns the  associated with the worker. WorkerNavigator is a specific navigator object, mostly a subset of the  for browsing scopes, but adapted to workers.

Returns the  object associated with the worker, which is a regular performance object, but with a subset of its properties and methods available.

Event handlers

This interface inherits event handlers from the  interface, and its parent , and therefore implements event handlers from , , and .

Is an  representing the code to be called when the  event is raised. These events are of type  and will be called when the worker receives a message from the document that started it (i.e. from the  method.)

Is an  representing the code to be called when the  event is raised.

Methods

This interface inherits methods from the  interface, and its parent , and therefore implements methods from , , and .

Discards any tasks queued in the WorkerGlobalScope's event loop, effectively closing this particular scope.

Sends a message — which can consist of any JavaScript object — to the parent document that first spawned the worker.

Inherited from WorkerGlobalScope

Writes a message to the console.

Imports one or more scripts into the worker's scope. You can specify as many as you'd like, separated by commas. For example: importScripts('foo.js', 'bar.js');

Implemented from other places

Decodes a string of data which has been encoded using base-64 encoding.

Creates a base-64 encoded ASCII string from a string of binary data.

Cancels the repeated execution set using .

Cancels the repeated execution set using .

Schedules the execution of a function every X milliseconds.

Sets a delay for executing a function.

Events

message

Fired when the worker receives a message from its parent.

Also available via the onmessage property.

messageerror

Fired when a worker receives a message that can't be deserialized.

Also available via the onmessageerror property.

Specifications

Specification

Status

Comment

Browser compatibility

See also

Using web workers

Functions available to workers