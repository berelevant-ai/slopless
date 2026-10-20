# NonDocumentTypeChildNode.previousElementSibling

The NonDocumentTypeChildNode.previousElementSibling read-only property returns the  immediately prior to the specified one in its parent's children list, or null if the specified element is the first one in the list.

Syntax

prevNode = elementNodeReference.previousElementSibling;

Example

<div id="div-01">Here is div-01</div>

<div id="div-02">Here is div-02</div>

<li>This is a list item</li>

<li>This is another list item</li>

<div id="div-03">Here is div-03</div>

<script>

let el = document.getElementById('div-03').previousElementSibling;

document.write('<p>Siblings of div-03</p><ol>');

while (el) {

document.write('<li>' + el.nodeName + '</li>');

el = el.previousElementSibling;

}

document.write('</ol>');

</script>

This example outputs the following into the page when it loads:

Siblings of div-03

1. LI

2. LI

3. DIV

4. DIV

Polyfills

Polyfill for Internet Explorer 8

This property is unsupported prior to IE9, so the following snippet can be used to add support to IE8:

// Source: https://github.com/Alhadis/Snippets/blob/master/js/polyfills/IE8-child-elements.js

if(!("previousElementSibling" in document.documentElement)){

Object.defineProperty(Element.prototype, "previousElementSibling", {

get: function(){

var e = this.previousSibling;

while(e && 1 !== e.nodeType)

e = e.previousSibling;

return e;

}

});

}

Polyfill for Internet Explorer 9+ and Safari

// Source: https://github.com/jserz/js_piece/blob/master/DOM/NonDocumentTypeChildNode/previousElementSibling/previousElementSibling.md

(function (arr) {

arr.forEach(function (item) {

if (item.hasOwnProperty('previousElementSibling')) {

return;

}

Object.defineProperty(item, 'previousElementSibling', {

configurable: true,

enumerable: true,

get: function () {

let el = this;

while (el = el.previousSibling) {

if (el.nodeType === 1) {

return el;

}

}

return null;

},

set: undefined

});

});

})([Element.prototype, CharacterData.prototype]);

Specifications

Specification

Status

Comment

Splitted the ElementTraversal interface in , , and . This method is now defined on the former.

The  and  interfaces implemented the new interface.

Added its initial definition to the ElementTraversal pure interface and use it on .

Browser compatibility

See also

The  pure interface.

Object types implementing this pure interface: , and .