# Date.prototype.getDay()

The getDay() method returns the day of the week for the specified date according to local time, where 0 represents Sunday. For the day of the month, see .

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone https://github.com/mdn/interactive-examples and send us a pull request.

Syntax

dateObj.getDay()

Return value

An integer number, between 0 and 6, corresponding to the day of the week for the given date, according to local time: 0 for Sunday, 1 for Monday, 2 for Tuesday, and so on.

Examples

Using getDay()

The second statement below assigns the value 1 to weekday, based on the value of the  object Xmas95. December 25, 1995, is a Monday.

var Xmas95 = new Date('December 25, 1995 23:15:30');

var weekday = Xmas95.getDay();

console.log(weekday); // 1

Note: If needed, the full name of a day ("Monday" for example) can be obtained by using  with an options parameter. Using this method, the internationalization is made easier:

var options = { weekday: 'long'};

console.log(new Intl.DateTimeFormat('en-US', options).format(Xmas95));

// Monday

console.log(new Intl.DateTimeFormat('de-DE', options).format(Xmas95));

// Montag

Specifications

Specification

Browser compatibility

See also