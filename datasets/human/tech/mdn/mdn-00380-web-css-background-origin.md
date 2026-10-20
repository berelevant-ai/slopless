# background-origin

The background-origin CSS property sets the background's origin: from the border start, inside the border, or inside the padding.

Note that background-origin is ignored when  is fixed.

Syntax

/* Keyword values */

background-origin: border-box;

background-origin: padding-box;

background-origin: content-box;

/* Global values */

background-origin: inherit;

background-origin: initial;

background-origin: unset;

The background-origin property is specified as one of the keyword values listed below.

Values

border-box

The background is positioned relative to the border box.

padding-box

The background is positioned relative to the padding box.

content-box

The background is positioned relative to the content box.

Formal definition

Formal syntax

Examples

Setting background origins

.example {

border: 10px double;

padding: 10px;

background: url('image.jpg');

background-position: center left;

background-origin: content-box;

}

#example2 {

border: 4px solid black;

padding: 10px;

background: url('image.gif');

background-repeat: no-repeat;

background-origin: border-box;

}

div {

background-image: url('logo.jpg'), url('mainback.png'); /* Applies two images to the background */

background-position: top right, 0px 0px;

background-origin: content-box, padding-box;

}

Using two gradients

In this example the box has a thick dotted border. The first gradient uses the padding-box as the background-origin and therefore the background sits inside the border. The second uses the content-box and so only displays behind the content.

.box {

margin: 10px 0;

color: #fff;

background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,0.6) 60%, rgba(252,176,69,1) 100%),

radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(0,0,0,1) 28%);

border: 20px dashed black;

padding: 20px;

width: 400px;

background-origin: padding-box, content-box;

background-repeat: no-repeat;

}

<div class="box">Hello!</div>

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

The compatibility table in this page is generated from structured data. If you'd like to contribute to the data, please check out https://github.com/mdn/browser-compat-data and send us a pull request.

See also