# What does an API reference need?

This article explains what pages are required for a complete API reference.

Note: It is a good idea to create the list of documents you need to write or update when you are working on an API reference, then check them off as you complete them.

API pages at a glance

An API reference will generally contain the following pages. You can find more details of what each page contains, examples, and templates, in our Page types article.

Overview page

Interface pages

Constructor pages

Method pages

Property pages (including event handlers properties)

Event pages

Concept/guide pages

Examples

Note: We'll be referring to the Web Audio API for examples in this article.

Note: To create a page as specified below, the easiest way is to go to the parent page you want it to hang off, and choose Cog icon > New sub-article. If you haven't got this option available on your MDN interface, you'll need to request this privilege (ask at mdn-admins@mozilla.org), or ask another MDN contributor to create them for you.

Overview pages

A single API overview page is used to describe the role of the API, its top-level interfaces, related features contained in other interfaces, and other high level details. Its name and slug should be the name of the API plus "API" on the end. It is placed at the top level of the API reference, as a child of https://developer.mozilla.org/en-US/docs/Web/API.

Example:

Title: Web Audio API

Slug: Web_Audio_API

URL: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API

Interface pages

Each interface will have its own page too, describing the purpose of the interface, listing any members (constructors, methods, properties, etc. it contains), and showing what browsers it is compatible with. A page's name and slug should be the name of the interface, exactly as written in the spec. Each page is placed at the top level of the API reference, as a child of https://developer.mozilla.org/en-US/docs/Web/API.

Examples:

Title: AudioContext

Slug: AudioContext

URL: https://developer.mozilla.org/en-US/docs/Web/API/AudioContext

Title: AudioNode

Slug: AudioNode

URL: https://developer.mozilla.org/en-US/docs/Web/API/AudioNode

Note: We document every member appearing in the interface. You should bear the following rules in mind:

We document methods defined on the prototype of an object implementing this interface (instance methods), and methods defined on the actual class itself (static methods). On the rare occasions that they both exist on the same interface, you should list them in separate sections on the page (Static methods/Instance methods). Usually only instance methods exist, in which case you can put these under the title "Methods".

We do not document inherited properties and methods of the interface: they are listed on the respective parent interface. We do hint at their existence though.

We do document properties and methods defined in mixins, though we use the mixin name as interface name. (This is not optimal as the mixin name will not appear in the console, but it prevents the duplication of documentation. We may revisit this in the future.)

Special methods like the stringifier (toString()) and the jsonizer (toJSON()) are also listed if they do exist.

Named constructors (like Image()  for  ) are also listed, if relevant.

Constructor pages

Each interface has 0 or 1 constructors, documented on a subpage of the interface's page. It describes the purpose of the constructor and shows what its syntax looks like, usage examples, browser compatibility information, etc. Its slug is the name of the constructor, which is exactly the same as the interface name, and the title is interface name, dot, constructor name, then parentheses on the end.

Example:

Title: AudioContext.AudioContext()

Slug: AudioContext

URL: https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/AudioContext

Property pages

Each interface has zero or more properties, documented on subpages of the interface's page. each page describes the purpose of the property and shows what its syntax looks like, usage examples, browser compatibility information, etc. Its slug is the name of the property, and the title is interface name, dot, then property name.

Examples:

Title: AudioContext.state

Slug: state

URL: https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/state

Title: AudioContext.onstatechange

Slug: onstatechange

URL: https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/onstatechange

Note: Event handler properties are treated in the same way as regular properties; they are generally listed in a separate section on the interface page though.

Method pages

Each interface has zero or more methods, documented on subpages of the interface's page. each page describes the purpose of the method and shows what its syntax looks like, usage examples, browser compatibility information, etc. Its slug is the name of the method, and the title is interface name, dot, method name, then parentheses.

Examples:

Title: AudioContext.close()

Slug: close

URL: https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/close

Title: AudioContext.createGain()

Slug: createGain

URL: https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createGain

Event pages

Each event handler property you create will have a corresponding event page, describing the event that causes the handler to fire, documented on a subpage of https://developer.mozilla.org/en-US/docs/Web/Events. Each page describes the purpose of the event and shows what its syntax looks like, usage examples, browser compatibility information, etc. Its slug and title is the name of the event.

Example:

Title: statechange

Slug: statechange

URL: https://developer.mozilla.org/en-US/docs/Web/Events/statechange

Concept/guide pages

Most API references have at least one guide and sometimes also a concept page to accompany it. At minimum, an API reference should contain a guide called "Using the name-of-api", which will provide a basic guide to how to use the API. More complex APIs may require multiple usage guides to explain how to use different aspects of the API.

If required, you can also including a concepts article called "name-of-api concepts", which will provide explanation of the theory behind any concepts related to the API that developers should understand to effectively use it.

These articles should all be created as subpages of the API overview page. For example, the Web Audio has four guides and a concept article:

https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API

https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API

https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Web_audio_spatialization_basics

https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Porting_webkitAudioContext_code_to_standards_based_AudioContext

https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Basic_concepts_behind_Web_Audio_API

Examples

You should create some examples that demonstrate at least the most common use cases of the API. You can put these anywhere that is appropriate, although the recommended place is the MDN GitHub repo.