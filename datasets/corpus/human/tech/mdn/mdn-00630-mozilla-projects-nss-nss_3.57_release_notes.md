# NSS 3.57 release notes

Introduction

The NSS team has released Network Security Services (NSS) 3.57 on 18 September 2020, which is a minor release.

The NSS team would like to recognize first-time contributors:

Khem Raj

Distribution Information

The HG tag is NSS_3_57_RTM. NSS 3.57 requires NSPR 4.29 or newer.

NSS 3.57 source distributions are available on ftp.mozilla.org for secure HTTPS download:

Source tarballs:

https://ftp.mozilla.org/pub/mozilla.org/security/nss/releases/NSS_3_57_RTM/src/

Other releases are available in NSS Releases.

Notable Changes in NSS 3.57

NSPR dependency updated to 4.29.

Certificate Authority Changes

The following CA certificates were Added:

Bug 1663049 - CN=Trustwave Global Certification Authority

SHA-256 Fingerprint: 97552015F5DDFC3C8788C006944555408894450084F100867086BC1A2BB58DC8

Bug 1663049 - CN=Trustwave Global ECC P256 Certification Authority

SHA-256 Fingerprint: 945BBC825EA554F489D1FD51A73DDF2EA624AC7019A05205225C22A78CCFA8B4

Bug 1663049 - CN=Trustwave Global ECC P384 Certification Authority

SHA-256 Fingerprint: 55903859C8C0C3EBB8759ECE4E2557225FF5758BBD38EBD48276601E1BD58097

The following CA certificates were Removed:

Bug 1651211 - CN=EE Certification Centre Root CA

SHA-256 Fingerprint:

3E84BA4342908516E77573C0992F0979CA084E4685681FF195CCBA8A229B8A76

Bug 1656077 - O=Government Root Certification Authority; C=TW

SHA-256 Fingerprint:

7600295EEFE85B9E1FD624DB76062AAAAE59818A54D2774CD4C0B2C01131E1B3

Trust settings for the following CA certificates were Modified:

Bug 1653092 - CN=OISTE WISeKey Global Root GA CA

Websites (server authentication) trust bit removed.

Bugs fixed in NSS 3.57

Bug 1651211 - Remove EE Certification Centre Root CA certificate.

Bug 1653092 - Turn off Websites Trust Bit for OISTE WISeKey Global Root GA CA.

Bug 1656077 - Remove Taiwan Government Root Certification Authority certificate.

Bug 1663049 - Add SecureTrust's Trustwave Global root certificates to NSS.

Bug 1659256 - AArch64 AES optimization shouldn't be enabled with gcc 4.8.

Bug 1651834 - Fix Clang static analyzer warnings.

Bug 1661378 - Fix Build failure with Clang 11.

Bug 1659727 - Fix mpcpucache.c invalid output constraint on Linux/ARM.

Bug 1662738 - Only run freebl_fips_RNG_PowerUpSelfTest when linked with NSPR.

Bug 1661810 - Fix Crash @ arm_aes_encrypt_ecb_128 when building with Clang 11.

Bug 1659252 - Fix Make build with NSS_DISABLE_DBM=1.

Bug 1660304 - Add POST tests for KDFs as required by FIPS.

Bug 1663346 - Use 64-bit compilation on e2k architecture.

Bug 1605922 - Account for negative sign in mp_radix_size.

Bug 1653641 - Cleanup inaccurate DTLS comments, code review fixes.

Bug 1660372 - NSS 3.57 should depend on NSPR 4.29

Bug 1660734 - Fix Makefile typos.

Bug 1660735 - Fix Makefile typos.

This Bugzilla query returns all the bugs fixed in NSS 3.57:

https://bugzilla.mozilla.org/buglist.cgi?resolution=FIXED&classification=Components&query_format=advanced&product=NSS&target_milestone=3.57

Compatibility

NSS 3.57 shared libraries are backward compatible with all older NSS 3.x shared libraries. A program linked with older NSS 3.x shared libraries will work with NSS 3.57 shared libraries without recompiling or relinking. Furthermore, applications that restrict their use of NSS APIs to the functions listed in NSS Public Functions will remain compatible with future versions of the NSS shared libraries.

Feedback

Bugs discovered should be reported by filing a bug report with bugzilla.mozilla.org (product NSS).