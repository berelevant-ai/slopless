# Listening to events on all tabs

Firefox 3.5 adds support for listening to progress events on all tabs.

Adding a listener

To listen to progress events on all tabs, call the browser's addTabsProgressListener() method:

gBrowser.addTabsProgressListener(myProgressListener);

myProgressListener is an object that implements the callbacks used to provide notifications of progress events.

Removing a listener

To remove a previously installed progress listener, call removeTabsProgressListener():

gBrowser.removeTabsProgressListener(myProgressListener);

Implementing a listener

The listener object itself has five methods it can implement to handle various events:

onLocationChange

Called when the URI of the document displayed in the tab changes.

void onLocationChange(

nsIDOMXULElement aBrowser,

nsIWebProgress aWebProgress,

nsIRequest aRequest,

nsIURI aLocation

[optional] in unsigned long aFlags

);

Parameters

aBrowser

The browser representing the tab whose location changed.

aWebProgress

The progress instance responsible for handling the events.

aRequest

The  object representing the associated request.

aLocation

An  object indicating the tab's new URI.

aFlags

Optional: This is a value which explains the situation or the reason why the location has changed.

onProgressChange

Called when updated progress information for the download of a document is available.

void onProgressChange(

nsIDOMXULElement aBrowser,

nsIWebProgress aWebProgress,

nsIRequest aRequest,

PRInt32 aCurSelfProgress,

PRInt32 aMaxSelfProgress,

PRInt32 aCurTotalProgress,

PRInt32 aMaxTotalProgress

);

Parameters

aBrowser

The browser representing the tab for which updated progress information is being provided.

aWebProgress

The progress instance responsible for handling the events.

aRequest

The  object representing the associated request.

aCurSelfProgress

The current progress for the request indicated by the request parameter.

aMaxSelfProgress

The value representing 100% complete for the request indicated by the request parameter.

aCurTotalProgress

The current progress for all requests associated with webProgress.

aMaxTotalProgress

The total progress for all requests associated with webProgress.

onSecurityChange

Notification called for security progress. This method will be called on security transitions (eg HTTP -> HTTPS, HTTPS -> HTTP, FOO -> HTTPS) and after document load completion. It might also be called if an error occurs during network loading.

Note: These notifications will only occur if a security package is installed.

void onSecurityChange(

nsIDOMXULElement aBrowser,

nsIWebProgress aWebProgress,

nsIRequest aRequest,

unsigned long aState

);

Parameters

aBrowser

The browser that fired the notification.

aWebProgress

The nsIWebProgress instance that fired the notification.

aRequest

The nsIRequest that has new security state.

aState

A value composed of the Security State Flags and the Security Strength Flags described in the documentation for .

onStateChange

Notification indicating the state has changed for one of the requests associated with aWebProgress.

void onStateChange(

nsIDOMXULElement aBrowser,

nsIWebProgress aWebProgress,

nsIRequest aRequest,

unsigned long aStateFlags,

nsresult aStatus

);

Parameters

aBrowser

The browser that fired the notification.

aWebProgress

The nsIWebProgress instance that fired the notification.

aRequest

The nsIRequest that has changed state. This parameter may be null. Need more information on what NULL means.

aStateFlags

Flags indicating the new state. This value is a combination of one of the State Transition Flags and one or more of the State Type Flags defined in the  documentation. Any undefined bits are reserved for future use.

aStatus

Error status code associated with the state change; this indicates whether or not the request was successful. This parameter should be ignored unless aStateFlags includes the STATE_STOP bit.

NOTE: aStatus may be a success code even for server generated errors, such as the HTTP 404 File Not Found error. In such cases, the request itself should be queried for extended error information (e.g., for HTTP requests see nsIHttpChannel).

onStatusChange

Notification that the status of a request has changed. The status message is intended to be displayed to the user (e.g., in the status bar of the browser).

void onStatusChange(

nsIDOMXULElement aBrowser,

nsIWebProgress aWebProgress,

nsIRequest aRequest,

nsresult aStatus,

PRUnichar *aMessage

);

Parameters

aBrowser

The browser that fired the notification.

aWebProgress

The nsIWebProgress instance that fired the notification.

aRequest

The nsIRequest that has new status.

aStatus

This value is not an error code. Instead, it is a numeric value that indicates the current status of the request. This interface does not define the set of possible status codes.

Note: Some status values are defined by nsITransport and nsISocketTransport.

aMessage

Localized text corresponding to aStatus.

onRefreshAttempted

Notification that a refresh or redirect has been requested in aWebProgress for example, via a <meta http-equiv="refresh"> or an HTTP Refresh: header. If any registered progress listener returns false from this method then the attempt to refresh will be blocked.

boolean onRefreshAttempted(

nsIDOMXULElement aBrowser,

nsIWebProgress webProgress,

nsIURI aRefreshURI,

long aMillis,

boolean aSameURI

);

Parameters

aBrowser

The browser that fired the notification.

aWebProgress

The nsIWebProgress instance that fired the notification.

aRefreshURI

The new URI that aWebProgress has requested redirecting to.

aMillis

The delay (in milliseconds) before refresh.

aSameURI

True if aWebProgress is requesting a refresh of the current URI. False if aWebProgress is requesting a redirection to a different URI.

Return value

true if the refresh may proceed. false if the refresh should be aborted.

onLinkIconAvailable

Notification that the site icon for a browser has been found.

void onLinkIconAvailable(

nsIDOMXULElement aBrowser,

);

Parameters

aBrowser

The browser that fired the notification.