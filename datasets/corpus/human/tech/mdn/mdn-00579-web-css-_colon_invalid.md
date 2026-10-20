# :invalid

The :invalid CSS pseudo-class represents any  or other  element whose contents fail to validate.

/* Selects any invalid <input> */

input:invalid {

background-color: pink;

}

This pseudo-class is useful for highlighting field errors for the user.

Syntax

Examples

A form that colors elements green when they validate and red when they don't.

HTML

<form>

<div class="field">

<label for="url_input">Enter a URL:</label>

<input type="url" id="url_input">

</div>

<div class="field">

<label for="email_input">Enter an email address:</label>

<input type="email" id="email_input" required>

</div>

</form>

CSS

label {

display: block;

margin: 1px;

padding: 1px;

}

.field {

margin: 1px;

padding: 1px;

}

input:invalid {

background-color: #ffdddd;

}

form:invalid {

border: 5px solid #ffdddd;

}

input:valid {

background-color: #ddffdd;

}

form:valid {

border: 5px solid #ddffdd;

}

input:required {

border-color: #800000;

border-width: 3px;

}

input:required:invalid {

border-color: #c00000;

}

Result

Accessibility concerns

The color red is commonly used to indicate invalid input. People who have certain types of color blindness will be unable to determine the input's state unless it is accompanied by an additional indicator that does not rely on color to convey meaning. Typically, descriptive text and/or an icon are used.

MDN Understanding WCAG, Guideline 1.4 explanations

Understanding Success Criterion 1.4.1 | W3C Understanding WCAG 2.0

Notes

Radio buttons

If any one of the radio buttons in a group is required, the :invalid pseudo-class is applied to all of them if none of the buttons in the group is selected. (Grouped radio buttons share the same value for their name attribute.)

Gecko defaults

By default, Gecko does not apply a style to the :invalid pseudo-class. However, it does apply a style (a red "glow" using the  property) to the  pseudo-class, which applies in a subset of cases for :invalid.

Specifications

Specification

Status

Comment

No change.

Defines the semantics of HTML and constraint validation.

Initial definition.

Browser compatibility

See also

Other validation-related pseudo-classes: , ,

Related Mozilla pseudo-classes: ,

Form data validation

Accessing the validity state from JavaScript