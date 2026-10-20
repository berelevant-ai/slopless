# JSS

The JSS project has been relocated!

As of April 6, 2018, JSS has been migrated from Mercurial on Mozilla to Git on Github.

JSS source should now be checked out from the Github:

git clone git@github.com:dogtagpki/jss.git

-- OR --

git clone https://github.com/dogtagpki/jss.git

All future upstream enquiries to JSS should now use the Pagure Issue Tracker system:

https://pagure.io/jss/issues

Documentation regarding the JSS project should now be viewed at:

http://www.dogtagpki.org/wiki/JSS

NOTE:  As much of the JSS documentation is sorely out-of-date, updated information will be a work in progress, and many portions of any legacy documentation will be re-written over the course of time.  Stay tuned!

Legacy JSS information can still be found at:

SOURCE: https://hg.mozilla.org/projects/jss

ISSUES:   https://bugzilla.mozilla.org/buglist.cgi?product=JSS

WIKI:        https://developer.mozilla.org/en-US/docs/Mozilla/Projects/NSS/JSS

Network Security Services for Java (JSS) is a Java interface to NSS. JSS supports most of the security standards and encryption technologies supported by NSS. JSS also provides a pure Java interface for ASN.1 types and BER/DER encoding.

JSS offers a implementation of Java SSL sockets that uses NSS's SSL/TLS implementation rather than Sun's JSSE implementation. You might want to use JSS's own SSL classes if you want to use some of the capabilities found in NSS's SSL/TLS library but not found in JSSE.

NSS is the cryptographic module where all cryptographic operations are performed. JSS essentially provides a Java JNI bridge to NSS C shared libraries. When NSS is put in FIPS mode, JSS ensures FIPS compliance by ensuring that all cryptographic operations are performed by the NSS cryptographic module.

JSS offers a JCE provider, "Mozilla-JSS" JCA Provider notes.

JSS, jss4.jar, is still built with JDK 1.4.2. While JDK 1.4.2 is EOL'd and all new product development should be using the latest JavaSE, legacy business products that must use JDK 1.4 or 1.5 can continue to add NSS/JSS security fixes/enhancements.

JSS is used by Red Hat and Sun products that do crypto in Java. JSS is available under the Mozilla Public License, the GNU General Public License, and the GNU Lesser General Public License. JSS requires NSPR and NSS.

Java provides a JCE provider called SunPKCS11 (see Java PKCS#11 Reference Guide.) SunPKCS11 can be configured to use the NSS module as the crytographic provider. If you are planning to just use JSS JCE provider as a bridge to NSS's FIPS validated PKCS#11 module, then the SunPKCS11 JCE provider may do all that you need. Note that Java 1.5 claimed no FIPS compliance, and Java 1.6 or higher needs to be used. A current limitation to the configured SunPKCS11-NSS bridge configuration is if you add a PKCS#11 module to the NSS database such as for a smartcard, you won't be able to access that smartcard through the SunPKCS11-NSS bridge. If you use JSS, you can easily get lists of modules and tokens that are configured in the NSS DB and freely access all of it.

Documentation

Before you use JSS, you should have a good understanding of the crypto technologies it uses. You might want to read these documents:

Introduction to Public-Key Cryptography. Explains the basic concepts of public-key cryptography that underlie NSS and JSS.

Introduction to SSL. Introduces the SSL protocol, including information about cryptographic ciphers supported by SSL and the steps involved in the SSL handshake.

For information on downloading NSS releases, see NSS sources building testing.

Read Using JSS to get you started with development after you've built and downloaded it.

Release Notes

4.3.1 Release Notes

4.3 Release Notes

Older Release Notes

Build Instructions

Building JSS 4.4.x

Building JSS 4.3.x

Older Build Instructions

Download or View Source

Download binaries, source, and javadoc

View the source online

Testing

JSS tests

Frequently Asked Questions

JSS FAQ

Information on JSS planning can be found at wiki.mozilla.org, including:

NSS FIPS Validation

NSS Roadmap page

Community

View Mozilla Cryptography forums...

Related Topics

Security