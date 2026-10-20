# PublicKeyCredentialCreationOptions.rp

The rp property of the  dictionary is an object describing the relying party which requested the credential creation (via ).

Syntax

relyingPartyObj = publicKeyCredentialCreationOptions.rp

Properties

icon

An URL as a  value which points to an image resource which can be the logo/icon of the relying party.

id

A  uniquely identifying a relying party. The default value of this property is the domain of the current document (e.g. "login.example.com"). It may be overridden with a suffix of the current domain (e.g. "example.com").

name

A  giving a human-readable name for the relying party. This property is intended for display (e.g. "Example CORP").

Examples

var publicKey = {

challenge: /* from the server */,

rp: {

name: "Example CORP",

id  : "login.example.com",

icon: "https://login.example.com/login.ico"

},

user: {

id: new Uint8Array(16),

name: "jdoe@example.com",

displayName: "John Doe"

},

pubKeyCredParams: [

{

type: "public-key",

alg: -7

}

]

};

navigator.credentials.create({ publicKey })

.then(function (newCredentialInfo) {

// send attestation response and client extensions

// to the server to proceed with the registration

// of the credential

}).catch(function (err) {

console.error(err);

});

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility