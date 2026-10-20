# PaymentCurrencyAmount.value

The  property value is a string containing the decimal numeric value of the payment, specified in the currency units indicated by the  property. The contents of this string must be a valid decimal number; that is, some number of digits between 0 and 9 with up to one optional decimal point. An optional leading minus sign ("-") can be included to indicate a negative value, such as to represent a refund or discount.

Important note: The number given in this string is always specified using the period (".") as the decimal point, rather than the comma (","), even if the user's locale normally uses the comma. You must convert the entered text to this form or it will not be valid.

Syntax

value = paymentCurrencyAmount.value;

Value

A  indicating the numeric value of the payment. This must be a valid decimal number, with an optional leading minus sign ("-"), then one or more decimal digits 0 through 9, optionally with a decimal point (".") with at least one digit following it to represent fractional units. There must not be any leading or trailing whitespace in the string.

For uniformity and consistency, the value is always given using the period (".") as the decimal character, regardless of the user's locale. You need to convert the value to this format before submitting the payment.

See the example  below for a simple regular expression that can be used to validate the value string prior to submission.

Examples

Representing prices

This example represents the price of $42.95 in US dollars:

let itemPrice = {

currency: "USD",

value: "42.95"

};

This example specifies a price of £7.77:

let shippingCost = {

currency: "GBP",

value: "7.77"

}

This example specifies a price of 1000¥:

let price = {

currency: "JPY",

value: "1000"

}

Verifying a properly formatted price

You can ensure that the value entered as a price is formatted correctly prior to submission by matching it against a simple :

function checkPriceFormat(price) {

let validRegex = /^-?[0-9]+(\.[0-9]+)?$/;

return validRegex.test(price);

}

This function, checkPriceFormat(), will return true if the specified price string is formatted properly, or false if it's not.

Specifications

Specification

Status

Comment

Browser compatibility

See also

Payment Request API

Using the Payment Request API

Payment processing concepts