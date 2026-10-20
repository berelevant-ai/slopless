# DOMTokenList.toggle()

The toggle() method of the  interface removes a given token from the list and returns false. If token doesn't exist it's added and the function returns true.

Syntax

tokenList.toggle(token [, force]);

Parameters

token

A  representing the token you want to toggle.

force

A  that, if included, turns the toggle into a one way-only operation. If set to false, then token will only be removed, but not added. If set to true, then token will only be added, but not removed.

Return value

A  indicating whether token is in the list after the call.

Examples

In the following example we retrieve the list of classes set on a  element as a DOMTokenList using . We then replace a token in the list, and write the list into the <span>'s .

First, the HTML:

<span class="a b">classList is 'a b'</span>

Now the JavaScript:

let span = document.querySelector("span");

let classes = span.classList;

span.addEventListener('click', function() {

let result = classes.toggle("c");

if (result) {

span.textContent = `'c' added; classList is now "${classes}".`;

} else {

span.textContent = `'c' removed; classList is now "${classes}".`;

}

})

The output looks like this:

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility