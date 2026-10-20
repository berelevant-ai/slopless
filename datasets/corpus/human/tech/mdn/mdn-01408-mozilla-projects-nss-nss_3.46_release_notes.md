# NSS 3.46 release notes

Introduction

The NSS team has released Network Security Services (NSS) 3.46 on 30 August 2019, which is a minor release.

The NSS team would like to recognize first-time contributors:

Giulio Benetti

Louis Dassy

Mike Kaganski

xhimanshuz

Distribution Information

The HG tag is NSS_3_46_RTM. NSS 3.46 requires NSPR 4.22 or newer.

NSS 3.46 source distributions are available on ftp.mozilla.org for secure HTTPS download:

Source tarballs:

https://ftp.mozilla.org/pub/mozilla.org/security/nss/releases/NSS_3_46_RTM/src/

Other releases are available in NSS Releases.

New in NSS 3.46

This release contains no significant new functionality, but concentrates on providing improved performance, stability, and security.  Of particular note are significant improvements to AES-GCM performance on ARM.

Notable Changes in NSS 3.46

Certificate Authority Changes

The following CA certificates were Removed:

Bug 1574670 - Remove expired Class 2 Primary root certificate

SHA-256 Fingerprint: 0F993C8AEF97BAAF5687140ED59AD1821BB4AFACF0AA9A58B5D57A338A3AFBCB

Bug 1574670 - Remove expired UTN-USERFirst-Client root certificate

SHA-256 Fingerprint: 43F257412D440D627476974F877DA8F1FC2444565A367AE60EDDC27A412531AE

Bug 1574670 - Remove expired Deutsche Telekom Root CA 2 root certificate

SHA-256 Fingerprint: B6191A50D0C3977F7DA99BCDAAC86A227DAEB9679EC70BA3B0C9D92271C170D3

Bug 1566569 - Remove Swisscom Root CA 2 root certificate

SHA-256 Fingerprint: F09B122C7114F4A09BD4EA4F4A99D558B46E4C25CD81140D29C05613914C3841

Upcoming changes to default TLS configuration

The next NSS team plans to make two changes to the default TLS configuration in NSS 3.47, which will be released in October:

TLS 1.3 will be the default maximum TLS version.  See Bug 1573118 for details.

TLS extended master secret will be enabled by default, where possible.  See Bug 1575411 for details.

Bugs fixed in NSS 3.46

Bug 1572164 - Don't unnecessarily free session in NSC_WrapKey

Bug 1574220 - Improve controls after errors in tstcln, selfserv and vfyserv cmds

Bug 1550636 - Upgrade SQLite in NSS to a 2019 version

Bug 1572593 - Reset advertised extensions in ssl_ConstructExtensions

Bug 1415118 - NSS build with ./build.sh --enable-libpkix fails

Bug 1539788 - Add length checks for cryptographic primitives (CVE-2019-17006)

Bug 1542077 - mp_set_ulong and mp_set_int should return errors on bad values

Bug 1572791 - Read out-of-bounds in DER_DecodeTimeChoice_Util from SSLExp_DelegateCredential

Bug 1560593 - Cleanup.sh script does not set error exit code for tests that "Failed with core"

Bug 1566601 - Add Wycheproof test vectors for AES-KW

Bug 1571316 - curve25519_32.c:280: undefined reference to `PR_Assert' when building NSS 3.45 on armhf-linux

Bug 1516593 - Client to generate new random during renegotiation

Bug 1563258 - fips.sh fails due to non-existent "resp" directories

Bug 1561598 - Remove -Wmaybe-uninitialized warning in pqg.c

Bug 1560806 - Increase softoken password max size to 500 characters

Bug 1568776 - Output paths relative to repository in NSS coverity

Bug 1453408 - modutil -changepw fails in FIPS mode if password is an empty string

Bug 1564727 - Use a PSS SPKI when possible for delegated credentials

Bug 1493916 - fix ppc64 inline assembler for clang

Bug 1561588 - Remove -Wmaybe-uninitialized warning in p7env.c

Bug 1561548 - Remove -Wmaybe-uninitialized warning in pkix_pl_ldapdefaultclient.c

Bug 1512605 - Incorrect alert description after unencrypted Finished msg

Bug 1564715 - Read /proc/cpuinfo when AT_HWCAP2 returns 0

Bug 1532194 - Remove or fix -DDEBUG_$USER from make builds

Bug 1565577 - Visual Studio's cl.exe -? hangs on Windows x64 when building nss since changeset 9162c654d06915f0f15948fbf67d4103a229226f

Bug 1564875 - Improve rebuilding with build.sh

Bug 1565243 - Support TC_OWNER without email address in nss taskgraph

Bug 1563778 - Increase maxRunTime on Mac taskcluster Tools, SSL tests

Bug 1561591 - Remove -Wmaybe-uninitialized warning in tstclnt.c

Bug 1561587 - Remove -Wmaybe-uninitialized warning in lgattr.c

Bug 1561558 - Remove -Wmaybe-uninitialized warning in httpserv.c

Bug 1561556 - Remove -Wmaybe-uninitialized warning in tls13esni.c

Bug 1561332 - ec.c:28 warning: comparison of integers of different signs: 'int' and 'unsigned long'

Bug 1564714 - Print certutil commands during setup

Bug 1565013 - HACL image builder times out while fetching gpg key

Bug 1563786 - Update hacl-star docker image to pull specific commit

Bug 1559012 - Improve GCM perfomance using PMULL2

Bug 1528666 - Correct resumption validation checks

Bug 1568803 - More tests for client certificate authentication

Bug 1564284 - Support profile mobility across Windows and Linux

Bug 1573942 - Gtest for pkcs11.txt with different breaking line formats

Bug 1575968 - Add strsclnt option to enforce the use of either IPv4 or IPv6

Bug 1549847 - Fix NSS builds on iOS

Bug 1485533 - Enable NSS_SSL_TESTS on taskcluster

This Bugzilla query returns all the bugs fixed in NSS 3.46:

https://bugzilla.mozilla.org/buglist.cgi?resolution=FIXED&classification=Components&query_format=advanced&product=NSS&target_milestone=3.46

Compatibility

NSS 3.46 shared libraries are backward compatible with all older NSS 3.x shared libraries. A program linked with older NSS 3.x shared libraries will work with NSS 3.46 shared libraries without recompiling or relinking. Furthermore, applications that restrict their use of NSS APIs to the functions listed in NSS Public Functions will remain compatible with future versions of the NSS shared libraries.

Feedback

Bugs discovered should be reported by filing a bug report with bugzilla.mozilla.org (product NSS).