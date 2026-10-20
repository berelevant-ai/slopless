# CSSStyleDeclaration.setProperty()

The CSSStyleDeclaration.setProperty() method interface sets a new value for a property on a CSS style declaration object.

Syntax

style.setProperty(propertyName, value, priority);

Parameters

propertyName is a  representing the CSS property name (hyphen case) to be modified.

value  is a  containing the new property value. If not specified, treated as the empty string.

Note: value must not contain "!important" -- that should be set using the priority parameter.

priority  is a  allowing the "important" CSS priority to be set. If not specified, treated as the empty string. The following values are accepted:

String value "important"

Keyword undefined

String empty value ""

Return value

Exceptions

(NoModificationAllowedError): if the property or declaration block is read only.

If priority can be omitted, JavaScript has a special simpler syntax for setting a CSS property on a style declaration object:

style.cssPropertyName = 'value';

Examples

In this example we have three buttons, which can be pressed to dynamically alter our box paragraph's border, background color, and text color to random values (see the live example at the end of this section).

We know that the rule we want to alter to do this is contained inside the second stylesheet applied to the page, so we grab a reference to it using document.styleSheets[1]. We then loop through the different rules contained inside the stylesheet, which are contained in the array found at stylesheet.cssRules; for each one, we check whether its CSSStyleRule.selectorText property is equal to the selector .box p, which indicates it is the one we want.

If so, we store a reference to this CSSStyleRule object in a variable. We then use three functions to generate random values for the properties in question, and update the rule with these values. In each case, this is done with the setProperty() method, for example boxParaRule.style.setProperty('border', newBorder);

HTML

<div class="controls">

<button class="border">Border</button>

<button class="bgcolor">Background</button>

<button class="color">Text</button>

</div>

<div class="box">

<p>Box</p>

</div>

CSS

html {

background: orange;

font-family: sans-serif;

height: 100%;

}

body {

height: inherit;

width: 80%;

min-width: 500px;

max-width: 1000px;

margin: 0 auto;

}

.controls {

display: flex;

justify-content: space-around;

align-items: center;

}

div button {

flex: 1;

margin: 20px;

height: 30px;

line-height: 30px;

}

.box {

display: flex;

justify-content: center;

align-items: center;

height: calc(100% - 70px);

}

.box p {

width: 50%;

text-align: center;

font-weight: bold;

font-size: 40px;

height: 150px;

line-height: 150px;

background: red;

border: 5px solid purple;

color: white;

transition: all 1s;

}

JavaScript

const borderBtn = document.querySelector('.border');

const bgColorBtn = document.querySelector('.bgcolor');

const colorBtn = document.querySelector('.color');

const box = document.querySelector('.box');

function random(min,max) {

const num = Math.floor(Math.random()*(max-min)) + min;

return num;

}

function randomColor() {

return 'rgb(' + random(0,255) + ', ' + random(0,255) + ', ' + random(0,255) +  ')';

}

const stylesheet = document.styleSheets[1];

let boxParaRule;

for(let i = 0; i < stylesheet.cssRules.length; i++) {

if(stylesheet.cssRules[i].selectorText === '.box p') {

boxParaRule = stylesheet.cssRules[i];

}

}

function setRandomBorder() {

const newBorder = random(1, 50) + 'px solid ' + randomColor();

boxParaRule.style.setProperty('border', newBorder);

}

function setRandomBgColor() {

const newBgColor = randomColor();

boxParaRule.style.setProperty('background-color', newBgColor);

}

function setRandomColor() {

const newColor = randomColor();

boxParaRule.style.setProperty('color', newColor);

}

borderBtn.addEventListener('click', setRandomBorder);

bgColorBtn.addEventListener('click', setRandomBgColor);

colorBtn.addEventListener('click', setRandomColor);

Result

Specifications

Specification

Status

Comment

Browser compatibility