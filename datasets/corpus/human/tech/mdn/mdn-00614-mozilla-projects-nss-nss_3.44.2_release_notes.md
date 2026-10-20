# NSS 3.44.2 release notes

Introduction

Network Security Services (NSS) 3.44.2 is a patch release for NSS 3.44. The bug fixes in NSS 3.44.2 are described in the "Bugs Fixed" section below. It was released on 2 October 2019.

Distribution Information

The HG tag is NSS_3_44_2_RTM. NSS 3.44.2 requires NSPR 4.21 or newer.

NSS 3.44.2 source distributions are available on ftp.mozilla.org for secure HTTPS download:

Source tarballs: https://ftp.mozilla.org/pub/mozilla.org/security/nss/releases/NSS_3_44_2_RTM/src/

Other releases are available in NSS Releases.

New in NSS 3.44.2

No new functionality is introduced in this release.

Bugs fixed in NSS 3.44.2

Bug 1582343 - Soft token MAC verification not constant time

Bug 1577953 - Remove arbitrary HKDF output limit by allocating space as needed

This Bugzilla query returns all the bugs fixed in NSS 3.44.2:

https://bugzilla.mozilla.org/buglist.cgi?resolution=FIXED&classification=Components&query_format=advanced&product=NSS&target_milestone=3.44.2

Compatibility

NSS 3.44.2 shared libraries are backward compatible with all older NSS 3.x shared libraries. A program linked with older NSS 3.x shared libraries will work with NSS 3.44.2 shared libraries without recompiling or relinking. Furthermore, applications that restrict their use of NSS APIs to the functions listed in NSS Public Functions will remain compatible with future versions of the NSS shared libraries.

Feedback

Bugs discovered should be reported by filing a bug report with bugzilla.mozilla.org (product NSS).