Smalltalk-78
============
Smalltalk-78 is a variant of Smalltalk-76 stripped down to work on the portable "NoteTaker" machine.
In this repository is a Virtual Machine written in JavaScript to run a Smalltalk-78 snapshot in the web browser.

To learn more, please read our paper [Reviving Smalltalk-78: The First Modern Smalltalk Lives Again][paper].
The full history of various Smalltalk releases is covered in Dan's [Evolution Of Smalltalk][hopl] article,
which also includes links to a live version using this VM in the accompanying [Smalltalk Zoo][zoo] website.

The [index.html][standalone] version in this directory gives you a running system, although the browser integration is incomplete (e.g. file management). Pull requests welcome!

By default this runs an updated image with fixes (you may load more updates from wothin the system).
If you feel adventurous, you can run the [original, unmodified image][original] as found on the disk pack, too.

The full simulation environment including a graphical VM debugger is at the [Zoo's Smalltalk-78][full] page.
There you can also try Adele Goldberg's SimKit and Alan Borning's ThingLab images running on this VM.

[zoo]: https://smalltalkzoo.thechm.org/
[full]: https://smalltalkzoo.thechm.org/HOPL-St78.html
[standalone]: https://codefrau.github.io/Smalltalk78/?fresh
[original]: https://codefrau.github.io/Smalltalk78/?image=notetaker
[paper]: https://freudenbergs.de/vanessa/publications/Ingalls-2014-Smalltalk78.pdf
[hopl]: https://smalltalkzoo.thechm.org/papers/EvolutionOfSmalltalk.pdf
