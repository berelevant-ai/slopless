# Scripting plugins

« PreviousNext  »

XXX: Dummy p element

This document describes the new cross-browser NPAPI extensions, commonly called npruntime, that have been developed by a group of browser and plugin vendors, including the Mozilla Foundation, Adobe, Apple, Opera, and Sun Microsystems (see press release). This document also explains how to make a plugin use these new extensions to be scriptable as well as how to access objects in a browser.

(A bit of history: NPAPI plugins that used to take advantage of being scriptable via LiveConnect in 4.x Netscape browsers lost this possibility in Mozilla (due to the JNI making the Netscape 4.x JRI obsolete). As an answer to this large gap in the Netscape Plugin API, an extension to the API has been developed that lets plugins be scriptable again, independent of Java. This extension will also let plugins access the script objects in the browser, and is thus a much stronger and more flexible API.)

The information in this section applies to Firefox 1.0 and Mozilla 1.7.5 and newer versions.

How the DOM handles scripting

The Mozilla DOM code now checks if a plugin supports this new scriptability API and if it exposes a scriptable object through this new mechanism. Mozilla does this by calling the old plugin API call NPP_GetValue with the new enumeration value that has been added to the NPPVariable enumeration.

The new NPPVariable enumeration is defined in npapi.h as:

NPPVpluginScriptableNPObject = 15

Threading model

This API is not designed to be thread safe. The threading model for this API is such that all calls through this API are synchronous and calls from a plugin to methods in this API must come from the thread on which the plugin was initiated, and likewise all calls to methods in this API by the browser are guaranteed to come from the same thread. Future revisions to this API might provide a mechanism for proxying calls from one thread to another to aid in using this API from other threads.

Security model

The security model for making calls through this API is much like the general same-origin security model enforced by the browser. That means that a script from an origin other than the origin of the page that loaded the plugin is not able to access methods and properties on the plugin. The same thing applies the other way too; the plugin can reach only JavaScript objects in the same origin as the page that loaded the plugin.

In addition to this, a further extension to this API is being discussed that would give a plugin greater flexibility by letting the plugin control the origin of the calling code, so that the plugin can specify the origin of calls that come from internally loaded code from other origins. This way such code can be executed with only the privileges of the origin of the code, and not the privileges of the plugin page's origin.

What's in the plugin code?

A plugin that wishes to be scriptable using this new mechanism needs to return the appropriate NPObject (which is created by calling NPN_CreateObject) when the browser requests it by calling:

NPP_GetValue(npp, NPPVpluginScriptableNPObject, ...);

Accessing browser objects from a plugin

A plugin that wishes to access objects in the browser window that loaded the plugin can do this by getting the NPObject for the browser's window object, or the DOM element that loaded the plugin. This is done by using an extension to NPN_GetValue. The extensions are two additions to the NPNVariables enumeration; the new enumerations are NPNVWindowNPObject and NPNVPluginElementNPObject. Calling NPN_GetValue() with either of those new enumerations will return an NPObject representing the browser object, and from there, the functions in this API can be used to get and set properties, and to call methods on those browser objects.

And as always when working with reference counted NPObjects, the caller is responsible for calling NPN_ReleaseObject on the NPObject to drop the reference.

The new NPNVariable enumerations are defined in npapi.h as:

NPNVWindowNPObject = 15,

NPNVPluginElementNPObject = 16

How to call plugin native methods

The following HTML code will do the job:

<embed type="application/plugin-mimetype">

<script>

var embed = document.embeds[0];

embed.nativeMethod();

alert(embed.nativeProperty);

embed.nativeProperty.anotherNativeMethod();

</script>

The API extensions

The API extensions are based on four new structs:

NPString

NPVariant

NPN_ReleaseVariantValue

NPN_GetStringIdentifier

NPN_GetStringIdentifiers

NPN_GetIntIdentifier

NPN_IdentifierIsString

NPN_UTF8FromIdentifier

NPN_IntFromIdentifier

NPObject

NPN_Construct (since Firefox 3.0b1)

NPN_CreateObject

NPN_RetainObject

NPN_ReleaseObject

NPN_Invoke

NPN_InvokeDefault

NPN_Enumerate (since Mozilla 1.9a1)

NPN_Evaluate

NPN_GetProperty

NPN_SetProperty

NPN_RemoveProperty

NPN_HasProperty

NPN_HasMethod

NPN_SetException

NPClass

« PreviousNext  »