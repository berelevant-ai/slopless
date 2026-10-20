# PayerErrors.phone

The phone property is found in a  object if the  returned in the response couldn't be validated as a valid phone number. The value of this property is a string explaining the problem. If the payer's phone number validated successfully, the phone property is omitted from the PayerErrors object.

Syntax

payerPhone = payerErrors.phone;

Value

If this property is present in the  object, the payer's phone number couldn't be successfully validated, and the phone property's value is a  explaining the error. This string will be displayed to the user by the  payment handling user interface as appropriate.

If the phone number is valid, this property is omitted from the  object.

Example

function validatePayment(response) {

const correctionPromises

let paymentErrors = {};

let payerErrors = {};

// Check payer details

if (!validEmail(response.payerEmail)) {

payerErrors.email = "Please make sure you enter a valid email address."

}

if (!validName(response.payerName)) {

payerErrors.email = "Please enter a valid name, using only <appropriate characters>."

}

if (!validPhone(response.payerPhone)) {

payerErrors.phone = "Please enter a valid phone number in the form ###-###-####."

}

// Check everything else too...

//

}

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility