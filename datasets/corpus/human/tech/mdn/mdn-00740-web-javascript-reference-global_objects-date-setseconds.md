# Date.prototype.setSeconds()

The setSeconds() method sets the seconds for a specified date according to local time.

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone https://github.com/mdn/interactive-examples and send us a pull request.

Syntax

dateObj.setSeconds(secondsValue[, msValue])

Versions prior to JavaScript 1.3

dateObj.setSeconds(secondsValue)

Parameters

secondsValue

An integer between 0 and 59, representing the seconds.

msValue

Optional. A number between 0 and 999, representing the milliseconds.

Return value

The number of milliseconds between 1 January 1970 00:00:00 UTC and the updated date.

Description

If you do not specify the msValue parameter, the value returned from the  method is used.

If a parameter you specify is outside of the expected range, setSeconds() attempts to update the date information in the  object accordingly. For example, if you use 100 for secondsValue, the minutes stored in the  object will be incremented by 1, and 40 will be used for seconds.

Examples

Using setSeconds()

var theBigDay = new Date();

theBigDay.setSeconds(30);

Specifications

Specification

Browser compatibility

See also