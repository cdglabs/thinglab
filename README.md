# ThingLab

ThingLab was an application originally written in Smalltalk-76 by Alan Borning as part of his PhD dissertation work.  It was a constraint-based simulation laboratory, which allowed users to construct such things as demonstrations of geometric theorems, physics simulations of e.g. electrical circuits or bridges under load, graphical constraint-based calculators, and graphical layouts.  It is in many ways a further development of Ivan Sutherland's Sketchpad, and shares with Sketchpad the goals of using constraints for interactive graphics, and graphical construction of constrained objects.  It extends Sketchpad by adding additional application domains, providing support for a "kit-building kit" metaphor, and integration of constraints with part-whole hierarchies and Smalltalk's class hierarchy.  

For this project, we have the original ThingLab code from 1979 running in a newly implemented Smalltalk-78 interpreter in Lively/Javascript.  The interpreter is a resurrected version of the Smalltalk-78 system that ran on the Notetaker computer in 1979, with additional features restored from Smalltalk-76 that had been stripped out because of the Notetaker's limited hardware resources.  These implementations of Smalltalk-78 and ThingLab provide an important start on a novel way of exhibiting historic software systems.  They are more realistic than a re-implementation in a current programming language — the screen, the windows, the user interaction, and even the fonts are from the 35 year old version.  It's not the same as running on an original Alto or modern replica (probably the only possibility for even more realism) — but are much more widely accessible, to anyone with a modern browser, and surprisingly way faster (even though it is running on a ST78 interpreter written in Javascript).

## Status

#### June 2015
The original ThingLab code is now running well under the Lively/Javascript interpreter; as far as I know, remaining bugs are left over from the original code from 1979.  (ThingLab was a research prototype rather than a production system and there are indeed bugs still.)  The saved version of the ThingLab image has a help window open with suggestions for demos to try.

The Smalltalk-78 interpreter itself is fully functional, and fine for demos, although with the occasional bug (save often).  Smalltalk-78 itself was also a demo, but it was derived from Smalltalk-76, which was a real production system, in daily use by all the members of the research group.  As a result, the underlying code (perhaps with additional features restored from ST76) is more amenable to being the basis for a solid, working system.  However, to be truly ready for release in a way that would showcase this historic system, it would need some additional work, both on fixing remaining bugs and on restoring functionality, and more importantly by embedding it in an active essay.

#### April 2016
A few fixes to click delays and event timestamps have been made since the previous summer.

## Links 
* https://cdglabs.github.io/thinglab/ (standalone version of ThingLab)
* https://github.com/codefrau/Smalltalk78 (the Smalltalk-78 interpreter)
* https://smalltalkzoo.thechm.org/HOPL-St78.html (a graphical debugger for the Smalltalk-78 interpreter; click the "load image" button at the bottom and select "ThingLab" if you want ThingLab rather than ST78 alone)
* http://constraints.cs.washington.edu/ui/thinglab-tr.pdf (the original Xerox PARC tech report on ThingLab)
* http://videosrv14.cs.washington.edu/info/videos/mp4/general/ThingLab_Alan_Borning.mp4 (video of a 1978 Xerox PARC presentation)
* http://vpri.org/writings.php (for documents on Smalltalk-78 itself—set the search criterion to "papers for Historical Context")

## People
Alan Borning and Vanessa Freudenberg, with work on resurrecting the underlying Smalltalk-78 system by Vanessa Freudenberg, Dan Ingalls, Ted Kaehler, Yoshiki Oshima, and Alan Kay

## This repository

The [Smalltalk78 VM][St78] is included here using `git subtree`. This means you can freely modify stuff in the St78 directory and commit as usual.

Only if you want to update to the latest VM code, use:

    git subtree pull --prefix=St78 https://github.com/codefrau/Smalltalk78 master --squash

And to push local modifications back upstream, use:

    git subtree push --prefix=St78 https://github.com/codefrau/Smalltalk78 master

[St78]:     https://github.com/codefrau/Smalltalk78
