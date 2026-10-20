# Element.toggleAttribute()

The toggleAttribute() method of the  interface toggles a Boolean attribute (removing it if it is present and adding it if it is not present) on the given element.

Syntax

Element.toggleAttribute(name [, force]);

Parameters

name

A  specifying the name of the attribute to be toggled. The attribute name is automatically converted to all lower-case when toggleAttribute() is called on an HTML element in an HTML document.

force

A boolean value to determine whether the attribute should be added or removed, no matter whether the attribute is present or not at the moment.

Return value

true if attribute name is eventually present, and false otherwise.

Exceptions

InvalidCharacterError

The specified attribute name contains one or more characters which are not valid in attribute names.

Example

In the following example, toggleAttribute() is used to toggle the readonly attribute of a .

HTML

<input value="text">

<button>toggleAttribute("readonly")</button>

JavaScript

var button = document.querySelector("button");

var input = document.querySelector("input");

button.addEventListener("click", function(){

input.toggleAttribute("readonly");

});

Result

Polyfill

if (!Element.prototype.toggleAttribute) {

Element.prototype.toggleAttribute = function(name, force) {

if(force !== void 0) force = !!force

if (this.hasAttribute(name)) {

if (force) return true;

this.removeAttribute(name);

return false;

}

if (force === false) return false;

this.setAttribute(name, "");

return true;

};

}

Specifications

Specification

Status

Comment

Browser compatibility