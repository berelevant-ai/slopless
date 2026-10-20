# performance.clearMeasures()

The clearMeasures() method removes the named measure from the browser's performance entry buffer. If the method is called with no arguments, all  with an  of "measure" will be removed from the performance entry buffer.

Syntax

performance.clearMeasures();

performance.clearMeasures(name);

Arguments

name

A  representing the name of the timestamp. If this argument is omitted, all  with an  of "measure" will be removed.

Return value

void

Example

The following example shows both uses of the clearMeasures() method.

// Create a small helper to show how many PerformanceMeasure entries there are.

function logMeasureCount() {

console.log(

"Found this many entries: " + performance.getEntriesByType("measure").length

);

}

// Create a bunch of measures.

performance.measure("from navigation");

performance.mark("a");

performance.measure("from mark a", "a");

performance.measure("from navigation");

performance.measure("from mark a", "a");

performance.mark("b");

performance.measure("between a and b", "a", "b");

logMeasureCount() // "Found this many entries: 5"

// Delete just the "from navigation" PerformanceMeasure entries.

performance.clearMeasures("from navigation");

logMeasureCount() // "Found this many entries: 3"

// Delete all of the PerformanceMeasure entries.

performance.clearMeasures();

logMeasureCount() // "Found this many entries: 0"

Specifications

Specification

Status

Comment

Clarifies clearMeasures().

Basic definition.

Browser compatibility