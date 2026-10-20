# Source mode

MDN's editor has a prominent button that lets you switch into source editing mode. In this mode, you see the underlying HTML for the body of the article you're editing. This guide will help you understand what you can do with MDN's wiki content source editing mode, what you should do with it, and, most importantly, what not to do.

Before you consider using source mode, please note that we strongly urge you not to. Unless what you're doing is something you have to do in order to meet our style guide (we do have required features that unfortunately can't be created without using source mode yet), you shouldn't need to use source mode. See  below.

Accessing source mode

Getting into source mode is easy. At the top-left corner of the editor's toolbar, click the Source button.

Due to formatting, images, and the like, it's possible that the source is shorter (vertical length-wise) than the WYSIWYG content that you might need to scroll up to find the source within the edit box.

Warnings and caveats

As mentioned previously, you rarely need to use source mode. There are a few things you can only do by tweaking the source. Eventually we will update the editing interface to handle those things for you.

Anything that's not expressly described somewhere in the MDN contributor guide should not be added to the source. That means:

No custom fonts or styles; if it's not part of our standard look and feel, don't do it.

No special colors. Use only the colors that are part of the standard look and feel of MDN, provided by the styles we use.

Working in source mode

When you're in source mode, you're editing the raw HTML that makes up the content of a wiki page. While you're no longer restricted by the editor, you need to do everything you can to make sure your work matches the style guide and that it works safely and reliably.

You should usually only work in source mode for brief tweaks rather than for an extended period of writing time.

Unfortunately, the Tab key doesn't work in our source editor at this time. Insert two spaces for each place where you would normally use the Tab key.

If you use any HTML elements or attributes that MDN doesn't allow, they're removed from the HTML when your document is saved. In addition, the document's HTML is reformatted to keep it moderately readable and consistent.

Legitimate uses for source mode

There are a few cases in which the only way to follow MDN's style guide is to use source mode. This section covers these cases and how to properly implement these features without breaking other things.

Highlighting lines in sample code

Within the sample code snippet blocks established by using the PRE or Syntax Highlighter buttons in the toolbar's block group, you might want to call special attention to lines of code. The only way to do this is to open source mode, find the  block containing the code, and edit the <pre> tag's  attribute to include a highlight component formatted as follows:

highlight[lineNum1, lineNum2, ..., lineNumN]

highlight[lineNumStart-lineNumEnd, ..., lineNumN]

"highlight[" <line-number-list> "]"

Where:

<line-number-list> = [ <line-number> | <line-range> ]#

<line-range> = <line-number> - <line-number>

<line-number> = <number-token>

For example, if the existing tag is <pre class="brush: js;">, and you want to add highlighting to lines 4 and 7, you change it to <pre class="brush: js; highlight[4, 7]">.

Let's look at a more complete example:

Before highlighting

With highlighting

var canvas = document.getElementById("canvas");

var ctx = canvas.getContext("2d");

var path1 = new Path2D();

path1.rect(10, 10, 100, 100);

var path2 = new Path2D(path1);

path2.moveTo(220, 60);

path2.arc(170, 60, 50, 0, 2 * Math.PI);

ctx.stroke(path2);

Here, the  tag is: <pre class="brush: js;">

var canvas = document.getElementById("canvas");

var ctx = canvas.getContext("2d");

var path1 = new Path2D();

path1.rect(10, 10, 100, 100);

var path2 = new Path2D(path1);

path2.moveTo(220, 60);

path2.arc(170, 60, 50, 0, 2 * Math.PI);

ctx.stroke(path2);

And here, the <pre> tag has been changed to: <pre class="brush: js; highlight[4, 7]">

Styles that don't have toolbar buttons

We have some styles we use on MDN that aren't available using the normal user interface. Fortunately, these aren't used very often. Some examples are:

To apply they "keyboard" style, you need to enclose the text of the key's name in the  element. We have no user interface for this yet. So open source mode, and wrap the key name in <kbd>. For example, if the source is:

<p>Press the <kbd>Enter</kbd> key to start the countdown.</p>

The result is:

Press the Enter key to start the countdown.

Some uncommon styles used on specialized pages also need to be added by hand. This is common with group boxes. That's why we have macros that help to build many of the landing page components automatically.