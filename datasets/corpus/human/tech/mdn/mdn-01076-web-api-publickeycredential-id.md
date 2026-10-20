# PublicKeyCredential.id

The id read-only property of the  interface is a , inherited from , which represents the identifier of the current PublicKeyCredential instance.

This property is a base64url encoded version of .

Note: This property may only be used in top-level contexts and will not be available in an  for example.

Syntax

id = publicKeyCredential.id

Value

A  being the base64url encoded version of .

Examples

var publicKey = {

challenge: new Uint8Array(26) /* this actually is given from the server */,

rp: {

name: "Example CORP",

id  : "login.example.com"

},

user: {

id: new Uint8Array(26), /* To be changed for each user */

name: "jdoe@example.com",

displayName: "John Doe",

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

var id = newCredentialInfo.id;

// Do something with the id

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

Specified in the context of PublicKeyCredential. Overrides the getter defined in Credential.

Initial definition.

Browser compatibility

See also