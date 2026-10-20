# PresentationRequest

A PresentationRequest object is used to initiate or reconnect to a presentation made by a controlling browsing context. The PresentationRequest object MUST be implemented in a controlling browsing context provided by a controlling user agent.

When a PresentationRequest is constructed, the given urls MUST be used as the list of presentation request URLs which are each a possible presentation URL for the PresentationRequest instance.

Constructor

Creates a PresentationRequest.

Properties

None

Event handlers

Fires on a successful call to  or . This method provides a object with a reference to the created or joined object.

Methods

Returns a  that resolves with a  after the user agent prompts the user to select a display and grant permission to use that display.

When the reconnect(presentationId) method is called on a PresentationRequest presentationRequest, the user agent MUST run the following steps to reconnect to a presentation.

When the getAvailability() method is called, the user agent MUST run the steps as the link.

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility