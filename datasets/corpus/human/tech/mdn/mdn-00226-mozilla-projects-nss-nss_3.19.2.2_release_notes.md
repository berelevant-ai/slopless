# NSS 3.19.2.2 release notes

Introduction

Network Security Services (NSS) 3.19.2.2 is a security patch release for NSS 3.19.2. The bug fixes in NSS 3.19.2.2 are described in the "Security Fixes" section below.

(Current users of NSS 3.19.3 or NSS 3.19.4 are advised to update to NSS 3.20.2, NSS 3.21, or a later release.)

Distribution Information

The HG tag is NSS_3_19_2_2_RTM. NSS 3.19.2.2 requires NSPR 4.10.10 or newer.

NSS 3.19.2.2 source distributions are available on ftp.mozilla.org for secure HTTPS download:

Source tarballs:

https://ftp.mozilla.org/pub/mozilla.org/security/nss/releases/NSS_3_19_2_2_RTM/src/

Security Fixes in NSS 3.19.2.2

Bug 1158489 / CVE-2015-7575 - Prevent MD5 Downgrade in TLS 1.2 Signatures.

New in NSS 3.19.2.2

New Functionality

No new functionality is introduced in this release.

Acknowledgements

The NSS development team would like to thank Karthikeyan Bhargavan from INRIA for responsibly disclosing the issue in Bug 1158489.

Compatibility

NSS 3.19.2.2 shared libraries are backward compatible with all older NSS 3.x shared libraries. A program linked with older NSS 3.x shared libraries will work with NSS 3.19.2.2 shared libraries without recompiling or relinking. Furthermore, applications that restrict their use of NSS APIs to the functions listed in NSS Public Functions will remain compatible with future versions of the NSS shared libraries.

Feedback

Bugs discovered should be reported by filing a bug report with bugzilla.mozilla.org (product NSS).