# configure.in

The Mozilla  script is a standard method of determining compiler and system capabilities and options for Linux-based software. Mozilla uses configure on all platforms. configure is a shell script generated from an template file , using Autoconf.

Here's an example of how to add a configure option to the build. Please consult the build system owner (Benjamin Smedberg) before adding configure options. New options will only be accepted if they are going to be maintained and tested appropriately.

MOZ_ARG_ENABLE_BOOL(foo,

[  --enable-foo     Insert some documentation here. Try to keep the spacing lined up right.],

MOZ_FOO=1,

MOZ_FOO=)

dnl AC_SUBST will replace @MOZ_FOO@ in makefiles.

AC_SUBST(MOZ_FOO)

dnl If you need to use #ifdef MOZ_FOO in C/C++ code, use AC_DEFINE. In most cases this

dnl is unnecessary, as Makefile ifdefs are sufficient.

if test -n "$MOZ_FOO"; then

AC_DEFINE(MOZ_FOO)

fi

After editing configure.in, regenerate configure by running Autoconf 2.13. On most systems, the command is autoconf-2.13.

Autoconf 2.5x will not work. See  for details.

In , add the MOZ_FOO variable to the list of substituted variables:

MOZ_FOO = @MOZ_FOO@

Since autoconf.mk is included at the top of every Mozilla Makefile, the MOZ_FOO variable will be available to every makefile.