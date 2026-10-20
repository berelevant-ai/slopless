# Installing Callgraph

Pull and build Treehydra if you haven't already.

The sqlite3 tool. (On Linux, this should be provided by your distro.)

Pulling the source

To download the Callgraph scripts from the Mercurial repository:

cd $HOME

hg clone http://hg.mozilla.org/rewriting-and-analysis/callgraph

Building

Assuming your gcc and treehydra are in the locations suggested in the installation instructions, invoke the callgraph script via

cd $HOME/callgraph

#./callgraph.sh path/to/plugin/enabled/gcc path/to/treehydra

./callgraph.sh $HOME/gcc-dehydra/installed/bin $HOME/gcc-dehydra/dehydra

The callgraph script will do the following:

hg clone mozilla-central for you the first time it's run. (The tree is stored under $HOME/callgraph/mozilla-central/mozilla.) After that, it's up to you to hg pull -u when you want to update it.

Build the tree, using the callgraph analysis script. The mozconfig used for this is $HOME/callgraph/mozconfig; the objdir is $HOME/callgraph/mozilla-central/obj-fx. Each object file produced by gcc and g++ in the tree will have a corresponding plaintext .sql file, containing sqlite INSERT statements to build the database.

Construct the database, by aggregating the .sql files and running them through sqlite. This data goes into $HOME/callgraph/db/graph.sqlite, which can be inspected using sqlite3. (Documentation for the sqlite syntax can be found here.)

A different mozilla-central location can be used by editing the $HOME/callgraph/callgraph.sh script. The default mozconfig options are --disable-optimize --disable-debug --disable-tests.

For information on what is stored in the database, see the Schema Reference.