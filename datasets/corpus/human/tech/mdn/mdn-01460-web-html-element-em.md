# <em>: The Emphasis element

The HTML <em> element marks text that has stress emphasis. The <em> element can be nested, with each level of nesting indicating a greater degree of emphasis.

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone https://github.com/mdn/interactive-examples and send us a pull request.

Content categories

Flow content, phrasing content, palpable content.

Permitted content

Phrasing content.

Tag omission

Permitted parents

Any element that accepts phrasing content.

Implicit ARIA role

No corresponding role

Permitted ARIA roles

Any

DOM interface

Up to Gecko 1.9.2 (Firefox 4) inclusive, Firefox implements the  interface for this element.

Attributes

This element only includes the global attributes.

Usage notes

The <em> element is for words that have a stressed emphasis compared to surrounding text, which is often limited to a word or words of a sentence and affects the meaning of the sentence itself.

Typically this element is displayed in italic type. However, it should not be used to apply italic styling; use the CSS  property for that purpose. Use the  element to mark the title of a work (book, play, song, etc.). Use the  element to mark text that is in an alternate tone or mood, which covers many common situations for italics such as scientific names or words in other languages. Use the  element to mark text that has greater importance than surrounding text.

<i> vs. <em>

New developers are often confused at seeing multiple elements that produce similar results. <em> and <i> are a common example, since they both italicize text. What's the difference? Which should you use?

By default, the visual result is the same. However, the semantic meaning is different. The <em> element represents stress emphasis of its contents, while the <i> element represents text that is set off from the normal prose, such a foreign word, fictional character thoughts, or when the text refers to the definition of a word instead of representing its semantic meaning. (The title of a work, such as the name of a book or movie, should use <cite>.)

This means the right one to use depends on the situation. Neither is for purely decorative purposes, that's what CSS styling is for.

An example for <em> could be: "Just do it already!", or: "We had to do something about it". A person or software reading the text would pronounce the words in italics with an emphasis, using verbal stress.

An example for <i> could be: "The Queen Mary sailed last night". Here, there is no added emphasis or importance on the word "Queen Mary". It is merely indicated that the object in question is not a queen named Mary, but a ship named Queen Mary. Another example for <i> could be: "The word the is an article".

Example

The <em> element is often used to indicate an implicit or explicit contrast.

<p>

In HTML 5, what was previously called

<em>block-level</em> content is now called

<em>flow</em> content.

</p>

Result

Specifications

Specification

Status

Comment

Browser compatibility

See also