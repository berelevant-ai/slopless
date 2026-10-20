# Pipeline operator (|>)

The experimental pipeline operator |> (currently at stage 1) pipes the value of an expression into a function. This allows the creation of chained function calls in a readable manner. The result is syntactic sugar in which a function call with a single argument can be written like this:

let url = "%21" |> decodeURI;

The equivalent call in traditional syntax looks like this:

let url = decodeURI("%21");

Syntax

expression |> function

The value of the specified expression is passed into the function as its sole parameter.

Parameters

expression

Any valid expression.

function

Any function.

Examples

Chaining function calls

The pipeline operator can improve readability when chaining several functions.

const double = (n) => n * 2;

const increment = (n) => n + 1;

// without pipeline operator

double(increment(double(double(5)))); // 42

// with pipeline operator

5 |> double |> double |> increment |> double; // 42

Specifications

Specification

Browser compatibility

See also

Github - Proposal-pipeline-operator

TC39 proposals