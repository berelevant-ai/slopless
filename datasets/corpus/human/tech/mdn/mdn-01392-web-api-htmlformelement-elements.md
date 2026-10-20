# HTMLFormElement.elements

The  property elements returns an  listing all the form controls contained in the  element. Independently, you can obtain just the number of form controls using the  property.

You can access a particular form control in the returned collection by using either an index or the element's  or .

Prior to HTML 5, the returned object was an , on which HTMLFormControlsCollection is based.

Note: Similarly, you can get a list of all of the forms contained within a given document using the document's  property.

Syntax

nodeList = HTMLFormElement.elements

Value

An  containing all non-image controls in the form. This is a live collection; if form controls are added to or removed from the form, this collection will update to reflect the change.

The form controls in the returned collection are in the same order in which they appear in the form by following a preorder, depth-first traversal of the tree. This is called tree order.

Example

Quick syntax example

In this example, we see how to obtain the list of form controls as well as how to access its members by index and by name or ID.

<form id="my-form">

<input type="text" name="username">

<input type="text" name="full-name">

<input type="password" name="password">

</form>

var inputs = document.getElementById("my-form").elements;

var inputByIndex = inputs[0];

var inputByName = inputs["username"];

Accessing form controls

This example gets the form's element list, then iterates over the list, looking for  elements of type "text" so that some form of processing can be performed on them.

var inputs = document.getElementById("my-form").elements;

// Iterate over the form controls

for (i = 0; i < inputs.length; i++) {

if (inputs[i].nodeName === "INPUT" && inputs[i].type === "text") {

// Update text input

inputs[i].value.toLocaleUpperCase();

}

}

Disabling form controls

var inputs = document.getElementById("my-form").elements;

// Iterate over the form controls

for (i = 0; i < inputs.length; i++) {

// Disable all form controls

inputs[i].setAttribute("disabled", "");

}

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility