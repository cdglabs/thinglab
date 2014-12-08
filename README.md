# ThingLab

ThingLab was an application originally written in Smalltalk-76 by Alan Borning as part of his PhD dissertation work.  It was a constraint-based simulation laboratory, which allowed users to construct such things as demonstrations of geometric theorems, physics simulations of e.g. electrical circuits or bridges under load, graphical constraint-based calculators, and graphical layouts.  It is in many ways a further development of Ivan Sutherland's Sketchpad, and shares with Sketchpad the goals of using constraints for interactive graphics, and graphical construction of constrained objects.  It extends Sketchpad by adding additional application domains, providing support for a "kit-building kit" metaphor, and integration of constraints with part-whole hierarchies and Smalltalk's class hierarchy.  

For this project, we have the original ThingLab code from 1979 running in a newly implemented Smalltalk-78 interpreter in Lively/Javascript.  The interpreter is a resurrected version of the Smalltalk-78 system that ran on the Notetaker computer in 1979, with additional features restored from Smalltalk-76 that had been stripped out because of the Notetaker's limited hardware resources.  These implementations of Smalltalk-78 and ThingLab provide an important start on a novel way of exhibiting historic software systems.  They are more realistic than a re-implementation in a current programming language — the screen, the windows, the user interaction, and even the fonts are from the 35 year old version.  It's not the same as running on an original Alto or modern replica (probably the only possibility for even more realism) — but are much more widely accessible, to anyone with a modern browser, and surprisingly way faster (even though it is running on a ST78 interpreter written in Javascript).

## Status (Dec 2014)

The basic ThingLab functionality is working reasonably well, and can be used now for demos.  It would still need work to be ready to release a URL for anyone on the internet to experiment with, since there are still bugs and pitfalls.  Known issues include text editing (only partly supported, since the text editor in the new Smalltalk-78 interpreter is different from the one used in the old ThingLab), and a problem with constructing electrical circuits (cause not yet known).  Even with those fixes, ThingLab was still a prototype, not a polished system, and casual users would need to be alerted to that.

The Smalltalk-78 interpreter itself is fully functional, and fine for demos, although with the occasional bug (save often).  Smalltalk-78 itself was also a demo, but it was derived from Smalltalk-76, which was a real production system, in daily use by all the members of the research group.  As a result, the underlying code (perhaps with additional features restored from ST76) is more amenable to being the basis for a solid, working system.  However, to be truly ready for release in a way that would showcase this historic system, it would need some additional work, both on fixing remaining bugs and on restoring functionality, and more importantly by embedding it in an active essay.

## Links 
* http://lively-web.org/users/bert/Smalltalk-78.html (the Smalltalk-78 interpreter; click the "load image" button at the bottom and select "ThingLab" if you want ThingLab rather than ST78 alone.  Suitable for demos but this URL shouldn't be circulated to the general internet)
* http://www.cdglabs.org/thinglab/ (standalone version — this site. Usable by friendly folks, although not quite ready for publicizing)
* http://constraints.cs.washington.edu/ui/thinglab-tr.pdf (the original Xerox PARC tech report on ThingLab)
* http://videosrv14.cs.washington.edu/info/videos/mp4/general/ThingLab_Alan_Borning.mp4 (video of a 1978 Xerox PARC presentation)
* http://vpri.org/html/writings.php (for documents on Smalltalk-78 itself—set the search criterion to "papers for Historical Context")

## People
Alan Borning and Bert Freudenberg, with work on resurrecting the underlying Smalltalk-78 system by Bert Freudenberg, Dan Ingalls, Ted Kaehler, Yoshiki Oshima, and Alan Kay

## This repository

The [Smalltalk78 VM][St78] is included here using `git subtree`. This means you can freely modify stuff in the St78 directory and commit as usual.

Only if you want to update to the latest VM code, use:

    git subtree pull --prefix=St78 https://github.com/bertfreudenberg/Smalltalk78 master --squash

And to push local modifications back upstream, use:

    git subtree push --prefix=St78 https://github.com/bertfreudenberg/Smalltalk78 master

[St78]:     https://github.com/bertfreudenberg/Smalltalk78
