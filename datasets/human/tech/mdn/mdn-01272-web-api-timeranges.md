# TimeRanges

The TimeRanges interface is used to represent a set of time ranges, primarily for the purpose of tracking which portions of media have been buffered when loading it for use by the  and  elements.

A TimeRanges object includes one or more ranges of time, each specified by a starting and ending time offset. You reference each time range by using the start() and end() methods, passing the index number of the time range you want to retrieve.

The term "normalized TimeRanges object" indicates that ranges in such an object are ordered, don't overlap, aren't empty, and don't touch (adjacent ranges are folded into one bigger range).

Properties

Returns an unsigned long representing the number of time ranges represented by the time range object.

Methods

Returns the time for the start of the range with the specified index.

Returns the time for the end of the specified range.

Specifications

Specification

Status

Comment

Initial definition

Browser compatibility