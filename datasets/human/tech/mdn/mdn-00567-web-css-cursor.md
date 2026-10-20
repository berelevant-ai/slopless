# cursor

The cursor CSS property sets the type of mouse cursor, if any, to show when the mouse pointer is over an element.

The source for this interactive example is stored in a GitHub repository. If you'd like to contribute to the interactive examples project, please clone https://github.com/mdn/interactive-examples and send us a pull request.

Syntax

/* Keyword value */

cursor: pointer;

cursor: auto;

/* URL, with a keyword fallback */

cursor: url(hand.cur), pointer;

/* URL and coordinates, with a keyword fallback */

cursor: url(cursor1.png) 4 12, auto;

cursor: url(cursor2.png) 2 2, pointer;

/* Global values */

cursor: inherit;

cursor: initial;

cursor: unset;

The cursor property is specified as zero or more <url> values, separated by commas, followed by a single mandatory keyword value. Each <url> should point to an image file. The browser will try to load the first image specified, falling back to the next if it can't, and falling back to the keyword value if no images could be loaded (or if none were specified).

Each <url> may be optionally followed by a pair of space-separated numbers, which represent <x><y> coordinates. These will set the cursor's hotspot, relative to the top-left corner of the image.

For example, this specifies two images using <url> values, providing <x><y> coordinates for the second one, and falling back to the progress keyword value if neither image can be loaded:

cursor: url(one.svg), url(two.svg) 5 5, progress;

Values

<url>

A url(…) or a comma separated list url(…), url(…), …, pointing to an image file. More than one  may be provided as fallbacks, in case some cursor image types are not supported. A non-URL fallback (one or more of the keyword values) must be at the end of the fallback list. See Using URL values for the cursor property for more details.

<x> <y>

Optional x- and y-coordinates. Two unitless nonnegative numbers less than 32.

Keyword values

Move your mouse over values to see their live appearance in your browser:

Category

CSS value

Example

Description

General

auto

The UA will determine the cursor to display based on the current context. E.g., equivalent to text when hovering text.

default

The platform-dependent default cursor. Typically an arrow.

none

No cursor is rendered.

Links & status

context-menu

A context menu is available.

help

Help information is available.

pointer

The cursor is a pointer that indicates a link. Typically an image of a pointing hand.

progress

The program is busy in the background, but the user can still interact with the interface (in contrast to wait).

wait

The program is busy, and the user can't interact with the interface (in contrast to progress). Sometimes an image of an hourglass or a watch.

Selection

cell

The table cell or set of cells can be selected.

crosshair

Cross cursor, often used to indicate selection in a bitmap.

text

The text can be selected. Typically the shape of an I-beam.

vertical-text

The vertical text can be selected. Typically the shape of a sideways I-beam.

Drag & drop

alias

An alias or shortcut is to be created.

copy

Something is to be copied.

move

Something is to be moved.

no-drop

An item may not be dropped at the current location.

: On Windows and Mac OS X, no-drop is the same as not-allowed.

not-allowed

The requested action will not be carried out.

grab

Something can be grabbed (dragged to be moved).

grabbing

Something is being grabbed (dragged to be moved).

Resizing & scrolling

all-scroll

Something can be scrolled in any direction (panned).

: On Windows, all-scroll is the same as move.

col-resize

The item/column can be resized horizontally. Often rendered as arrows pointing left and right with a vertical bar separating them.

row-resize

The item/row can be resized vertically. Often rendered as arrows pointing up and down with a horizontal bar separating them.

n-resize

Some edge is to be moved. For example, the se-resize cursor is used when the movement starts from the south-east corner of the box.

In some environments, an equivalent bidirectional resize cursor is shown. For example, n-resize and s-resize are the same as ns-resize.

e-resize

s-resize

w-resize

ne-resize

nw-resize

se-resize

sw-resize

ew-resize

Bidirectional resize cursor.

ns-resize

nesw-resize

nwse-resize

Zooming

zoom-in

Something can be zoomed (magnified) in or out.

zoom-out

Usage notes

Although the specification does not define any size limitations for cursor, individual  may choose to do so. Cursor changes using images which are outside the size range supported by the browser will generally just be ignored.

Check the  table for any notes on cursor size limits.

Formal definition

Formal syntax

Examples

Setting cursor types

.foo {

cursor: crosshair;

}

.bar {

cursor: zoom-in;

}

/* A fallback keyword value is required when using a URL */

.baz {

cursor: url("hyper.cur"), auto;

}

Specifications

Specification

Status

Comment

Addition of several keywords and the positioning syntax for url().

Initial definition.

Browser compatibility

See also

Using URL values for the cursor property

function