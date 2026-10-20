# Getting Mozilla Source Code Using CVS

Note: This document describes how to get source code for older versions of the code, Gecko 1.9.0, Firefox 3 or earlier, and older versions of NSS and NSPR. Development for Gecko 1.9.1/Firefox 3.5 and beyond, and recent versions of NSS and NSPR, uses the Mercurial source code control system.

As of July 2015, CVS services are no longer operated at Mozilla. For access to CVS Archives, please see the blog post announcing the change.

Those doing active development can check out the latest source using CVS. This is the preferred method if you plan to provide patches and fix bugs, as it lets you get up-to-the-minute changes and merge them with your own.

If you want to compile a product for release, it is generally better to Download Mozilla Source Code tarballs.

Getting Started

CVS means "Concurrent Versioning System". To learn more about CVS in general, visit Read The Docs.

Anyone can check out (also known as "pull" or "download") the sources via CVS, but only certain people have the ability to check in (make changes, also known as "commit"). Those people are the module owners and their delegates. Read our document on hacking mozilla to find out how to get the ability to check in. You may also wish to read about Using SSH to connect to CVS.

Requirements

To check out the sources, you need to be running CVS 1.11 or later. 1.12.13 does not work with the CVS server, and instead results in hangs, although 1.12.9 is known to work. Furthermore, you must use GNU make to check out and build Mozilla. No other "make" program is acceptable. On windows, mac and regular GNU systems (like GNU/Linux), use "make" to run GNU make; on most non-GNU unixes (like e.g. Solaris, etc.), use "gmake".

CVS Client Settings

The "cvsroot" (repository identification string) used for anonymous access to Mozilla CVS is

:pserver:anonymous@cvs-mirror.mozilla.org:/cvsroot

If you are using a graphical CVS interface, use the following server data:

host: "cvs-mirror.mozilla.org"

repository path: "/cvsroot"

user: "anonymous"

connection type: pserver

port: default (2401)

Selecting a Project to Pull

Since several different applications are built from the same basic source code, you must choose which application to checkout on the command line using the MOZ_CO_PROJECT variable. This information has to be supplied when it comes to the checkout of the actual source code (see the appropriate checkout section below, according to the branch you want to checkout). The possible options include the following:

browser

The standalone "Firefox" browser.

mail

The standalone "Thunderbird" mail/news client.

suite

The traditional "Mozilla" SeaMonkey suite of browser, mail/news, composer, and other applications.

minimo

The standalone browser for small devices.

composer

The standalone HTML composer.

calendar

The standalone "Sunbird" calendar app.

xulrunner

The next-generation XUL application launcher.

camino

The "Camino" native browser for Macintosh.

all

Check out sources for all of the above projects, plus some additional utility code

Multiple projects can be specified with commas: MOZ_CO_PROJECT=suite,browser,xulrunner.

Note that if you are using a custom .mozconfig file, you can also specify MOZ_CO_PROJECT there, instead of including it on the command line.

Checking Out a New Source Tree

Check Tinderbox

Before pulling a tree, you should always check the appropriate Tinderbox to make sure that the codebase is not broken. If there are red tinderboxes, it is usually advisable to wait until they are green before pulling a tree.

Branch HEAD

To check out a new source tree from scratch, get the client.mk file which contains makefile instructions which are used to pull the rest of the tree:

$ cvs -d :pserver:anonymous@cvs-mirror.mozilla.org:/cvsroot co mozilla/client.mk

Note: if you have already set up a .mozconfig file, you may also need to check out the following files:

Firefox

cvs -d :pserver:anonymous@cvs-mirror.mozilla.org:/cvsroot co mozilla/browser/config/mozconfig

Thunderbird

cvs -d :pserver:anonymous@cvs-mirror.mozilla.org:/cvsroot co mozilla/mail/config/mozconfig

Specific Branch

If you want to check out the source code of a specific CVS branch, use

$ cvs -d :pserver:anonymous@cvs-mirror.mozilla.org:/cvsroot co -r BRANCH mozilla/client.mk

instead. To, for example, pull the Firefox 2.0/Thunderbird 2.0/SeaMonkey 1.1 development branch, replace BRANCH above with MOZILLA_1_8_BRANCH. For available branch tags in Mozilla, see CVS Tags.

The information on pulling project specific .mozconfig files as listed in the previous section apply to other branches than HEAD as well of course.

Checkout

After having chosen the correct branch, run:

$ cd mozilla

$ make -f client.mk checkout MOZ_CO_PROJECT=option,option

As mentioned above, if you are using a custom .mozconfig file where you have already specified the MOZ_CO_PROJECT variable, you do not need to repeat it here on command line.

Always use client.mk to checkout the Mozilla sources: do not check out the mozilla/ module directly. Various subprojects such as NSS, NSPR, and LDAP C SDK are pulled from stable release tags, even when regular mozilla development occurs on the trunk.

Specific Time

If you want to check out the source code as it was at a specific time you can use the MOZ_CO_DATE variable. For example MOZ_CO_DATE="20 Oct 2006 17:00 PDT".

This can either be added to your .mozconfig file, or specified on the command line, such as

$ cd mozilla

$ make -f client.mk checkout MOZ_CO_DATE="20 Oct 2006 17:00 PDT" MOZ_CO_PROJECT=option,option

Changing the Source Tree to a Different Branch

Branch HEAD

In order to update a source tree (be it branch HEAD or a specific branch) to latest branch HEAD, first run:

$ cd mozilla

$ cvs up -A client.mk

The -A option removes any "sticky branch" information, which leads to the effect that the tree is updated to HEAD.

Specific Branch

To update a source tree which was pulled from a specific branch, start with

$ cd mozilla

$ cvs up -r BRANCH client.mk

instead. Replace BRANCH by the tag of the branch you want to update.

Updating a Source Tree

To update your source tree do the following:

$ make -f client.mk checkout MOZ_CO_PROJECT=option,option

As always, if you use a custom .mozconfig file where MOZ_CO_PROJECT is already defined, you do not need to repeat it on command line.

Creating a Diff File

In order to create a diff of a single local file against the current file in the repository, use:

$ cvs diff -u8p FILENAME

See Creating a patch for more information.

Converting a Downloaded Source Tree

Downloaded source trees from mozilla.org (source tarballs) are already set up with CVS information, like a normal checkout. You can update these trees like normal trees to the latest code, without special action. See previous section on how to update a source tree.

interwiki link