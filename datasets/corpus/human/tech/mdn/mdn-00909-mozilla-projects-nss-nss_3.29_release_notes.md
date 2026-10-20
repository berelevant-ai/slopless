# NSS 3.29 release notes

Introduction

The Network Security Services (NSS) team has released NSS 3.29, which is a minor release.

Distribution information

The hg tag is NSS_3_29_RTM. NSS 3.29 requires Netscape Portable Runtime (NSPR) 4.13.1 or newer.

NSS 3.29 source distributions are available on ftp.mozilla.org for secure HTTPS download:

Source tarballs:

https://ftp.mozilla.org/pub/mozilla.org/security/nss/releases/NSS_3_29_RTM/src/

Notable Changes in NSS 3.29

Fixed a NSS 3.28 regression in the signature scheme flexibility that causes connectivity issues between iOS 8 clients and NSS servers with ECDSA certificates (bug1334114).

TLS 1.3 is now enabled by default in (bug1311296).

Bugs fixed in NSS 3.29

This Bugzilla query returns all the bugs fixed in NSS 3.29:

https://bugzilla.mozilla.org/buglist.cgi?resolution=FIXED&classification=Components&query_format=advanced&product=NSS&target_milestone=3.29

Compatibility

NSS 3.29 shared libraries are backward compatible with all older NSS 3.x shared libraries. A program linked with older NSS 3.x shared libraries will work with NSS 3.29 shared libraries without recompiling or relinking. Furthermore, applications that restrict their use of NSS APIs to the functions listed in NSS Public Functions will remain compatible with future versions of the NSS shared libraries.

Feedback

Bugs discovered should be reported by filing a bug report with bugzilla.mozilla.org (product NSS).