# CredentialsContainer.get()

The get() method of the  interface returns a  to a single  instance that matches the provided parameters. If no match is found the Promise will resolve to null.

This method first collects all credentials in the  that meet the necessary criteria (defined in the options argument). From the resulting set of credentials, it then selects the best one. Depending on the options, it may display a dialog to the user and ask the user to make the selection.

This method collects credentials by calling the "CollectFromCredentialStore" method for each credential type allowed by the options argument. For example: if options.password exists, then the .[[CollectFromCredentialStore]] is called.

This method is restricted to top-level contexts. Calls to it within an <iframe> element will resolve without effect.

Syntax

var promise = CredentialsContainer.get([options])

Parameters

options

An object of type  that contains options for the request. The options include criteria that the credentials are required or allowed to have, and options for interacting with the user. It can contain the following properties:

password: a  indicating that returned  instances should include user (as opposed to federated) credentials.

federated: A  object containing requirements for returned federated credentials. The available options are:

providers: An array of  instances of identity providers to search for.

protocols An array of  instances of federation protocols to search for.

publicKey: An  object containing requirements for returned WebAuthn credentials.

mediation: A  indicating whether the user will be required to log on for every visit to the website. Valid values are "silent", "optional", or "required".

unmediated:  A  indicating the returned  instance should not require user mediation.

signal: An instance of  that can indicate that an ongoing get() operation should be halted. An aborted operation may complete normally (generally if the abort was received after the operation finished) or reject with an "AbortError" .

Returns

A  that resolves with a  instance that matches the provided parameters. If a single Credential cannot be unambiguously obtained, the Promise will resolve to null.

Specifications

Specification

Status

Comment

Initial definition.

Initial definition.

Browser compatibility

See also

directive