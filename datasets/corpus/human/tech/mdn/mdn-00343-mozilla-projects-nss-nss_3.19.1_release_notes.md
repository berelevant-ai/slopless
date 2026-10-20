# NSS 3.19.1 release notes

Introduction

Network Security Services (NSS) 3.19.1 is a security release for NSS 3.19. The bug fixes in NSS 3.19.1 are described in the "Bugs Fixed" section below.

Distribution Information

The HG tag is NSS_3_19_1_RTM. NSS 3.19.1 requires NSPR 4.10.8 or newer.

NSS 3.19.1 source distributions are available on ftp.mozilla.org for secure HTTPS download:

Source tarballs:

https://ftp.mozilla.org/pub/mozilla.org/security/nss/releases/NSS_3_19_1_RTM/src/

Security Fixes in NSS 3.19.1

Bug 1138554 / CVE-2015-4000 - The minimum strength of keys that libssl will accept for finite field algorithms (RSA, Diffie-Hellman, and DSA) have been increased to 1023 bits.

New in NSS 3.19.1

New Functionality

No new functionality is introduced in this release. This patch release includes a fix for the recently published logjam attack.

Notable Changes in NSS 3.19.1

NSS reports the bit length of keys more accurately.  Thus, the SECKEY_PublicKeyStrength and SECKEY_PublicKeyStrengthInBits functions could report smaller values for values that have leading zero values. This affects the key strength values that are reported by SSL_GetChannelInfo.

The minimum size of keys that NSS will generate, import, or use has been raised:

The minimum modulus size for RSA keys is now 512 bits

The minimum modulus size for DSA keys is now 1023 bits

The minimum modulus size for Diffie-Hellman keys is now 1023 bits

Bugs fixed in NSS 3.19.1

This Bugzilla query returns all the bugs fixed in NSS 3.19.1:

https://bugzilla.mozilla.org/buglist.cgi?resolution=FIXED&classification=Components&query_format=advanced&product=NSS&target_milestone=3.19.1

Acknowledgements

The NSS development team would like to thank Matthew Green and Karthikeyan Bhargavan for responsibly disclosing the issue in bug 1138554.

Compatibility

NSS 3.19.1 shared libraries are backward compatible with all older NSS 3.x shared libraries. A program linked with older NSS 3.x shared libraries will work with NSS 3.19.1 shared libraries without recompiling or relinking. Furthermore, applications that restrict their use of NSS APIs to the functions listed in NSS Public Functions will remain compatible with future versions of the NSS shared libraries.

Note: NSS 3.19.1 increases the minimum size of keys it is willing to use. This has been shown to break some applications. NSS 3.19.2 reverts the behaviour to the NSS 3.19 and earlier limits.

Feedback

Bugs discovered should be reported by filing a bug report with bugzilla.mozilla.org (product NSS).