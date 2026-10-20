# SyntaxError: Malformed formal parameter

The JavaScript exception "malformed formal parameter" occurs when the argument list of a Function() constructor call is invalid somehow.

Message

SyntaxError: Expected {x} (Edge)

SyntaxError: malformed formal parameter (Firefox)

Error type

What went wrong?

There is a Function() constructor with at least two arguments passed in the code. The last argument is the source code for the new function you're creating. All the rest make up your new function's argument list.

The argument list is invalid somehow. Perhaps you accidentally picked a keyword like if or var as an argument name, or perhaps there's some stray punctuation in your argument list. Or maybe you accidentally passed an invalid value, like a number or object.

OK, that fixed my problem. But why didn't you say that in the first place?

Admittedly the wording in the error message is slightly strange. "Formal parameter" is a fancy way of saying "function argument". And we use the word "malformed" because all Firefox engineers are huge fans of 19th-century Gothic horror novels.

Examples

Invalid cases

var f = Function('x y', 'return x + y;');

// SyntaxError (missing a comma)

var f = Function('x,', 'return x;');

// SyntaxError (extraneous comma)

var f = Function(37, "alert('OK')");

// SyntaxError (numbers can't be argument names)

Valid cases

var f = Function('x, y', 'return x + y;');  // correctly punctuated

var f = Function('x', 'return x;');

// if you can, avoid using Function - this is much faster

var f = function(x) { return x; };

See also

Function()

About functions

Frankenstein by Mary Wollstonecraft Shelley, full e-text ("Cursed (although I curse myself) be the hands that formed you! You have made me wretched beyond expression. You have left me no power to consider whether I am just to you or not. Begone! Relieve me from the sight of your detested form.")