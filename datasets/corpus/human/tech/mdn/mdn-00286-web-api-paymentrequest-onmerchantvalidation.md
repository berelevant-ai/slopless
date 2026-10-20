# PaymentRequest.onmerchantvalidation

The  event handler onmerchantvalidation is invoked when the  is fired, indicating that the payment handler (e.g., Apple Pay) requires the merchant to validate themselves. This is usually the first event to be fired, and the user won't be able to proceed with a payment until the merchant validate themselves.

This event is not be fired by all payment handlers. In particular, it's used by Apple Pay.

Syntax

paymentRequest.onmerchantvalidation = eventHandlerFunction;

Value

An event handler function which is to be called whenever the  event is fired at the , indicating that the payment handler requires the merchant to validate themselves as allowed to use this payment handler.

Examples

An example merchant validation handler for the  object request looks like this:

request.onmerchantvalidation = ev => {

ev.complete(async () => {

const merchantServerUrl = window.location.origin +

'/validation?url=' + encodeURIComponent(ev.validationURL);

// get validation data, and complete validation;

return await fetch(merchantServerUrl).then(r => r.text());

})

};

const response = await request.show();

For more information, see .

Browser compatibility