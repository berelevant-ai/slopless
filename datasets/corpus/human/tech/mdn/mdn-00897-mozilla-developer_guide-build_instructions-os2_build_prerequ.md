# OS/2 Build Prerequisites

Note: This page is about building Mozilla applications on OS/2 as checked out from CVS. Building from Mercurial is possible, but only rudimentary documentation exist in Building on OS/2 using Mercurial.

This document lists the tools required to build Mozilla products on the OS/2 platform and gives directions how to configure, download, and start a build. We have tried to be as detailed as possible with these instructions. In case you find errors or have problems, please ask for help in the newsgroup mozilla.dev.ports.os2 on news.mozilla.org.

This document is designed for someone creating a build environment from scratch. The build environment is easiest to set up when all the tools are placed on a single drive. For our examples, we will use D:.

Hardware requirements

Compiling a package as big as the Mozilla source code requires a lot of time and disk space:

Compiling the SeaMonkey suite on an machine with an Athlon XP 3000+ takes between

65min (using GCC 3.3.5, timed the Firefox 3.0.1 release on 2008-07-16)

90min (using GCC 3.3.5, timed a debug trunk build of SeaMonkey 2.0apre on 2007-09-07)

Depending on compilation options used this may vary by several minutes

Firefox and Thunderbird require a few minutes less

The source tree on disk takes up to about 350 MiB

The binary tree of a release build may use up to 300 MiB

If compiling a debug build, more than 1.2 GiB are required

Required packages

The following explains what tools are required to build Warpzilla.

In case you are trying to compile on eComStation, you will find most tools for the Mozilla build environment on CD#2 (in \DEVELOP\GCC\, there is an option to install them when running the "Developer's Install Guide"), except the cairo-support package 'mzfntcfgft' below and Python (?).

OS/2 Toolkit

Install the Toolkit that comes with your version of OS/2 or eComStation.

EMX runtime

If not already installed, unzip EMXRT.ZIP in the root directory. It will create a directory called EMX.

Add D:\EMX\DLL to your LIBPATH in CONFIG.SYS.

autoconf

Unzip AUTOCONF.ZIP in the root directory. It will create a directory called AUTOCONF.

Note: do not try to use versions newer than 2.13.

glibidl

Unzip the glibidl*.zip file in the root directory. It will create a directory called glibidl.

Perl 5.8.0 (bin & core)

Unzip both zips in the root directory. It will create a directory called PERL.

In the file PERL\LIB\5.8.0\OS2\CONFIG.PM, find the "archlib" tag (line 120) and change the drive letter to point to where you have installed PERL. (The ReadMe in the package is wrong, you should not use PERL_LIBBATH!)

Python (v2.4.4 binaries)

Unzip zip package into the root directory, it will create a directory called PYTHON244.

Support package for cairo-enabled builds mzfntcfgft

Unzip mzfntcfgft*.zip in the root directory. It will create a directory called mzfntcfgft. In case you are not compiling with GCC 3.3.5 CDS3 you will need to recompile the package (see the included README.)

Note: This package is only required for trunk builds since Feb 2007 (and can be used to build Gecko 1.8* with SVG/Canvas support).

There is a package from 2003 which contains most of the required programs listed below: MozTools of 07Aug2003. If you use this package, you may have to update CVS and GNU make afterwards, and you need ilink, ash, and tar as specified below. And you probably need to copy gnuregex.dll to regex.dll, too.

Note: For the following packages, you only need to extract the files we specify from the ZIPs. We recommend putting all of the following EXEs and DLLs in one directory called MOZTOOLS.

ZIP ZIP v2.3 with encryption and UnZIP Unzip v5.51 with unshrink support.

Note: use this unzip to unpack all packages.

zip.exe

unzip.exe

CVS

cvs.exe

NSINSTALL

nsinstall.exe

BSD Ash

ash.exe

GNU shell utilities (gnusutil.zip v1.12)

Unzip and copy EXE\*.EXE and EXE\*.DLL to your MOZTOOLS dir.

GNU bash bash v2.0-b264

bash.exe

GNU text utilities (gnututil v1.19)

Unzip and copy EXE\*.EXE and EXE\*.DLL to your MOZTOOLS dir.

GNU file utilities (gnufutil.zip v3.13)

Unzip and copy EXE\*.EXE and EXE\*.DLL to your MOZTOOLS dir.

GNU diff (diffutils v2.8)

Unzip OS2TREE.ZIP

Copy everything from USR\BIN to your MOZTOOLS dir.

GNU grep (grep v2.5.1)

Copy everything in BIN to your MOZTOOLS dir.

GNU awk (gawk v3.1.2)

Copy USR\BIN\GAWK.EXE to your MOZTOOLS dir.

Copy gawk.exe to awk.exe

GNU m4 v1.4

m4.exe

GNU make 3.81

make.exe

gettext-0_11_5-r2-bin.zip

intl.dll

GNU sed v4.0.5

sed.exe

GNU find v4.1

find.exe

xargs.exe

gnufind.dll

gnuregex.dll

Copy gnuregex.dll to regex.dll (the latter is needed by grep.exe)

rc.exe v.5.00.007 (link from os2bbs.com)

ILINK 5.0

Copy everything in BIN to your MOZTOOLS dir.

GNU Patch v2.5

patch.exe

GNU Tar v1.10

tar.exe

Icon converter version 0.92-2

winico.exe

Compiler

You should use GCC 3.3.5 for building any Mozilla application. It is no longer possible to compile Mozilla with the IBM C/C++ compiler, and while GCC 3.2.2 still works for branch builds, it does not work with the trunk any more without additional workarounds (since approximately September 2007).

Download the newest version GCC 3.3.5 CSD3 from the Netlabs FTP server, unpack, and go to the lib dir and run MakeOmfLibs.cmd. The setmozenv script (attached to this page) assumes that you installed into the directory D:\GCC335. If you installed elsewhere, you will have to make the appropriate changes.

Build environment

The build process expects all packages listed above to be installed. They are found either through specific environment variables (e.g. for Perl and AutoConf) or through PATH/LIBPATH that includes the moztools dir.

This environment is set up using REXX scripts setmozenv*.cmd. Use the script for GCC 3.3.5 as attached to this page.  Please adapt any locations listed in this file, in case you did not install on drive D: and in the directory D:\MOZTOOLS. To set the environment, open a CMD shell and start the batch file.

Getting sources and building

The options for the build are taken from .mozconfig which is a file you create in the mozilla directory. They can also be generated using the Unix Build Configurator but you should start with a minimal file first, like this one:

mk_add_options MOZ_OBJDIR=@TOPSRCDIR@/obj

mk_add_options MOZ_CO_PROJECT=suite

ac_add_options --enable-application=suite

ac_add_options --disable-tests

ac_add_options --enable-optimize

ac_add_options --disable-debug

that would create an optimized SeaMonkey build, with binaries located in the directory obj under the mozilla directory.

The source code of Mozilla is distributed via CVS, the setmozenv script already sets up the environment for that. In principle you need to select a project to pull from CVS (add a line MOZ_CO_PROJECT to your .mozconfig), check out the main makefile client.mk by hand (cvs co mozilla/client.mk) and let the build system pull the rest of the sources (make -f client.mk pull_all). The details of this are described here.

Once you have created the .mozconfig file, you can start the build using

make -f client.mk build 2>&1 | tee build.log

(The redirection and tee call keeps a logfile of the whole build in the file build.log but also issues all the messages to the screen.)

Once the build is complete, the binaries can be found in obj/dist/bin. If you want to make a package, please follow the instructions on Building a SeaMonkey package.

If these information is not enough, there is some background info in How Mozilla's build system works.

Tricks

Some hints that you can try in case of problems. You should also post to the mozilla.dev.ports.os2 newsgroup if you have problems.

Although the command to pull the sources from CVS should do this automatically, it is sometimes necessary to delete the three configure files so that they can be properly generated on OS/2. This usually happens when there is a CVS conflict when pulling the code. If you encounter errors during the build, you should try deleting the configure files:

rm mozilla/configure

rm mozilla/nsprpub/configure

rm mozilla/directory/c-sdk/configure

These will be regenerated automatically from the corresponding configure.in file when you kick off the build in the next step. To generate them manually, go to each directory and run 'bash autoconf'.

The first step of the build process uses the configure script generated by GNU autoconf.

It automatically tests many aspects of the build environment, often by generating test programs that it tries to compile with the selected compiler.

It leaves a log of its activity in the file config.log (in the OBJDIR is you set one) where you can look up errors.

If a critical error occurs, it will print out the sourcecode of the small test program in config.log and leave the respective generated .h files in the same directory. This can be compiled manually and used to track down errors in the build setup.

If you are building the Mozilla code to be able to compile an extension for use with OS/2 (e.g. enigmail) then it is a good idea to edit all three configure.in files in the tree as well as security\coreconf\OS2.mk and replace emxexp -o with just emxexp in the definition of the FILTER variable. Then remove all configure files as described in trick 1. If you do that then the extension will be longer lived and does not have to be rebuilt with every new version.

If you are normally using the 4OS2 shell instead of plain CMD, you should set COMSPEC to CMD.EXE again in your build environment in case you encounter problems.

If you are building on a system that has an X11 development environment and you get linker errors, you might want to try to build with ac_add_options --without-x in your .mozconfig.