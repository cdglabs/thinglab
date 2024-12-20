"Minimal support to get updates.

Paste this file into a workspace of the original Notetaker image and execute it.
Save as a base image. Then load updates via the desktop menu item.

NOTE: unlike other .st files, this one has LF and Unicode characters in it.
      The VM paste code will convert them to CR and the Notetaker character set,
	  so you can paste it into the workspace.

For experimenting locally, you can change the update URL to e.g. 'http:updates/'.
"

Smalltalk declare: ↪updateURL as: 'https://smalltalkzoo.thechm.org/users/codefrau/St78/updates/'.

UserView understands: 'fileString: fileName "local file name or http URL"
	[⇑nil] primitive: 66' classified: 'As yet unclassified'.

UserView understands: 'filin: fileName | file chunk
	[file ← self fileString: fileName.
	file ≡ nil ⇒
		[user cr.
		user show: fileName + '' is absent.''.
		⇑nil]
	user cr.
	user show: ''Reading '' + fileName + ''...''.
	file ← file asStream.
	FilinSource ← self.
	until⦂ file end do⦂
		[chunk ← file upto: 30.
		user print: nil ⓢ chunk.
		user space.
		file peek = 26 ⇒
			[file skipTo: ''\'' ◦ 1.
			file skipTo: ''g'' ◦ 1]].
	self show: ''<eof>''.
	self cr.
	FilinSource ← nil]' classified: 'As yet unclassified'.

user filin: (Smalltalk ◦ ↪updateURL) + '0001InitUpdates-bf.st'.
user filin: (Smalltalk ◦ ↪updateURL) + '0002fileInOut-di.st'.
user filin: (Smalltalk ◦ ↪updateURL) + '0003updates-bf.st'.
user filin: (Smalltalk ◦ ↪updateURL) + '0004imageSave-bf.st'.
background ← ltgray.
user clear; show: 'Smalltalk-78 / Notetaker revival: Installed basic support methods. You can load updates now.'.
