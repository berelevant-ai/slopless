# String.prototype.trimStart()

The trimStart() method removes whitespace from the beginning of a string. trimLeft() is an alias of this method.

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone https://github.com/mdn/interactive-examples and send us a pull request.

Syntax

str.trimStart();

str.trimLeft();

Return value

A new string representing the calling string stripped of whitespace from its beginning (left end).

Description

The trimStart() / trimLeft() methods return the string stripped of whitespace from its left end. trimLeft() or trimStart() do not affect the value of the string itself.

Aliasing

For consistency with functions like  the standard method name is trimStart. However, for web compatibility reasons, trimLeft remains as an alias to trimStart. In some engines this means:

String.prototype.trimLeft.name === "trimStart";

Examples

Using trimStart()

The following example displays the lowercase string 'foo  ':

var str = '   foo  ';

console.log(str.length); // 8

str = str.trimStart();

console.log(str.length); // 5

console.log(str);        // 'foo  '

Polyfill

//https://github.com/FabioVergani/js-Polyfill_String-trimStart

(function(w){

var String=w.String, Proto=String.prototype;

(function(o,p){

if(p in o?o[p]?false:true:true){

var r=/^\s+/;

o[p]=o.trimLeft||function(){

return this.replace(r,'')

}

}

})(Proto,'trimStart');

})(window);

/*

ES6:

(w=>{

const String=w.String, Proto=String.prototype;

((o,p)=>{

if(p in o?o[p]?false:true:true){

const r=/^\s+/;

o[p]=o.trimLeft||function(){

return this.replace(r,'')

}

}

})(Proto,'trimStart');

})(window);

*/

Specifications

Specification

Browser compatibility

See also