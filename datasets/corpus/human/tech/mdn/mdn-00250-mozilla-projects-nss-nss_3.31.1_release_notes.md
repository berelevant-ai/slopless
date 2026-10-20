# NSS 3.31.1 release notes

This is a DRAFT document. This notice will be removed when completed.

Introduction

The Network Security Services (NSS) team has released NSS 3.31.1, which is a patch release for NSS 3.31.

Distribution information

The hg tag is NSS_3_31_1_RTM. NSS 3.31.1 requires Netscape Portable Runtime (NSPR) 4.15, or newer.

NSS 3.31.1 source distributions are available on ftp.mozilla.org for secure HTTPS download:

Source tarballs:

https://ftp.mozilla.org/pub/mozilla.org/security/nss/releases/NSS_3_31_1_RTM/src/

New in NSS 3.31.1

No new functionality is introduced in this release.

Bugs fixed in NSS 3.31.1

Bug 1381784 - Potential deadlock when using an external PKCS#11 token.

Compatibility

NSS 3.31.1 shared libraries are backward compatible with all older NSS 3.x shared libraries. A program linked with older NSS 3.x shared libraries will work with NSS 3.31.1 shared libraries, without recompiling, or relinking. Furthermore, applications that restrict their use of NSS APIs to the functions listed in NSS Public Functions will remain compatible with future versions of the NSS shared libraries.

Feedback

Bugs discovered should be reported by filing a bug report with bugzilla.mozilla.org (product NSS).