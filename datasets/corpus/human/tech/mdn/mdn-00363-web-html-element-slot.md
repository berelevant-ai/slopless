# <slot>

The HTML <slot> element—part of the Web Components technology suite—is a placeholder inside a web component that you can fill with your own markup, which lets you create separate DOM trees and present them together.

Content categories

Flow content, phrasing content

Permitted content

Transparent

Events

Tag omission

Permitted parents

Any element that accepts phrasing content

Implicit ARIA role

No corresponding role

Permitted ARIA roles

No role permitted

DOM interface

Attributes

This element includes the global attributes.

The slot's name.

A named slot is a <slot> element with a name attribute.

Examples

<template id="element-details-template">

<style>

details {font-family: "Open Sans Light", Helvetica, Arial, sans-serif }

.name {font-weight: bold; color: #217ac0; font-size: 120% }

h4 {

margin: 10px 0 -8px 0;

background: #217ac0;

color: white;

padding: 2px 6px;

border: 1px solid #cee9f9;

border-radius: 4px;

}

.attributes { margin-left: 22px; font-size: 90% }

.attributes p { margin-left: 16px; font-style: italic }

</style>

<details>

<summary>

<code class="name"><<slot name="element-name">NEED NAME</slot>></code>

<i class="desc"><slot name="description">NEED DESCRIPTION</slot></i>

</summary>

<div class="attributes">

<h4>Attributes</h4>

<slot name="attributes"><p>None</p></slot>

</div>

</details>

<hr>

</template>

Note: You can see this complete example in action at element-details (see it running live). In addition, you can find an explanation at Using templates and slots.

Specifications

Specification

Status

Comments

Browser compatibility