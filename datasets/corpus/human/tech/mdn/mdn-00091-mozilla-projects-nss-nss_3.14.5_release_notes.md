# NSS 3.14.5 release notes

Introduction

Network Security Services (NSS) 3.14.5 is a patch release for NSS 3.14. The bug fixes in NSS 3.14.5 are described in the "Bugs Fixed" section below.

Distribution Information

The CVS tag is NSS_3_14_5_RTM. NSS 3.14.5 requires NSPR 4.9.5 or newer.

NSS 3.14.5 source distributions are also available on ftp.mozilla.org for secure HTTPS download:

Source tarballs:

https://ftp.mozilla.org/pub/mozilla.org/security/nss/releases/NSS_3_14_5_RTM/src/

Security Advisories

The following security-relevant bugs have been resolved in NSS 3.14.5. Users are encouraged to upgrade immediately.

Bug 934016 - (CVE-2013-5605) Handle invalid handshake packets

New in NSS 3.14.5

New Functionality

No new major functionality is introduced in this release. This release is a patch release to address CVE-2013-5605.

Bugs fixed in NSS 3.14.5

https://bugzilla.mozilla.org/buglist.cgi?bug_id=934016&bug_id_type=anyexact&resolution=FIXED&classification=Components&query_format=advanced&product=NSS

Compatibility

NSS 3.14.5 shared libraries are backward compatible with all older NSS 3.x shared libraries. A program linked with older NSS 3.x shared libraries will work with NSS 3.14.5 shared libraries without recompiling or relinking. Furthermore, applications that restrict their use of NSS APIs to the functions listed in NSS Public Functions will remain compatible with future versions of the NSS shared libraries.

Feedback

Bugs discovered should be reported by filing a bug report with bugzilla.mozilla.org (product NSS).