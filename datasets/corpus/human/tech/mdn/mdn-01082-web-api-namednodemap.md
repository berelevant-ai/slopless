# NamedNodeMap

The NamedNodeMap interface represents a collection of  objects. Objects inside a NamedNodeMap are not in any particular order, unlike , although they may be accessed by an index as in an array.

A NamedNodeMap object is live and will thus be auto-updated if changes are made to its contents internally or elsewhere.

Although called NamedNodeMap, this interface doesn't deal with  objects but with  objects, which were originally a specialized class of , and still are in some implementations.

Properties

This interface doesn't inherit any property.

Returns the amount of objects in the map.

Methods

This interface doesn't inherit any method.

Returns a , corresponding to the given name.

Replaces, or adds, the  identified in the map by the given name.

Removes the  identified by the given map.

Returns the  at the given index, or null if the index is higher or equal to the number of nodes.

Returns a  identified by a namespace and related local name.

Replaces, or adds, the  identified in the map by the given namespace and related local name.

Removes the  identified by the given namespace and related local name.

Specifications

Specification

Status

Comment

Deals with  instead of

No change from

Added getNamedItemNS(), setNamedItemNS() and removeNamedItemNS()

Initial definition

Browser compatibility

See also