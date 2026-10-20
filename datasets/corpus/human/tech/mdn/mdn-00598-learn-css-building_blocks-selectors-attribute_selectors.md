# Attribute selectors

As you know from your study of HTML, elements can have attributes that give further detail about the element being marked up. In CSS you can use attribute selectors to target elements with certain attributes. This lesson will show you how to use these very useful selectors.

Prerequisites:

Basic computer literacy, basic software installed, basic knowledge of working with files, HTML basics (study Introduction to HTML), and an idea of how CSS works (study CSS first steps.)

Objective:

To learn what attribute selectors are and how to use them.

Presence and value selectors

These selectors enable the selection of an element based on the presence of an attribute alone (for example href), or on various different matches against the value of the attribute.

Selector

Example

Description

[attr]

a[title]

Matches elements with an attr attribute (whose name is the value in square brackets).

[attr=value]

a[href="https://example.com"]

Matches elements with an attr attribute whose value is exactly value — the string inside the quotes.

[attr~=value]

p[class~="special"]

Matches elements with an attr attribute whose value is exactly value, or contains value in its (space separated) list of values.

[attr|=value]

div[lang|="zh"]

Matches elements with an attr attribute whose value is exactly value or begins with value immediately followed by a hyphen.

In the example below you can see these selectors being used.

By using li[class] we can match any selector with a class attribute. This matches all of the list items except the first one.

li[class="a"] matches a selector with a class of a, but not a selector with a class of a with another space-separated class as part of the value. It selects the second list item.

li[class~="a"] will match a class of a but also a value that contains the class of a as part of a whitespace-separated list. It selects the second and third list items.

Substring matching selectors

These selectors allow for more advanced matching of substrings inside the value of your attribute. For example, if you had classes of box-warning and box-error and wanted to match everything that started with the string "box-", you could use [class^="box-"] to select them both (or [class|="box"] as described in section above).

Selector

Example

Description

[attr^=value]

li[class^="box-"]

Matches elements with an attr attribute (whose name is the value in square brackets), whose value begins with value.

[attr$=value]

li[class$="-box"]

Matches elements with an attr attribute whose value ends with value.

[attr*=value]

li[class*="box"]

Matches elements with an attr attribute whose value contains value anywhere within the string.

(Aside: It may help to note that ^ and $ have long been used as anchors in so-called regular expressions to mean begins with and ends with.)

The next example shows usage of these selectors:

li[class^="a"] matches any attribute value which starts with a, so matches the first two list items.

li[class$="a"] matches any attribute value that ends with a, so matches the first and third list item.

li[class*="a"] matches any attribute value where a appears anywhere in the string, so it matches all of our list items.

Case-sensitivity

If you want to match attribute values case-insensitively you can use the value i before the closing bracket. This flag tells the browser to match ASCII characters case-insensitively. Without the flag the values will be matched according to the case-sensitivity of the document language — in HTML's case it will be case sensitive.

In the example below, the first selector will match a value that begins with a — it only matches the first list item because the other two list items start with an uppercase A. The second selector uses the case-insensitive flag and so matches all of the list items.

Note: There is also a newer value s, which will force case-sensitive matching in contexts where matching is normally case-insensitive, however this is less well supported in browsers and isn't very useful in an HTML context.

Next steps

Now we are done with attribute selectors, you can continue on to the next article and read about pseudo-class and pseudo-element selectors.

In this module

Cascade and inheritance

CSS selectors

Type, class, and ID selectors

Attribute selectors

Pseudo-classes and pseudo-elements

Combinators

The box model

Backgrounds and borders

Handling different text directions

Overflowing content

Values and units

Sizing items in CSS

Images, media, and form elements

Styling tables

Debugging CSS

Organizing your CSS