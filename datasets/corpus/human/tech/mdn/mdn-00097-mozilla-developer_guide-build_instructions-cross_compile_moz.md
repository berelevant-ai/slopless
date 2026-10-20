# Cross Compile Firefox for Mingw32

It is possible to build Firefox for Windows using Linux as a development platform. Doing so is largely undocumented.  As of FF 61 (early 2018), the historical way of building Firefox with MinGW - using a MinGW-gcc toolchain - stopped working. The only way to build it today is to use a mingw-clang based toolchain, which is not very popular.

Therefore, building other Mozilla projects, such as Thunderbird, is even more experimental, and as of this writing hasn't even been attempted.

MinGW-clang x86 and x64 are currently a supported Tier 2 compilation target for Firefox.

Below are the canonical build scripts. To build Firefox with mingw-clang, you would need to replicate these instructions locally.

Note that there are different build scripts and toolchains for mozilla-central and mozilla-esr. If you want to build ESR; ensure you are using the correct toolchain.

The mingw-clang cross-compiler

The MinGW-clang compiler is built using: https://searchfox.org/mozilla-central/source/taskcluster/scripts/misc/build-clang-mingw.sh

You can download the toolchain directly using the following links:

x86: https://firefox-ci-tc.services.mozilla.com/api/index/v1/task/gecko.cache.level-3.toolchains.v3.linux64-clang-9-mingw-x86.latest/artifacts/public/build/clangmingw.tar.zst

x64: https://firefox-ci-tc.services.mozilla.com/api/index/v1/task/gecko.cache.level-3.toolchains.v3.linux64-clang-9-mingw-x64.latest/artifacts/public/build/clangmingw.tar.zst

Note that these may be out of date, as of June 2020 we intend to switch to clang 10 soon. Look in https://searchfox.org/mozilla-central/source/taskcluster/ci/toolchain/clang.yml to see which toolchain has the alias 'linux64-clang-mingw-x86'

Other mingw tools

download

Easiest is just to download them:

rust: https://firefox-ci-tc.services.mozilla.com/api/index/v1/task/gecko.cache.level-3.toolchains.v3.mingw32-rust-1.43.latest/artifacts/public/build/rustc.tar.zst (by the time you read this, this will probably be out of date though as we bump rust every FF version. see which version has the alias 'mingw32-rust' in this file)

cbindgen: https://firefox-ci-tc.services.mozilla.com/api/index/v1/task/gecko.cache.level-3.toolchains.v3.linux64-cbindgen.latest/artifacts/public/build/cbindgen.tar.xz

nsis: https://firefox-ci-tc.services.mozilla.com/api/index/v1/task/gecko.cache.level-3.toolchains.v3.linux64-mingw32-nsis.latest/artifacts/public/build/nsis.tar.xz

fxc2: https://firefox-ci-tc.services.mozilla.com/api/index/v1/task/gecko.cache.level-3.toolchains.v3.linux64-mingw-fxc2-x86.latest/artifacts/public/build/fxc2.tar.xz

You'll also need upx and wine; but these you can (probably) use from your package manager. (If you get errors with Wine, make sure it is 3.0 or above.)

nsis has this very annoying situation where it needs to be installed to a pre-set path, as explained here. Move the tarball to /builds/worker/workspace/build/src/ and then extract it.

or build: fxc2 (and wine)

fxc is a shader compilation tool from Microsoft. It has no Linux equivalent, but we can get something working using wine and a command command-line program that wraps a Microsoft dll. You will need wine, which you can install from your normal package manager.

One can build it using either mingw-clang or mingw-gcc. For legacy reasons we build it currently with mingw-gcc; but intend to switch to mingw-clang.

$ git clone https://github.com/mozilla/fxc2.git && cd fxc2

$ make

# cp fxc2.exe /usr/local/bin/

# cp d3dcompiler_47.dll /usr/local/bin/

fxc2 version and build script

or build: nsis

nsis version and build script

Configure Mozilla

You can get the source code following the instructions at here. After you have the source, create a .mozconfig file at the top level source directory.

Your mozconfig will need to replicate most of the mingw-clang mozconfig, which is located here for x86 and here for x64. Be sure to correct the paths

Additionally, you will need the following:

RUSTC="${TOOLTOOL_DIR}/rustc/bin/rustc"

CARGO="${TOOLTOOL_DIR}/rustc/bin/cargo"

RUSTFMT="${TOOLTOOL_DIR}/rustc/bin/rustfmt"

CBINDGEN="${TOOLTOOL_DIR}/cbindgen/cbindgen"

(Where TOOLTOOL_DIR is set up so this finds the rust package you downloaded.)

Build

Build it:

./mach build

The build should succeed - mingw-clang is a Tier 2 supported compilation target for Mozilla. There is a small chance that the build is broken right now (you can ask in #build) but it is more likely you haven't matched the exact versions/checkouts/configure flags. Because MinGW is not a robustly supported build target, deviating from what Mozilla specifies for any of those is risky. Review the build scripts in mozilla-central (linked above) and if you've matched the git checkout version of mingw-w64, compiler/binutils version, and configure flags, ask in #build.

Other troubles

Please ask in the newsgroup mozilla.dev.builds.