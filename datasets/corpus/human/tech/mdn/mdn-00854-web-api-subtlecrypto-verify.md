# SubtleCrypto.verify()

The verify() method of the  interface verifies a digital .

It takes as its arguments a  to verify the signature with, some algorithm-specific parameters, the signature, and the original signed data. It returns a  which will be fulfilled with a  value indicating whether the signature is valid.

Syntax

const result = crypto.subtle.verify(algorithm, key, signature, data);

Parameters

algorithm is a  or object defining the algorithm to use, and for some algorithm choices, some extra parameters. The values given for the extra parameters must match those passed into the corresponding  call.

To use RSASSA-PKCS1-v1_5, pass the string "RSASSA-PKCS1-v1_5" or an object of the form { "name": "RSASSA-PKCS1-v1_5" }.

To use RSA-PSS, pass an  object.

To use ECDSA, pass an  object.

To use HMAC, pass the string "HMAC" or an object of the form { "name": "HMAC" }.

key is a  containing the key that will be used to verify the signature. It is the secret key for a symmetric algorithm and the public key for a public-key system.

signature is a  containing the  to verify.

data is a  containing the data whose signature is to be verified.

Return value

result is a  that fulfills with a : true if the signature is valid, false otherwise.

Exceptions

The promise is rejected when the following exception is encountered:

Raised when the encryption key is not a key for the requested verifying algorithm or when trying to use an algorithm that is either unknown or isn't suitable for a verify operation.

Supported algorithms

The verify() method supports the same algorithms as the sign() method.

Examples

Note: You can try the working examples out on GitHub.

RSASSA-PKCS1-v1_5

This code uses a public key to verify a signature. See the complete code on GitHub.

/*

Fetch the contents of the "message" textbox, and encode it

in a form we can use for sign operation.

*/

function getMessageEncoding() {

const messageBox = document.querySelector(".rsassa-pkcs1 #message");

let message = messageBox.value;

let enc = new TextEncoder();

return enc.encode(message);

}

/*

Fetch the encoded message-to-sign and verify it against the stored signature.

* If it checks out, set the "valid" class on the signature.

* Otherwise set the "invalid" class.

*/

async function verifyMessage(publicKey) {

const signatureValue = document.querySelector(".rsassa-pkcs1 .signature-value");

signatureValue.classList.remove("valid", "invalid");

let encoded = getMessageEncoding();

let result = await window.crypto.subtle.verify(

"RSASSA-PKCS1-v1_5",

publicKey,

signature,

encoded

);

signatureValue.classList.add(result ? "valid" : "invalid");

}

RSA-PSS

This code uses a public key to verify a signature. See the complete code on GitHub.

/*

Fetch the contents of the "message" textbox, and encode it

in a form we can use for sign operation.

*/

function getMessageEncoding() {

const messageBox = document.querySelector(".rsa-pss #message");

let message = messageBox.value;

let enc = new TextEncoder();

return enc.encode(message);

}

/*

Fetch the encoded message-to-sign and verify it against the stored signature.

* If it checks out, set the "valid" class on the signature.

* Otherwise set the "invalid" class.

*/

async function verifyMessage(publicKey) {

const signatureValue = document.querySelector(".rsa-pss .signature-value");

signatureValue.classList.remove("valid", "invalid");

let encoded = getMessageEncoding();

let result = await window.crypto.subtle.verify(

{

name: "RSA-PSS",

saltLength: 32,

},

publicKey,

signature,

encoded

);

signatureValue.classList.add(result ? "valid" : "invalid");

}

ECDSA

This code uses a public key to verify a signature. See the complete code on GitHub.

/*

Fetch the contents of the "message" textbox, and encode it

in a form we can use for sign operation.

*/

function getMessageEncoding() {

const messageBox = document.querySelector(".ecdsa #message");

let message = messageBox.value;

let enc = new TextEncoder();

return enc.encode(message);

}

/*

Fetch the encoded message-to-sign and verify it against the stored signature.

* If it checks out, set the "valid" class on the signature.

* Otherwise set the "invalid" class.

*/

async function verifyMessage(publicKey) {

const signatureValue = document.querySelector(".ecdsa .signature-value");

signatureValue.classList.remove("valid", "invalid");

let encoded = getMessageEncoding();

let result = await window.crypto.subtle.verify(

{

name: "ECDSA",

hash: {name: "SHA-384"},

},

publicKey,

signature,

encoded

);

signatureValue.classList.add(result ? "valid" : "invalid");

}

HMAC

This code uses a secret key to verify a signature. See the complete code on GitHub.

/*

Fetch the contents of the "message" textbox, and encode it

in a form we can use for sign operation.

*/

function getMessageEncoding() {

const messageBox = document.querySelector(".hmac #message");

let message = messageBox.value;

let enc = new TextEncoder();

return enc.encode(message);

}

/*

Fetch the encoded message-to-sign and verify it against the stored signature.

* If it checks out, set the "valid" class on the signature.

* Otherwise set the "invalid" class.

*/

async function verifyMessage(key) {

const signatureValue = document.querySelector(".hmac .signature-value");

signatureValue.classList.remove("valid", "invalid");

let encoded = getMessageEncoding();

let result = await window.crypto.subtle.verify(

"HMAC",

key,

signature,

encoded

);

signatureValue.classList.add(result ? "valid" : "invalid");

}

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

See also

.

RFC 3447 specifies RSASSA-PKCS1-v1_5.

RFC 3447 specifies RSA-PSS.

FIPS-186 specifies ECDSA.

FIPS 198-1 specifies HMAC.