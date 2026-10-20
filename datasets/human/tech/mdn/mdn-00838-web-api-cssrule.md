# CSSRule

The CSSRule interface represents a single CSS rule. There are several types of rules which inherit properties from CSSRule.

Properties common to all CSSRule instances

The CSSRule interface specifies the properties common to all rules, while properties unique to specific rule types are specified in the more specialized interfaces for those rules' respective types.

Represents the textual representation of the rule, e.g. "h1,h2 { font-size: 16pt }" or "@import 'url'". To access or modify parts of the rule (e.g. the value of "font-size" in the example) use the properties on the .

Returns the containing rule, otherwise null. E.g. if this rule is a style rule inside an  block, the parent rule would be that .

Returns the  object for the style sheet that contains this rule

Returns one of the Type constants to determine which type of rule is represented.

Examples

References to a CSSRule may be obtained by looking at a 's cssRules list.

let myRules = document.styleSheets[0].cssRules; // Returns a CSSRuleList

console.log(myRules);

Specifications

Specification

Status

Comment

Obsoleted values CHARSET_RULE and UNKNOWN_RULE. Added value NAMESPACE_RULE. Deprecates CSSRule.type.

Added values KEYFRAMES_RULE and KEYFRAME_RULE.

Added value FONT_FEATURE_VALUES_RULE.

Added value COUNTER_STYLE_RULE.

Added value SUPPORTS_RULE. (DOCUMENT_RULE has been pushed to CSS Conditional Rules Level 4)

Initial definition.

Browser compatibility

See also

Using dynamic styling information