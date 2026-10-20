# PublicKeyCredentialRequestOptions

The PublicKeyCredentialRequestOptions dictionary of the Web Authentication API holds the options passed to  in order to fetch a given .

Properties

A , emitted by the relying party's server and used as a cryptographic challenge. This value will be signed by the authenticator and the signature will be sent back as part of .

A numerical hint, in milliseconds, which indicates the time the caller is willing to wait for the retrieval operation to complete. This hint may be overridden by the browser.

A  which indicates the relying party's identifier (ex. "login.example.org"). If this option is not provided, the client will use the current origin's domain.

An  of credentials descriptor which restricts the acceptable existing credentials for retrieval.

A string qualifying how the user verification should be part of the authentication process.

An object with several client extensions' inputs. Those extensions are used to request additional processing (e.g. dealing with legacy FIDO APIs credentials, prompting a specific text on the authenticator, etc.).

Methods

None.

Examples

var options = {

challenge: new Uint8Array([/* bytes sent from the server */]),

rpId: "example.com", /* will only work if the current domain

is something like foo.example.com */

userVerification: "preferred",

timeout: 60000,     // Wait for a minute

allowCredentials: [

{

transports: "usb",

type: "public-key",

id: new Uint8Array(26) // actually provided by the server

},

{

transports: "internal",

type: "public-key",

id: new Uint8Array(26) // actually provided by the server

}

],

extensions: {

uvm: true,  // RP wants to know how the user was verified

loc: false,

txAuthSimple: "Could you please verify yourself?"

}

};

navigator.credentials.get({ "publicKey": options })

.then(function (credentialInfoAssertion) {

// send assertion response back to the server

// to proceed with the control of the credential

}).catch(function (err) {

console.error(err);

});

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

See also

: the dictionary which provides option for the public key credential creation