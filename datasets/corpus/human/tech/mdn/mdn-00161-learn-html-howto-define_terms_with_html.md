# Define terms with HTML

HTML provides several ways to convey description semantics,  whether inline or as structured glossaries. In this article, we'll cover how to properly mark up keywords when you're defining them.

Prerequisites:

You need to be familiar with how to create a basic HTML document.

Objective:

Learn how to introduce new keywords and how to build description lists.

When you need a term defined, you probably go straight to a dictionary or glossary. Dictionaries and glossaries formally associate keywords with one or more descriptions, as in this case:

Blue (Adjective)

Of a color like the sky in a sunny day.

The clear blue sky

Of a subtle sadness, melancholy.

I'm feeling blue

But we're constantly defining keywords informally, as here:

Firefox is the web browser created by the Mozilla Foundation.

To deal with these use cases,  provides  to mark descriptions and words described, so that your meaning gets across properly to your readers.

How to mark informal description

In textbooks, the first time a keyword occurs, it's common to put the keyword in bold and define it right away.

We do that in HTML too, except HTML is not a visual medium and so we don't use bold. We use , which is a special element just for marking the first occurrence of keywords. Note that <dfn> tags go around the word to be defined, not the definition (the definition consists of the entire paragraph):

<p><dfn>Firefox</dfn> is the web browser created by the Mozilla Foundation.</p>

Another use for bold is to emphasize content. Bold itself is a concept foreign to HTML, but there are tags for indicating emphasis.

Special case: Abbreviations

It's best to mark abbreviations specially with , so that screen readers read them appropriately and so that you can operate on all abbreviations uniformly. Just as with any new keyword, you should define your abbreviations the first time they occur.

<p>

<dfn><abbr>HTML</abbr> (hypertext markup language)</dfn>

is a description language used to structure documents on the web.

</p>

The HTML spec does indeed set aside the title attribute for expanding the abbreviation. However, this is not an acceptable alternative for providing an inline expansion. The contents of title are completely hidden from your users, unless they're using a mouse and they happen to hover over the abbreviation. The spec duly acknowledges this as well.

Improve accessibility

marks the keyword defined, and indicates that the current paragraph defines the keyword. In other words, there's an implicit relationship between the <dfn> element and its container. If you want a more formal relationship, or your definition consists of only one sentence rather than the whole paragraph, you can use the aria-describedby attribute to associate a term more formally with its definition:

<p>

<span id="ff">

<dfn aria-describedby="ff">Firefox</dfn>

is the web browser created by the Mozilla Foundation.

</span>

You can download it at <a href="https://www.mozilla.org">mozilla.org</a>

</p>

Assistive technology can often use this attribute to find a text alternative to a given term. You can use aria-describedby on any tag enclosing a keyword to be defined (not just the <dfn> element). aria-describedby references the  of the element containing the description.

How to build a description list

Description lists are just what they claim to be: a list of terms and their matching descriptions (e.g., definition lists, dictionary entries, FAQs, and key-value pairs).

Description lists are not suitable for marking up dialogue, because conversation does not directly describe the speakers. Here are recommendations for marking up dialogue.

The terms described go inside  elements. The matching description follows immediately, contained within one or more  elements. Enclose the whole description list with a  element.

A simple example

Here's a simple example describing kinds of food and drink:

<dl>

<dt>jambalaya</dt>

<dd>

rice-based entree typically containing chicken,

sausage, seafood, and spices

</dd>

<dt>sukiyaki</dt>

<dd>

Japanese specialty consisting of thinly sliced meat,

vegetables, and noodles, cooked in sake and soy sauce

</dd>

<dt>chianti</dt>

<dd>

dry Italian red wine originating in Tuscany

</dd>

</dl>

The basic pattern, as you can see, is to alternate <dt> terms with <dd> descriptions. If two or more terms occur in a row, the following description applies to all of them. If two or more descriptions occur in a row, they all apply to the last given term.

Improving the visual output

Here's how a graphical browser displays the foregoing list:

If you want the keywords to stand out better, you could try bolding them. Remember, HTML is not a visual medium; we need  for all visual effects. The CSS  property is what you need here:

dt {

font-weight: bold;

}

This produces the slightly more readable result below:

Learn more

How to use the aria-describedby attribute