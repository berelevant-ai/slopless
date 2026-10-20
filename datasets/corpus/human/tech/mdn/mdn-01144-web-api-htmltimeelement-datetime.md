# HTMLTimeElement.dateTime

The HTMLTimeElement.dateTime property is a  that reflects the  HTML attribute, containing a machine-readable form of the element's date and time value.

The format of the string must follow one of the following HTML microsyntaxes:

Microsyntax

Description

Examples

Valid month string

YYYY-MM

2011-11, 2013-05

Valid date string

YYYY-MM-DD

1887-12-01

Valid yearless date string

MM-DD

11-12

Valid time string

HH:MM

HH:MM:SS

HH:MM:SS.mmm

23:59

12:15:47

12:15:52.998

Valid local date and time string

YYYY-MM-DD HH:MM

YYYY-MM-DD HH:MM:SS

YYYY-MM-DD HH:MM:SS.mmm

YYYY-MM-DDTHH:MM

YYYY-MM-DDTHH:MM:SS

YYYY-MM-DDTHH:MM:SS.mmm

2013-12-25 11:12

1972-07-25 13:43:07

1941-03-15 07:06:23.678

2013-12-25T11:12

1972-07-25T13:43:07

1941-03-15T07:06:23.678

Valid time-zone offset string

Z

+HHMM

+HH:MM

-HHMM

-HH:MM

Z

+0200

+04:30

-0300

-08:00

Valid global date and time string

Any combination of a valid local date and time string followed by a valid time-zone offset string

2013-12-25 11:12+0200

1972-07-25 13:43:07+04:30

1941-03-15 07:06:23.678Z

2013-12-25T11:12-08:00

Valid week string

YYYY-WWW

2013-W46

Four or more ASCII digits

YYYY

2013, 0001

Valid duration string

PdDThHmMsS

PdDThHmMs.XS

PdDThHmMs.XXS

PdDThHmMs.XXXS

PThHmMsS

PThHmMs.XS

PThHmMs.XXS

PThHmMs.XXXS

ww dd hh mm ss

P12DT7H12M13S

P12DT7H12M13.3S

P12DT7H12M13.45S

P12DT7H12M13.455S

PT7H12M13S

PT7H12M13.2S

PT7H12M13.56S

PT7H12M13.999S

7d 5h 24m 13s

Syntax

dateTimeString = timeElt.dateTime;

timeElt.dateTime = dateTimeString

Example

// Assumes there is <time id="t"> element in the HTML

var t = document.getElementById("t");

t.dateTime = "6w 5h 34m 5s";

Specifications

Specification

Status

Comment

No change from .

No change from .

Initial definition.

Browser compatibility

See also

The  interface it belongs to.