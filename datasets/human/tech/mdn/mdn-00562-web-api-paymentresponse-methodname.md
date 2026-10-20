# PaymentResponse.methodName

The methodName read-only property of the  interface returns a string uniquely identifying the payment handler selected by the user. This string may be either one of the standardized payment method identifiers or a URL used by the payment handler to process payments.

Syntax

var methodName = PaymentResponse.methodName;

Value

A  uniquely identifying the payment handler being used to process the payment. This may be either a standardized identifier, or a URL used by the payment processor to handle payments. See  for more information.

Example

The following example extracts the method name from the  object to the promise returned from . In a real-world implementation this data would then be sent to a payment server.

payment.show().then(paymentResponse => {

var paymentData = {

// payment method string

method: paymentResponse.methodName,

// payment details as you requested

details: paymentResponse.details,

// shipping address information

address: toDict(paymentResponse.shippingAddress)

};

// Send information to the server

});

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility