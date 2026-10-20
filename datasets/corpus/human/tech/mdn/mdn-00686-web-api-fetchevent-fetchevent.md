# FetchEvent()

The FetchEvent() constructor creates a new  object.

Syntax

var fetchEvent = new FetchEvent(type, init);

Parameters

type

A  object specifying which event the object represents. This is always fetch for Fetch events.

init

An object conforming to the  dictionary, containing options to apply to the event object. Options are as follows:

clientId

The  that the current service worker is controlling.

isReload

A  that signifies whether the page was reloaded or not when the event was dispatched. true if yes, and false if not. Typically, pressing the refresh button in a browser is a reload, while clicking a link and pressing the back button is not. If not present, it defaults to false.

preloadResponse

A  which returns a previously-loaded response to the client.

replacesClientId

A  which identifies the client which is being replaced by resultingClientId.

resultingClientId

A  containing the new clientId if the client changes as a result of the page load.

request

The  object that would have triggered the event handler.

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

See also

Fetch API