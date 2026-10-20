# Alternative style sheets

Specifying alternative style sheets in a web page provides a way for users to see multiple versions of a page, based on their needs or preferences.

Firefox lets the user select the stylesheet using the View > Page Style submenu. Internet Explorer also supports this feature (beginning with IE 8), also accessed from View > Page Style. Chrome requires an extension to use the feature (as of version 48). The web page can also provide its own user interface to let the user switch styles.

An example: specifying the alternative stylesheets

The alternate stylesheets are commonly specified using a  element with rel="alternate stylesheet" and title="..." attributes. For example:

<link href="reset.css" rel="stylesheet" type="text/css">

<link href="default.css" rel="stylesheet" type="text/css" title="Default Style">

<link href="fancy.css" rel="alternate stylesheet" type="text/css" title="Fancy">

<link href="basic.css" rel="alternate stylesheet" type="text/css" title="Basic">

In this example, the styles "Default Style", "Fancy", and "Basic" will be listed in the Page Style submenu, with "Default Style" pre-selected. When the user selects a different style, the page will immediately be re-rendered using that style sheet.

No matter what style is selected, the rules from the reset.css stylesheet will always be applied.

Try it out

Click here for a working example you can try out.

Details

Any stylesheet in a document falls into one of the following categories:

Persistent (no rel="alternate", no title=""): always applies to the document.

Preferred (no rel="alternate", with title="..." specified): applied by default, but  if an alternate stylesheet is selected. There can only be one preferred stylesheet, so providing stylesheets with different title attributes will cause some of them to be ignored. See Correctly Using Titles With External Stylesheets for a more detailed discussion.

Alternate (rel="alternate stylesheet", title="..." must be specified): disabled by default, can be selected.

When style sheets are referenced with a title attribute on the  or  element, the title becomes one of the choices offered to the user. Style sheets linked with the same title are part of the same choice. Style sheets linked without a title attribute are always applied.

Use rel="stylesheet" to link to the default style, and rel="alternate stylesheet" to link to alternative style sheets. This tells the browser which style sheet title should be selected by default, and makes that default selection apply in browsers that do not support alternate style sheets.

Specifications

Specification

Status

Comment

The CSS OM specification defines the concepts of the style sheet set name, its disabled flag, and the preferred CSS style sheet set name.

It defines how these are determined, and lets the HTML specification define the HTML-specific behaviors by requiring it to define when to create a CSS style sheet.

Earlier, the HTML specification itself defined the concept of preferred and alternate stylesheets.

Browser compatibility