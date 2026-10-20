# NSPR functions

NSPR is a platform abstraction library that provides a cross-platform API to common OS services.  NSS uses NSPR internally as the porting layer.  However, a small number of NSPR functions are required for using the certificate verification and SSL functions in NSS.  These NSPR functions are listed in this section.

NSPR initialization and shutdown

NSPR is automatically initialized by the first NSPR function called by the application.  Call PR_Cleanup to shut down NSPR and clean up its resources.

PR_Cleanup

Error reporting

NSS uses NSPR's thread-specific error code to report errors.  Call PR_GetError to get the error code of the last failed NSS or NSPR function.  Call PR_SetError to set the error code, which can be retrieved with PR_GetError later.

The NSS functions PORT_GetError and PORT_SetError are simply wrappers of PR_GetError and PR_SetError.

PR_GetError

PR_SetError

Calendar time

NSS certificate verification functions take a PRTime parameter that specifies the time instant at which the validity of the certificate should verified.  The NSPR function PR_Now returns the current time in PRTime.

PR_Now

Interval time

The NSPR socket I/O functions PR_Recv and PR_Send (used by the NSS SSL functions) take a PRIntervalTime timeout parameter.  PRIntervalTime has an abstract, platform-dependent time unit.  Call PR_SecondsToInterval or PR_MillisecondsToInterval to convert a time interval in seconds or milliseconds to PRIntervalTime.

PR_SecondsToInterval

PR_MillisecondsToInterval

NSPR I/O layering

NSPR file descriptors can be layered, corresponding to the layers in the network stack.  The SSL library in NSS implements the SSL protocol as an NSPR I/O layer, which sits on top of another NSPR I/O layer that represents TCP.

You can implement an NSPR I/O layer that wraps your own TCP socket code.  The following NSPR functions allow you to create your own NSPR I/O layer and manipulate it.

PR_GetUniqueIdentity

PR_CreateIOLayerStub

PR_GetDefaultIOMethods

PR_GetIdentitiesLayer

PR_GetLayersIdentity

PR_PushIOLayer

PR_PopIOLayer

Wrapping a native file descriptor

If your current TCP socket code uses the standard BSD socket API, a lighter-weight method than creating your own NSPR I/O layer is to simply import a native file descriptor into NSPR.  This method is convenient and works for most applications.

PR_ImportTCPSocket

Socket I/O functions

As mentioned above, the SSL library in NSS implements the SSL protocol as an NSPR I/O layer.  Users call NSPR socket I/O functions to read from, write to, and shut down an SSL connection, and to close an NSPR file descriptor.

PR_Read

PR_Write

PR_Recv

PR_Send

PR_GetSocketOption

PR_SetSocketOption

PR_Shutdown

PR_Close