# Flash to HTML5 migration guide

This set of articles provides you with information on how to migrate existing Flash content and functionality to HTML and JavaScript.

Background

Flash became very popular in the late 1990s to early 2000s because it provided an effective way to create rich content on the web — such as animations, games, and video players. However, it has a number of issues; the Flash Player causes security and performance problems, and leads to bloated pages. In addition, the modern web platform has feature parity with Flash, so you no longer need to rely on plugins to implement rich content.

Browsers are working together to move carefully towards a plugin-free web (see our Plugin Roadmap), so developers should start migrating their Flash-based functionality to open web technologies as soon as possible.

Video

All you need to know to move your video requirements over from Flash to HTML5 (see the Flash video to HTML5 video landing page also).

Planning

Planning your transition from Flash video to HTML5 video

Transitioning from Flash to HTML5 can take several months and may require new skills and software. This guide shows you how to plan for that transition, and contains two main parts, Content audit and Decision points.

Process

File format conversion

Once you've planned out what you want to do, the first step is to convert your video files into formats compatible with HTML embedding.

DRM and authentication

If your media requires authentication/rights to access, you'll need to work out how to hook up the necessary DRM and authentication mechanisms.

Video advertising

You may also want to incorporate advertising into your video delivery system, via an ad network.

Distribution

A CDN is a popular choice for effective delivery of media content.

Video and audio players

There are a number of ways to play back web media depending on the scale of your needs and whether you need ad integration and digital rights management.

Subtitles and captions

Just as audio and video may need transcoding for the web, subtitles and captions may also need to be converted and made available.

Other topics

Other common Flash use cases that should now be migrated to HTML5.

Open web games

Flash games used to be very common, but the open web is now a viable platform for creating and distributing games.

Real-time apps with WebSockets

Flash TCP sockets have been commonly used to create real-time multiuser apps such as chat apps, but they can be replaced with WebSockets.

Clipboard access

Flash's clipboard API used to be the only available means for creating advanced clipboard functionality, but this is now available in web standards.

Content and advertising visibility with Intersection Observer

Flash used to be a simple but slow way to detect content and advertising visibility on the page. The web platform now has the Intersection Observer API to do this better and faster.

Flexible user interfaces with CSS

Adobe Flex used to provide a way to effectively create flexible user interfaces on the web, but the open web platform now boasts powerful CSS layout systems like Grid and Flexbox to close the gap.

Camera/Microphone access with WebRTC

Developers used to rely exclusively on Flash for accessing the user's camera and microphone, but this can now be achieved with WebRTC and related technologies. See also Media Capture and Streams API and getUserMedia for useful starting points.

File selection using the File API

The web platform has functionality accessing files on the user's file system, e.g. for upload or display. See <input type="file"> and Using files from web applications for useful resources.

Getting help

If you find that our migration guide leaves you with any questions unanswered, please don't hesitate to visit our MDN Discourse page and ask them there.