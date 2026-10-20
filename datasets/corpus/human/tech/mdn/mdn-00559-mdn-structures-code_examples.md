# Code examples

On MDN, you'll see numerous code examples inserted throughout the pages to demonstrate usage of web platform features. This article discusses the different mechanisms available for adding code examples to pages, along with which ones you should use and when.

What types of code example are available?

There are four types of code example available on MDN:

Static examples — plain code blocks, possibly with a screenshot to statically show the result of such code if it were to be run.

Traditional MDN "live samples" — A macro that takes plain code blocks, dynamically puts them into a document inside an  element, and embeds it into the page to show the code running live.

GitHub "live samples" — A macro that takes a document in a GitHub repo inside the mdn organization, puts it inside an  element, and embeds it into the page to show the code running live.

Interactive examples — Our system for creating live interactive examples that show the code running live but also allow you to change code on the fly to see what the effect is.

We'll discuss each one in later sections.

When should you use each one?

Each type of code example has its own use cases. When should you use each one?

Static examples are useful if you just need to show some code, and it isn't super important to show what the live result is. Some people just want something to copy and paste. Maybe you are just showing an intermediate step, or the source code is enough. (For example, the article is for an advanced audience, and they just need to see the code.) Also, you might be demonstrating an API feature that doesn't work well as an embedded example, which might need its own separate page to link to.

Traditional live samples are useful if you want to show source code on a page, then show it running, and you’re not that bothered about it being accessible as a standalone example. This approach also has the advantage that if you are showing source code and live examples side by side, you only need to update the code once to update both. They can however be awkward to edit and get working.

GitHub live samples are useful when you’ve got an existing example you want to embed, don’t want to show the source code for, and/or you want to make sure the example is available in standalone form. They have a better contribution workflow, but it does require you to know GitHub. Also because on-page code and source code are in two different places, it is easier for them to get out of sync.

The new interactive examples are great as readers can modify values on the fly — this is very valuable for learning. However, they are more complex to set up than the other forms, with more limitations, and are intended for specific purposes.

If you are not sure which one to use, you should default to traditional or GitHub live samples, depending on which one you are most comfortable with. You are also welcome to ask for advice on our Discourse forum.

General guidelines

Aside from the specific system for presenting the live samples, as summarized above, there are style and content considerations to keep in mind when adding or updating samples on MDN.

When placing samples on a page, try to ensure that all of the features or options of the API or concept you're writing about are covered. At a minimum, at least the most-common options or properties should be included in examples.

Precede each example with an explanation of what  the example does and why it's interesting or useful.

Follow each piece of code with an explanation of what it does.

When possible, break large examples into smaller pieces. For instance, the "live sample" system will automatically concatenate all your code together into one piece before running the example, so you can actually break your JavaScript, HTML, and/or CSS into smaller pieces with descriptive text after each piece if you choose to do so. This is a great way to help explain long or complicated stretches of code more clearly.

Go beyond just demonstrating how each piece of the API or technology works. Consider possible real-world use cases you might try to demonstrate.

Static examples

By static examples, we are talking about static code blocks that show how a feature might be used in code. These are put on a page using the PRE and Syntax Highlighter buttons on the MDN editor UI. An example result might look like this:

// This is a JS example

var test = "Hello";

console.log(test);

Note: For more details on adding code blocks to MDN pages, see our Syntax highlighting article.

Optionally, you might want to show a static image of the code's resulting output. For example:

Note: For more details on adding images to MDN pages, see our Images article.

Traditional live samples

Traditional live samples are inserted into the page using the EmbedLiveSample macro. An \ call dynamically grabs the code blocks in the same document section as itself and puts them into a document, which it then inserts into the page inside an . This is most easily demonstrated with an example, so let's look at one in this section and the next.

The easiest way is to press the Insert Code Sample Template button, which asks us for a title. For the example in the "" section below, we entered "test" for the title, and the button generated the entire section for us.

Next, we entered some very simple sample code into the HTML, CSS, and JavaScript code blocks.

Finally, we published the page; the \ call you can see in the edit view was replaced with an <iframe> containing the code running live.

If you look at the source inside the <iframe>, you'll see this:

<!DOCTYPE html>

<html>

<head>

<link href="https://developer.cdn.mozilla.net/static/build/styles/samples.37902ba3b7fe.css"

rel="stylesheet" type="text/css">

<style type="text/css">

h1 {

color: blue;

}

</style>

</head>

<body>

<h1>Your example?</h1>

<script type="text/javascript">

document.querySelector('h1').onclick = function() {

document.querySelector('h1').textContent = 'Your example?';

};

</script>

</body>

</html>

Other macro parameters

The call we've used in the below example only uses one parameter — \. This defines which section of the document the code blocks should be grabbed from — test is the ID defined on the heading "test" below, so the macro will grab all the code blocks inside that heading. Put another way, it will grab all the blocks below that heading, up until another  is encountered.

There are some other optional parameters available too. You can include a second and third parameter, which will be a set width and height for the <iframe>. For example \. You can use pixel values or percentage values. Reasonable defaults are used if you omit these.

There are also optional fourth and fifth parameters available, a screenshot URL that points to a screenshot showing the example should look like, and a page slug that points to another page on MDN —this is only used if you want to embed an example from another page. You won't use these two very often.

See EmbedLiveSample macro for more details on all these parameters.

Tips for using traditional live samples

You don't need to use the Insert Code Sample Template button — but it is easier when you are getting used to using it. It is possible to just insert a \ macro call inside any section of your page that contains code blocks, and it will work — as long as you set the first parameter to the ID of the document section it is inside.

You don't need the HTML, CSS, JavaScript, and Result headings, but it is considered best practice to include them where appropriate as it makes it easier to see what is going on. If you don't include them, you should include descriptive text to tell the reader what is happening.

You don't need HTML, CSS, and JavaScript code blocks — you can embed any combination you like — HTML and CSS, HTML and JavaScript, or even HTML only.

Another approach is to wrap your code blocks inside a block-level element with an ID, and then give the macro call that ID. For example, you could put your code blocks inside <div id="test"></div>, then use \.

In fact, this is a better option when you have a complex document hierarchy, and you are having trouble getting just the right code blocks to be embedded. In a complex document, this can be troublesome.

Note: You can find a lot more information about traditional Live samples in our Live samples article.

test

HTML

<h1>My example?</h1>

CSS

h1 {

color: blue;

}

JavaScript

document.querySelector('h1').onclick = function() {

document.querySelector('h1').textContent = 'Your example?';

};

Result

GitHub live samples

GitHub live samples are inserted into the page using the EmbedGHLiveSample macro. An \ call dynamically grabs the document at a specified URL (which has to be inside the mdn GitHub organization), and inserts into the page inside an .

These work in a very similar way to the , but they are a lot simpler:

You don't have to worry about placement of code blocks on the page — it grabs an HTML document in a GitHub repo, and puts it in the <iframe>.

The macro only has three parameters:

The URL of the document to embed — this is relative to the mdn organization, the top level directory of which is at https://mdn.github.io/. So this parameter needs to contain the part of the URL after that, e.g. my-subdirectory/example.html. You can omit the filename if it is called index.html.

The width of the <iframe>, which can be expressed as a percentage or in pixels.

The height of the <iframe>, which can be expressed as a percentage or in pixels.

Let's look at an example. Say we wanted to embed the code at https://mdn.github.io/learning-area/css/styling-boxes/backgrounds/. We could use the following call:

\

This looks like so when rendered:

Tips for using GitHub live samples

You obviously need to get a suitable code sample onto the mdn GitHub organization first. This needs to be done using Git. If you are not familiar with Git, check out our How do I use GitHub Pages? article, and Preparing to add the data for more advanced uses.

Your code sample needs to be suitable to show what you are trying to demonstrate — it should contain one simple example that does one thing well, should have no offensive content in it, and should follow the MDN Code sample guidelines.

Interactive examples

The newest form of live example available on MDN is interactive live examples. These provide a step up from live examples, because the reader can edit the code and the live example updates on the fly. This is great for learning and experimentation.

The interactive examples are intended to be used at the top of MDN reference pages — we are aiming to provide these to improve their value to beginners and other readers who want to just grab and play with an example quickly before seeing all the details of whatever they are looking up. There are a few important limitations to note about the interactive examples:

They are specialised for a particular technology — the UI for JavaScript is different from the UI for CSS, and they only illustrate one technology in isolation. They are not appropriate if you want to show, for example, how to combine a particular HTML/CSS/JS structure.

The interactive live examples are currently only set up to show CSS and JavaScript. For other technologies, you'll just have to wait.

The UI is more performance-intensive than other code examples; you shouldn't put more than one on each MDN article you apply them to.

They are not intended for large code examples — the UI supports a range of fixed sizes, which only really work for short (say, 10–15 line) examples.

If you want to submit an example, you can find out how at the interactive examples repo Contribution guide.

If you find a page that doesn't have an associated interactive example, you are welcome to contribute one! The MDN Discourse forum is a good place to ask for help or advice.

Interactive example demo

The \ macro is used to embed finished examples into MDN pages. For example, the macro call \ displays the following code example:

Try adjusting the code to see what happens, and playing with the controls.