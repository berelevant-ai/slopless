# prefers-color-scheme

If you have set privacy.resistFingerprinting to true,  preference is overridden to light.

Alternately, users can create the numeric preference ui.systemUsesDarkTheme to override the default behavior and return light (value: 0), dark (value: 1), or no-preference (value: 2). (Any other value causes Firefox to return light.)

The prefers-color-scheme CSS media feature is used to detect if the user has requested the system use a light or dark color theme.

Syntax

light

Indicates that user has notified the system that they prefer an interface that has a light theme, or has not expressed an active preference.

dark

Indicates that user has notified the system that they prefer an interface that has a dark theme.

Examples

The elements below have an initial color theme. They can be further themed according to the user's color scheme preference.

HTML

<div class="day">Day (initial)</div>

<div class="day light-scheme">Day (changes in light scheme)</div>

<div class="day dark-scheme">Day (changes in dark scheme)</div> <br>

<div class="night">Night (initial)</div>

<div class="night light-scheme">Night (changes in light scheme)</div>

<div class="night dark-scheme">Night (changes in dark scheme)</div>

CSS

.day   { background: #eee; color: black; }

.night { background: #333; color: white; }

@media (prefers-color-scheme: dark) {

.day.dark-scheme   { background:  #333; color: white; }

.night.dark-scheme { background: black; color:  #ddd; }

}

@media (prefers-color-scheme: light) {

.day.light-scheme   { background: white; color:  #555; }

.night.light-scheme { background:  #eee; color: black; }

}

.day, .night {

display: inline-block;

padding: 1em;

width: 7em;

height: 2em;

vertical-align: middle;

}

Result

Specifications

Specification

Status

Comment

Initial definition.

Browser compatibility

See also

Video tutorial: Coding a Dark Mode for your Website

Redesigning your product and website for dark mode

Changing color schemes in Windows, macOS and Android.