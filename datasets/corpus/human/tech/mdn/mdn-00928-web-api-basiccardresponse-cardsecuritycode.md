# BasicCardResponse.cardSecurityCode

The cardSecurityCode property of the  dictionary contains the security code of the card used to make the payment.

Syntax

"cardSecurityCode" : "number"

Value

A  representing the card security code.

Example

Let's look at a sample payment request:

var request = new PaymentRequest(supportedInstruments, details, options);

// Call show() to trigger the browser's payment flow.

request.show().then(function(instrumentResponse) {

// Do something with the response from the UI.

console.log(instrumentResponse.details);

})

.catch(function(err) {

// Do something with the error from request.show().

});

Once the payment flow has been triggered using  and the promise resolves successfully, the  object available inside the fulfilled promise (instrumentResponse above) will have a  property that will contain response details. This has to conform to the structure defined by the BasicCardResponse dictionary, and may look something like this:

{

"cardNumber' : '9999999999999999",

"cardholderName' : 'Mr. Dick Straw",

"cardSecurityCode" : "999",

"expiryMonth" : "07",

"expiryYear" : "2021",

"billingAddress" : {

"country" : "GB",

// etc. billing address is a PaymentAddress object

}

}

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility