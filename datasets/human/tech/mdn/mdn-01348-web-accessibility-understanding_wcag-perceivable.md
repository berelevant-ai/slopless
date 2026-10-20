# Perceivable

This article provides practical advice on how to write your web content so that it conforms to the success criteria outlined in the Perceivable principle of the Web Content Accessibility Guidelines (WCAG) 2.0 and 2.1. Perceivable states that users must be able to perceive it in some way, using one or more of their senses.

Note: To read the W3C definitions for Perceivable and its guidelines and success criteria, see Principle 1: Perceivable - Information and user interface components must be presentable to users in ways they can perceive.

Guideline 1.1 — Providing text alternatives for non-text content

The key here is that text can be converted to other forms that people with disabilities can use.  For example, it can be spoken by a screenreader, converted to large print, or represented on a braille display. Non-text content refers to multimedia such as images, audio, and video.

Success criteria

How to conform to the criteria

Practical resource

1.1.1 Provide text equivalents  (A)

All images that convey meaningful content should be given suitable alternative text.

Text alternatives.

Complex images or charts should have an accessible alternative provided, either on the same page or via a link. Use a regular link instead of a longdesc attribute.

A text description may work, or an accessible data table (see HTML table advanced features and accessibility). See Other text alternative mechanisms for the argument against longdesc.

Multimedia content (i.e., audio or video) should at least have a descriptive identification available, such as a caption or similar.

See Text alternatives for static caption options, and Audio transcripts, Video text tracks, and Other multimedia content for other alternatives.

UI controls such as form elements and buttons should have text labels that describe their purpose.

Buttons are simple—you should make sure the button text describes the function of the button (e.g., <button>Upload image</button>). For more information on other UI controls, see UI controls.

Implement decorative (non-content) images, video, etc., in a way that is invisible to assistive technology, so it doesn't confuse users.

Decorative images should be implemented using CSS background images (see Backgrounds).  If you have to include an image via an  element, give it a blank alt (alt=""). Otherwise, screenreaders may try to read out the filepath, etc.

If you are including background video or audio that autoplays, make it as unobtrusive as possible. Don't make it look/sound like content, and provide a control to turn it off. Ideally, don't include it at all.

Note: Also see the WCAG description for Guideline 1.1: Text alternatives.

Guideline 1.2 — Providing text alternatives for time-based media

Time-based media refers to multimedia with a duration, such as audio and video. Note that if the audio/video serves as an alternative to existing text content, you don't need to provide another text alternative.

Success criteria

How to conform to the criteria

Practical resource

1.2.1 Provide alternatives for pre-recorded audio-only and video-only content (A)

A transcript should be provided for prerecorded audio-only media, and a transcript or audio description should be provided for prerecorded video-only media (i.e., silent video).

See Audio transcripts for transcript information. No audio description tutorial is available yet.

1.2.2 Provide captions for web-based video (A)

You should provide captions for video presented on the web (e.g., HTML5 video). This is for the benefit of people who can't hear the audio part of the video.

See Video text tracks for HTML5 video captions, and Other multimedia content for other technologies. See also Add your own subtitles & closed captions (YouTube).

1.2.3 Provide text transcript or audio description for web-based video (A)

You should provide text transcripts or audio descriptions for video presented on the web (e.g., HTML5 video. This is for the benefit of people who can't see the visual part of the video, and don't get the full content from the audio alone.

See Audio transcripts for transcript information. No audio description tutorial is available yet.

1.2.4 Provide captions for live audio (AA)

You should provide synchronized captions for all live multimedia that contains audio (e.g., video conferences, live audio broadcasts).

1.2.5 Provide audio descriptions for prerecorded video (AA)

Audio descriptions should be provided for prerecorded video, but only where the existing audio does not convey the full meaning expressed by the video.

1.2.6 Provide sign language equivalent to prerecorded audio (AAA)

An equivalent sign language video should be provided for any prerecorded content containing audio.

1.2.7 Provide extended video with audio descriptions (AAA)

Where audio descriptions cannot be provided (see 1.2.5) due to video timing issues (e.g., there are no suitable pauses in the content in which to insert the audio descriptions), an alternative version of the video should be provided that includes inserted pauses (and audio descriptions).

1.2.8 Provide an alternative for prerecorded media (AAA)

For all content that features video, a descriptive text transcript should be provided, for example a script of the movie you are watching. This is for the benefit of hearing-impaired viewers who cannot hear the content.

See Audio transcripts for transcript information.

1.2.9 Provide a transcript for live audio (AAA)

For any live audio content being broadcast, a descriptive text should be provided, for example a script of the play or musical you are listening to. This is for the benefit of hearing-impaired viewers who cannot hear the content.

See Audio transcripts for transcript information.

Note: Also see the WCAG description for Guideline 1.2: Time-based Media: Provide alternatives for time-based media.

Guideline 1.3 — Create content that can be presented in different ways

This guideline refers to the ability of content to be consumed by users in multiple ways, accommodating their differing needs.

Success criteria

How to conform to the criteria

Practical resource

1.3.1 Info and relationships (A)

Any content structure—or visual relationship made between content—can also be determined programmatically, or be inferred from text description. The main situations in which this is relevant are:

Text labels and the form elements they describe. These are associated unambiguously using the  element, which can be picked up by screenreaders, etc.

Image alt text. Content images should have text available that clearly describes the image's contents, which can be programmatically associated with it (e.g., alt text), or otherwise is easy to associate (e.g., describes it and is sat right next to it). This should mean that the full meaning can still be inferred even if you can't see the image.

Lists. If the order of list items is important, use an ordered list ().

The whole of

HTML: A good basis for accessibility is packed with information about this, but you should particularly refer to Good semantics, UI controls, and Text alternatives.

1.3.2 Meaningful content sequence (A)

A sensible, logical reading order should be easy to determine for any content, even if it is visually presented in an unusual way. The order should be made obvious by use of correct semantic elements (e.g., headings, paragraphs), with CSS being used to create any unusual layout styles, irrespective of the markup.

Again, refer to HTML: A good basis for accessibility.

1.3.3 Sensory characteristics (A)

Instructions for operating controls or understanding content do not rely on a single sense. This may prove inaccessible to people with a disability related to that sense, or a device that does not support that sense. So, for example:

"Click the round button to continue"

The button should be clearly labelled so that it is obvious that it is the button you need to press. If there are multiple buttons, make sure they are all clearly labelled to distinguish their function.

"Listen to the audio instructions for guidance"

This is obviously problematic—audio will be inaccessible to those with hearing impairments, whereas text can be read, but also spoken by a screenreader if required.

"Swipe from the right hand side of the screen to reveal the menu"

Some users might not be able to swipe the screen, either due to disability or because their device does not support touch. An alternative should be provided, such as a keyboard shortcut or button that can be activated by keyboard or other means.

Note: Conveying instructions solely by color is related, but covered in a different guideline — 1.4.1.

1.3.4 Orientation (AA) added in 2.1

Content does not restrict its view and operation to a single display orientation, such as portrait or landscape, unless a specific display orientation is essential.

Understanding Orientation

1.3.5 Identify Input Purpose (AA) added in 2.1

Follow the list of 53 input fields to programmatically identify the purpose of a field.

Understanding Identify Input Purpose

1.3.6 Identify Purpose (AAA) added in 2.1

In content implemented using markup languages, the purpose of user interface components, icons, and regions can be programmatically determined.

Understanding Identify Purpose

Note: Also see the WCAG description for Guideline 1.3: Adaptable: Create content that can be presented in different ways without losing information or structure.

Guideline 1.4: Make it easier for users to see and hear content including separating foreground from background

This guideline relates to making sure core content is easy to discern from backgrounds and other decoration. The classic example is color (both color contrast and use of color to convey instructions), but it applies in other situations too.

Success criteria

How to conform to the criteria

Practical resource

1.4.1 Use of color (A)

Color should not be solely relied upon to convey information. For example, in forms, you should never mark required fields purely with a color (like red). Instead (or as well as), something like an asterisk with a label of "required" would be more appropriate.

See Color and color contrast and Multiple labels.

1.4.2 Audio controls (A)

For any audio that plays for longer than three seconds, provide accessible controls to play and pause the audio/video, and mute/adjust volume.

Use native <button>s to provide accessible keyboard controls, as shown in Video player styling basics.

1.4.3 Minimum contrast (AA)

The color contrast between background and foreground content should be at a minimum level to ensure legibility:

Text and its background should have a contrast ratio of at least 4.5:1.

Heading (or just larger) text should have a ratio of at least 3:1. Larger text is defined as at least 18pt, or 14pt bold.

See Color and color contrast.

1.4.4 Resize text (AA)

The page should be readable and usable when the text size is doubled. This means that designs should be responsive, so that when the text size is increased, the content is still accessible.

1.4.5 Images of text (AA)

Images should NOT be used to present content where text would do the job. For example, if an image is mostly textual, it could be represented using text as well as images.

1.4.6 Enhanced contrast (AAA)

This follows, and builds on, criterion 1.4.3.

Text and its background should have a contrast ratio of at least 7:1.

Heading (or just larger) text should have a ratio of at least 4.5:1. Larger text is defined as at least 18pt, or 14pt bold.

See Color and color contrast.

1.4.7 Low or no background audio (AAA)

Prerecorded audio recordings that primarily feature speech should have minimal background noise, so the content can be easily understood.

1.4.8 Visual presentation (AAA)

For text content presentation, the following should be true:

Foreground and background colors should be user-selectable.

Text blocks should be no wider than 80 characters (or glyphs), for maximum readability.

Text should not be fully justified (e.g., text-align: justify;).

Line height should be at least 1.5 times the text size within paragraphs (e.g., line-height: 1.5;), and at least 2.25 times the text size between paragraphs (e.g., padding: 2.25rem;).

When the text size is doubled, the content should not need to be scrolled.

1.4.9 Images of text (No Exception) (AAA)

Text should not be presented as part of an image unless it is purely decoration (i.e., it does not convey any content) or cannot be presented in any other way.

1.4.10 Reflow (AA) added in 2.1

No horizontal scrolling for left-to-right languages (like English) or right-to-left languages (like Arabic)

No vertical scrolling for top-to-bottom languages (like Japanese)

Except for parts of the content which require two-dimensional layout for usage or meaning (like a large data table)

Understanding Reflow

1.4.11 Non-Text Contrast(AA) added in 2.1

Minimum color contrast ratio of 3:1 for user interface components and graphical objects.

Understanding Non-Text Contrast

1.4.12 Text Spacing (AA) added in 2.1

No loss of content or functionality occurs when the following styles are applied:

Line height (line spacing) to at least 1.5 times the font size

Spacing following paragraphs to at least 2 times the font size

Letter spacing (tracking) to at least 0.12 times the font size

Word spacing to at least 0.16 times the font size

Understanding Text Spacing

1.4.13 Content on Hover or Focus (AA) added in 2.1

While additional content may appear and disappear in coordination with hover and keyboard focus, this success criterion specifies three conditions that must be met:

dismissible (can be closed/removed)

hoverable (the additional content does not disappear when the pointer is over it)

persistent (the additional content does not disappear without user action)

Understanding Content on Hover or Focus

Note: Also see the WCAG description for Guideline 1.4: Distinguishable: Make it easier for users to see and hear content including separating foreground from background..

See also

WCAG

Perceivable

Operable

Understandable

Robust