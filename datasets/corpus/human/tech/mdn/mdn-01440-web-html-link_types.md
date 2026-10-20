# Link types

In HTML, link types indicate the relationship between two documents, in which one links to the other using an , , , or  element.

List of the defined link types and their significance in HTML

Link Type

Description

Allowed in these elements

Not allowed in these elements

alternate

If the element is  and the  attribute also contains the stylesheet type, the link defines an alternative style sheet; in that case the  attribute must be present and not be the empty string.

If the  is set to application/rss+xml or application/atom+xml, the link defines a syndication feed. The first one defined on the page is the default.

Otherwise, the link defines an alternative page, of one of these types:

for another medium, like a handheld device (if the  attribute is set)

in another language (if the  attribute is set),

in another format, such as a PDF (if the  attribute is set)

a combination of these

, ,

archives

Defines a hyperlink to a document that contains an archive link to this one. For example, a blog entry could link to a monthly index page this way.

Note: Although recognized, the singular archive is incorrect and must be avoided.

, ,

author

Defines a hyperlink to a page describing the author or providing a way to contact the author.

Note: This may be a mailto: hyperlink, but this is not recommended on public pages as robot harvesters will quickly lead to a lot of spam sent to the address. In that case, it is better to lead to a page containing a contact form.

Although recognized, the  attribute on ,  or elements with a link type of made is incorrect and should be replaced by the  attribute with this link type.

, ,

bookmark

Indicates that the hyperlink is a permalink for the nearest ancestor  element. If none, it is a permalink for the section that the element is most closely associated to.

This allows for bookmarking a single article in a page containing multiple articles, such as on a monthly summary blog page, or a blog aggregator.

,

,

canonical

From Wikipedia, the free encyclopedia: Canonical_link_element

A canonical link element is an HTML element that helps webmasters prevent duplicate content issues by specifying the "canonical" or "preferred" version of a web page as part of search engine optimization.

, ,

dns-prefetch

Hints to the browser that a resource is needed, allowing the browser to do a DNS lookup and protocol handshaking before a user clicks the link.

, ,

external

Indicates that the hyperlink leads to a resource outside the site of the current page; that is, following the link will make the user leave the site.

, ,

first

Indicates that the hyperlink leads to the first resource of the sequence the current page is in.

Note: Other link types related to linking resources in the same sequence are last, prev, next.

Although recognized, the synonyms begin and start are incorrect and must be avoided.

, ,

help

If the element is  or , it indicates that the hyperlink leads to a resource giving further help about the parent of the element, and its descendants.

If the element is  it indicates that the hyperlink leads to a resource giving further help about the page as a whole.

, , ,

None.

icon

Defines a resource for representing the page in the user interface, usually an icon (auditory or visual). In the browser, it is usually referred to as the .

If there are multiple <link rel="icon">s, the browser uses their , , and  attributes to select the most appropriate icon. If several icons are equally appropriate, the last one is used. If the most appropriate icon is later found to be inappropriate, for example because it uses an unsupported format, the browser proceeds to the next-most appropriate, and so on.

Note: Apple's iOS does not use this link type, nor the  attribute, like others mobile browsers do, to select a webpage icon for Web Clip or a start-up placeholder. Instead it uses the non-standard apple-touch-icon and apple-touch-startup-image respectively.

The shortcut link type is often seen before icon, but this link type is non-conforming, ignored and web authors must not use it anymore.

, ,

import

HTML Imports

, ,

index

Indicates that the page is part of a hierarchical structure and that the hyperlink leads to the top level resource of that structure.

If one or several up link types are also present, the number of these up indicates the depth of the current page in the hierarchy.

, ,

last

Indicates that the hyperlink leads to the last resource of the sequence the current page is in.

Note: Other link types related to linking resources in the same sequence are first, prev, next.

Although recognized, the synonym end is incorrect and must be avoided.

, ,

license

Indicates that the hyperlink leads to a document describing the licensing information. If not inside the  element, the standard doesn't distinguish between a hyperlink applying to a specific part of the document or to the document as a whole. Only the data on the page can indicate this.

Note: Although recognized, the synonym copyright is incorrect and must be avoided.

, , ,

None.

manifest

Indicates that the linked file is a Web App Manifest.

, ,

modulepreload

Initiates early (and high-priority) loading of module scripts.

, ,

next

Indicates that the hyperlink leads to the next resource of the sequence the current page is in.

Note: Other link types related to linking resources in the same sequence are first, prev, last.

, , ,

None.

nofollow

Indicates that the linked document is not endorsed by the author of this one, for example if it has no control over it, if it is a bad example or if there is commercial relationship between the two (sold link). This link type may be used by some search engines that use popularity ranking techniques.

, ,

noopener

Instructs the browser to open the link without granting the new browsing context access to the document that opened it — by not setting the  property on the opened window (it returns null).

This is especially useful when opening untrusted links, in order to ensure they cannot tamper with the originating document via the  property (see About rel=noopener for more details), while still providing the Referer HTTP header (unless noreferrer is used as well).

Note that when noopener is used, nonempty target names other than _top, _self, and _parent are all treated like _blank in terms of deciding whether to open a new window/tab.

, ,

noreferrer

Prevents the browser, when navigating to another page, to send this page address, or any other value, as referrer via the Referer: HTTP header.

(In Firefox, before Firefox 37, this worked only in links found in pages. Links clicked in the UI, like "Open in a new tab" via the contextual menu, ignored this).

, ,

opener

Reverts implicit rel="noopener" addition on links with target="_blank" (See related HTML spec discussion, WebKit change, and Firefox bug discussion).

, ,

pingback

Defines an external resource URI to call if one wishes to make a comment or a citation about the webpage. The protocol used to make such a call is defined in the Pingback 1.0 specification.

Note: if the X-Pingback: HTTP header is also present, it supersedes the  element with this link type.

, ,

preconnect

Provides a hint to the browser suggesting that it open a connection to the linked web site in advance, without disclosing any private information or downloading any content, so that when the link is followed the linked content can be fetched more quickly.

, ,

prefetch

Suggests that the browser fetch the linked resource in advance, as it is likely to be requested by the user. Starting with Firefox 44, the value of the  attribute is taken into consideration, making it possible to make anonymous prefetches.

Note: The Link Prefetch FAQ has details on which links can be prefetched and on alternative methods.

, ,

preload

Tells the browser to download a resource because this resource will be needed later during the current navigation. See Preloading content with rel="preload" for more details.

, ,

prerender

Suggests that the browser fetch the linked resource in advance, and that it also render the prefetched content offscreen so it can be quickly presented to the user once needed.

, ,

prev

Indicates that the hyperlink leads to the preceding resource of the sequence the current page is in.

Note: You can also use the next keyword to specify a link to the next page in the sequence.

Although recognized, the synonym previous is incorrect and must be avoided.

, , ,

None.

search

Indicates that the hyperlink references a document whose interface is specially designed for searching in this document, or site, and its resources.

If the  attribute is set to application/opensearchdescription+xml the resource is an OpenSearch plugin that can be easily added to the interface of some browsers like Firefox or Internet Explorer.

, , ,

None.

shortlink

shortlink Specification

From Wikipedia, the free encyclopedia: URL shortening

Some websites create short links to make sharing links via instant messaging easier.

???

sidebar

Indicates that the hyperlink leads to a resource that would be better suited for a secondary browsing context, like a sidebar. Browsers, that don't have such a context will ignore this keyword.

While once part of the HTML specification, this has been removed from the spec and is only implemented by versions of Firefox prior to Firefox 63.

, ,

stylesheet

Defines an external resource to be used as a stylesheet. If the type is not set, the browser should assume it is a text/css stylesheet until further inspection.

If used in combination with the alternate keyword, it defines an alternative style sheet; in that case the  attribute must be present and not be the empty string.

, ,

tag

Indicates that the hyperlink refers to a document describing a tag that applies to this document.

Note: This link type should not be set on links to a member of a tag cloud as these do not apply to a single document but to a set of pages.

,

,

up

Indicates that the page is part of a hierarchical structure and that the hyperlink leads to the higher level resource of that structure.

The number of up link types indicates the depth difference between the current page and the linked resource.

, ,

Specifications

Specification

Status

Comment

Added preload.

Added dns-prefetch, preconnect, and prerender values.

Added opener and made noopener the default behavior for target="_blank" links.

Added tag, search, prefetch, noreferrer, nofollow, icon, and author.

Renamed copyright to license.

Removed start, chapter, section, subsection, and appendix

Added alternate, stylesheet, start, chapter, section, subsection, appendix, and bookmark.

Renamed previous to prev.

Removed top, and search.

Obsolete

Added top, contents, index, glossary, copyright, next, previous, help, and search.

Obsolete

Initial definition.

Browser compatibility