# ContentIndexEvent()

The ContentIndexEvent() constructor creates a new  object whose type and other options are configured as specified.

Syntax

var ContentIndexEvent = new ContentIndexEvent(type, ContentIndexEventInit);

Parameters

type

A  indicating the event which occurred. For ContentIndexEvent, this is always delete.

eventInitDict

An options object containing any initialization data you want to populate the ContentIndexEvent object with. The options are:

id: The id of the indexed content you want the ContentIndexEvent to remove.

Return value

A  object configured using the given inputs.

Examples

This examples constructs a new  with the relevant id.

var removeData = {

id : 'unique-content-id'

}

var ciEvent = new ContentIndexEvent('contentdelete', removeData);

ciEvent.id; // should return 'unique-content-id'

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

See also

An introductory article on the Content Index API

An app which uses the Content Index API to list and remove 'save for later' content

Service Worker API, along with information about Cache and CacheStorage