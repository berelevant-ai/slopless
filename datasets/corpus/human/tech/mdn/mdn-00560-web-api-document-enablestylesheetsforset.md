# Document.enableStyleSheetsForSet()

Enables the style sheets matching the specified name in the current style sheet set, and disables all other style sheets (except those without a title, which are always enabled).

Syntax

document.enableStyleSheetsForSet(name);

Parameters

name

The name of the style sheets to enable. All style sheets with a title that match this name will be enabled, while all others that have a title will be disabled. Specify an empty string for the name parameter to disable all alternate and preferred style sheets (but not the persistent style sheets; that is, those with no title attribute).

Notes

Title matches are case-sensitive.

Calling this method with a null name has no effect; if you want to disable all alternate and preferred style sheets, you must pass "", the empty string.

Stylesheets that don't have a title are never affected by this method.

This method never affects the values of  or .

Example

document.enableStyleSheetsForSet("Some style sheet set name");

Browser compatibility

See also

Correctly Using Titles With External Stylesheets