# CredentialsContainer.store()

The store() method of the  stores a set of credentials for the user inside a  instance, returning this in a .

This method is restricted to top-level contexts. Calls to it within an <iframe> element will resolve without effect.

Syntax

CredentialsContainer.store(Credential).then(function(Credential) { ... } )

Parameters

Credentials

A valid  instance.

Returns

A , resolving to the passed  instance.

Example

Storing a password credential at successeful authentication

This code would be executed after a user signs up or logs in and the server confirms the credential is correct.

// Check if the browser supports password credentials (and the Credential Management API)

if ("PasswordCredential" in window) {

let credential = new PasswordCredential({

id: "example-username",

name: "John Doe", // In case of a login, the name comes from the server.

password: "correct horse battery staple"

});

navigator.credentials.store(credential).then(() => {

console.info("Credential stored in the user agent's credential manager.");

}, (err) => {

console.error("Error while storing the credential: ", err);

});

}

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility