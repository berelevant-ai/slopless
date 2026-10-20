# Creating fancy letterheaded paper

If you want to make the right impression, writing a letter on nice letterheaded paper can be a really good start. In this assessment we'll challenge you to create an online template to achieve such a look.

Prerequisites:

Before attempting this assessment you should have already worked through all the articles in this module.

Objective:

To test comprehension of CSS box model, and other box-related features such as implementing backgrounds.

Starting point

To get this assessment started, you should:

Make local copies of the HTML and CSS — save them as index.html and style.css in a new directory.

Save local copies of the top, bottom and logo images in the same directory as your code files.

Alternatively, you could use a site like JSBin or Glitch to do your assessment. You could paste the HTML and fill in the CSS into one of these online editors. If the online editor you are using doesn't have a separate CSS panel, feel free to put it in a <style> element in the head of the document.

Note: If you get stuck, then ask us for help — see the  section at the bottom of this page.

Project brief

You have been given the files needed to create a letterheaded paper template. You just need to put the files together. To get there, you need to:

The main letter

Apply the CSS to the HTML.

Add a background declaration to the letter that:

Fixes the top image to the top of the letter

Fixes the bottom image to the bottom of the letter

Adds a semi-transparent gradient over the top of both of the previous backgrounds that gives the letter a bit of texture. Make it slightly dark right near the top and bottom, but completely transparent for a large part of the center.

Add another background declaration that just adds the top image to the top of the letter, as a fallback for browsers that don't support the previous declaration.

Add a white background color to the letter.

Add a 1mm top and bottom solid border to the letter, in a color that is in keeping with the rest of the color scheme.

The logo

To the , add the logo as a background image.

Add a filter to the logo to give it a subtle drop shadow.

Now comment out the filter and implement the drop shadow in a different (slightly more cross-browser compatible) way, which still follows the shape of the round image.

Hints and tips

Remember that you can create a fallback for older browsers by putting the fallback version of a declaration first, followed by the version that works across newer browsers only. Older browsers will apply the first declaration and ignore the second one, whereas newer browsers will apply the first one, then override it with the second one.

Feel free to create your own graphics for the assessment if you wish.

Example

The following screenshot shows an example of what the finished design could look like:

Assessment or further help

If you would like your work assessed, or are stuck and want to ask for help:

Put your work into an online shareable editor such as CodePen, jsFiddle, or Glitch.

Write a post asking for assessment and/or help at the MDN Discourse forum Learning category. Your post should include:

A descriptive title such as "Assessment wanted for Creating fancy letterheaded paper".

Details of what you have already tried, and what you would like us to do, e.g. if you are stuck and need help, or want an assessment.

A link to the example you want assessed or need help with, in an online shareable editor (as mentioned in step 1 above). This is a good practice to get into — it's very hard to help someone with a coding problem if you can't see their code.

A link to the actual task or assessment page, so we can find the question you want help with.