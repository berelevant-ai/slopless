# CSSStyleSheet.addRule()

The obsolete  interface's addRule() legacy method adds a new rule to the stylesheet. You should avoid using this method, and should instead use the more standard  method.

Syntax

var result = cssStyleSheet.addRule(selector, styleBlock, index);

Parameters

selector

A  specifying the selector portion of the CSS rule. The default is the string undefined.

styleBlock

A  indicating the style block to apply to elements matching the selector. The default is the string undefined.

index

An optional index into the stylesheet's  at which to insert the new rule. If index is not specified, the next index after the last item currently in the list is used (that is, the value of cssStyleSheet.cssRules.length).

Return value

Always returns -1.

Note that due to somewhat estoteric rules about where you can legally insert rules, it's possible that an exception may be thrown. See  for more information.

Usage notes

This method is implemented by browsers by constructing a string using the template literal `${selector}{${styleBlock}}`, then passing it into the standard  method.

Therefore, given existing code such as the following:

cssStyleSheet.addRule(selector, styles, 0);

You can rewrite this to use the more standard insertRule() like this:

cssStyleSheet.insertRule(`${selector} {${styles}}`, 0);

Specifications

Specification

Status

Comment

Browser compatibility

See also

CSS Object Model

Using dynamic styling information