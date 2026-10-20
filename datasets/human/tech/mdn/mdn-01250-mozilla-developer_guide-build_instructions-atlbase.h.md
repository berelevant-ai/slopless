# atlbase.h

Note: Starting in , atlbase.h is no longer needed, since support for ActiveX has been removed.

This page is linked from the build system. Do not remove it without making sure it links to useful information for building Firefox 3.

atlbase.h is a header file which is provided by the Microsoft Active Template Library.

The error "System header atlbase.h is not available" indicates that you do not have a copy of ATL in your INCLUDE directory. There are several ways you can solve this problem:

Use the Professional Version of Microsoft Visual C++

The professional version of Microsoft Visual C++ comes with ATL headers.

Use the Windows 2003 SDK

The Windows 2003 SDK is a free download and is the last version of the Windows SDK to come with ATL headers.

NOTE: The Windows 2008 SDK, which the 2003 SDK page points you to, doesn't have the ATL headers.

Note: Unfortunately, the Windows 7 SDK is required to build Mozilla normally, because of dependencies on Vista and Windows 7-specific APIs. MozillaBuild 1.4 and above will allow you to use both the Windows 7 SDK and an older Platform SDK to work around this issue.

You should restart start-msvcX.bat after installing the Windows 2003 SDK.

Note: If you encounter an error that atlbase.h cannot be found and you have installed Visual Studio 10 Express together with the platform SDK, you may have to delete a registry entry so that guess-msvc.bat doesn't detect VC10 installed. The key is HKLM\SOFTWARE\Microsoft\VisualStudio\10.0\Setup\VC.

Disable code that uses ATL

ATL is used by only a small portion of our codebase. You should be able to disable these features and do a build without ATL. To disable ATL, add the line below to the .mozconfig file. On Windows XP, this may be located in C:\Documents and Settings\(your user name). If the file does not exist, create it.

ac_add_options --disable-accessibility

ac_add_options --disable-xpconnect-idispatch

ac_add_options --disable-activex

Note: Note that xpconnect-idispatch and ActiveX features (that are off by default) rely on atlbase.h as well, so you should not turn those on unless atlbase.h is present.

Note: Some versions of atlbase.h add atlthunk.lib to the list of default libraries. The mozillabuild environment provides a compatible version of atlthunk.lib for you.