# Formatting JS code with Prettier and ESLint

Mozilla uses Prettier for enforcing coding style and whitespace. A pinned version of the utility will be installed when ./mach bootstrap is run, as specified by the dependencies in our top-level package.json.

Options are explicitly defined in .prettierrc.

Manual formatting

Note: Instead of manually formatting, we recommend setting up your editor to format on save, or alternatively using a commit hook.

A mach subcommand is provided for running both Prettier and ESLint from the command-line. This wrapper ensures the correct version of these tools are installed and run.

If the tools aren't installed, the packages will be automatically downloaded from npm and installed into node_modules. We pin the versions used for those packages.

Formatting the current directory

$ ./mach eslint --fix

When run without other arguments, this will run both Prettier and ESLint on the current directory. This could miss some reformatting (for example, when other parts of the tree are touched).

Formatting specific paths

$ ./mach eslint --fix <path>       # Format <path> in-place

$ ./mach eslint <path>             # Show issues

$ ./mach eslint --warnings <path>  # Show issues including warnings

The command also accepts a list of <path> arguments to reformat a specific directory or file; omitting the --fix flag will show the issues instead of fixing them. The --warnings flag includes warnings in the output.

Formatting outgoing

$ ./mach lint --outgoing  # Format outgoing commits

The command also accepts an --outgoing flag to format all files touched by commits that are not on the remote repository. Without arguments, finds the default remote that would be pushed to. The branch can also be specified manually, and works with mercurial or git.

Scripting Prettier

$ ./mach prettier-format -p <path> --assume-filename <name>

Both Prettier and ESLint expect that the path being passed to them is the path on-disk. If this is not the case, for example when formatting a temporary file, the "real" path must be specified. This can be done with the --assume-filename <name> argument.

Commit hook

To run Prettier and ESLint at the commit phase, run ./mach bootstrap or just add the following line in the hgrc file:

[extensions]

js-format = ~/.mozbuild/version-control-tools/hgext/js-format

With git, the configuration is the following:

# From the root git directory:

$ ln -s $(pwd)/tools/lint/hooks_js_format.py .git/hooks/pre-commit

You'll likely need to install the python-hglib package for your OS, or else you may get errors like abort: No module named hglib.client! when you try to commit.

Editor integration

It is possible to configure many editors to support running Prettier and ESLint automatically on save, or when run from within the editor.

Editor plugins

Atom

prettier-atom

linter-eslint

Emacs

prettier-emacs

Flycheck + javascript-eslint

Sublime Text

JsPrettier

SublimeLinter-eslint

Vim

vim-prettier

ALE / Syntastic

Visual Studio Code

Prettier

ESLint

Editor setup

These tools generally run Prettier and ESLint themselves, and will not actually use either ./mach eslint or  ./mach prettier-format. The packages installed by our tooling will be located in the top-level node_modules.

Typically, it's sufficient to:

1. Configure your editor to specify that "formatting on save" is desired, and/or

2. Configure the eslint extension to automatically --fix on save.

There shouldn't be a need for any other special setup. Most of the configuration that Prettier and ESLint relies on for formatting is stored inside our source tree (more specifically, using the .eslintrc.js and .prettierrc format files located in the root of the repository). Note that the list of ignored files and directories is provided by .eslintignore and .prettierignore.

Example

You can mix and match combinations of Prettier and ESLint plugin options to better suit your needs. For example, in Visual Studio Code: to only display code quality errors, but instead hide formatting errors, while also automatically fixing issues and formatting on save, add this to your workspace:

{

"editor.formatOnSave": true,

"eslint.autoFixOnSave": true,

"eslint.options": {

"rules": {

"prettier/prettier": "off",

}

}

}

Configuration

Code quality configurations for ESLint are entirely determined by the options defined in .eslintrc.js. However, coding style configurations are largely predetermined within Prettier itself, and we only specify a minimal set of options in .prettierrc. Use of local overrides is not planned and not part of our guidelines.

Ignored files & directories

We maintain a list of ignored directories and files, as well as a list of ignored libraries, which is used by ./mach eslint --fix. This is only used for technical reasons (such as testing parsers or debugger functionality), and third-party code.

Ignored code hunks

Sections of code may have formatting disabled using comments, but only for technical reasons. If a section must not be formatted, the following comments will disable the reformat:

// prettier-ignore

my code which should not be reformatted

Disabling Prettier by using /* eslint-disable prettier/prettier */ or by using // prettier-ignore for any reasons other than technical ones is not allowed.

Merging formatted and unformatted code

During the transition to using Prettier for all code in tree, it will often be necessary to rebase non-formatted code onto a formatted tree.

Mercurial

The format-source extension, now bundled with version-control-tools, and installed by ./mach bootstrap, may be used to seamlessly handle this situation.

To reformat your commits during the rebase or merge phase, run ./mach bootstrap or just add the following line in the hgrc file:

[extensions]

format-source = ~/.mozbuild/version-control-tools/hgext/format-source

The parent changeset of the reformat (b7030ce607ec) has been tagged as PRE_TREEWIDE_PRETTIER_FORMAT. We also recommend first rebasing to this parent changeset if your patches are old.

Git

The js-format-merge driver may be used to seamlessly handle this situation.

To reformat your commits during the rebase or merge phase:

$ git clone https://github.com/victorporof/js-format-merge

$ /path/to/js-format-merge/git-wrapper rebase <upstream>

The wrapper should clean up after itself, and the clone may be deleted after the rebase is complete.

Ignore lists for blame

To make sure that the blame/annotate features of Mercurial or git aren't affected. Two files are maintained to keep track of the reformatting commits.

Mercurial

The list is stored in .hg-annotate-ignore-revs

Commit messages should also contain the string # ignore-this-changeset

The syntax in this file is generated using the following command:

$ hg log --template '{node} - {author|person} - {desc|strip|firstline}\n'

Git

The list is stored in .git-blame-ignore-revs and contains git revisions for both gecko-dev and the git cinnabar repository.

The syntax in this file is generated manually from the following repos: https://github.com/mozilla/gecko-dev/ and https://github.com/mozilla/gecko/.