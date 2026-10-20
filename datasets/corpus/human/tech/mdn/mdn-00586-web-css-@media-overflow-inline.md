# overflow-inline

The overflow-inline CSS media feature can be used to test how the output device handles content that overflows the initial containing block along the inline axis.

Syntax

The overflow-inline feature is specified as a keyword value chosen from the list below.

none

Content that overflows the inline axis is not displayed.

scroll

Content that overflows the inline axis can be seen by scrolling to it.

Examples

HTML

<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac turpis eleifend, fringilla velit ac, aliquam tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nunc velit erat, tempus id rutrum sed, dapibus ut urna. Integer vehicula nibh a justo imperdiet rutrum. Nam faucibus pretium orci imperdiet sollicitudin. Nunc id facilisis dui. Proin elementum et massa et feugiat. Integer rutrum ullamcorper eleifend. Proin sit amet tincidunt risus. Sed nec augue congue eros accumsan tincidunt sed eget ex.</p>

CSS

p {

white-space: nowrap;

}

@media (overflow-inline: scroll) {

p {

color: red;

}

}

Result

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility