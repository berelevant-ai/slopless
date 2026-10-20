# HTMLTableElement

The HTMLTableElement interface provides special properties and methods (beyond the regular  object interface it also has available to it by inheritance) for manipulating the layout and presentation of tables in an HTML document.

Properties

Inherits properties from its parent, .

Is a  representing the first  that is a child of the element, or null if none is found. When set, if the object doesn't represent a <caption>, a  with the HierarchyRequestError name is thrown. If a correct object is given, it is inserted in the tree as the first child of this element and the first <caption> that is a child of this element is removed from the tree, if any.

Is a  representing the first  that is a child of the element, or null if none is found. When set, if the object doesn't represent a <thead>, a  with the HierarchyRequestError name is thrown. If a correct object is given, it is inserted in the tree immediately before the first element that is neither a , nor a , or as the last child if there is no such element, and the first <thead> that is a child of this element is removed from the tree, if any.

Is a  representing the first  that is a child of the element, or null if none is found. When set, if the object doesn't represent a <tfoot>, a  with the HierarchyRequestError name is thrown. If a correct object is given, it is inserted in the tree immediately before the first element that is neither a , a , nor a , or as the last child if there is no such element, and the first <tfoot> that is a child of this element is removed from the tree, if any.

Returns a live  containing all the rows of the element, that is all  that are a child of the element, or a child of one of its ,  and  children. The rows members of a <thead> appear first, in tree order, and those members of a <tbody> last, also in tree order. The HTMLCollection is live and is automatically updated when the HTMLTableElement changes.

Returns a live  containing all the  of the element. The HTMLCollection is live and is automatically updated when the HTMLTableElement changes.

Obsolete Properties

Warning: The following properties are obsolete.  You should avoid using them.

Is a  containing an enumerated value reflecting the  attribute. It indicates the alignment of the element's contents with respect to the surrounding context. The possible values are "left", "right", and "center".

Is a  containing the background color of the cells. It reflects the obsolete  attribute.

Is a  containing the width in pixels of the border of the table. It reflects the obsolete  attribute.

Is a  containing the width in pixels of the horizontal and vertical sapce between cell content and cell borders. It reflects the obsolete  attribute.

Is a  containing the width in pixels of the horizontal and vertical separation between cells. It reflects the obsolete  attribute.

Is a  containing the type of the external borders of the table. It reflects the obsolete  attribute and can take one of the following values: "void", "above", "below", "hsides", "vsides", "lhs", "rhs", "box", or "border".

Is a  containing the type of the internal borders of the table. It reflects the obsolete  attribute and can take one of the following values: "none", "groups", "rows", "cols", or "all".

Is a  containing a description of the purpose or the structure of the table. It reflects the obsolete  attribute.

Is a  containing the length in pixels or in percentage of the desired width fo the entire table. It reflects the obsolete  attribute.

Methods

Inherits methods from its parent, .

Returns an  representing the first  that is a child of the element. If none is found, a new one is created and inserted in the tree immediately before the first element that is neither a , nor a , or as the last child if there is no such element.

Removes the first  that is a child of the element.

Returns an  representing the first  that is a child of the element. If none is found, a new one is created and inserted in the tree as the last child.

Removes the first  that is a child of the element.

Returns a  representing a new  that is a child of the element. It is inserted in the tree after the last element that is a , or as the last child if there is no such element.

Returns an  representing the first  that is a child of the element. If none is found, a new one is created and inserted in the tree as the first child of the  element.

Removes the first  that is a child of the element.

Returns an  representing a new row of the table. It inserts it in the rows collection immediately before the  element at the given index position. If necessary a  is created. If the index is -1, the new row is appended to the collection. If the index is smaller than -1 or greater than the number of rows in the collection, a  with the value IndexSizeError is raised.

Removes the row corresponding to the index given in parameter. If the index value is -1 the last row is removed; if it smaller than -1 or greater than the amount of rows in the collection, a  with the value IndexSizeError is raised.

Specifications

Specification

Status

Comment

Added the sortable property and the stopSorting() method.

Added the createTBody() method.

Defined when caption, tHead, tFoot, insertRow(), and deleteRow() raise exceptions.

Initial definition.

Browser compatibility

See also

The HTML element implementing this interface: .