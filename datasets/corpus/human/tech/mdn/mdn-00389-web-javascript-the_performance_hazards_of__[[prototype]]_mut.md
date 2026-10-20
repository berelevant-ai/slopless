# The performance hazards of  [[Prototype]] mutation

Every JavaScript object has a [[Prototype]].  Getting a property on an object first searches that object, then its [[Prototype]], then that object's [[Prototype]], until the property is found or the chain ends.  The [[Prototype]] chain is especially useful for object inheritance.

ECMAScript 6 introduces ways to mutate [[Prototype]].  This flexibility has a cost: it substantially degrades performance.  [[Prototype]] mutation harms performance in all modern JavaScript engines.  This article explains why [[Prototype]] mutation is slow in all browsers and describes alternatives that should be used instead.

How JavaScript engines optimize property accesses

Objects are hashes, so theoretically (and in reality) property accesses take constant time.  But "constant time" might be thousands of machine instructions.  Fortunately, objects and properties are often "predictable", and in such cases their underlying structure can also be predictable.  JITs can rely on this to make predictable accesses faster.

Engines optimize by depending on the order properties are added to objects.  Most properties are added to objects with quite similar ordering.  (Objects routinely accessed using obj[val]-style random access are a notable exception.)

function Landmark(lat, lon, desc) {

this.location = { lat: lat, long: lon };

this.description = desc;

}

var lm1 = new Landmark(-90, 0, "South Pole");

var lm2 = new Landmark(-24.3756466, -128.311018, "Pitcairn Islands");

Every Landmark has properties location and description in that order.  Each object literal storing latitude/longitude information has properties lat and long in that order.  Subsequent code could delete a property.  But it's unlikely, so engines can produce less-optimal code in such cases.  In SpiderMonkey, the JavaScript engine in Firefox, a particular ordering of properties (and some aspects of those properties, not including values) is called a shape.  (V8's name for the concept is structure ID.)  If two objects share a shape, their properties are stored identically.

Internally to engines, a (simplified) version of these ideas looks like this C++:

struct Property {

Property* prev; // null if first property

String name; // name of property

unsigned int index; // index of its value in storage

};

using Shape = Property*;

struct Object {

Shape shape;

Value* properties;

Object* prototype;

};

In the example, various JS expressions would correspond to this C++:

lm1->properties[0]; // loc1.location

lm1->properties[1]; // loc1.description

lm2->properties[0].toObject()->properties[1]; // loc2.location.long

If an engine knows an object has a particular shape, it can assume all property indexes for all properties on the object.  Accessing a particular property is only a couple cheap pointer accesses.  It's easy for machine code to check an object has a particular shape.  If it does, make assumptions for fast code; if not, do things the slow way.

Naively optimizing inherited properties

Many properties don't exist directly on the object: lookups often find properties on the prototype chain.  Accesses to properties on prototypes is just extra "hops" through the prototype field to the object containing the property.  Optimizing correctly requires that no object along the way have the property, so every hop must check that object's shape.

var d = new Date();

d.toDateString(); // Date.prototype.toDateString

function Pair(x, y) { this.x = x; this.y = y; }

Pair.prototype.sum = function() { return this.x + this.y; };

var p = new Pair(3, 7);

p.sum(); // Pair.prototype.sum

Engines take this quick-and-dirty approach in many cases.  But in especially performance-sensitive JavaScript, this isn't good enough.

Intelligently optimizing inherited properties

Predictable property accesses usually find the property a constant number of hops along the [[Prototype]] chain; intervening objects usually don't acquire new properties; the ultimate object usually won't have any properties deleted.  Finally: [[Prototype]] mutation is rare.  All these common assumptions are necessary to avoid slow prototype-hopping.  Different engines choose different approaches to intelligently optimize inherited properties.

The shape of the ultimate object containing the inherited can be checked.

In this case, a shape match must imply that no intervening object's [[Prototype]] has been modified.  Therefore, when an object's [[Prototype]] is mutated, every object along its [[Prototype]] chain must also have its shape changed.

var obj1 = {};

var obj2 = Object.create(obj1);

var obj3 = Object.create(obj2);

// Objects whose shapes would change: obj3, obj2, obj1, Object.prototype

obj3.__proto__ = {};

The shape of the object initially accessed can be checked.

Every object that might inherit through a changed-[[Prototype]] object must change, reflecting the [[Prototype]] mutation having happened

var obj1 = {};

var obj2 = Object.create(obj1);

var obj3 = Object.create(obj2);

// Objects whose shapes would change: obj1, obj2, obj3

obj1.__proto__ = {};

Pernicious effects of [[Prototype]] mutation

[[Prototype]] mutation's adverse performance impact occurs in two phases: at the time mutation occurs, and in subsequent execution.  First, mutating [[Prototype]] is slow.  Second, mutating [[Prototype]] slows down code that interacts with mutated-[[Prototype]] objects.

Mutating [[Prototype]] is slow

While the spec considers mutating [[Prototype]] to be modifying a single hidden property, real-world implementations are considerably more complex.  Both shape-changing tactics described above require examining (and modifying) more than one object.  Which approach modifies fewer objects in practice, depends upon the workload.

Mutated [[Prototype]]s slow down other code

The bad effects of [[Prototype]] mutation don't end once the mutation is complete.  Because so many property-examination operations implicitly depend on [[Prototype]] chains not changing, when engines observe a mutation, an object with mutated [[Prototype]] "taints" all code the object flows through.  This tainting flows through all code that ever observes a mutated-[[Prototype]] object.  As a near-worst-case illustration, consider these patterns of behavior:

var obj = {};

obj.__proto__ = { x: 3 }; // gratuitous mutation

var arr = [obj];

for (var i = 0; i < 5; i++)

arr.push({ x: i });

function f(v, i) {

var elt = v[i];

var r =  elt.x > 2 // pessimized

? elt

: { x: elt.x + 1 };

return r;

}

var c = f(arr, 0);

c.x; // pessimized: return value has unknown properties

c = f(arr, 1);

c.x; // still pessimized!

var arr2 = [c];

arr2[0].x; // pessimized

(Only code that runs many times is optimized, so this doesn't trigger all these bad behaviors.  But every breakdown could happen if it appeared in "hot" code.)

Recognizing exactly where a mutated-[[Prototype]] object flows, often across multiple scripts, is extraordinarily difficult.  It depends on careful textual analysis of the code and particular runtime behaviors.  Far-distant changes, that trigger subtly different control flow, can taint previously-optimal code paths with pessimal behavior.  It's impossible to recognize all the places that will become slower, even for a JavaScript language implementer.

remaining constant.Mutation must, in addition to changing other objects' shapes,

But this requires storing cross-object information.

Cross-object information is different from shape, in that it can't easily be checked.  One modification to this information may affect many locations, none obviously connected to it: where to look to verify assumptions?  So instead of checking the assumptions before use, all code making assumptions is invalidated when a modification happens.  When a [[Prototype]] changes, all code depending on it must be thrown away.  The operation obj.__proto__ = ... is thus inherently slow.  And by throwing away already-optimized code, it makes that code much slower when it runs later.

But it's worse than that.  When evaluating obj.prop sees an object whose [[Prototype]] has been mutated, so much previously-known information about the object becomes useless that SpiderMonkey considers the object to have wholly-unknown characteristics.  Any code path that touches such an object in the future will assume the worst.  Optimizing JIT engines assume that future execution is like past execution.  If an object with mutated [[Prototype]] is observed by some code, that code will likely observe more such objects.  Therefore, operations that interact with an object with mutated [[Prototype]], anywhere, in any scripts, are un-optimizable.

The un-optimizability of objects with mutated [[Prototype]] is not