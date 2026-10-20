# AuthenticatorAttestationResponse.attestationObject

The attestationObject property of the  interface returns an  containing the new public key, as well as signature over the entire attestationObject with a private key that is stored in the authenticator when it is manufactured.

As part of the  call, an authenticator will create a new keypair as well as an attestationObject for that keypair. The public key that corresponds to the private key that has created the attestation signature is well known; however, there are various well known attestation public key chains for different ecosystems (for example, Android or TPM attestations).

Syntax

attestObj = authenticatorAttestationResponse.attestationObject

Properties

After decoding the CBOR encoded ArrayBuffer, the resulting JavaScript object will contain the following properties:

authData

The same as . Note that in , the authenticatorData is exposed as a property in a JavaScript object while in , the authenticatorData is a property in a CBOR map.

The same  field is used by both AuthenticatorAttestationResponse and by AuthenticatorAssertionResponse. When used in attestation, it contains an optional field, attestedCredentialData. This field is not included when used in the AuthenticatorAssertionResponse. The attestedCredentialData field contains the credentialId and credentialPublicKey.

fmt

A text string that indicates the format of the attStmt. The WebAuthn specification defines a number of formats; however, formats may also be defined in other specifications and registered in an IANA registry. Formats defined by WebAuthn are:

"packed"

"tpm"

"android-key"

"android-safetynet"

"fido-u2f"

"none"

attStmt

A an attestation statement that is of the format defined by "fmt". For now, see the WebAuthn specification for details on each format.

Examples

var publicKey = {

challenge: /* from the server */,

rp: {

name: "Example CORP",

id  : "login.example.com"

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

var attestationObj = newCredentialInfo.response.attestationObject;

// This will be a CBOR encoded ArrayBuffer

// Do something with the response

// (sending it back to the relying party server maybe?)

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

: the cryptographic challenge which signature by the authenticator is contained in attStmt

: the attestation statement transport option specified for the creation