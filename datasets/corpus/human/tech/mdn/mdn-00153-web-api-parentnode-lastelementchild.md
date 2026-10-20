# ParentNode.lastElementChild

The ParentNode.lastElementChild read-only property returns the object's last child  or  if there are no child elements.

Note: This property was initially defined in the  pure interface. As this interface contained two distinct set of properties, one aimed at  that have children, one at those that are children, they have been moved into two separate pure interfaces,  and . In this case, lastElementChild moved to ParentNode. This is a fairly technical change that shouldn't affect compatibility.

Syntax

const element = node.lastElementChild

Example

<ul id="foo">

<li>First  (1)</li>

<li>Second (2)</li>

<li>Third  (3)</li>

</ul>

<script>

const foo = document.getElementById('foo');

console.log(foo.lastElementChild.textContent); // logs: Third (3)

</script>

Polyfill

The code below adds support of lastElementChild() to Document and DocumentFragment in Internet Explorer and Safari.

// Overwrites native 'lastElementChild' prototype.

// Returns array instead of HTMLCollection.

;(function(constructor) {

if(constructor &&

constructor.prototype &&

constructor.prototype.lastElementChild == null) {

Object.defineProperty(constructor.prototype, 'lastElementChild', {

get: function() {

var node, nodes = this.childNodes, i = nodes.length - 1;

while(node = nodes[i--]) {

if(node.nodeType === 1) {

return node;

}

}

return null;

}

});

}

})(window.Node || window.Element);

Specifications

Specification

Status

Comment

Splitted the ElementTraversal interface in  and ParentNode. This method is now defined on the latter.

The  and  implemented the new interfaces.

Browser compatibility

See also

The  and  pure interfaces.

Object types implementing this pure interface: , , and .