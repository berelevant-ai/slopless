# PublicKeyCredential.response

The response read-only property of the  interface is an  object which is sent from the authenticator to the user agent for the creation/fetching of credentials. The information contained in this response will be used by the relying party's server to verify the demand is legitimate.

An AuthenticatorResponse is either:

an  (when the PublicKeyCredential is created via )

an  (when the PublicKeyCredential is obtained via ).

In order to validate the creation of credentials, a relying party's server needs both:

this response

the extensions of the client (given by ) to validate the demand.

Note: When validating the fetching of existing credentials, the whole PublicKeyCredential object and the client extensions are necessary for the relying party's server.

Note: This property may only be used in top-level contexts and will not be available in an  for example.

Syntax

response = publicKeyCredential.response

Value

An  object containing the data a relying party's script will receive and which should be sent to the relying party's server in order to validate the demand for creation or fetching. This object contains data from the client () and from the authenticator.

Examples

var options = {

challenge: new Uint8Array(16) /* from the server */,

rp: {

name: "Example CORP",

id  : "login.example.com"

},

user: {

id: new Uint8Array(16) /* from the server */,

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

navigator.credentials.create({  publickey: options })

.then(function (pubKeyCredential) {

var response = pubKeyCredential.response;

var clientExtResults = pubKeyCredential.getClientExtensionResults();

// Send response and client extensions to the server so that it can validate

// and create credentials

}).catch(function (err) {

// Deal with any error

});

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility