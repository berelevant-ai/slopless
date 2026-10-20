# Permissions API

The Permissions API provides a consistent programmatic way to query the status of API permissions attributed to the current context. For example, the Permissions API can be used to determine if permission to access a particular API has been granted or denied.

Note: This feature is available in Web Workers (although not current versions of Firefox, as WorkerNavigator.permissions is not implemented).

Concepts and usage

Historically different APIs handle their own permissions inconsistently — for example the Notifications API allows for explicit checking of permission status and requesting permission, whereas the Geolocation API doesn't (which causes problems if the user denied the initial permission request). The Permissions API provides the tools to allow developers to implement a better user experience as far as permissions are concerned.

The permissions property has been made available on the  object, both in the standard browsing context and the worker context ( — so permission checks are available inside workers), and returns a  object that provides access to the Permissions API functionality.

Once you have this object you can then perform permission-related tasks, for example querying a permission using the  method to return a promise that resolves with the  for a specific API.

Not all APIs' permission statuses can be queried using the Permissions API. Notable APIs that are Permissions-aware include:

Clipboard API

Notifications API

Push API

Web MIDI API

More APIs will gain Permissions API support over time.

Examples

We have made a simple example available called Location Finder. You can run the example live, or view the source code on Github.

Read more about how it works in our article Using the Permissions API.

Interfaces

and

Provides access to the  object from the main context and worker context respectively.

Provides the core Permission API functionality, such as methods for querying and revoking permissions.

Provides access to the current status of a permission, and an event handler to respond to changes in permission status.

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

Permissions interface

See also

Using the Permissions API

Using the Permissions API to Detect How Often Users Allow or Deny Camera Access

Privacy, permissions, and information security