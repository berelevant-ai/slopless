# Element.insertAdjacentElement()

The insertAdjacentElement() method of the  interface inserts a given element node at a given position relative to the element it is invoked upon.

Syntax

targetElement.insertAdjacentElement(position, element);

Parameters

position

A  representing the position relative to the targetElement; must match (case-insensitively) one of the following strings:

'beforebegin': Before the targetElement itself.

'afterbegin': Just inside the targetElement, before its first child.

'beforeend': Just inside the targetElement, after its last child.

'afterend': After the targetElement itself.

element

The element to be inserted into the tree.

Return value

The element that was inserted, or null, if the insertion failed.

Exceptions

Exception

Explanation

SyntaxError

The position specified is not a recognised value.

TypeError

The element specified is not a valid element.

Visualization of position names

<!-- beforebegin -->

<p>

<!-- afterbegin -->

foo

<!-- beforeend -->

</p>

<!-- afterend -->

Note: The beforebegin and afterend positions work only if the node is in a tree and has an element parent.

Example

beforeBtn.addEventListener('click', function() {

var tempDiv = document.createElement('div');

tempDiv.style.backgroundColor = randomColor();

if (activeElem) {

activeElem.insertAdjacentElement('beforebegin', tempDiv);

}

setListener(tempDiv);

});

afterBtn.addEventListener('click', function() {

var tempDiv = document.createElement('div');

tempDiv.style.backgroundColor = randomColor();

if (activeElem) {

activeElem.insertAdjacentElement('afterend', tempDiv);

}

setListener(tempDiv);

});

Have a look at our insertAdjacentElement.html demo on GitHub (see the source code too.) Here, we have a sequence of  elements inside a container. When one is clicked, it becomes selected and you can then press the Insert before and Insert after buttons to insert new divs before or after the selected element using insertAdjacentElement().

Specifications

Specification

Status

Comment

Browser compatibility

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also

(similar to beforebegin, with different arguments)

(same effect as beforeend)