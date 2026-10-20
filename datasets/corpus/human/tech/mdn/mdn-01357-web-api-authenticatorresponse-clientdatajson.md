# AuthenticatorResponse.clientDataJSON

The clientDataJSON property of the  interface stores a JSON string in an , representing the client data that was passed to  or . This property is only accessed on one of the child objects of AuthenticatorResponse, specifically  or .

Syntax

var arrayBuffer = AuthenticatorAttestationResponse.clientDataJSON;

var arrayBuffer = AuthenticatorAssertionResponse.clientDataJSON;

Value

An .

Properties

After the clientDataJSON object is converted from an ArrayBuffer to a JavaScript object, it will have the following properties:

type

A string which is either "webauthn.get" when an existing credential is retrieved or "webauthn.create" when a new credential is created.

challenge

The base64url encoded version of the cryptographic challenge sent from the relying party's server. The original value is passed via  or .

origin

The fully qualified origin of the requester which has been given by the client/browser to the authenticator. We should expect the relying party's id to be a suffix of this value.

tokenBindingId

An object describing the state of the token binding protocol for the communication with the relying party. It has two properties:

status: A string which is either "supported" which indicates the client support token binding but did not negotiate with the relying party or "present" when token binding was used already

id: A  which is the base64url encoding of the token binding ID which was used for the communication.

Should this property be absent, it would indicate that the client does not support token binding.

Examples

function arrayBufferToStr(buf) {

return String.fromCharCode.apply(null, new Uint8Array(buf));

}

// pk is a PublicKeyCredential that is the result of a create() or get() Promise

var clientDataStr = arrayBufferToStr(pk.clientDataJSON);

var clientDataObj = JSON.parse(clientDataStr);

console.log(clientDataObj.type);      // "webauthn.create" or "webauthn.get"

console.log(clientDataObj.challenge); // base64 encoded String containing the original challenge

console.log(clientDataObj.origin);    // the window.origin

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility