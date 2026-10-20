# Grid Tracks

A grid track is the space between two . They are defined in the explicit grid by using the  and  properties or the shorthand  or  properties. Tracks are also created in the implicit grid by positioning a grid item outside of the tracks created in the explicit grid.

The image below shows the first row track on a grid.

Track sizing in the explicit grid

When defining grid tracks using  and  you may use any length unit, and also the flex unit, fr which indicates a portion of the available space in the grid container. The example below demonstrates a grid with three column tracks, one of 200 pixels, the second of 1fr, the third of 3fr. Once the 200 pixels has been subtracted from the space available in the grid container, the remaining space is divided by 4. One part is given to column 2, 3 parts to column 3.

* {box-sizing: border-box;}

.wrapper {

border: 2px solid #f76707;

border-radius: 5px;

background-color: #fff4e6;

}

.wrapper > div {

border: 2px solid #ffa94d;

border-radius: 5px;

background-color: #ffd8a8;

padding: 1em;

color: #d9480f;

}

.wrapper {

display: grid;

grid-template-columns: 200px 1fr 3fr;

}

<div class="wrapper">

<div>One</div>

<div>Two</div>

<div>Three</div>

<div>Four</div>

<div>Five</div>

</div>

Track sizing in the implicit grid

Tracks created in the implicit grid are auto-sized by default, however you can define a size for these tracks using the  and  properties.

CSS Grid Layout Guide:

Basic concepts of grid layout

Definition of Grid Tracks in the CSS Grid Layout specification

Property reference