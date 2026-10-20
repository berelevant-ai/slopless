# Inner and outer windows

This article will try to explain the concepts of inner and outer windows.

Consider that when the user is looking at a document in a browser window, not only can the document the user is currently viewing change, but the document's contents can change. Then add to that the concept of frames, whereby a document in a window can itself contain other documents, which in turn can contain more documents.

In order to represent these levels of complexity, two "types" of window need to be considered. These don't technically refer to windows as the user sees them, but rather a perspective on what the user is looking at.

Windows and the bfcache

An outer window is a browsing context; that is, the actual environment in which a  is presented to the user. This may be a window or a tab, or it might be an  contained within another document. HTML5 refers to the outer window as the WindowProxy.

An inner window represents the actual content being displayed; it's the current view of what the user sees.

Consider this view of a window and the browser history:

As the user navigates, documents are added to the backward-forward cache (often referred to as the bfcache). These are, in essence, inner windows. They get displayed in the outer window, which is contained in the "physical" browser window.

Here's the trick, though: the inner window in essence pretends to be the outer window. If the document currently being displayed asks "what window am I in?", it gets the outer window as the answer. That lets the document interact with the "physical" window, while the outer window can keep track of all the documents (inner windows) it contains. In other words,  always returns the outer window.

Nested windows

Things become slightly more complex when you consider that documents can contain other documents. This happens, for example, when a  contains a  or . Not only can the outermost document be navigated, but if the user clicks a link in one of the frames, that frame can navigate.

This means there needs to be a hierarchy of outer and inner windows. Consider a document that has three  elements in it. The hierarchy would look something like this:

In this diagram, objects you interact with directly in the DOM (that is, , , and  objects) are blue. The grey circles represent the more abstract inner and outer windows, which are real objects that you don't directly interact with when working with the DOM.  The Window at the top of the diagram is an outer window.

As the user navigates in each of the documents in the various frames, each of those inner windows has its own history that can be moved forward and backward through, just like in the previous diagram.

The  element offers the contentWindow property, which gives you the outer window  object containing the frame's document. The frame's contentDocument property, similarly, gives you the  object inside the frame.

You can get the window containing the frame from the  property.

This hierarchy can continue on, if frames contain additional frames.