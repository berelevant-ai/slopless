# NSS Certificate Functions

Certificate Functions

This chapter describes the functions and related types used to work with a certificate database such as the cert8.db database provided with NSS. This was converted from "Chapter 5: Certificate Functions".

Back to the NSS reference main page.

Validating Certificates

Manipulating Certificates

Getting Certificate Information

Comparing SecItem Objects

Validating Certificates

CERT_VerifyCertNow

CERT_VerifyCert

CERT_VerifyCertName

CERT_CheckCertValidTimes

NSS_CmpCertChainWCANames

CERT_VerifyCertNow

Checks that the current date is within the certificate's validity period and that the CA signature on the certificate is valid.

Syntax

#include <cert.h>

SECStatus CERT_VerifyCertNow(

CERTCertDBHandle *handle,

CERTCertificate *cert,

PRBool checkSig,

SECCertUsage certUsage,

void *wincx);

Parameters

This function has the following parameters:

handleA pointer to the certificate database handle.

certA pointer to the certificate to be checked.

checkSigIndicates whether certificate signatures are to be checked.

PR_TRUE means certificate signatures are to be checked.

PR_FALSE means certificate signatures will not be checked.

certUsageOne of these values:

certUsageSSLClient

certUsageSSLServer

certUsageSSLServerWithStepUp

certUsageSSLCA

certUsageEmailSigner

certUsageEmailRecipient

certUsageObjectSigner

certUsageUserCertImport

certUsageVerifyCA

certUsageProtectedObjectSigner

wincxThe PIN argument value to pass to PK11 functions. See description below for more information.

Returns

The function returns one of these values:

If successful, SECSuccess.

If unsuccessful, SECFailure. Use PR_GetError to obtain the error code.

Description

The CERT_VerifyCertNow function must call one or more PK11 functions to obtain the services of a PKCS #11 module. Some of the PK11 functions require a PIN argument (see SSL_SetPKCS11PinArg for details), which must be specified in the wincx parameter. To obtain the value to pass in the wincx parameter, call SSL_RevealPinArg.

CERT_VerifyCert

Checks that the a given aribrary date is within the certificate's validity period and that the CA signature on the certificate is valid. It also optionally returns a log of all the problems with the chain. Calling CERT_VerifyCert with the paramters: CERT_VerifyCert(handle, cert, checkSig, certUsage, PR_Now(), wincx, NULL) is equivalent to calling CERT_VerifyNow(handle, cert, checkSig, certUsage, wincx).

Syntax

#include <cert.h>

SECStatus CERT_VerifyCert(

CERTCertDBHandle *handle,

CERTCertificate *cert,

PRBool checkSig,

SECCertUsage certUsage,

int 64 t,

void *wincx

CERTVerifyLog *log);

Parameters

This function has the following parameters:

handleA pointer to the certificate database handle.

certA pointer to the certificate to be checked.

checkSigIndicates whether certificate signatures are to be checked.

PR_TRUE means certificate signatures are to be checked.

PR_FALSE means certificate signatures will not be checked.

certUsageOne of these values:

certUsageSSLClient

certUsageSSLServer

certUsageSSLServerWithStepUp

certUsageSSLCA

certUsageEmailSigner

certUsageEmailRecipient

certUsageObjectSigner

certUsageUserCertImport

certUsageVerifyCA

certUsageProtectedObjectSigner

tTime in which to validate the certificate.

wincxThe PIN argument value to pass to PK11 functions. See description below for more information.

logOptional certificate log which returns all the errors in processing a given certificate chain. See Using CERTVerifyLog for more information.

Returns

The function returns one of these values:

If successful, SECSuccess.

If unsuccessful, SECFailure. Use PR_GetError to obtain the error code.

Description

The CERT_VerifyCert function must call one or more PK11 functions to obtain the services of a PKCS #11 module. Some of the PK11 functions require a PIN argument (see SSL_SetPKCS11PinArg for details), which must be specified in the wincx parameter. To obtain the value to pass in the wincx parameter, call SSL_RevealPinArg.

CERT_VerifyCertName

Compares the common name specified in the subject DN for a certificate with a specified hostname.

Syntax

#include <cert.h>

SECStatus CERT_VerifyCertName(

CERTCertificate *cert,

char *hostname);

Parameters

This function has the following parameters:

certA pointer to the certificate against which to check the hostname referenced by hostname.

hostnameThe hostname to be checked.

Returns

The function returns one of these values:

If the common name in the subject DN for the certificate matches the domain name passed in the hostname parameter, SECSuccess.

If the common name in the subject DN for the certificate is not identical to the domain name passed in the hostname parameter, SECFailure. Use PR_GetError to obtain the error code.

Description

The comparison performed by CERT_VerifyCertName is not a simple string comparison. Instead, it takes account of the following rules governing the construction of common names in SSL server certificates:

* matches anything

? matches one character

\ escapes a special character

$ matches the end of the string

matches one occurrence of a, b, or c. The only character that needs to be escaped in this is ], all others are not special.

matches any character between a and z

matches any character except a or z

~ followed by another shell expression removes any pattern matching the shell expression from the match list

(foo|bar) matches either the substring foo or the substring bar. These can be shell expressions as well.

CERT_CheckCertValidTimes

Checks whether a specified time is within a certificate's validity period.

Syntax

#include <cert.h>

#include <certt.h>

SECCertTimeValidity CERT_CheckCertValidTimes(

CERTCertificate *cert,

int64 t);

Parameters

This function has the following parameters:

certA pointer to the certificate whose validity period you want to check against.

tThe time to check against the certificate's validity period. For more information, see the NSPR header pr_time.h.

Returns

The function returns an enumerator of type SECCertTimeValidity:

typedef enum {

secCertTimeValid,

secCertTimeExpired,

secCertTimeNotValidYet

} SECCertTimeValidity;

NSS_CmpCertChainWCANames

Determines whether any of the signers in the certificate chain for a specified certificate are on a specified list of CA names.

Syntax

#include <nss.h>

SECStatus NSS_CmpCertChainWCANames(

CERTCertificate *cert,

CERTDistNames *caNames);

Parameters

This function has the following parameters:

certA pointer to the certificate structure for the certificate whose certificate chain is to be checked.

caNamesA pointer to a structure that contains a list of distinguished names (DNs) against which to check the DNs for the signers in the certificate chain.

Returns

The function returns one of these values:

If successful, SECSuccess.

If unsuccessful, SECFailure. Use PR_GetError to obtain the error code.

Manipulating Certificates

CERT_DupCertificate

CERT_DestroyCertificate

CERT_DupCertificate

Makes a shallow copy of a specified certificate.

Syntax

#include <cert.h>

CERTCertificate *CERT_DupCertificate(CERTCertificate *c)

Parameter

This function has the following parameter:

cA pointer to the certificate object to be duplicated.

Returns

If successful, the function returns a pointer to a certificate object of type CERTCertificate.

Description

The CERT_DupCertificate function increments the reference count for the certificate passed in the c parameter.

CERT_DestroyCertificate

Destroys a certificate object.

Syntax

#include <cert.h>

#include <certt.h>

void CERT_DestroyCertificate(CERTCertificate *cert);

Parameters

This function has the following parameter:

certA pointer to the certificate to destroy.

Description

Certificate and key structures are shared objects. When an application makes a copy of a particular certificate or key structure that already exists in memory, SSL makes a shallow copy--that is, it increments the reference count for that object rather than making a whole new copy. When you call CERT_DestroyCertificate or SECKEY_DestroyPrivateKey, the function decrements the reference count and, if the reference count reaches zero as a result, both frees the memory and sets all the bits to zero. The use of the word "destroy" in function names or in the description of a function implies reference counting.

Never alter the contents of a certificate or key structure. If you attempt to do so, the change affects all the shallow copies of that structure and can cause severe problems.

Getting Certificate Information

CERT_FindCertByName

CERT_GetCertNicknames

CERT_FreeNicknames

CERT_GetDefaultCertDB

NSS_FindCertKEAType

CERT_FindCertByName

Finds the certificate in the certificate database with a specified DN.

Syntax

#include <cert.h>

CERTCertificate *CERT_FindCertByName (

CERTCertDBHandle *handle,

SECItem *name);

Parameters

This function has the following parameters:

handleA pointer to the certificate database handle.

nameThe subject DN of the certificate you wish to find.

Returns

If successful, the function returns a certificate object of type CERTCertificate.

CERT_GetCertNicknames

Returns the nicknames of the certificates in a specified certificate database.

Syntax

#include <cert.h>

#include <certt.h>

CERTCertNicknames *CERT_GetCertNicknames (

CERTCertDBHandle *handle,

int what,

void *wincx);

Parameters

This function has the following parameters:

handleA pointer to the certificate database handle.

whatOne of these values:

SEC_CERT_NICKNAMES_ALL

SEC_CERT_NICKNAMES_USER

SEC_CERT_NICKNAMES_SERVER

SEC_CERT_NICKNAMES_CA

wincxThe PIN argument value to pass to PK11 functions. See description below for more information.

Returns

The function returns a CERTCertNicknames object containing the requested nicknames.

Description

CERT_GetCertNicknames must call one or more PK11 functions to obtain the services of a PKCS #11 module. Some of the PK11 functions require a PIN argument (see SSL_SetPKCS11PinArg for details), which must be specified in the wincx parameter. To obtain the value to pass in the wincx parameter, call SSL_RevealPinArg.

CERT_FreeNicknames

Frees a CERTCertNicknames structure. This structure is returned by CERT_GetCertNicknames.

Syntax

#include <cert.h>

void CERT_FreeNicknames(CERTCertNicknames *nicknames);

Parameters

This function has the following parameter:

nicknamesA pointer to the CERTCertNicknames structure to be freed.

CERT_GetDefaultCertDB

Returns a handle to the default certificate database.

Syntax

#include <cert.h>

CERTCertDBHandle *CERT_GetDefaultCertDB(void);

Returns

The function returns the CERTCertDBHandle for the default certificate database.

Description

This function is useful for determining whether the default certificate database has been opened.

NSS_FindCertKEAType

Returns key exchange type of the keys in an SSL server certificate.

Syntax

#include <nss.h>

SSLKEAType NSS_FindCertKEAType(CERTCertificate * cert);

Parameter

This function has the following parameter:

aThe certificate to check.

Returns

The function returns one of these values:

kt_null = 0

kt_rsa

kt_dh

kt_fortezza

kt_kea_size

Comparing SecItem Objects

SECITEM_CompareItem

Compares two SECItem objects and returns a SECComparison enumerator that shows the difference between them.

Syntax

#include <secitem.h>

#include <seccomon.h>

SECComparison SECITEM_CompareItem(

SECItem *a,

SECItem *b);

Parameters

This function has the following parameters:

aA pointer to one of the items to be compared.

bA pointer to one of the items to be compared.

Returns

The function returns an enumerator of type SECComparison.

typedef enum _SECComparison {

SECLessThan                = -1,

SECEqual                = 0,

SECGreaterThan = 1

} SECComparison;