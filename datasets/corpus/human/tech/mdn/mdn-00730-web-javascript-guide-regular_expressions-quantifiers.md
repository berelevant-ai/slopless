# Quantifiers

Quantifiers indicate numbers of characters or expressions to match.

Types

The following table is also duplicated on this cheatsheet. Do not forget to edit it as well, thanks!

Note: In the following, item refers not only to singular characters, but also includes character classes, Unicode property escapes, groups and ranges.

Characters

Meaning

x*

Matches the preceding item "x" 0 or more times. For example, /bo*/ matches "boooo" in "A ghost booooed" and "b" in "A bird warbled", but nothing in "A goat grunted".

x+

Matches the preceding item "x" 1 or more times. Equivalent to {1,}. For example, /a+/ matches the "a" in "candy" and all the "a"'s in "caaaaaaandy".

x?

Matches the preceding item "x" 0 or 1 times. For example, /e?le?/ matches the "el" in "angel" and the "le" in "angle."

If used immediately after any of the quantifiers *, +, ?, or {}, makes the quantifier non-greedy (matching the minimum number of times), as opposed to the default, which is greedy (matching the maximum number of times).

x{n}

Where "n" is a positive integer, matches exactly "n" occurrences of the preceding item "x". For example, /a{2}/ doesn't match the "a" in "candy", but it matches all of the "a"'s in "caandy", and the first two "a"'s in "caaandy".

x{n,}

Where "n" is a positive integer, matches at least "n" occurrences of the preceding item "x". For example, /a{2,}/ doesn't match the "a" in "candy", but matches all of the a's in "caandy" and in "caaaaaaandy".

x{n,m}

Where "n" is 0 or a positive integer, "m" is a positive integer, and m > n, matches at least "n" and at most "m" occurrences of the preceding item "x". For example, /a{1,3}/ matches nothing in "cndy", the "a" in "candy", the two "a"'s in "caandy", and the first three "a"'s in "caaaaaaandy". Notice that when matching "caaaaaaandy", the match is "aaa", even though the original string had more "a"s in it.

x*?

x+?

x??

x{n}?

x{n,}?

x{n,m}?

By default quantifiers like * and + are "greedy", meaning that they try to match as much of the string as possible. The ? character after the quantifier makes the quantifier "non-greedy": meaning that it will stop as soon as it finds a match. For example, given a string like "some <foo> <bar> new </bar> </foo> thing":

/<.*>/ will match "<foo> <bar> new </bar> </foo>"

/<.*?>/ will match "<foo>"

Examples

Repeated pattern

var wordEndingWithAs = /\w+a+\b/;

var delicateMessage = "This is Spartaaaaaaa";

console.table(delicateMessage.match(wordEndingWithAs)); // [ "Spartaaaaaaa" ]

Counting characters

var singleLetterWord = /\b\w\b/g;

var notSoLongWord = /\b\w{1,6}\b/g;

var loooongWord = /\b\w{13,}\b/g;

var sentence = "Why do I have to learn multiplication table?";

console.table(sentence.match(singleLetterWord)); // ["I"]

console.table(sentence.match(notSoLongWord));    // [ "Why", "do", "I", "have", "to", "learn", "table" ]

console.table(sentence.match(loooongWord));      // ["multiplication"]

Optional character

var britishText = "He asked his neighbour a favour.";

var americanText = "He asked his neighbor a favor.";

var regexpEnding = /\w+ou?r/g;

// \w+ One or several letters

// o   followed by an "o",

// u?  optionally followed by a "u"

// r   followed by an "r"

console.table(britishText.match(regexpEnding));

// ["neighbour", "favour"]

console.table(americanText.match(regexpEnding));

// ["neighbor", "favor"]

Greedy versus non-greedy

var text = "I must be getting somewhere near the centre of the earth.";

var greedyRegexp = /[\w ]+/;

// [\w ]      a letter of the latin alphabet or a whitespace

//      +     one or several times

console.log(text.match(greedyRegexp)[0]);

// "I must be getting somewhere near the centre of the earth"

// almost all of the text matches (leaves out the dot character)

var nonGreedyRegexp = /[\w ]+?/; // Notice the question mark

console.log(text.match(nonGreedyRegexp));

// "I"

// The match is the smallest one possible

Specifications

Specification

Browser compatibility

For browser compatibility information, check out the main Regular Expressions compatibility table.

See also

Regular expressions guide

Character classes

Assertions

Unicode property escapes

Groups and ranges

The RegExp() constructor