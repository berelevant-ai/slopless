# NSS 3.40 release notes

Introduction

The NSS team has released Network Security Services (NSS) 3.40, which is a minor release.

Distribution Information

The HG tag is NSS_3_40_RTM. NSS 3.40 requires NSPR 4.20 or newer.

NSS 3.40 source distributions are available on ftp.mozilla.org for secure HTTPS download:

Source tarballs:

https://ftp.mozilla.org/pub/mozilla.org/security/nss/releases/NSS_3_40_RTM/src/

New in NSS 3.40

New Functionality

The draft-00 version of encrypted SNI support is implemented

tstclnt now takes -N option to specify encrypted SNI key

New Functions

none

Notable Changes in NSS 3.40

The mozilla::pkix library has been ported from Mozilla PSM to NSS.  This is a C++ library for building certification paths.  mozilla::pkix APIs are not exposed in the libraries NSS builds.

It is easier to build NSS on Windows in mozilla-build environments.

The following CA certificates were Removed:

CN = Visa eCommerce Root

SHA-256 Fingerprint: 69FAC9BD55FB0AC78D53BBEE5CF1D597989FD0AAAB20A25151BDF1733EE7D122

Bugs fixed in NSS 3.40

Bug 1478698 - FFDHE key exchange sometimes fails with decryption failure

This Bugzilla query returns all the bugs fixed in NSS 3.40:

https://bugzilla.mozilla.org/buglist.cgi?resolution=FIXED&classification=Components&query_format=advanced&product=NSS&target_milestone=3.40

Compatibility

NSS 3.40 shared libraries are backward compatible with all older NSS 3.x shared libraries. A program linked with older NSS 3.x shared libraries will work with NSS 3.40 shared libraries without recompiling or relinking. Furthermore, applications that restrict their use of NSS APIs to the functions listed in NSS Public Functions will remain compatible with future versions of the NSS shared libraries.

Feedback

Bugs discovered should be reported by filing a bug report with bugzilla.mozilla.org (product NSS).