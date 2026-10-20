# FormDataEvent

The FormDataEvent interface represents a formdata event — such an event is fired on an  object after the entry list representing the form's data is constructed. This happens when the form is submitted, but can also be triggered by the invocation of a  constructor.

This allows a  object to be quickly obtained in response to a formdata event firing, rather than needing to put it together yourself when you wish to submit form data via a method like  (see Using FormData objects).

Constructor

Creates a new FormDataEvent object instance.

Properties

Inherits properties from its parent interface, .

Contains the  object representing the data contained in the form when the event was fired.

Methods

Inherits methods from its parent interface, .

Examples

// grab reference to form

const formElem = document.querySelector('form');

// submit handler

formElem.addEventListener('submit', (e) => {

// on form submission, prevent default

e.preventDefault();

// construct a FormData object, which fires the formdata event

new FormData(formElem);

});

// formdata handler to retrieve data

formElem.addEventListener('formdata', (e) => {

console.log('formdata fired');

// Get the form data from the event object

let data = e.formData;

for (var value of data.values()) {

console.log(value);

}

// submit the data via XHR

var request = new XMLHttpRequest();

request.open("POST", "/formHandler");

request.send(data);

});

Specifications

Specification

Status

Comment

Browser compatibility

See also

Using FormData objects