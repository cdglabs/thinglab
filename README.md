The [Smalltalk78 VM][St78] is included here using `git subtree`. This means you can freely modify stuff in the St78 directory and commit as usual.

Only if you want to update to the latest VM code, use:

    git subtree pull --prefix=St78 https://github.com/bertfreudenberg/Smalltalk78 master --squash

And to push local modifications back upstream, use:

    git subtree push --prefix=St78 https://github.com/bertfreudenberg/Smalltalk78 master

[St78]:     https://github.com/bertfreudenberg/Smalltalk78
