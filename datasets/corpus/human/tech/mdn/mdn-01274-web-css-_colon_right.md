# :right

The :right CSS pseudo-class, used with the  at-rule, represents all right-hand pages of a printed document.

/* Selects any right-hand pages when printing */

@page :right {

margin: 2in 3in;

}

Whether a given page is "left" or "right" is determined by the major writing direction of the document. For example, if the first page has a major writing direction of left-to-right then it will be a :right page; if it has a major writing direction of right-to-left then it will be a  page.

Note: This pseudo-class can be used to change only the , , , and  properties of the page box. All other properties will be ignored, and only the page box, not the document content on the page, will be affected.

Syntax

Examples

Setting margins for right-hand pages

@page :right {

margin: 2in 3in;

}

Specifications

Specification

Status

Comment

No change.

Initial definition.

Browser compatibility

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also

Other page-related pseudo-classes: ,