# Object.prototype.__lookupSetter__()

The __lookupSetter__ method returns the function bound as a setter to the specified property.

Syntax

obj.__lookupSetter__(sprop)

Parameters

sprop

A string containing the name of the property whose setter should be returned.

Return value

The function bound as a setter to the specified property.

Description

If a setter has been defined for an object's property, it was not possible to reference the setter function through that property, because that property refers to the return value of that function. __lookupSetter__ can be used to obtain a reference to the setter function.

It is now possible to do this in a standardized way using .

Examples

Standard-compliant and non-standard ways to get a property setter

var obj = {

set foo(value) {

this.bar = value;

}

};

// Non-standard and deprecated way

obj.__lookupSetter__('foo')

// (function(value) { this.bar = value; })

// Standard-compliant way

Object.getOwnPropertyDescriptor(obj, 'foo').set;

// (function(value) { this.bar = value; })

Specifications

Specification

Browser compatibility

See also

operator

and

JS Guide: Defining Getters and Setters