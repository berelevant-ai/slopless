# data-*

The data-* global attributes form a class of attributes called custom data attributes, that allow proprietary information to be exchanged between the HTML and its DOM representation by scripts.

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone https://github.com/mdn/interactive-examples  and send us a pull request.

All such custom data are available via the  interface of the element the attribute is set on. The  property gives access to them.

The * may be replaced by any name following the production rule of XML names with the following restrictions:

the name must not start with xml, whatever case is used for these letters;

the name must not contain any semicolon (U+003A);

the name must not contain capital letters.

Note that the  property is a , and the name of the custom data attribute data-test-value will be accessible via HTMLElement.dataset.testValue (or by HTMLElement.dataset["testValue"]) as any dash (U+002D) is replaced by the capitalization of the next letter, converting the name to camelcase.

Usage

By adding data-* attributes, even ordinary HTML elements can become rather complex and powerful program-objects. For example, a space-ship "sprite" in a game could be a simple  element with a class attribute and several data-* attributes:

<img class="spaceship cruiserX3" src="shipX3.png"

data-ship-id="324" data-weapons="laserI laserII" data-shields="72%"

data-x="414354" data-y="85160" data-z="31940"

onclick="spaceships[this.dataset.shipId].blasted()">

For a more in-depth tutorial about using HTML data attributes, see Using data attributes.

Specifications

Specification

Browser compatibility

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also

All global attributes.

The  property that allows to access and modify these values.

Using data attributes