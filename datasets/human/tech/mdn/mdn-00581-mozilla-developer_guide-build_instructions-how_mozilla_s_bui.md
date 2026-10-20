# Makefiles - Best practices and suggestions

Laundry list

makefiles should remove all content that it will generate.

prefer library rules whenever possible or create library rules that are missing.

dependency builds - A second invocation of make within a sandbox should always be a NOP.

hardcoded values - avoid them like the plague.  Use variable assignments, autogen paths and dynamic file gathering.

platform specific - avoid this logic whenever possible.

Code as little platform specific logic within a makefile as possible, a conditional and compiler flags at most should be needed.  For ex use defines within sources to shift platform logic into your source code.

If a unit test is platform specific write your makefile so it can be used on all platforms but only do work on the specific hardware or class of hardware.

For classes of hardware (unix/windows) place your makefile in a subdirectory, unix/Makefile.in

Always include dependencies when creating a target

Initial make call should always be the workhorse: build, generate, deploy, install, etc.

All subsequent make calls must become a NOP unless sources or dependencies change or have been removed.

Incorrect dependencies will contribute to wasted cycles and can contribute to circular dependencies.

Directory dependencies

Do not use directories as a dependency for generated targets, ever.  Any activity within a directory will alter inodes forcing targets to always be stale.

For ex, individual unit tests would invalidate all prior test activity whenever a test touched a timestamp file in the directory to signal success.

Parallel make: add an explicit timestamp dependency (.done) that make can synchronize threaded calls on to avoid a race condition.

# Transient directory for storing timestamps

TS=.ts

#####################################################

## Extra dep needed to synchronize parallel execution

#####################################################

$(TS): $(TS)/.done

$(TS)/.done:

$(MKDIR) -p $(dir $@)

touch $@

#  "clean" target

GARBAGE_DIRS += $(TS)

Maintain clean targets - makefiles should be able to remove all content that is generated so "make clean" will return the sandbox/directory back to a clean state.

targets = foo bar tans

timestampDIR = .ts

all: $(timestampDIR) $(targets)

%: %.c

$(CC) -o $@ $<

$(timestampDIR):

$(MKDIR) $@

# "clean" target

GARBAGE += $(targets)

GARBAGE_DIRS += $(timestampDIR)

Wrapper check/unit tests with a ENABLE_TESTS conditional so tests can be disabled on demand.

ifdef ENABLE_TESTS

ifeq ($(NULL),$(filter WINNT OS2,$(OS_ARCH)))

DIRS += test

endif # WIN

endif # ENABLE_TESTS