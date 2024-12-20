module('users.codefrau.St78.vm').requires().toRun(function() {
/*
 * Copyright (c) 2013-2020 Vanessa Freudenberg and Dan Ingalls
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


NT = {
    VM_DATE: "2024-01-11",

    MAX_INSTSIZE: 0x100000, // arbitrary limit on instance size
    largeOops: true, // automatically switch to 32 bit image format

    OOP_NIL: 0,
    OOP_FALSE: 2,
    OOP_TRUE: 4,
    OOP_THEPROCESS: 6,
    OOP_SMALLTALK: 8,

    // known classes
    OOP_CLCLASS: 0x20,
    OOP_CLINTEGER: 0x40,	// class of SmallIntegers
    OOP_CLSTRING: 0x60,
    OOP_CLVECTOR: 0x80,
    OOP_CLSTREAM: 0xa0,
    OOP_CLFLOAT: 0xc0,
    OOP_CLPROCESS: 0xe0,
    OOP_CLREMOTECODE: 0x100,
    OOP_CLPOINT: 0x120,
    OOP_CLNATURAL: 0x140,
    OOP_CLLARGEINTEGER: 0x160,
    OOP_CLUNIQUESTRING: 0x1a0,
    OOP_CLCOMPILEDMETHOD: 0x1e0,
    OOP_CLRECTANGLE: 0x2a0,
    OOP_CLVLENGTHCLASS: 0x9c0,

    OOP_MASK: 0x1F,       // mask for class oops
    OOP_TAG_SMALL: 0x1E,  // tag for 16 bit size header
    OOP_TAG_LARGE: 0x1F,  // tag for 32 bit size header

	// CLCLASS layout:
	PI_CLASS_TITLE: 0,
	PI_CLASS_MYINSTVARS: 1,
	PI_CLASS_INSTSIZE: 2,
	PI_CLASS_MDICT: 3,
	PI_CLASS_CLASSVARS: 4,
	PI_CLASS_SUPERCLASS: 5,
	PI_CLASS_ENVIRONMENT: 6,

	// CLSTREAM layout:
	PI_STREAM_ARRAY: 0,
	PI_STREAM_POSITION: 1,
	PI_STREAM_LIMIT: 2,

	// CLPROCESS layout:
	PI_PROCESS_MINSIZE: 0,		// THEPROCESS: 128
	PI_PROCESS_HWM: 1,			// THEPROCESS: 0
	PI_PROCESS_TOP: 2,			// THEPROCESS: 7
	PI_PROCESS_RESTARTCODE: 3,	// THEPROCESS: NIL
	PI_PROCESS_STACK: 4,		// THEPROCESS: NIL
	PN_PROCESS: 5,   	    	// number of fixed pointers

	// CLREMOTECODE layout:
	PI_RCODE_FRAMEOFFSET: 0,
	PI_RCODE_STARTINGPC: 1,
	PI_RCODE_PROCESS: 2,
	PI_RCODE_STACKOFFSET: 3,

	// CLHASHSET layout:
	PI_HASHSET_OBJECTS: 0,

	// CLDICTIONARY layout:
	PI_DICTIONARY_OBJECTS: 0,
	PI_DICTIONARY_VALUES: 1,

	// CLSYMBOLTABLE layout:
	PI_SYMBOLTABLE_OBJECTS: 0,
	PI_SYMBOLTABLE_VALUES: 1,

	// CLMESSAGEDICT layout:
	PI_MESSAGEDICT_OBJECTS: 0,
	PI_MESSAGEDICT_METHODS: 1,

	// CLOBJECTREFERENCE layout:
	PI_OBJECTREFERENCE_VALUE: 0,

	// CLCOMPILEDMETHOD layout:
	BI_COMPILEDMETHOD_FIRSTLITERAL: 2,	// past method header
	PC_BIAS: 2,	// due to NT's shorter header format

	// CLPOINT layout:
	PI_POINT_X: 0,
	PI_POINT_Y: 1,

	// CLLARGEINTEGER layout:
	PI_LARGEINTEGER_BYTES: 0,
	PI_LARGEINTEGER_NEG: 1,

	/*  | i . (1 to: TextScanner instvars length) transform⦂ i to⦂ [(i-1),(TextScanner instvars◦i)] ==>
	((0 'function' ) (1 'color' ) (2 'destbase' ) (3 'destraster' ) (4 'destx' ) (5 'desty' ) (6 'width' ) (7 'height' ) (8 'sourcebase' ) (9 'sourceraster' ) (10 'sourcex' ) (11 'sourcey' ) (12 'clipx' ) (13 'clipy' ) (14 'clipwidth' ) (15 'clipheight' ) (16 'sourcefield' ) (17 'destfield' ) (18 'source' ) (19 'dest' ) (20 'sstrike' ) (21 'dstrike' ) (22 'printing' ) (23 'chari' ) (24 'stopx' ) (25 'xtable' ) (26 'exceptions' ) (27 'spacecount' ) (28 'spacei' ) (29 'spacex' ) (30 'charpad' ) (31 'text' ) (32 'spacesize' ) (33 'style' ) (34 'para' ) (35 'font' ) (36 'fontno' ) (37 'minascii' ) (38 'maxascii' ) (39 'glyphs' ) (40 'frame' ) (41 'looktype' ) (42 'kern' ) ) */

	// CLBITBLT layout:
	PI_BITBLT_FUNCTION: 0,
	PI_BITBLT_GRAY: 1,
	PI_BITBLT_DESTBITS: 2,
	PI_BITBLT_DESTRASTER: 3,
	PI_BITBLT_DESTX: 4,
	PI_BITBLT_DESTY: 5,
	PI_BITBLT_WIDTH: 6,
	PI_BITBLT_HEIGHT: 7,
	PI_BITBLT_SOURCEBITS: 8,
	PI_BITBLT_SOURCERASTER: 9,
	PI_BITBLT_SOURCEX: 10,
	PI_BITBLT_SOURCEY: 11,
	PI_BITBLT_CLIPX: 12,
	PI_BITBLT_CLIPY: 13,
	PI_BITBLT_CLIPWIDTH: 14,
	PI_BITBLT_CLIPHEIGHT: 15,
	PI_BITBLT_SOURCEFIELD: 16,
	PI_BITBLT_DESTFIELD: 17,
	PI_BITBLT_SOURCE: 18,
	PI_BITBLT_DEST: 19,
	PI_BITBLT_PRINTING: 22,
	PI_BITBLT_CHARI: 23,
	PI_BITBLT_STOPX: 24,
	PI_BITBLT_XTABLE: 25,
	PI_BITBLT_EXCEPTIONS: 26,
	PI_BITBLT_CHARPAD: 30,
	PI_BITBLT_TEXT: 31,
	PI_BITBLT_MINASCII: 37,
	PI_BITBLT_MAXASCII: 38,
	PI_BITBLT_KERN: 42,

	// CLFORM layout:
	PI_FORM_EXTENT: 0,
	PI_FORM_BITS: 1,
	// also: offset figure ground

    // CLCURSOR layout:
    PI_CURSOR_BITSTR: 0,
    PI_CURSOR_OFFSET: 1,

	// runtime indices and offsets:

	// process frame layout (off BP):
	FI_FIRST_TEMP: -1,
	// nominal stack frame contains six items, as follow:
	FI_SAVED_BP: 0,
	FI_CALLER_PC: 1,
	FI_NUMARGS: 2,
	FI_METHOD: 3,
	FI_MCLASS: 4,
	FI_RECEIVER: 5,	// top stack item in previous frame
	//
	FI_LAST_ARG: 6,	// stack item in previous frame
	//
	F_FRAMESIZE: 5,	// don't count args nor receiver...

	// Class instSize format (assuming untagged integer!):
	FMT_HASPOINTERS: 0x4000,
	FMT_HASWORDS: 0x2000,
	FMT_ISVARIABLE: 0x1000,
	FMT_BYTELENGTH: 0x07ff,

    // Ints
    MAX_INT:  0x3FFF,
    MIN_INT: -0x4000,
    NON_INT: -0x5000, // non-small and neg (so non pos16 too)

    // Display colors
    BLACK: 0xFF000000,
    WHITE: 0xFFFFFFFF,

    // Event constants
    Mouse_Blue: 1,
    Mouse_Yellow: 2,
    Mouse_Red: 4,

    Key_Shift: 8,
    Key_Ctrl: 16,
    Key_Meta: 32,  // Cmd on Mac, Alt on PC

    // original keyboard map used inside the image
    // set to vm.image.globalNamed('NTkbMap').bytes on startup
    kbMap: [
        255, 91, 255, 110, 104, 103, 114, 255, 25, 61, 32, 109, 56, 121, 116, 173,
        13, 46, 122, 106, 255, 9, 49, 255, 95, 59, 255, 98, 99, 102, 160, 29,
        39, 108, 120, 57, 115, 119, 51, 158, 93, 44, 111, 105, 97, 113, 50, 30,
        47, 45, 48, 117, 55, 54, 53, 8, 92, 112, 107, 118, 100, 101, 52, 29,
        255, 123, 255, 78, 72, 71, 82, 255, 25, 43, 32, 77, 42, 89, 84, 173,
        13, 62, 90, 74, 255, 9, 33, 255, 94, 58, 255, 66, 67, 70, 160, 29,
        34, 76, 88, 40, 83, 87, 35, 22, 125, 60, 79, 73, 65, 81, 90, 30,
        63, 21, 41, 85, 38, 126, 37, 8, 124, 80, 75, 86, 68, 69, 36, 255,
        255, 91, 255, 78, 72, 71, 82, 255, 25, 61, 32, 77, 56, 89, 84, 173,
        13, 46, 90, 74, 255, 9, 49, 255, 95, 59, 255, 66, 67, 70, 160, 29,
        39, 76, 88, 57, 83, 87, 51, 158, 93, 44, 79, 73, 65, 81, 90, 30,
        47, 45, 48, 85, 55, 54, 53, 8, 92, 80, 75, 86, 68, 69, 52, 255,
        255, 7, 255, 14, 179, 7, 18, 255, 25, 6, 32, 182, 180, 25, 6, 173,
        13, 18, 167, 165, 255, 9, 159, 255, 17, 3, 255, 166, 3, 6, 160, 29,
        15, 153, 151, 149, 19, 145, 143, 255, 23, 1, 15, 150, 1, 17, 167, 30,
        27, 137, 135, 21, 131, 129, 127, 8, 14, 138, 136, 134, 132, 130, 128, 255,
        255, 249, 255, 245, 243, 30, 239, 255, 25, 14, 32, 246, 244, 242, 240, 173,
        13, 233, 231, 229, 255, 9, 223, 255, 246, 3, 255, 230, 228, 226, 160, 24,
        219, 217, 215, 213, 211, 209, 207, 22, 220, 218, 226, 214, 212, 210, 231, 30,
        203, 201, 199, 197, 195, 193, 191, 8, 204, 202, 200, 198, 196, 194, 192, 192],

    // symbolic NT keycodes (it uses ASCII for 32-126)
    kbSymbolic: {
        tab: 9,
        cr: 13,
        // Dispframe>>kbd
        ctld: 132,
        ctlw: 145,
        ctlx: 151,
        // TextImage>>classInit, kbd
        bs: 8,
        ctlw: 145, // delete word?
        cut: 173,
        paste: 158,
        esc: 160,
        // TextImage>>checkLooks
        ctlb: 166, // bold
        ctli: 150, // italic
        ctlminus: 137,
        ctlx: 151, // reset emph
        ctlB: 230, // non-bold
        ctlI: 214, // non-italic
        ctlMinus: 201,
        ctlX: 215, // reset emph
        ctl0: 135, // font 0
        ctl1: 159, // font 1
        ctl2: 144, // font 2
        ctl3: 143, // font 3
        ctl4: 128, // font 4
        ctl5: 127, // font 5
        ctl6: 129, // font 6
        ctl7: 131, // font 7
        ctl8: 180, // font 8
        ctl9: 149, // font 9
        ctlShift0: 199, // font 10
        ctlShift1: 223, // font 11
        ctlShift2: 208, // font 12
        ctlShift3: 207, // font 13
        ctlShift4: 192, // font 14
        ctlShift5: 191, // font 15
        ctlt: 240, // toBravo
        ctlf: 226, // fromBravo
        // newly assigned
        smaller: 228,
        larger: 229,
        doit: 130,
        prompt: 167,
        again: 134,
        selectAll: 136,
        compile: 138,
        undo: 153,
        cancel: 165,
        left: 193,
        right: 194,
        up: 195,
        down: 196,
        pageUp: 197,
        pageDown: 198,
        home: 202,
        end: 203,
        search: 204,
    },

    // key bindings: html keydown code to NT symbolic
    kbCommands: {
        '.': "interrupt",
        'd': "doit",
        'p': "doit", // printit
        'D': "prompt",
        'j': "again",
        'a': "selectAll",
        's': "compile",
        'z': "undo",
        'l': "cancel",
        'f': "search",
        'b': "ctlb", // bold
        'i': "ctli", // italic
        'u': "ctlminus", // underline
        'x': "ctlx", // reset emph
        'B': "ctlB", // bold
        'I': "ctlI", // italic
        'U': "ctlMinus", // underline
        'X': "ctlX", // reset emph
        '0': "ctl0", // font change
        '1': "ctl1",
        '2': "ctl2",
        '3': "ctl3",
        '4': "ctl4",
        '5': "ctl5",
        '6': "ctl6",
        '7': "ctl7",
        '8': "ctl8",
        '9': "ctl9",
        '-': "smaller",
        '_': "smaller",
        '+': "larger",
        '=': "larger",
    },

    // key bindings: html keypress code to unicode
    // var 31 = 31;
    kbSpecial: {
        35: '↪', // #: Unique string
        64: '⌾', // @: make point
        94: '⇑', // ^: return
        95: '←', // _: assignment
        96: 'ⓢ', // `: 's operator
        1: '◦', // ^A: At
        3: '⦂', // ^C: open Colon
        4: 'ctld', // ^D
        5: '∢', // ^E: Eye
        6: '⇒', // ^F: iF
        7: '≥', // ^G: Greater or equal
        // 8: ^H = backspace
        // 9: ^I = tab
        12: '≤', // ^L: Lesser or equal
        // 13: ^M = return
        14: '≠', // ^N: Not equal
        17: '◻', // ^Q: sQuare
        19: 'ⓢ', // ^S: 's operator
        20: '≡', // ^T: Triple equal
        21: '↪', // ^U: Unique string
        22: '➲', // ^V: inVerse arrow
        23: 'ctlw', // ^W: delete word
        24: '▱', // ^X
        29: '◢',  // ^]: doit
        30: '↑', // ^^: single up arrow
        31: '¬', // ^_: unary minus
    },

    // encoding of notetaker glyphs as printable unicode chars
    toUnicode: {
        '\x00': "␀",
        '\x01': "≤",
        '\x02': "␂",
        '\x03': "⦂",
        '\x04': "␄",
        '\x05': "√",
        '\x06': "≡",
        '\x07': "◦",
        '\x08': "␈",
        //'\x09': "␉",    // keep TAB
        '\x0a': "␊",
        '\x0b': "␋",
        '\x0c': "␌",
        '\x0d': "\n",   // CR becomes LF
        '\x0e': "≠",
        '\x0f': "↪",
        '\x10': "␐",
        '\x11': "⇑",
        '\x12': "≥",
        '\x13': "ⓢ",
        '\x14': "◣",
        '\x15': "¬",
        '\x16': "∢",
        '\x17': "⌾",
        '\x18': "▱",
        '\x19': "➲",
        '\x1a': "␚",
        '\x1b': "⇒",
        '\x1c': "␜",
        '\x1d': "◻︎",
        '\x1e': "◢",
        '\x1f': "␟",
        '\x7f': "␡",
        '_'   : "←",
        '^'   : "↑",
    },
};

Object.subclass('St78.vm.ObjectTableReader',
'about', {
    about: function() {
/*
ot is the object table, a sequence of 4-byte entries, retrievable by this.otAt(oop), where oop is an object pointer with the bottom two bits = 0.  The entry encodes the data address, along with some other bits including a reference count that we can now ignore.  The method dataAddress(oop) will retrieve the address, also taking into account the "dataBias" which I won't explain.

data is the object data space, a sequence of 2-byte words, retrievable by this.fieldOfObject(i, oop), where oop is an object pointer with the bottom two bits = 0, and i is the instance field number, with 1 being the index of the first field.  An index of 0 would retrieve the class pointer of an object, but this must be masked by 0xFFC0 because the bottom 6 bits of the class word are used for the object's size in bytes.  The method classOfOop will do this for you.  This implies that all class oops have zero in the bottom 6 bits.  This worked out nicely for OOZE's zones, but we will drop all that and go to the Squeak object format or whatever Vanessa is using internally.  Note that if the size field is zero, then there is a word before the class with a 16-bit length.  The method lengthBitsAt decodes this for you.  It appears that the size field is the size in bytes, including the class(and size), so a string of length 1 has size=3, and a Point would have a size = 6.

The format of classes is (quoting from the system itself...
    title	"<String> for identification, printing"
    myinstvars "<String> partnames for compiling, printing"
    instsize "<Integer> for storage management"
    messagedict "<MessageDict> for communication, compiling"
    classvars "<Dictionary/nil> compiler checks here"
    superclass "<Class> for execution of inherited behavior"
    environment "<Vector of SymbolTables> for external refs"
    fieldtype
The instsize is an integer (ie low bit = 1) with the following interpretation:
    0x8000 - fields are pointers, else not
    0x4000 - fields are words, else bytes
    0x2000 - instances are variable length
    0x0FFE - instance size in words including class
    Thus Point has instsize = 0x8006 and Float has instsize = 04008 (nasty 3-word binary format)
*/
    },
},
'initialize', {
    initialize: function(objTable, objSpace, bias) {
        this.ot = objTable;
        this.data = objSpace;
        this.dataBias = bias;
    }
},
'reading', {
    readObjects: function() {
        // create js objects for the st78 objects in ot+data
        var oopMap = {};
        for (var oti = 0; oti < this.ot.length; oti += 4) {
            var oop = oti / 2;      // 1 more bit for our oops so we get up to 32 K objects
            if (this.refCountOf(oop)) {
                oopMap[oop] = new St78.vm.Object(oop);
            }
        }
        return oopMap;
    }
},
'object access', {
    otAt: function(oop) {
        // Return the OT entry for the oop
        // Decode two two-byte numbers into one 32-bit number
        var i = oop * 2,
            val = 0;
        val = this.ot[i+1];
        val = val*256 + this.ot[i];
        val = val*256 + this.ot[i+3];
        val = val*256 + this.ot[i+2];
        return val;
    },
    dataAddress: function(oop) {
        var entry = this.otAt(oop);
        return (entry&0xFFFF) * 16 + ((entry>>16)&0x1E) - this.dataBias;
    },
    fieldOfObject: function(i, oop) {
        // i = 1 for first field after class
    	var addr = this.dataAddress(oop);
    	var a = addr+(2*i);
    	return this.data[a+1]*256 + this.data[a];
    },
    classOfOop: function(oop) {
        return (this.fieldOfObject(0, oop) & 0xFFC0) / 2; // our oops are half the original
    },
    refCountOf: function (oop) {
        return this.otAt(oop) >>> 24;
    },
    isInteger: function(oop) {
        return oop & 1;
    },
    lengthBitsAtAddr: function(addr) {
    	var len = this.data[addr] & 0x3F;
    	if (len > 0) return len;
    	return this.data[addr-1] * 256 + this.data[addr-2];
    },
});

Object.subclass('St78.vm.Image',
'about', {
    about: function() {
    /*
    Object Format
    =============
    Each St78 object is a St78.vm.Object, only SmallIntegers are JS numbers.
    Instance variables/fields reference other objects directly via the "pointers" property.
    {
        stClass: reference to class object
        pointers: (optional) Array referencing inst vars + indexable fields
        words: (optional) Array of numbers (words)
        bytes: (optional) Array of numbers (bytes)
        float: (optional) float value if this is a Float object
        isNil: (optional) true if this is the nil object
        isTrue: (optional) true if this is the true object
        isFalse: (optional) true if this is the false object
        isFloat: (optional) true if this is a Float object
        oop: unique integer (16 bits, lsb is 0, in classes 5 lower bits are 0)
        mark: boolean (used only during GC, otherwise false)
        nextObject: linked list of objects in old space (new space objects do not have this yet)
    }

    Object Table
    ============
    Unlike the original Notetaker implementation, there is no object table.

    Objects use direct references. We have immediate untagged ints (+/-16K).
    The snapshot image format uses 16 bit words for oops (even) and tags the ints (odd).

    If there are more than 32K objects, and NT.largeOops is true, we us snapshot image format 2.0
    with 32 bit words for oops. SmallIntegers are still only +/-16K but stored as 32 bit words.
    */
    }
},
'initializing', {
    initialize: function(oopMap, process, display, name, convertTaggedInts, largeOops) {
        this.name = name;
        this.largeOops = largeOops || 0;
        this.maxTenuresBeforeGC = 1000;
        this.tenuresSinceLastGC = 0;
        this.gcCount = 0;
        this.newSpaceCount = 0;
        this.oldSpaceCount = 0;
        this.oldSpaceBytes = 0;
        this.nextTempOop = -2;      // new objects get negative preliminary oops
        this.freeOops = [];         // pool for real oops
        this.freeClassOops = [];    // pool for real class oops (lower bits 0)
        // link all objects into oldspace
        var prevObj,
            large = !!this.largeOops,
            maxOop = Math.max(this.largeOops, 0xFFFE);
        for (var oop = 0; oop <= maxOop; oop += 2)
            if (oopMap[oop]) {
                this.oldSpaceCount++;
                this.oldSpaceBytes += oopMap[oop].totalBytes(large);
                if (prevObj) prevObj.nextObject = oopMap[oop];
                prevObj = oopMap[oop];
            } else if (oop < 0x10000) {
                (oop & NT.OOP_MASK ? this.freeOops : this.freeClassOops).push(oop);
            }
        this.firstOldObject = oopMap[0];
        this.lastOldObject = prevObj;
        this.userProcess = process;
        this.userDisplay = display;
        this.initKnownObjects(oopMap);
        this.initCompiledMethods(oopMap, convertTaggedInts);
        console.log("Loaded image " + this.name);
    },

    initKnownObjects: function(oopMap) {
        oopMap[NT.OOP_NIL].isNil = true;
        oopMap[NT.OOP_TRUE].isTrue = true;
        oopMap[NT.OOP_FALSE].isFalse = true;
        this.globals = oopMap[NT.OOP_SMALLTALK];
        this.specialOopsVector = this.globalNamed('SpecialOops');
    },
    initCompiledMethods: function(oopMap, convertTaggedInts) {
        // make proper pointer objects for literals encoded in bytes
        var cmClass = this.objectFromOop(NT.OOP_CLCOMPILEDMETHOD, oopMap),
            cm = this.someInstanceOf(cmClass);
        while (cm) {
            cm.methodInitLits(this, oopMap, convertTaggedInts);
            cm = this.nextInstanceAfter(cm);
        }
    },
    globalRefNamed: function(name) {
        var ref = this.globals.symbolTableRefNamed(name);
        if (!ref) {
            // try other symbol tables
            var tableClass = this.globals.stClass,
                table = this.firstOldObject;
            while ((table = table.nextObject) && !ref) {
                if (table.stClass !== tableClass) continue;
                if (table !== this.globals)
                    ref = table.symbolTableRefNamed(name);
            }
        }
        return ref;
    },
    selectorNamed: function(name) {
        var symbolClass = this.objectFromOop(NT.OOP_CLUNIQUESTRING),
            symbol = this.someInstanceOf(symbolClass);
        while (symbol) {
            if (name.length === symbol.bytes.length && name === symbol.bytesAsUnicode())
                return symbol;
            symbol = this.nextInstanceAfter(symbol);
        }
    },
    globalNamed: function(name) {
        return this.globalRefNamed(name).pointers[NT.PI_OBJECTREFERENCE_VALUE];
    },
    smallifyLargeInts: function() {
        // visit every pointer field of every object, converting smallable LargeInts to Integers
        // We do this because the normal ST-76 range is +-32K
        var lgIntClass = this.objectFromOop(NT.OOP_CLLARGEINTEGER),
            obj = this.firstOldObject;
        while (obj) {
            var body = obj.pointers;
            if (body) {
                for (var i=0; i<body.length; i++) {
                    if (body[i].stClass === lgIntClass) {
                        var value = body[i].largeIntegerValue();
                        if (value <= 32767 && value >= -32768) body[i] = value
                    }
                }
            }
            obj = obj.nextObject;
        }
    },
},
'garbage collection', {

    fullGC: function() {
        // Old space is a linked list of objects - each object has an "nextObject" reference.
        // New space objects do not have that pointer, they are garbage-collected by JavaScript.
        // But they have an allocation id so the survivors can be ordered on tenure.
        // The "nextObject" references are created by collecting all new objects,
        // and then linking them into old space.
        // Note: after an old object is released, its "nextObject" ref must still allow traversal
        // of all remaining objects. This is so enumeration works despite GC.

        var newObjects = this.markReachableObjects();
        var removedObjects = this.removeUnmarkedOldObjects();
        if (this.largeOops) this.compactLargeOops(); // possibly sets largeOops to false
        this.appendToOldObjects(newObjects);
        if (this.largeOops) this.updateOldSpaceBytes();
        /*
        this.spaceReport(newObjects, removedObjects, function(line){console.log(line)});
        console.log(Strings.format("GC: %s allocations, %s unchecked tenures, %s released, %s tenured, now %s total (%s bytes)",
            this.newSpaceCount, this.tenuresSinceLastGC, removedObjects.length, newObjects.length, this.oldSpaceCount, this.oldSpaceBytes));
        */
        this.tenuresSinceLastGC = 0;
        this.newSpaceCount = 0;
        this.nextTempOop = -2;
        this.gcCount++;
        return this.availableOops();
    },
    allocateOopFor: function(anObj) {
        // get an oop from the pool of unused oops
        var isClass = anObj.isClass(),
            pool = isClass ? this.freeClassOops : this.freeOops;
        if (pool.length > 0) {
            return anObj.oop = pool.pop();
        }
        // support for more than 32 K objects
        if (!this.largeOops && NT.largeOops) {
            this.largeOops = 0xFFFE;   // so first large oop is 0x10000
            console.log("Too many oops - switching from 16 to 32 bits");
        }
        if (this.largeOops >= 0xFFFE && this.largeOops <= 0xFFFFFFF0) {
            return anObj.oop = this.largeOops += 2;
        }

        this.vm.primHandler.filePut('spacereport.txt', this.spaceReport());
        throw isClass ? "too many classes" : "too many objects";
    },
    freeOopFor: function(anObj) {
        if (anObj.oop > 0) {
            if (anObj.oop < 0x10000) {
                (anObj.oop & NT.OOP_MASK ? this.freeOops : this.freeClassOops).push(anObj.oop);
            }
            anObj.oop = null;
        } else throw "attempt to free invalid oop";
    },
    markReachableObjects: function() {
        // Visit all reachable objects and mark them.
        // Return surviving new objects
        if (this.vm) {
            this.userProcess = this.vm.activeProcess;
            this.userDisplay = this.vm.primHandler.displayBlt;
        }
        var todo = [this.globals, this.userProcess];
        if (this.userDisplay) // stored in image header so must be retained
            todo.push(this.userDisplay);
        var newObjects = [];
        while (todo.length > 0) {
            var object = todo.pop();
            if (object.mark) continue;    // objects are added to todo more than once
            if (object.oop < 0)           // it's a new object
                newObjects.push(object);
            object.mark = true;           // mark it
            if (!object.stClass.mark)     // trace class if not marked
                todo.push(object.stClass);
            var body = object.pointers;
            if (body)                     // trace all unmarked pointers
                for (var i = 0; i < body.length; i++)
                    if (typeof body[i] === "object" && !body[i].mark)      // except SmallInts
                        todo.push(body[i]);
        }
        return newObjects;
    },
    removeUnmarkedOldObjects: function() {
        // Unlink unmarked old objects from the nextObject linked list
        // Reset marks of remaining objects
        // Set this.lastOldObject to last old object
        // Return removed old objects
        var removed = [];
        var obj = this.firstOldObject;
        while (true) {
            var next = obj.nextObject;
            if (!next) {// we're done
                this.lastOldObject = obj;
                return removed;
            }
            // if marked, continue with next object
            if (next.mark) {
                next.mark = false;     // unmark for next GC
                obj = next;
            } else { // otherwise, remove it
                var corpse = next;
                obj.nextObject = corpse.nextObject; // drop from list
                this.oldSpaceCount--;
                this.oldSpaceBytes -= corpse.totalBytes(!!this.largeOops);
                this.freeOopFor(corpse);
                removed.push(corpse);
            }
        }
    },
    appendToOldObjects: function(newObjects) {
        // append new objects to linked list of old objects
        // and unmark them. Also, assign a real oop.
        // Note: also called outside GC to quickly tenure an object
        var oldObj = this.lastOldObject;
        for (var i = 0; i < newObjects.length; i++) {
            var newObj = newObjects[i];
            if (newObj.oop >= 0) {debugger; throw "attempt to tenure old object"}
            newObj.mark = false;
            this.allocateOopFor(newObj);
            oldObj.nextObject = newObj;
            oldObj = newObj;
            this.oldSpaceCount++;
            this.oldSpaceBytes += newObj.totalBytes(!!this.largeOops);
        }
        this.lastOldObject = oldObj;
    },
    compactLargeOops: function() {
        if (this.freeOops.length > 0) {
            // if we have free small oops, maybe we can fall back to 16 bits
            return this.compactLargeOopsToSmall();
        }
        // otherwise just reassign oops in sequence
        var nextOop = 0xFFFE;  // so the first large oop is 0x10000
        var obj = this.firstOldObject;
        while (obj) {
            if (obj.oop >= 0x10000) obj.oop = nextOop += 2;
            obj = obj.nextObject;
        }
        this.largeOops = nextOop;
    },
    compactLargeOopsToSmall: function() {
        // we had some free small oops, use those first, then large ones
        this.largeOops = 0xFFFE; // so the first large oop is 0x10000
        var obj = this.firstOldObject;
        while (obj) {
            if (obj.oop >= 0x10000) obj.oop = this.allocateOopFor(obj);
            obj = obj.nextObject;
        }
        // if we did not use any large oops, switch back to 16 bits
        if (this.largeOops === 0xFFFE) {
            this.largeOops = 0;
            this.updateOldSpaceBytes();
            console.log("Freed oops - switching from 32 to 16 bits");
        }
    },
    updateOldSpaceBytes: function() {
        // with large oops, object size can change depending on the oops it holds
        var large = !!this.largeOops,
            obj = this.firstOldObject,
            bytes = 0;
        while (obj) {
            bytes += obj.totalBytes(large);
            obj = obj.nextObject;
        }
        this.oldSpaceBytes = bytes;
    },
},
'creating', {
    tempOop: function() {
        // new objects get a temporary oop
        this.newSpaceCount++;
        return this.nextTempOop -= 2;
    },
    instantiateClass: function(aClass, indexableSize, nilObj) {
        var newObject = new St78.vm.Object(this.tempOop());
        newObject.initInstanceOf(aClass, indexableSize, nilObj);
        return newObject;
    },
},
'operations', {
    bulkBecome: function(fromArray, toArray, twoWay) {
        var n = fromArray.length;
        if (n !== toArray.length)
            return false;
        var mutations = {};
        for (var i = 0; i < n; i++) {
            var obj = fromArray[i];
            if (!obj.stClass) return false;  //non-objects in from array
            if (mutations[obj.oop]) return false; //repeated oops in from array
            else mutations[obj.oop] = toArray[i];
        }
        if (twoWay) for (var i = 0; i < n; i++) {
            var obj = toArray[i];
            if (!obj.stClass) return false;  //non-objects in to array
            if (mutations[obj.oop]) return false; //repeated oops in to array
            else mutations[obj.oop] = fromArray[i];
        }
        // ensure new objects have nextObject pointers
        if (this.newSpaceCount > 0)
            this.fullGC();
        // Now, for every object...
        var obj = this.firstOldObject;
        while (obj) {
            // mutate the class
            var mut = mutations[obj.stClass.oop];
            if (mut) obj.stClass = mut;
            // and mutate body pointers
            var body = obj.pointers;
            if (body) for (var j = 0; j < body.length; j++) {
                mut = mutations[body[j].oop];
                if (mut) body[j] = mut;
            }
            obj = obj.nextObject;
        }
        // finally, swap the oops so they stay with the pointer, not the object
        for (var i = 0; i < n; i++) {
            var temp = fromArray[i].oop;
            fromArray[i].oop = toArray[i].oop;
            toArray[i].oop = temp;
        }
        this.vm.flushMethodCacheAfterBecome(mutations);
        return true;
    },
    diffFrom: function(base) {
        // assumes both images have ordered oops
        // which is the case right after loading them
        var thisObj = this.firstOldObject,
            baseObj = base.firstOldObject,
            delta = [];
        while (thisObj) {
            if (!thisObj.sameAs(baseObj)) {
                if (!baseObj || thisObj.oop <= baseObj.oop) {
                    // after end of base, or modified, or new
                    delta.push(thisObj);
                    if (baseObj && thisObj.oop < baseObj.oop) {
                        thisObj = thisObj.nextObject;
                        continue;
                    }
                } else { // baseObj.oop < thisObj.oop
                    baseObj = baseObj.nextObject;
                    continue;
                }
            }
            // same oops, or after end of base image
            if (baseObj) baseObj = baseObj.nextObject;
            thisObj = thisObj.nextObject;
        }
        return delta;
    },
    writeDiffToBuffer: function(baseImage) {
        // write only objects in this image that are not in baseImage
        // assumes both images are freshly loaded, not run
        if (this.largeOops) throw new Error("32 bit image deltas not supported");
        var delta = this.diffFrom(baseImage),
            deltaBytes = 0;
        for (var i = 0; i < delta.length; i++)
            deltaBytes += delta[i].totalBytes(false);
        var magic = 'Sd78',
            version = 0x0100, // 1.0
            headerSize = 18,
            data = new DataView(new ArrayBuffer(headerSize + deltaBytes)),
            pos = 0;
        // magic bytes
        for (var i = 0; i < 4; i++)
            data.setUint8(pos++, magic.charCodeAt(i));
        // version
        data.setUint16(pos, version); pos += 2;
        // header size
        data.setUint16(pos, headerSize); pos += 2;
        // delta size
        data.setUint16(pos, delta.length); pos += 2;
        data.setUint32(pos, deltaBytes); pos += 4;
        // current process and display
        data.setUint16(pos, this.userProcess.oop); pos += 2;
        data.setUint16(pos, this.userDisplay.oop); pos += 2;
        if (pos !== headerSize) throw "wrong header size";
        // objects
        for (var i = 0; i < delta.length; i++)
            pos = delta[i].writeTo(data, pos, this);
        if (pos !== headerSize + deltaBytes) throw "wrong image size";
        return data.buffer;
    },
    writeToBuffer: function() {
        this.fullGC(); // collect all objects
        if (this.largeOops) return this.writeToBufferLarge();
        var magic = 'St78',
            version = 0x0100, // 1.0: 16 bit oops
            headerSize = 18,
            data = new DataView(new ArrayBuffer(headerSize + this.oldSpaceBytes)),
            pos = 0;
        // magic bytes
        for (var i = 0; i < 4; i++)
            data.setUint8(pos++, magic.charCodeAt(i));
        // version
        data.setUint16(pos, version); pos += 2;
        // header size
        data.setUint16(pos, headerSize); pos += 2;
        // image size
        data.setUint16(pos, this.oldSpaceCount); pos += 2;
        data.setUint32(pos, this.oldSpaceBytes); pos += 4;
        // current process and display
        data.setUint16(pos, this.vm.activeProcess.oop); pos += 2;
        data.setUint16(pos,this.vm.primHandler.displayBlt.oop); pos += 2;
        if (pos !== headerSize) throw "wrong header size";
        // objects
        var obj = this.firstOldObject,
            n = 0;
        while (obj) {
            pos = obj.writeTo(data, pos, this);
            obj = obj.nextObject;
            n++;
        }
        if (pos !== headerSize + this.oldSpaceBytes) throw "wrong image size";
        if (n !== this.oldSpaceCount) throw "wrong object count";
        return data.buffer;
    },
    writeToBufferLarge: function() {
        // this.fullGC(); // happened already
        var magic = 'St78',
            version = 0x0200, // 2.0: 32 bit oops
            headerSize = 28,
            data = new DataView(new ArrayBuffer(headerSize + this.oldSpaceBytes)),
            pos = 0;
        // magic bytes
        for (var i = 0; i < 4; i++)
            data.setUint8(pos++, magic.charCodeAt(i));
        // version
        data.setUint16(pos, version); pos += 2;
        // header size
        data.setUint16(pos, headerSize); pos += 2;
        // image size
        data.setUint32(pos, this.oldSpaceCount); pos += 4;
        data.setUint32(pos, this.oldSpaceBytes); pos += 4;
        data.setUint32(pos, this.largeOops); pos += 4;
        // current process and display
        data.setUint32(pos, this.vm.activeProcess.oop); pos += 4;
        data.setUint32(pos,this.vm.primHandler.displayBlt.oop); pos += 4;
        if (pos !== headerSize) throw "wrong header size";
        // objects
        var obj = this.firstOldObject,
            n = 0;
        while (obj) {
            pos = obj.writeToLarge(data, pos, this);
            obj = obj.nextObject;
            n++;
        }
        if (pos !== headerSize + this.oldSpaceBytes) throw "wrong image size";
        if (n !== this.oldSpaceCount) throw "wrong object count";
        return data.buffer;
    },
    objectFromOop: function(oop, optionalOopMap) {
        if (oop & 1) {
            var val = oop >> 1;
            return (val & 0x3FFF) - (val & 0x4000);
        }
        if (optionalOopMap) return optionalOopMap[oop]; // only available at startup

        // find the object with the given oop - looks only in oldSpace for now!
        var obj = this.firstOldObject;
        do {
            if (oop === obj.oop) return obj;
            obj = obj.nextObject;
        } while (obj);

        debugger;
        throw "oop not found";
    },
    objectToOop: function(anObject) {
        // newly created objects have a temporary oop, so assign a real one
        if (typeof anObject === "number")
            return (anObject * 2 + 0x10001) & 0xFFFF; // add tag bit, make unsigned
        if (anObject.oop < 0) { // it's a temp oop
            if (this.tenuresSinceLastGC++ > this.maxTenuresBeforeGC) {
                console.log("Forcing GC after " + this.maxTenuresBeforeGC + " unchecked tenures");
                this.fullGC();    // force a GC since we tenured many objects already
                if (!(anObject.oop > 0))
                    throw "attempt to tenure unreachable object";
            } else {
                this.appendToOldObjects([anObject]); // just tenure the object
                console.log("Tenuring " + anObject.stInstName(32));
            }
        }
        return anObject.oop;
    },
    someInstanceOf: function(clsObj) {
        var obj = this.firstOldObject;
        while (true) {
            if (obj.stClass === clsObj)
                return obj;
            if (!obj.nextObject) {
                // this was the last old object, tenure new objects and try again
                if (this.newSpaceCount > 0) this.fullGC();
                // if this really was the last object, we're done
                if (!obj.nextObject) return null;
            }
            obj = obj.nextObject;
        }
    },
    nextInstanceAfter: function(obj) {
        var clsObj = obj.stClass;
        while (true) {
            if (!obj.nextObject) {
                // this was the last old object, tenure new objects and try again
                if (this.newSpaceCount > 0) this.fullGC();
                // if this really was the last object, we're done
                if (!obj.nextObject) return null;
            }
            obj = obj.nextObject;
            if (obj.stClass === clsObj)
                return obj;
        }
    },
    referencesTo: function(obj) {
        if (this.newSpaceCount > 0) this.fullGC();
        var references = [],
            ref = this.firstOldObject;
        while (ref) {
            if (ref.stClass === obj || (ref.pointers && ref.pointers.include(obj)))
                references.push(ref);
            ref = ref.nextObject;
        };
        return references;
    },
    allObjects: function(matchFunc) {
        var obj = this.firstOldObject,
            objects = [];
        while (obj) {
            if (!matchFunc || matchFunc(obj))
                objects.push(obj);
            obj = obj.nextObject;
        };
        return objects;
    },
    allInstancesOf: function(clsObj) {
        if (typeof clsObj === "string")
            clsObj = this.globalNamed(clsObj);
        if (this.newSpaceCount > 0) this.fullGC();
        var inst = this.someInstanceOf(clsObj),
            instances = [];
        while (inst) {
            instances.push(inst);
            inst = this.nextInstanceAfter(inst);
        };
        return instances;
    },
    availableOops: function() {
        return this.largeOops
            ? (0xFFFFFFF0 - this.largeOops) / 2
            : this.freeOops.length;
    },
},
'debugging',
{
    variableClasses: function() {
        // enumerate classes to find all classes flagged as indexable in their instSize
        // this.variableClasses()
        var clClass = this.objectFromOop(NT.OOP_CLCLASS),
            cl = this.someInstanceOf(clClass),
            result = [];
        while (cl) {
            if ((cl.pointers[NT.PI_CLASS_INSTSIZE] & NT.FMT_ISVARIABLE) > 0) result.push(cl);
            cl = this.nextInstanceAfter(cl);
        };
        return result
    },
    spaceReport: function(objects, removedObjects, foreach) {
        var classes = [],
            byClass = {},
            sign = 1;
        [objects || this.allObjects(), removedObjects||[]].forEach(function(objs) {
            objs.forEach(function(obj) {
                var cls = obj.stClass,
                    space = sign * obj.totalBytes(!!this.largeOops);
                if (!byClass[cls.oop]) {
                    byClass[cls.oop] = {count: 0, space: 0, max: space}
                    classes.push(cls);
                }
                byClass[cls.oop].count += sign;
                byClass[cls.oop].space += space;
                byClass[cls.oop].max = Math.max(space, byClass[cls.oop].max);
            })
            sign = -1;
        });
        classes = classes.sort(function(a,b){return byClass[b.oop].space - byClass[a.oop].space});
        var report = "",
            totalCount = 0,
            totalSpace = 0;
        for (var i = 0; i < classes.length; i++) {
            var cls = classes[i],
                name = cls.className(),
                count = byClass[cls.oop].count,
                space = byClass[cls.oop].space,
                line = Strings.format("%s%s %s%s, %s bytes",
                    count>0 && removedObjects ? '+' : '', count, name, count === 1 ? '' : name.slice(-1) === 's' ? 'es' : 's', space);
            if (!removedObjects) {
                var max = byClass[cls.oop].max,
                    avg = space / count | 0;
                if (max === avg) line += Strings.format(" (each %s bytes)", max);
                else line += Strings.format(" (avg %s bytes, max %s bytes)", avg, max);
            }
            if (count || space)
                if (foreach) foreach(line);
                else report += line + "\n";
            totalCount += count;
            totalSpace += space;
        }
        if (!removedObjects) report += 'Total: ' + totalCount + ' objects, ' + totalSpace + ' bytes';
        return report;
    },
    printPathTo: function(goal) {
        // print path from root to goal including which slot is the reference
        var path = this.pathTo(goal),
            result = 'root: ' + path[0].stInstName();
        for (var i = 2; i < path.length; i++) {
            var index = path[i-1].pointers.indexOf(path[i]),
                slot = path[i-1].slotNameAt(index + 1);
            result += Strings.format("\n%s: %s", slot, path[i].stInstName());
        }
        return result;
    },
    pathTo: function(goal) {
        // Answer a path from root to goal object
        // based on Hans-Martin Mosner's pointer finder
        var parents = {},
            todo = [],
            follow = function(parent, child) {
                if (child === goal) {parents[child.oop] = parent; return true;}
                if (child.pointers && !(child.oop in parents)) {parents[child.oop] = parent; todo.push(child);}
                return false;
            },
            found = function(obj) {
                if (follow(obj, obj.stClass)) return true;
                for (var i = 0; i < obj.pointers.length; i++)
                    if (follow(obj, obj.pointers[i])) return true;
                return false;
            };
        // breadth-first search from root to object, recording parent pointers
        parents[this.globals.oop] = 'root';
        var obj, objs = [this.globals];
        do {
            while ((obj = objs.shift()) && !found(obj));
            objs = todo; todo = [];
        } while (objs.length);
        // build path
        var path = [];
        obj = goal; do {path.unshift(obj); obj = parents[obj.oop]} while (obj);
        return path.slice(1);
    },
    labelObjRefs: function() {
        // label object refs with their keys in all symbol tables
        var tableClass = this.globalNamed('SymbolTable'),
            table = this.someInstanceOf(tableClass);
        while (table) {
            table.symbolTableLabelObjRefs();
            table = this.nextInstanceAfter(table);
        }
    },
});

Object.extend(St78.vm.Image, {
    readFromObjectTable: function(objectTable, objectSpace, name) {
        // reads the original object table and object space files
        // as found on the Notetaker disk pack, converting objects
        // to our format (e.g. creating IEEE floats from the
        // Notetaker's 48 bit floats)
        var reader = new St78.vm.ObjectTableReader(objectTable, objectSpace, 0xC000),
            oopMap = reader.readObjects(),
            process = oopMap[NT.OOP_THEPROCESS], // bootstrap process
            display = null, // indicates to run St78.vm.Interpreter.notetakerPatches
            convertTaggedInts = true,
            largeOops = 0;
        for (var oop in oopMap)
            oopMap[oop].initFromObjectTable(reader, oopMap);
        var image = new this(oopMap, process, display, name, convertTaggedInts, largeOops);
        return image;
    },
    readFromBuffer: function(buffer, name) {
        // reads a "modern" image created by writeToBuffer()
        var result = this.readBuffer(buffer, 'St78'),
            oopMap = result.oopMap,
            process = oopMap[result.processOop], // active process
            display = oopMap[result.displayOop],
            convertTaggedInts = false,
            largeOops = result.largeOops;
        for (var oop in oopMap)
            oopMap[oop].initFromImage(oopMap);
        var image = new this(oopMap, process, display, name, convertTaggedInts, largeOops);
        return image;
    },
    withDeltaFromBuffer: function(baseImage, buffer, name) {
        // reads an image created by writeDiffToBuffer()
        debugger;
        var delta = this.readBuffer(buffer, 'Sd78'),
            oopMap = {},
            obj = baseImage.firstOldObject;
        // get all objects from base image into oopMap
        while (obj) {
            oopMap[obj.oop] = obj;
            obj = obj.nextObject;
        }
        // add objects from delta to oopMap
        var modifiedObjects = {};
        for (var oop in delta.oopMap) {
            if (oopMap[oop])
                modifiedObjects[oop] = delta.oopMap[oop];
            oopMap[oop] = delta.oopMap[oop];
        }
        // init objects from delta
        for (var oop in delta.oopMap)
            delta.oopMap[oop].initFromImage(oopMap);
        // redirect old pointers to modified objects
        for (var oop in oopMap) {
            var obj = oopMap[oop];
            // mutate the class
            var mut = modifiedObjects[obj.stClass.oop];
            if (mut)
                obj.stClass = mut;
            // and mutate body pointers
            var body = obj.pointers;
            if (body) for (var j = 0; j < body.length; j++) {
                mut = modifiedObjects[body[j].oop];
                if (mut)
                    body[j] = mut;
            }
        }
        // make new image from oopMap
        var image = new this(oopMap, name);
        image.userProcess = oopMap[delta.processOop];
        image.userDisplay = oopMap[delta.displayOop];
        return image;
    },
    readBuffer: function(buffer, magic) {
        // reads objects created by writeToBuffer() or writeDiffToBuffer()
        var data = new DataView(buffer),
            pos = 0,
            reader = {
                nextUint8: function(){return data.getUint8(pos++)},
                nextUint16: function(){pos += 2; return data.getUint16(pos-2)},
                nextUint32: function(){pos += 4; return data.getUint32(pos-4)},
                nextBytes: function(n){pos += n; return new DataView(data.buffer, pos - n, n)},
            },
            onePointOh = 0x0100,
            twoPointOh = 0x0200;
        for (var i = 0; i < 4; i++)
            if (reader.nextUint8() !== magic.charCodeAt(i)) throw "magic number not found";
        var version = reader.nextUint16(),
            headerSize = reader.nextUint16(),
            objectCount, imageSize, largeOops, processOop, displayOop;
        if (version === onePointOh) {
            objectCount = reader.nextUint16();
            imageSize = reader.nextUint32();
            largeOops = 0;
            processOop = reader.nextUint16();
            displayOop = reader.nextUint16();
        } else if (version === twoPointOh) {
            objectCount = reader.nextUint32();
            imageSize = reader.nextUint32();
            largeOops = reader.nextUint32();
            processOop = reader.nextUint32();
            displayOop = reader.nextUint32();
        } else throw "cannot read version " + version.toString(16);
        if (pos !== headerSize) throw "header mismatch";
        var oopMap = {},
            wordSize = largeOops ? 4 : 2;
        for (var i = 0; i < objectCount; i++) {
            var obj = St78.vm.Object.readFromBuffer(reader);
            oopMap[obj.oop] = obj;
            while (pos % wordSize) pos++; // align to next word
        }
        if (pos !== headerSize + imageSize) throw "size mismatch";
        return {oopMap: oopMap, processOop: processOop, displayOop: displayOop, largeOops: largeOops};
    },
    saveBufferAs: function(buffer, imageName, thenDo, elseDo) {
        window.localStorage['notetakerImageName'] = imageName;
        console.log("Saving image as " + imageName);
        // if we have filesystem storage we can save as binary blob ...
        if (navigator.webkitPersistentStorage) {
            var showError = function(msg) {
                alert("Saving failed: " + msg);
                if (elseDo) elseDo(msg);
                else $world.inform("Saving failed: " + msg);
            };
            navigator.webkitPersistentStorage.requestQuota(100*1024*1024, function(grantedBytes) {
                window.webkitRequestFileSystem(PERSISTENT, grantedBytes, function(fs) {
                    fs.root.getFile(imageName, {create: true}, function(fileEntry) {
                        fileEntry.createWriter(function(fileWriter) {
                            var success = true;
                            fileWriter.onwriteend = function(e) {
                                if (success) {
                                    alertOK("Saved " + fileEntry.toURL());
                                    if (thenDo) thenDo();
                                }
                            };
                            fileWriter.onerror = function(e) {success = false; showError(e.target.error.name + ': ' + e.target.error.message)};
                            fileWriter.write(new Blob([buffer]));
                        }, function(e){showError("Cannot create file writer " + e.message)});
                    }, function(e){showError("Cannot create file entry " + e.message)});
                }, function(e){showError("Cannot create file system " + e.message)});
            }, function(e){showError("Quota request denied " + e.message)});
        } else {
            // otherwise we have to use local storage ...
            var words = new Uint16Array(buffer),    // JS Strings are UTF16
                chars = [];
            for (var i = 0; i < words.length; i++)
                chars.push(String.fromCharCode(words[i]));
            try {
                window.localStorage['notetakerImage:' + imageName] = chars.join('');
                alertOK("Saved localstorage:" + imageName);
                if (thenDo) thenDo();
            } catch (e) {
                alert("Saving failed: " + e.msg);
                if (elseDo) elseDo(e.msg);
            }
        }
    },
});

Object.subclass('St78.vm.Object',
'initialization', {
    initialize: function(oop) {
        this.oop = oop;
    },
    initFromImage: function(oopMap) {
        // modern image format
        var stClass = this.objectFromOop(this.data.classOop, oopMap),
            instSpec = stClass.classInstSpec(),
            body = this.data.body,
            bodyBytes = this.data.byteSize,
            large = 'hash' in this.data,
            oopSize = large ? 4 : 2;
        this.stClass = stClass;
        if (bodyBytes) {
            if (instSpec & NT.FMT_HASPOINTERS) { // pointers
                this.pointers = [];
                for (var i = 0; i < bodyBytes; i+=oopSize) {
                    var oop = large ? body.getUint32(i) : body.getUint16(i);
                    var obj = this.objectFromOop(oop, oopMap);
                    this.pointers.push(obj);
                }
            } else if (instSpec & NT.FMT_HASWORDS) { // words
                if (this.data.classOop === NT.OOP_CLFLOAT) {
                    this.isFloat = true;
                    this.float = body.getFloat64(0);
                } else {
                    this.words = [];
                    for (var i = 0; i < bodyBytes; i+=2) {
                        var word = body.getUint16(i);
                        this.words.push(word);
                    }
                }
            } else if (large && this.isCompiledMethod()) {
                this.bytes = [body.getUint8(0), body.getUint8(1)];
                var numLits = this.methodNumLits(),
                    litStart = bodyBytes - 4 * numLits;
                for (var i = 2; i < litStart; i++) {
                    var byte = body.getUint8(i);
                    this.bytes.push(byte);
                }
                if (numLits) {
                    this.pointers = [];
                    // align to next word
                    while (litStart % 4) litStart++;
                    for (var i = litStart; i < bodyBytes; i += oopSize) {
                        var oop = body.getUint32(i);
                        var obj = this.objectFromOop(oop, oopMap);
                        this.pointers.push(obj);
                    }
                }
            } else { // bytes
                this.bytes = [];
                for (var i = 0; i < bodyBytes; i++) {
                    var byte = body.getUint8(i);
                    this.bytes.push(byte);
                }
            }
        }
        if (this.data.hash > 0) this.hash = this.data.hash; // 0 hash means never assigned
        delete this.data;
    },
    initFromObjectTable: function(reader, oopMap) {
        // original Notetaker format
        var entry = reader.otAt(this.oop);
        var addr = reader.dataAddress(this.oop);
        var classOop = reader.classOfOop(this.oop);
        this.stClass = oopMap[classOop];
        var instSize = reader.fieldOfObject(3, classOop) >> 1;
        var objBytes = instSize & NT.FMT_ISVARIABLE
            ? reader.lengthBitsAtAddr(addr) : instSize & NT.FMT_BYTELENGTH;
        if (objBytes <= 2) return; // only class
        if (instSize & NT.FMT_HASPOINTERS) { // pointers
            this.pointers = [];
            for (var i = 1; i < objBytes/2; i++) {
                var oop = reader.fieldOfObject(i, this.oop);
                if (!(oop&1)) oop /= 2; // our oops are half the original
                var obj = this.objectFromOop(oop, oopMap);
                this.pointers.push(obj);
            }
        } else if (instSize & NT.FMT_HASWORDS) { // words
            this.words = [];
            for (var i = 1; i < objBytes/2; i++) {
                var word = reader.fieldOfObject(i, this.oop);
                this.words.push(word);
            }
            if (classOop === NT.OOP_CLFLOAT) {
                this.isFloat = true;
                this.float = this.wordsAsFloat();
            }
        } else { // bytes
            this.bytes = [];
            for (var i = 2; i < objBytes; i++) {
                var byte = reader.data[addr + i];
                this.bytes.push(byte);
            }
        }
    },
    initInstanceOf: function(aClass, indexableSize, nilObj) {
        this.stClass = aClass;
        var instSpec = aClass.pointers[NT.PI_CLASS_INSTSIZE];
        if (instSpec & NT.FMT_HASPOINTERS) {
            var instSize = ((instSpec & NT.FMT_BYTELENGTH) >> 1) - 1; // words, sans header
            if (instSize + indexableSize > 0)
                this.pointers = this.fillArray(instSize + indexableSize, nilObj);
        } else
            if (indexableSize > 0)
                if (instSpec & NT.FMT_HASWORDS)
                    this.words = this.fillArray(indexableSize, 0); //Floats require further init of float value
                else
                    this.bytes = this.fillArray(indexableSize, 0); //Methods require further init of pointers
    },
    objectFromOop: function(oop, oopMap) {
        if (oop & 1) {
            var val = oop >> 1;
            return (val & 0x3FFF) - (val & 0x4000);
        }
        if (!oopMap[oop]) throw "oop not found";
        return oopMap[oop];
    },
    fillArray: function(length, filler) {
        for (var array = [], i = 0; i < length; i++)
            array[i] = filler;
        return array;
    },
},
'accessing', {
    pointersSize: function() {
    	return this.pointers ? this.pointers.length : 0;
    },
    bytesSize: function() {
        return this.bytes ? this.bytes.length : 0;
    },
    wordsSize: function() {
        return this.words ? this.words.length : 0;
    },
    bytesAsRawString: function() {
        if (!this.bytes) return '';
        var bytes = this.bytes; // can be Uint8Array
        var n = bytes.length;
        var chars = [];
        for (var i = 0; i < n; i++)
            chars.push(String.fromCharCode(bytes[i]));
        return chars.join('');
    },
    wordsAsFloat: function() {
        // layout of NoteTaker Floats (from MSB):
        // 15 bits exponent in two's complement without bias, 1 bit sign
        // 32 bits mantissa including its highest bit (which is implicit in IEEE 754)
        if (this.words[1] === 0) return 0.0; // if high-bit of mantissa is 0, then it's all zero
        var nt0 = this.words[0], nt1 = this.words[1], nt2 = this.words[2],
            ntExponent = nt0 >> 1, ntSign = nt0 & 1, ntMantissa = (nt1 & 0x7FFF) << 16 | nt2, // drop high bit of mantissa
            ieeeExponent = (ntExponent + 1022) & 0x7FF, // IEEE: 11 bit exponent, biased
            ieee = new DataView(new ArrayBuffer(8));
        // IEEE is 1 sign bit, 11 bits exponent, 53 bits mantissa omitting the highest bit (which is always 1, except for 0.0)
        ieee.setInt32(0, ntSign << 31 | ieeeExponent << (31-11) | ntMantissa >> 11); // 20 bits of ntMantissa
        ieee.setInt32(4, ntMantissa << (32-11)); // remaining 11 bits of ntMantissa, rest filled up with 0
        // why not use setInt64()? Because JavaScript does not have 64 bit ints
        return ieee.getFloat64(0);
    },
    bytesAsInteger: function() {
        // Return numeric value of my bytes
        var value = 0;
        if (this.bytes) for (var i = this.bytes.length - 1; i >= 0; i--)
            value = value * 256 + this.bytes[i];
        return value;
    },
    largeIntegerValue: function() {
        // Return numeric value of a LargeInteger
        var value = this.pointers[NT.PI_LARGEINTEGER_BYTES].bytesAsInteger();
        if (this.pointers[NT.PI_LARGEINTEGER_NEG].isTrue) value = - value;
        return value;
    },
},
'writing', {
    dataBytes: function() {
        // number of bytes in this object excluding header and class information
        return this.isFloat ? 8 :               // we use IEEE floats instead of the original 3-word format
            this.bytes ? this.bytes.length :    // includes CompiledMethods
            this.words ? this.words.length * 2 :
            this.pointers ? this.pointers.length * 2 :
            0;
    },
    totalBytes: function(large) { // size in bytes this object will take up in image snapshot
        if (large && this.isLarge()) return this.totalBytesLarge();
        // 16 bit oops, image format 1.0
        var dataBytes = this.dataBytes(),
            dataWords = dataBytes+1 >> 1,
            maxSmall = NT.OOP_TAG_SMALL,    // 0x1E
            headerWords = dataBytes < maxSmall ? 2 // oop, classOopAndSizeOrLargeTag (up to 30 bytes)
                : dataBytes <= 0xFFFF ? 3          // oop, class oop, 2 bytes size (OOP_TAG_SMALL, 0x1E)
                : 4,                               // oop, class oop, 4 bytes size (OOP_TAG_LARGE, 0x1F)
            totalBytes = (headerWords + dataWords) * 2;
        if (large && totalBytes % 4) totalBytes += 2; //align to 32 bits if large image
        return totalBytes;
    },
    sameAs: function(other) {
        // answer true if this is the same object as the other from a different image
        if (!other) return false;
        if (this.oop !== other.oop) return false;
        if (this.stClass.oop !== other.stClass.oop) return false;
        if (this.isFloat) return this.float === other.float;
        var thisBody = this.pointers || this.words || this.bytes,
            otherBody = other.pointers || other.words || other.bytes;
        if (!thisBody && !otherBody) return true;
        if (!thisBody || !otherBody) return false;
        if (thisBody.length !== otherBody.length) return false;
        if (thisBody === this.pointers) { // compare objects
            for (var i = 0; i < thisBody.length; i++) {
                var a = thisBody[i], b = otherBody[i];
                if (typeof a !== typeof b ||                    // number vs obj
                    (typeof a === "number" && a !== b) ||       // both numbers
                    a.oop !== b.oop)                            // both objects
                        return false;
            }
            if (!this.bytes) return true;   // unless it's a method, we're done
        }
        // compare words / bytes
        var isMethod = !!this.pointers;
        if (!isMethod) {
            for (var i = 0; i < thisBody.length; i++)
                if (thisBody[i] !== otherBody[i])
                    return false;
            return true
        }
        // compare method header
        for (var i = 0; i < 2; i++)
            if (this.bytes[i] !== other.bytes[i])
                return false;
        // compare bytecodes
        var firstBytecode = 2 + (this.pointers.length * 2); // after header and literals
        for (var i = firstBytecode; i < this.bytes.length; i++)
            if (this.bytes[i] !== other.bytes[i])
                return false;
        return true;
    },

    writeTo: function(data, pos, image) {
        // Write oop, class.oop + small size, optional large size, optional data
        // oop goes first
        data.setUint16(pos, this.oop); pos += 2;
        var byteSize = this.dataBytes();
        // write class oop and size in its lower 6 bits
        if (byteSize < NT.OOP_TAG_SMALL) { // one word for class and size
           data.setUint16(pos, this.stClass.oop + byteSize); pos += 2;
        } else if (byteSize <= 0xFFFF) { // two words, marked by 0x1E
           data.setUint16(pos, this.stClass.oop + NT.OOP_TAG_SMALL); pos += 2;
           data.setUint16(pos, byteSize); pos += 2;
        } else { // three words, marked by 0x1F
           data.setUint16(pos, this.stClass.oop + NT.OOP_TAG_LARGE); pos += 2;
           data.setUint32(pos, byteSize); pos += 4;
        }
        // now write data
        var beforePos = pos;
        if (this.isFloat) {
            data.setFloat64(pos, this.float); pos += 8
        } else if (this.bytes) {
            if (this.isCompiledMethod())            // store literal oops into bytes
                this.methodPointersModified(image);
            for (var i = 0; i < this.bytes.length; i++)
                { data.setUint8(pos, this.bytes[i]); pos++ }
        } else if (this.words) {
            for (var i = 0; i < this.words.length; i++)
                { data.setUint16(pos, this.words[i]); pos += 2 }
        } else if (this.pointers) {
            for (var i = 0; i < this.pointers.length; i++)
                { data.setUint16(pos, image.objectToOop(this.pointers[i])); pos += 2 }
        }
        if (pos !== beforePos + byteSize) throw new Error("written size does not match");
        // adjust for odd number of bytes
        if (pos & 1) pos++;
        return pos;
    },
    isLarge: function() {
        if (this.oop < 0) throw new Error("unexpected new object");
        if (this.oop > 0xFFFF) return true;         // large oop => large
        if (this.stClass.oop > 0xFFFF) return true; // large class oop => large
        if (!this.pointers) return false;           // no oops => small
        for (var i = 0; i < this.pointers.length; i++) {
            if (this.pointers[i].oop > 0xFFFF) return true;
        }
        return false;
    },
    dataBytesLarge: function() {
        // number of bytes in this object excluding header and class information
        var bytes = this.isFloat ? 8 :          // we use IEEE floats instead of the original 3-word format
            this.bytes ? this.bytes.length :
            this.words ? this.words.length * 2 :
            this.pointers ? this.pointers.length * 4 :
            0;
        // large CompiledMethods need extra space for 32 bit literals
        if (this.bytes && this.pointers)
            bytes += this.pointers.length * 4;
        return bytes;
    },
    totalBytesLarge: function() {
        // large objects use 32 bit oops
        var dataBytes = this.dataBytesLarge(),
            dataWords = dataBytes+3 >> 2,
            maxSmall = 0xFFFF,
            headerWords = dataBytes < maxSmall
                ? 3          // oop, class oop, hash + size
                : 4;         // oop, class oop, hash + tag, size
        return (headerWords + dataWords) * 4;
    },
    writeToLarge: function(data, pos, image) {
        var beforePos = pos;

        // if this is a small (16 bit) object, just write it using old format
        if (!this.isLarge()) {
            pos = this.writeTo(data, pos, image);
            while (pos % 4) pos++;                  // align to 32 bits
            if (pos !== beforePos + this.totalBytes(true))
                throw new Error("written size does not match");
            return pos;
        }

        // small format writes the oop first, where low bit is 0
        // large format writes the hash first, sets low bit to 1

        // Write hash+size, optional large size, oop, class.oop, optional data
        var byteSize = this.dataBytesLarge(),
            taggedHash = (this.hash << 1) | 1;  // hash is okay to be undefined
        if (byteSize < 0xFFFF) { // one word for hash and size
            data.setUint16(pos, taggedHash); pos += 2;
            data.setUint16(pos, byteSize);   pos += 2;
        } else { // two words, marked by 0xFFFF
            data.setUint16(pos, taggedHash); pos += 2;
            data.setUint16(pos, 0xFFFF);     pos += 2;
            data.setUint32(pos, byteSize);   pos += 4;
        }
        data.setUint32(pos, this.oop); pos += 4;
        data.setUint32(pos, this.stClass.oop); pos += 4;
        // now write data
        if (this.isFloat) {
            data.setFloat64(pos, this.float); pos += 8
        } else if (this.bytes) {
            for (var i = 0; i < this.bytes.length; i++)
                { data.setUint8(pos, this.bytes[i]); pos++ }
        } else if (this.words) {
            for (var i = 0; i < this.words.length; i++)
                { data.setUint16(pos, this.words[i]); pos += 2 };
        }
        // align to 32 bits
        while (pos % 4) pos++;
        // methods have bytes followed by literal pointers
        if (this.pointers) {
            for (var i = 0; i < this.pointers.length; i++)
                { data.setUint32(pos, image.objectToOop(this.pointers[i])); pos += 4 }
        }
        if (pos !== beforePos + this.totalBytes(true))
            throw new Error("written size does not match");
        return pos;
    },
},
'as class', {
    isClass: function() {
        return this.stClass.oop === NT.OOP_CLCLASS
            || this.stClass.oop === NT.OOP_CLVLENGTHCLASS;
    },
    superclass: function() {
        return this.pointers[NT.PI_CLASS_SUPERCLASS];
    },
    classInstSize: function() {
        // number of vars in my instances
        var instSpec = this.pointers[NT.PI_CLASS_INSTSIZE];
        if (instSpec & NT.FMT_HASPOINTERS)
            return ((instSpec & NT.FMT_BYTELENGTH) >> 1) - 1; // words, sans header
        return 0;
    },
    classInstSpec: function() {
        if (this.pointers)
           return this.pointers[NT.PI_CLASS_INSTSIZE];
        // while still being oop-mapped
        if ('hash' in this.data)
            return this.data.body.getUint32(NT.PI_CLASS_INSTSIZE * 4) >> 1;
        else
            return this.data.body.getUint16(NT.PI_CLASS_INSTSIZE * 2) >> 1;
    },
},
'debugging', {
    bytesAsUnicode: function(maxLength) {
        if (!this.bytes) return '';
        var bytes = this.bytes; // can be Uint8Array
        var n = bytes.length;
        if (maxLength && maxLength < n) n = maxLength;
        var chars = [];
        for (var i = 0; i < n; i++) {
            var nt = bytes[i],
                char = String.fromCharCode(nt),
                unicode = NT.toUnicode[String.fromCharCode(nt)] || char;
            chars.push(unicode);
        }
        var string = chars.join('');
        if (n < bytes.length)
            string += '…';
        return string;
    },
    toString: function() {
        return Strings.format('stObj(%s)',
            this.stClass.constructor === St78.vm.Object ? this.stInstName() : this.stClass);
    },
    className: function() {
        var classNameObj = this.pointers[NT.PI_CLASS_TITLE];
        if (!classNameObj.stClass) return "???";
        return classNameObj.bytesAsUnicode();
    },
    stInstName: function(maxLength) {
        if (!this.stClass || !this.stClass.pointers) return "???";
        if (this.oop === NT.OOP_NIL) return "nil";
        if (this.oop === NT.OOP_FALSE) return "false";
        if (this.oop === NT.OOP_TRUE) return "true";
        if (this.isFloat) {var str = this.float.toString(); if (!/\./.test(str)) str += '.0'; return str; }
        if (this.isClass()) return "the " + this.className() + " class";
        if (this.stClass.oop === NT.OOP_CLSTRING) return "'" + this.bytesAsUnicode(maxLength||16) + "'";
        if (this.stClass.oop === NT.OOP_CLUNIQUESTRING) return "↪" + this.bytesAsUnicode(maxLength||16);
        if (this.stClass.oop === NT.OOP_CLLARGEINTEGER) return this.largeIntegerValue() + "L";
        if (this.stClass.oop === NT.OOP_CLNATURAL) return this.bytesAsInteger() + "N";
        if (this.stClass.oop === NT.OOP_CLPOINT) return this.stInstNames().join("⌾");
        if (this.stClass.oop === NT.OOP_CLRECTANGLE) return this.stInstNames().join(" rect: ");
        var className = this.stClass.className();
        return (/^[aeiou]/i.test(className) ? 'an ' : 'a ') + className;
    },
    stInstNames: function() {
        return this.pointers.map(function(ea){
            return ea.stInstName ? ea.stInstName() : ea.toString();
        });
    },
    slotNameAt: function(index) {
        // one-based index
        var vars = this.stClass.allInstVarNames();
        return index <= vars.length ? vars[index - 1] : "◦" + (index - vars.length).toString();
    },
    allInstVarNames: function() {
        var superclass = this.superclass();
        var vars = superclass.isNil ? [] : superclass.allInstVarNames();
        var string = this.pointers[NT.PI_CLASS_MYINSTVARS].bytesAsRawString();
        // remove comments, make comma-separated, then split
        string = string.replace(/"[^"]*"/g, ' ');   // replace comments "..." with space
        string = string.replace(/\s+/g, ',');       // replace whitespace runs with comma
        string = string.replace(/^,/, '');          // remove lone comma at start
        string = string.replace(/,$/, '');          // remove lone comma at end
        if (string.length)
            vars = vars.concat(string.split(','));  // split into words at commas
        return vars;
    }
},
'as method', {
    isCompiledMethod: function() {
        return this.stClass.oop === NT.OOP_CLCOMPILEDMETHOD;
    },
    methodInitLits: function(image, optionalOopMap, convertTaggedInts) {
        // make literals encoded as oops available as proper pointer objects
        // convertTaggedInts is true if we loaded from the original NoteTaker files
        if (this.pointers) return; // already done (loaded as large obj probably)
        var numLits = this.methodNumLits();
        if (numLits) {
            var lits = [],
                bytesPtr = 2; // skip header word
            for (var i = 0; i < numLits; i++) {
                var oop = this.bytes[bytesPtr++] + 256 * this.bytes[bytesPtr++];
                if (convertTaggedInts && !(oop & 1)) oop /= 2; // get rid of SmallInt tag bit
                lits.push(image.objectFromOop(oop, optionalOopMap));
            }
            this.pointers = lits;
            if (convertTaggedInts) this.methodPointersModified(image);
        }
    },
    methodPointersModified: function(image, index, n) {
        // n literal pointers starting at index were modified: copy oops to bytes
        if (n) return; // we defer this if sent from bitblt at runtime
        // if sent from image saving, copy all
        index = 0; n = this.methodNumLits();
        var bytesPtr = index * 2 + 2; // skip method header
        for (var i = index; i < index + n; i++) {
            var oop = image.objectToOop(this.pointers[i]);
            this.bytes[bytesPtr++] = oop & 0xFF;
            this.bytes[bytesPtr++] = (oop >> 8) & 0xFF;
        }
    },
    methodIsQuick: function() {
        return this.bytes[1] === 128;
    },
    methodQuickIndex: function() {
        return this.bytes[0];
    },
    methodNumLits: function() {
        if (this.methodIsQuick()) return 0;
        return ((this.bytes[1] & 126) - 4) / 2;
    },
    methodNumArgs: function() {
        return this.bytes[0] & 15;
    },
    methodNumTemps: function() {
        if (this.methodIsQuick()) return 0;
        return ((this.bytes[1] & 1) << 4) + (this.bytes[0] >> 4);
    },
    methodPrimitiveIndex: function() {
        if (this.bytes[1] <= 128) return 0;
        return this.pointers[this.methodNumLits() - 1];
    },
    methodGetLiteral: function(zeroBasedIndex) {
        return this.pointers[zeroBasedIndex];
    },
    methodStartPC: function() {
        if (this.methodIsQuick()) return 0;
        return (this.bytes[1] & 126) - NT.PC_BIAS; // bias = 2 because 4-byte header became 2-byte for NT
    },
    methodEndPC: function() {
        if (this.methodIsQuick()) return 0;
        return this.bytes.length;
    },
},
'as symbol table', {
    symbolTableLabelObjRefs: function(objRef) {
        var tableValues = this.pointers[NT.PI_SYMBOLTABLE_VALUES].pointers;
        for (var i = 0; i < tableValues.length; i++)
            if (!tableValues[i].isNil)
                // cache in objRef's stInstName() function
                (function(table, i){
                    tableValues[i].stInstName = function() {
                        if (this === table.symbolTableRefAtIndex(i))
                            return 'objref ' + table.symbolTableKeyAtIndex(i).bytesAsUnicode();
                        delete this.stInstName; // cache is invalid
                        return 'objref ' + this.oop;
                    };
                })(this, i);
    },
    symbolTableKeyAtIndex: function(i) {
        return this.pointers[NT.PI_SYMBOLTABLE_OBJECTS].pointers[i];
    },
    symbolTableRefNamed: function(name) {
        var tableNames = this.pointers[NT.PI_SYMBOLTABLE_OBJECTS].pointers,
            tableValues = this.pointers[NT.PI_SYMBOLTABLE_VALUES].pointers;
        for (var i = 0; i < tableNames.length; i++) {
            if (tableNames[i].isNil) continue;
            if (name === tableNames[i].bytesAsUnicode())
                return tableValues[i];
        }
        return null;
    },
    symbolTableRefAtIndex: function(i) {
        return this.pointers[NT.PI_SYMBOLTABLE_VALUES].pointers[i];
    },
});

Object.extend(St78.vm.Object, {
    readFromBuffer: function(reader) {
        var oop = reader.nextUint16();
        if (oop & 1) return this.readFromBufferLarge(reader, oop);
        var classOopAndSize = reader.nextUint16(),
            byteSize = classOopAndSize & NT.OOP_MASK,
            classOop = classOopAndSize - byteSize;
        if (byteSize === NT.OOP_TAG_SMALL)
            byteSize = reader.nextUint16();
        else if (byteSize === NT.OOP_TAG_LARGE)
            byteSize = reader.nextUint32();
        var obj = new this(oop);
        obj.data = {
            classOop: classOop,
            byteSize: byteSize,
            body: byteSize && reader.nextBytes((byteSize + 1) & ~1),
        };
        return obj;
    },
    readFromBufferLarge: function(reader, hashWord) {
        var hash = hashWord >> 1,
            byteSize = reader.nextUint16();
        if (byteSize === 0xFFFF)
            byteSize = reader.nextUint32();
        var oop = reader.nextUint32(),
            classOop = reader.nextUint32();
        var obj = new this(oop);
        obj.data = {
            hash: hash,
            classOop: classOop,
            byteSize: byteSize,
            body: byteSize && reader.nextBytes((byteSize + 3) & ~3),
        };
        return obj;
    },
});

Object.subclass('St78.vm.Interpreter',
'initialization', {
    initialize: function(image, display, files) {
        console.log('st78: initializing interpreter');
        this.image = image;
        this.image.vm = this;
        this.initConstants();
        this.primHandler = new St78.vm.Primitives(this, display, files);
        this.loadImageState();
        this.initVMState();
        this.loadInitialContext(display);
        console.log('st78: interpreter ready');
    },
    initConstants: function() {
        this.millisecondClockMask = 0x7FFFFFFF;  // the largest primitively handled integer value.
    },
    loadImageState: function() {
        this.specialObjects = this.image.specialOopsVector.pointers;
        this.specialSelectors = [];
        for (var i = 9; i <= 40; i++)
            this.specialSelectors.push(this.specialObjects[i]);
        // Note this could be computed by counting non-alpha characters in each selector...
        this.specialNargs = [
            1, 1, 1, 1, 1, 1, 1, 1,   1, 1, 1, 1, 1, 1, 1, 1,
            1, 2, 0, 1, 0, 1, 1, 1,   0, 0, 0, 0, 1, 0, 0, 0 ];
        this.nilObj = this.image.objectFromOop(NT.OOP_NIL);
        this.falseObj = this.image.objectFromOop(NT.OOP_FALSE);
        this.trueObj = this.image.objectFromOop(NT.OOP_TRUE);
        this.integerClass = this.image.objectFromOop(NT.OOP_CLINTEGER);
        this.classClass = this.image.objectFromOop(NT.OOP_CLCLASS);
    },
    notetakerPatches: function(display) {
        // this.method is Process>>goBaby

        // set display extent to 640x480 by modifying literals
        this.method.pointers[9] = display.width || 640;
        this.method.pointers[17] = display.height || 480;

        // Do not make font glyphs little-endian and interleaved
        this.methodBytes[77] = 145;  // Patches over "DefaultTextStyle NoteTakerize."

        // Remarkably, it seems that Vector, String and Uniquestring all have their classes
        // mistakenly set to Class rather than VariableLengthClass as they were in the image
        // from which the NT image was cloned.
        // The one thing that would have revealed this error, the lookup of new:, was sidestepped
        // in both my original 8086 code and Helge's Java VM.  Truly amazing  ;-)
        this.image.objectFromOop(NT.OOP_CLSTRING).stClass =
            this.image.objectFromOop(NT.OOP_CLVLENGTHCLASS);
        this.image.objectFromOop(NT.OOP_CLUNIQUESTRING).stClass =
            this.image.objectFromOop(NT.OOP_CLVLENGTHCLASS);
        this.image.objectFromOop(NT.OOP_CLVECTOR).stClass =
            this.image.objectFromOop(NT.OOP_CLVLENGTHCLASS);
        this.image.objectFromOop(NT.OOP_CLPROCESS).stClass =
            this.image.objectFromOop(NT.OOP_CLVLENGTHCLASS);
        this.image.objectFromOop(NT.OOP_CLNATURAL).stClass =
            this.image.objectFromOop(NT.OOP_CLVLENGTHCLASS);
        this.image.objectFromOop(NT.OOP_CLCOMPILEDMETHOD).stClass =
            this.image.objectFromOop(NT.OOP_CLVLENGTHCLASS);

        if (false) { // disabled because we need that 1 bit to
                     // tell oops from ints in saved image
            // Patch to make all LargeIntegers in range +-32K small again:
            this.image.smallifyLargeInts();
            NT.MAX_INT =  0x7FFF;
            NT.MIN_INT = -0x8000;
            NT.NON_INT = -0x9000;

            // Patches to make +-32K integers work while NoteTaker is true
            this.patchByteCode(11994, 12, 0x7E); // Integer>>lshift:
            this.patchByteCode(12310, 8, 0x7E); // Integer>>minVal
            this.patchByteCode(12304, 8, 0x7E); // Integer>>maxVal
            this.patchByteCode(13418, 24, 0x7E); // LargeInteger>>lshift:
            this.patchByteCode(13512, 20, 0x7E); // LargeInteger>>land:
            this.patchByteCode(13498, 30, 0x7E); // LargeInteger>>asSmall
            this.patchByteCode(13456, 18, 0x7E); // LargeInteger>>lor:
            this.patchByteCode(13516, 18, 0x7E); // LargeInteger>>lxor:
        }

        // jump over Dorado code in UserView>>screenextent:tab:
        this.patchByteCode(8310, 34, 0xA4, (111-34)-2); // long jmp to 111 [jumps have a bias of 2]

        // Highjack user restart in ProjectWindow>>install to do thisProcess restart instead!
        this.patchByteCode(8760, 23, 0x85);     // thisProcess

        this.patchCursors();
    },
    patchCursors: function() {
        // Cursors/Forms were interlaced and little endian on Notetaker.
        // This is the equivalent of Cursor>>beAltoCursor to make them sane again.
        this.image.allInstancesOf("Cursor").forEach(function(cursor){
            var oldbits = cursor.pointers[NT.PI_CURSOR_BITSTR].bytes,
                newbits = [];
            for (var i = 0; i < 8; i++) {
                newbits.push(oldbits[i*2+1]);
                newbits.push(oldbits[i*2]);
                newbits.push(oldbits[(i+8)*2+1]);
                newbits.push(oldbits[(i+8)*2]);
            }
            cursor.pointers[NT.PI_CURSOR_BITSTR].bytes = newbits;
	    });
    },
    initVMState: function() {
        this.byteCodeCount = 0;
        this.sendCount = 0;
        this.quickSendCount = 0;
        this.primitiveCount = 0;
        this.performCount = 0;
        this.remoteEvalCount = 0;
        this.remoteCopyCount = 0;
        this.doSuper = false;
        this.interruptCheckCounter = 0;
        this.interruptCheckCounterFeedBackReset = 1000;
        this.interruptChecksEveryNms = 3;
        this.lastTick = 0;
        this.maxStackSize = 2000;   // refuse to grow to more than this
        this.lowStackSize = 800;    // need this much to pop up a debugger
        this.lowStackSignaled = false;
        this.methodCacheSize = 1024;
        this.methodCacheMask = this.methodCacheSize - 1;
        this.methodCacheRandomish = 0;
        this.methodCache = [];
        for (var i = 0; i < this.methodCacheSize; i++)
            this.methodCache[i] = {lkupClass: null, selector: null, method: null, methodClass: null, primIndex: 0, argCount: 0};
        this.breakOutOfInterpreter = false;
        this.breakOutTick = 0;
        this.breakOnMethod = null; // method to break on
        this.breakOnFrameChanged = false;
        this.breakOnFrameReturned = null; // context to break on
        this.startupTime = Date.now(); // base for millisecond clock
    },
    loadInitialContext: function(display) {
        this.wakeProcess(this.image.userProcess);  // set up activeProcess and sp
        this.popPCBP();                          // restore pc and current frame
        this.loadFromFrame(this.bp);   // load all the rest from the frame

        // initial refresh
        if (this.image.userDisplay) {
            this.primHandler.setDisplayAndCursor(this.image.userDisplay, true);
        } else {
            // we loaded the original NoteTaker snapshot
            this.notetakerPatches(display);
        }
    },
    patchByteCode: function(oop, index, replacementByte, maybeByte2, maybeByte3, maybeByte4) {
        var method = this.image.objectFromOop(oop);
        method.bytes[index] = replacementByte;
        if (maybeByte2) method.bytes[index+1] = maybeByte2
        if (maybeByte3) method.bytes[index+2] = maybeByte3
        if (maybeByte4) method.bytes[index+3] = maybeByte4
    },
    restart: function() {
        // restart VM at top frame (useful after crash)
        var process = this.image.objectFromOop(6);
        this.wakeProcess(process);
        this.popN(this.activeProcessPointers.length - 18 - this.sp);
        this.popPCBP();
        this.loadFromFrame(this.bp);
    },
},
'interpreting', {
    interpretOne: function() {
        var b, b2;
        this.byteCodeCount++;
        b = this.nextByte();
        if (b < 128) // Chrome only optimized up to 128 cases
        switch (b) { /* The Main Bytecode Dispatch Loop */

            // load receiver variable
            case 0x00: case 0x01: case 0x02: case 0x03: case 0x04: case 0x05: case 0x06: case 0x07:
            case 0x08: case 0x09: case 0x0A: case 0x0B: case 0x0C: case 0x0D: case 0x0E: case 0x0F:
                this.push(this.receiver.pointers[b]); break;

            // load temporary variable
            case 0x10: case 0x11: case 0x12: case 0x13: case 0x14: case 0x15: case 0x16: case 0x17:
            case 0x18: case 0x19: case 0x1A: case 0x1B: case 0x1C: case 0x1D: case 0x1E: case 0x1F:
                this.push(this.activeProcessPointers[this.currentFrameTempOrArg(b - 0x10)]); break;

            // loadLiteral
            case 0x20: case 0x21: case 0x22: case 0x23: case 0x24: case 0x25: case 0x26: case 0x27:
            case 0x28: case 0x29: case 0x2A: case 0x2B: case 0x2C: case 0x2D: case 0x2E: case 0x2F:
            case 0x30: case 0x31: case 0x32: case 0x33: case 0x34: case 0x35: case 0x36: case 0x37:
            case 0x38: case 0x39: case 0x3A: case 0x3B: case 0x3C: case 0x3D: case 0x3E: case 0x3F:
                this.push(this.methodLiteral(b - 0x20)); break;

            // loadLiteralIndirect
            case 0x40: case 0x41: case 0x42: case 0x43: case 0x44: case 0x45: case 0x46: case 0x47:
            case 0x48: case 0x49: case 0x4A: case 0x4B: case 0x4C: case 0x4D: case 0x4E: case 0x4F:
            case 0x50: case 0x51: case 0x52: case 0x53: case 0x54: case 0x55: case 0x56: case 0x57:
            case 0x58: case 0x59: case 0x5A: case 0x5B: case 0x5C: case 0x5D: case 0x5E: case 0x5F:
            case 0x60: case 0x61: case 0x62: case 0x63: case 0x64: case 0x65: case 0x66: case 0x67:
            case 0x68: case 0x69: case 0x6A: case 0x6B: case 0x6C: case 0x6D: case 0x6E: case 0x6F:
                this.push(this.methodLiteral(b - 0x40).pointers[NT.PI_OBJECTREFERENCE_VALUE]); break;

            // Quick loads
            case 0x70: this.nono(); break;
            case 0x71: this.push(this.receiver); break;
            case 0x72: case 0x73: case 0x74: case 0x75: case 0x76: case 0x77:
                this.nono(); break;
            // Push constant (-1, 0, 1, 2, 10, nil, false, true)
            case 0x78: case 0x79: case 0x7A: case 0x7B: case 0x7C: case 0x7D: case 0x7E: case 0x7F:
                this.push(this.specialObjects[b - 0x78 + 1]); break;
        } else switch (b) { // Chrome only optimized up to 128 cases
            // Sundry
			case 0x80:
				this.doStore(this.pop(), this.nextByte()); break;  // STOPOP
			case 0x81:
				this.doStore(this.top(), this.nextByte()); break;  // STONP
			case 0x82:
				this.pop(); break;	// POP
			case 0x83:	// RETURN
			    this.doReturn(); // method return
				break;
			case 0x84:	// REMLV
				this.doRemoteReturn(); // block return
				break;
			case 0x85:	// PUSHCURRENT
				this.push(this.activeProcess);
				break;
			case 0x86:	// SUPER
				this.doSuper = true;
				break;
			case 0x87:	// LSELF (cf. 0x71 above)
				this.push(this.receiver);
				break;
			case 0x88:	// X LDINST
				this.push(this.receiver.pointers[this.nextByte()]);
				break;
			case 0x89:	// X LDTEMP
                var addr = this.currentFrameTempOrArg(this.nextByte());
				this.push(this.activeProcessPointers[addr]); break
				break;
			case 0x8A:	// X LDLIT
				this.push(this.methodLiteral(this.nextByte()));
				break;
			case 0x8B:	// X LDLITI
				this.push(this.methodLiteral(this.nextByte()).pointers[NT.PI_OBJECTREFERENCE_VALUE]);
				break;
			case 0x8C:	// X SEND
				this.send(this.methodLiteral(this.nextByte()));
				break;
			case 0x8D:
			case 0x8E: this.nono(); break; 			// illegal 0x87..0x8F
			case 0x8F: this.breakNow("exit to debugger"); break;

            // Short jumps
            case 0x90: case 0x91: case 0x92: case 0x93: case 0x94: case 0x95: case 0x96: case 0x97:
                this.pc += (b&7) + 1;
                break;
            // Short jumps on false
            case 0x98: case 0x99: case 0x9A: case 0x9B: case 0x9C: case 0x9D: case 0x9E: case 0x9F:
                if (this.pop().isFalse) this.pc += (b&7) + 1;
                break;
            // Long jumps
            case 0xA0: case 0xA1: case 0xA2: case 0xA3:
            case 0xA4: case 0xA5: case 0xA6: case 0xA7:
                var delta = ((b&7) - 4) * 256 + this.nextByte();
                this.pc += delta;
                if (delta < 0) this.checkForInterrupts();  //check on backward jumps (loops)
                break;
            // Long jumps on false
            case 0xA8: case 0xA9: case 0xAA: case 0xAB: case 0xAC: case 0xAD: case 0xAE: case 0xAF:
                var b2 = this.nextByte();
                if (this.pop().isFalse) {
                    var delta = ((b&7) - 4) * 256 + b2;
                    this.pc += delta;
                    if (delta < 0) this.checkForInterrupts();  //check on backward jumps (loops)
                }
                break;

            // Arithmetic Ops... + - < > <= >= = ~=    * / \ @ lshift: lxor: land: lor:
            case 0xB0: case 0xB1: case 0xB2: case 0xB3: case 0xB4: case 0xB5: case 0xB6: case 0xB7:
            case 0xB8: case 0xB9: case 0xBA: case 0xBB: case 0xBC: case 0xBD: case 0xBE: case 0xBF:
                if (!this.primHandler.doPrimitive(b&0xF, this.specialNargs[b&0xF]))
                    this.sendSpecial(b&0xF); break;

            // at:, at:put:, size, next, nextPut:, ...
            case 0xC0: case 0xC1: case 0xC2: case 0xC3: case 0xC4: case 0xC5: case 0xC6: case 0xC7:
            case 0xC8: case 0xC9: case 0xCA: case 0xCB: case 0xCC: case 0xCD: case 0xCE: case 0xCF:
                if (this.doSuper || !this.primHandler.doSpecial(b&0xF))
                    this.sendSpecial((b&0xF)+16); break;

            // Send Literal Selector
            case 0xD0: case 0xD1: case 0xD2: case 0xD3: case 0xD4: case 0xD5: case 0xD6: case 0xD7:
            case 0xD8: case 0xD9: case 0xDA: case 0xDB: case 0xDC: case 0xDD: case 0xDE: case 0xDF:
            case 0xE0: case 0xE1: case 0xE2: case 0xE3: case 0xE4: case 0xE5: case 0xE6: case 0xE7:
            case 0xE8: case 0xE9: case 0xEA: case 0xEB: case 0xEC: case 0xED: case 0xEE: case 0xEF:
            case 0xF0: case 0xF1: case 0xF2: case 0xF3: case 0xF4: case 0xF5: case 0xF6: case 0xF7:
            case 0xF8: case 0xF9: case 0xFA: case 0xFB: case 0xFC: case 0xFD: case 0xFE: case 0xFF:
                this.send(this.methodLiteral(b - 0xD0)); break;
        }
    },
    freeze: function(externalContinueFunc) {
        // Stop the interpreter. Answer a function that can be
        // called to continue interpreting.
        var continueFunc = externalContinueFunc; // only needed if called from outside the interpreter
        this.primHandler.displayFlush(); // make sure display is up to date
        this.frozen = true;
        this.breakOutOfInterpreter = function(thenDo) {
            if (!thenDo) throw "need function to restart interpreter";
            continueFunc = thenDo;
            return "frozen";
        }.bind(this);
        return function unfreeze() {
            this.frozen = false;
            if (!continueFunc) throw "no continue function";
            continueFunc(0);    //continue without timeout
        }.bind(this);
    },
    doStore: function (value, addrByte) {
		switch (addrByte >> 4) {
			case 0x0:	// store inst
				this.receiver.pointers[addrByte] = value; break;
			case 0x1:	// store temp
				var addr = this.currentFrameTempOrArg(addrByte-0x10);
				this.activeProcessPointers[addr] = value; break;
			case 0x2:	// store lit
			case 0x3:
				this.nono(); break;
			case 0x4:	// store lit indirect
			case 0x5:
			case 0x6:
		        this.methodLiteral(addrByte&0x3F).pointers[NT.PI_OBJECTREFERENCE_VALUE] = value; break;
            case 0x8:
				// handle EXTENDED stores 0x88-0x8c
				var extendedAddr = this.nextByte();
				switch (addrByte) {
					case 0x88:	// STO* X LDINST
						this.receiver.pointers[extendedAddr] = value; break;
					case 0x89:	// STO* X LDTEMP
						var addr = this.currentFrameTempOrArg(extendedAddr);
				        this.activeProcessPointers[addr] = value; break;
					case 0x8b:	// STO* X LDLITI
                        var oref = this.methodLiteral(extendedAddr);
                        oref.pointers[NT.PI_OBJECTREFERENCE_VALUE] = value; break
					default:		// 0x8a (X LDLIT) and 0x8c (X SEND)
						this.nono();
				};
				break;
            default:
				this.nono();
		}
	},
    interpret: function(forMilliseconds, thenDo) {
        // run until idle, but at most for a couple milliseconds
        // answer milliseconds to sleep or 'break' if reached breakpoint
        // call thenDo with that result when done
        if (this.frozen) return 'frozen';
        this.primHandler.cursorUpdate();
        this.breakOutOfInterpreter = false;
        this.breakOutTick = this.lastTick + (forMilliseconds || 500);
        while (!this.breakOutOfInterpreter)
            this.interpretOne();
        // this is to allow 'freezing' the interpreter and restarting it asynchronously. See freeze()
        if (typeof this.breakOutOfInterpreter === "function")
            return this.breakOutOfInterpreter(thenDo);
        // normally, we answer regularly
        var result = this.breakOutOfInterpreter === 'break' ? 'break' : Math.min(this.primHandler.idleMS(), 200);
        if (thenDo) thenDo(result);
        return result;
    },
    nextByte: function() {
        return this.methodBytes[this.pc++] & 0xFF;
    },
    methodLiteral: function(index) {
        var literal = this.method.pointers[index];
        if (this.breakOnLiteral === literal) {
            var seen = this.printMethod() + ' @' + this.method.oop + '[' + (this.pc-1) + ']';
            if (!this.breakOnLiteralSeen) this.breakOnLiteralSeen = {};
            if (this.breakOnLiteralSeen[seen]) {
                this.breakOnLiteralSeen[seen] += 1;
            } else {
                this.breakOnLiteralSeen[seen] = 1;
                this.breakNow("Seen literal " + literal.stInstName + " in " + seen);
            }
        }
        return literal;
    },
    nono: function() {
        throw "Oh No!";
    },
    forceInterruptCheck: function() {
        this.interruptCheckCounter = -1000;
    },
    checkForInterrupts: function() {
        //Check for interrupts at sends and backward jumps
        if (this.interruptCheckCounter-- > 0) return; //only really check every 100 times or so

        // we've been busy
        if (this.primHandler.idleCounter > 0)
            this.primHandler.idleCounter--;

        if (this.primHandler.display.interrupt) {
            this.primHandler.display.interrupt = false;
            this.handleUserInterrupt();
        }

        var now = this.primHandler.millisecondClockValue();
        if (now < this.lastTick) { // millisecond clock wrapped
            this.breakOutTick = now + (this.breakOutTick - this.lastTick);
        }
        //Feedback logic attempts to keep interrupt response around 3ms...
        if ((now - this.lastTick) < this.interruptChecksEveryNms) { //wrapping is not a concern
            this.interruptCheckCounterFeedBackReset += 10;
        } else {
            if (this.interruptCheckCounterFeedBackReset <= 1000) {
                this.interruptCheckCounterFeedBackReset = 1000;
            } else {
                this.interruptCheckCounterFeedBackReset -= 12;
            }
        }
    	this.interruptCheckCounter = this.interruptCheckCounterFeedBackReset; //reset the interrupt check counter
    	this.lastTick = now; //used to detect wraparound of millisecond clock
        if (now >= this.breakOutTick) // have to return to web browser once in a while
            this.breakOutOfInterpreter = this.breakOutOfInterpreter || true; // do not overwrite break string
    },
    handleUserInterrupt: function() {
        // send error: 'user interrupt' to current receiver
        this.push(this.primHandler.makeStString('user interrupt'));
        this.push(this.receiver);
        this.send(this.image.selectorNamed('error:'), 1);
    },
    sendSpecial: function(lobits) {
        this.send(this.specialSelectors[lobits], this.specialNargs[lobits]);
    },
},
'sending', {
    send: function(selector, argCountOrUndefined) {
        //console.log("sending " + selector.stInstName() + ", super= " + this.doSuper);
        var newRcvr = this.top();
        var lookupClass = this.getClass(newRcvr);
        //console.log("rcvr " + newRcvr + ", lookupClass= " + lookupClass);
        if (this.doSuper) {
            this.doSuper = false;
            lookupClass = this.activeProcessPointers[this.bp + NT.FI_MCLASS].superclass();
        }
        var entry = this.findSelectorInClass(selector, argCountOrUndefined, lookupClass);
        if (this.debugSelectors && this.debugSelectors.indexOf(selector.bytesAsUnicode()) >= 0) debugger;
        this.executeNewMethod(newRcvr, entry.method, entry.methodClass, entry.argCount, entry.primIndex);
    },
    findSelectorInClass: function(selector, argCountOrUndefined, startingClass) {
        var cacheEntry = this.findMethodCacheEntry(selector, startingClass);
        if (cacheEntry.method) return cacheEntry; // Found it in the method cache
        var currentClass = startingClass;
        var mDict;
        while (!currentClass.isNil) {
            mDict = currentClass.pointers[NT.PI_CLASS_MDICT];
            if (mDict.isNil) throw "cannotInterpret";
            var newMethod = this.lookupSelectorInDict(mDict, selector);
            if (!newMethod.isNil) {
                //load cache entry here and return
                cacheEntry.method = newMethod;
                cacheEntry.methodClass = currentClass;
                cacheEntry.primIndex = newMethod.methodPrimitiveIndex();
                cacheEntry.argCount = argCountOrUndefined === undefined ? newMethod.methodNumArgs() : argCountOrUndefined;
                return cacheEntry;
            }
            currentClass = currentClass.pointers[NT.PI_CLASS_SUPERCLASS];
        }
        // Message not understood. Invoke error method instead
        if (this.breakOnMNU)
            this.breakNow('MNU: ' + startingClass.className() + '>>' + selector.bytesAsUnicode());
        if (this.specialObjects[0].isCompiledMethod()) {
            cacheEntry.method = this.specialObjects[0];      // Object>>error
            cacheEntry.methodClass = this.nilObj.stClass;
            cacheEntry.primIndex = 0;
            cacheEntry.argCount = 0;
            return cacheEntry;
        }
        // regular error handling not possible, lookup #error: instead
        var rcvr = this.pop(),
            selName = selector.bytesAsRawString();
        this.push(this.primHandler.makeStString('Message not understood: ' + selName));
        this.push(rcvr);
        return this.findSelectorInClass(this.image.selectorNamed('error:'), 1, startingClass);
    },
    lookupSelectorInDict: function(mDict, messageSelector) {
        //Returns a method or nilObject
        var selectors = mDict.pointers[NT.PI_MESSAGEDICT_OBJECTS].pointers,
            methods = mDict.pointers[NT.PI_MESSAGEDICT_METHODS].pointers,
            index = this.getHash(messageSelector) % selectors.length;
        for (var i = 0; i < selectors.length; i++) {
            if (selectors[index] === messageSelector)
                return methods[index];
            index = (index + 1) % selectors.length;
        }
        return this.nilObj;
    },
    executeNewMethod: function(newRcvr, newMethod, newMethodClass, argumentCount, primitiveIndex, overrideReceiver) {
        this.sendCount++;
        if (this.logSends) console.log(this.sendCount + ' ' + this.printMethod(newMethod));
        if (this.breakOnMethod === newMethod) this.breakNow("executing method " + this.printMethod(newMethod));
        if (this.breakOnFrameChanged) {
            this.breakOnFrameChanged = false;
            this.breakNow();
        }
        if (newMethod.methodIsQuick())
            return this.doQuickSend(newRcvr, newMethod.methodQuickIndex());
        if (primitiveIndex>0)
            if (this.tryPrimitive(primitiveIndex, argumentCount, newMethod, newMethodClass))
                return;  //Primitive succeeded -- end of story
        // sp points to new receiver, so this is where we base the new frame off
        this.pushFrame(newMethod, newMethodClass, argumentCount);
        /////// Whoosh //////
        this.bp = this.sp; //We're off and running...
        this.method = newMethod;
        this.methodBytes = newMethod.bytes;
        this.methodNumArgs = argumentCount;
        this.pc = newMethod.methodStartPC();
        for (var i = 0; i < newMethod.methodNumTemps(); i++)
            this.push(this.nilObj); //  make room for temps and init them
        this.receiver = overrideReceiver ? newRcvr : this.activeProcessPointers[this.bp + NT.FI_RECEIVER];
        if (this.receiver !== newRcvr)
            {debugger; throw "receivers don't match";}
        if (this.sp < this.lowStackSize)
            this.handleLowStack();
        this.checkForInterrupts();
    },
    doRemoteReturn: function() {
        // reverse of primitiveValue()
        var reply = this.pop();
        var returnFrame = (this.activeProcessPointers.length - this.pop());
        var returnPC = this.pop() - NT.PC_BIAS;
        var rCode = this.pop(); // might want to check that we're in the same process
        /////// Whoosh //////
        this.bp = this.loadFromFrame(returnFrame);
        this.pc = returnPC;
        this.push(reply);
        if (this.breakOnFrameChanged) {
            this.breakOnFrameChanged = false;
            this.breakNow();
        }
    },
    doReturn: function() {
        // reverse of executeNewMethod()
        if (this.breakOnFrameReturned === this.bp) {
            this.breakOnFrameReturned = null;
            this.breakNow();
        }
        var reply = this.pop();
        /////// Whoosh //////
        this.popFrame();
        this.loadFromFrame(this.bp);
        this.push(reply);
        if (this.breakOnFrameChanged) {
            this.breakOnFrameChanged = false;
            this.breakNow();
        }
        if (this.sp > this.lowStackSize)
            this.lowStackSignaled = false;
    },
    doQuickSend: function(obj, index) {
        // pop receiver, push self or my inst var at index
        this.quickSendCount++;
        if (index === 255)
            return this.activeProcessPointers[this.sp] = obj;
        if (index >= obj.pointers.size) {
            throw "quick push out of range?"
        }
        this.activeProcessPointers[this.sp] = obj.pointers[index];
    },
    tryPrimitive: function(primIndex, argCount, newMethod, newMethodClass) {
        this.primitiveCount++;
        var success = this.primHandler.doPrimitive(primIndex, argCount, newMethod, newMethodClass);
        return success;
    },
    findMethodCacheEntry: function(selector, lkupClass) {
        //Probe the cache, and return the matching entry if found
        //Otherwise return one that can be used (selector and class set) with method == null.
        //Initial probe is class xor selector, reprobe delta is selector
        //We do not try to optimize probe time -- all are equally 'fast' compared to lookup
        //Instead we randomize the reprobe so two or three very active conflicting entries
        //will not keep dislodging each other
        var entry;
        this.methodCacheRandomish = (this.methodCacheRandomish + 1) & 3;
        var firstProbe = ((selector.oop ^ lkupClass.oop) >> 1) & this.methodCacheMask;
        var probe = firstProbe;
        for (var i = 0; i < 4; i++) { // 4 reprobes for now
            entry = this.methodCache[probe];
            if (entry.selector === selector && entry.lkupClass === lkupClass) return entry;
            if (i === this.methodCacheRandomish) firstProbe = probe;
            probe = (probe + selector.oop) & this.methodCacheMask;
        }
        entry = this.methodCache[firstProbe];
        entry.lkupClass = lkupClass;
        entry.selector = selector;
        entry.method = null;
        return entry;
    },
    flushMethodCache: function() { //clear all cache entries
        for (var i = 0; i < this.methodCacheSize; i++) {
            this.methodCache[i].selector = null;   // mark it free
            this.methodCache[i].method = null;  // release the method
        }
        return true;
    },
    flushMethodCacheAfterBecome: function(mutations) {
        // could be selective by checking lkupClass, selector,
        // and method against mutations dict
        this.flushMethodCache();
    },
},
'frame', {
    currentFrameTempOrArg: function(tempIndex) {
        return tempIndex < this.methodNumArgs ?
            this.bp + NT.FI_LAST_ARG + (this.methodNumArgs - 1 - tempIndex) :
            this.bp + NT.FI_FIRST_TEMP - (tempIndex - this.methodNumArgs);
    },
    pushPCBP: function() {
        // Save the state of PC and BP on the stack
        this.push(this.pc + NT.PC_BIAS);
        this.push(this.bp - this.sp);  // delta relative to sp before the push
    },
    popPCBP: function() {
        // Load context frame from the stack
        this.bp = this.pop() + this.sp;  // + 1 because delta was computed before push
        this.pc = this.pop() - NT.PC_BIAS;  // Bias due to NT shorter header
    },
    pushFrame: function(method, methodClass, argCount) {
        var newFrame = this.sp - NT.FI_RECEIVER;
        if (newFrame <= NT.PI_PROCESS_STACK)
            throw "stack overflow";
        this.push(methodClass);
        this.push(method);
        this.push(argCount);
        this.pushPCBP();
        if (this.sp !== newFrame) throw "bad frame size";
    },
    popFrame: function() {
        this.popN(this.bp - this.sp); // drop temps
        this.popPCBP();                         // restore previous frame and pc
        this.popN(4 + this.methodNumArgs);      // drop old frame + args
    },
    loadFromFrame: function(aFrame) {
        // cache values from current frame in slots
        this.method = this.activeProcessPointers[aFrame + NT.FI_METHOD];
        this.methodBytes = this.method.bytes;
        this.methodNumArgs = this.activeProcessPointers[aFrame + NT.FI_NUMARGS];
        this.receiver = this.activeProcessPointers[aFrame + NT.FI_RECEIVER];
        return aFrame;
    },
    sleepProcess: function() {
        // Preserve state of sp in variable 'top' (after saving PC and BP)
        this.activeProcessPointers[NT.PI_PROCESS_TOP] = (this.activeProcessPointers.length - this.sp) - 1;
        return this.activeProcess;
    },
    wakeProcess: function(proc) {
        // Install a new active process and load sp, ready to restore other state
        this.activeProcess = proc;
        this.activeProcessPointers = this.activeProcess.pointers;
        this.sp = (this.activeProcessPointers.length - this.activeProcessPointers[NT.PI_PROCESS_TOP]) - 1;
    },
},
'stack access', {
    pop: function() {
        var value = this.activeProcessPointers[this.sp];
        this.activeProcessPointers[this.sp++] = this.nilObj;
        return value;
    },
    popN: function(nToPop) {
        for (var i = 0; i < nToPop; i++)
            this.activeProcessPointers[this.sp++] = this.nilObj;
        return true;
    },
    push: function(oop) {
        this.activeProcessPointers[--this.sp] = oop;
    },
    popNandPush: function(nToPop, oop) {
        for (var i = 1; i < nToPop; i++)
            this.activeProcessPointers[this.sp++] = this.nilObj;
        this.activeProcessPointers[this.sp] = oop;
        return true;
    },
    top: function() {
        return this.activeProcessPointers[this.sp];
    },
    stackValue: function(depthIntoStack) {
        return this.activeProcess.pointers[this.sp + depthIntoStack];
    },
    stackInteger: function(depthIntoStack) {
        return this.checkSmallInt(this.stackValue(depthIntoStack));
    },
    pop2AndPushIntResult: function(intResult) {// returns success boolean
        if (this.success && this.canBeSmallInt(intResult)) {
            this.popNandPush(2, intResult);
            return true;
        }
        return false;
    },
    pop2AndPushBoolResult: function(boolResult) {
        if (!this.success) return false;
        this.popNandPush(2, boolResult ? this.trueObj : this.falseObj);
        return true;
    },
    handleLowStack: function() {
        if (this.growStack())
            return;
        if (!this.lowStackSignaled) {
            this.lowStackSignaled = true;
            this.push(this.primHandler.makeStString('stack space is low'));
            this.push(this.receiver);
            this.send(this.image.selectorNamed('error:'), 1);
        }
    },
    growStack: function() {
        var delta = 500,
            totalBytesBefore = this.activeProcess.totalBytes(),
            oldPointers = this.activeProcess.pointers,
            oldLength = oldPointers.length,
            newLength = oldLength + delta;
        if (newLength - NT.PI_PROCESS_STACK > this.maxStackSize)
            return false; // refuse to grow larger
        console.log("Growing stack to " + (newLength - NT.PI_PROCESS_STACK));
        var newPointers = [];
        for (var i = 0; i < NT.PI_PROCESS_STACK; i++)
            newPointers.push(oldPointers[i]);
        for (var i = 0; i < delta; i++)
            newPointers.push(this.nilObj);
        for (var i = NT.PI_PROCESS_STACK; i < oldLength; i++)
            newPointers.push(oldPointers[i]);
        if (newPointers.length !== newLength) throw "stack growing error"
        this.sp += delta;
        this.bp += delta;
        this.activeProcess.pointers = newPointers;
        this.activeProcessPointers = newPointers;
        this.primHandler.clearAtCache(); // might have cached process size
        if (this.activeProcess.oop >= 0) // is in old space
            this.image.oldSpaceBytes += this.activeProcess.totalBytes() - totalBytesBefore;
        return true;
    },
},
'numbers', {
    getClass: function(obj) {
        if (this.isSmallInt(obj))
            return this.integerClass;
        return obj.stClass;
    },
    canBeSmallInt: function(anInt) {
        return (anInt >= NT.MIN_INT) && (anInt <= NT.MAX_INT);
    },
    isSmallInt: function(object) {
        return typeof object === "number";
    },
    checkSmallInt: function(maybeSmall) { // returns an int and sets success
        if (this.isSmallInt(maybeSmall))
            return maybeSmall;
        this.success = false;
        return 1;
    },
    safeShift: function(bitsToShift, shiftCount) {
        if (shiftCount<0) return bitsToShift>>-shiftCount; //OK to lose bits shifting right
        //check for lost bits by seeing if computation is reversible
        var shifted = bitsToShift<<shiftCount;
        if ((shifted>>shiftCount) === bitsToShift) return shifted;
        return NT.NON_INT;  //non-small result will cause failure
    },
},
'utils',
{
    instantiateClass: function(aClass, indexableSize) {
        return this.image.instantiateClass(aClass, indexableSize, this.nilObj);
    },
    getHash: function(object) {
        // in 16 bit objects, the hash is the actual oop
        var oop = this.image.objectToOop(object);           // allocate non-temp oop
        if (oop <= 0xFFFF) return (oop >> 1) & NT.MAX_INT;
        // in 32 bit objects, hash is stored explicitely
        if (! ('hash' in object))
            object.hash = Math.random() * NT.MAX_INT + 1 | 0;
        return object.hash;
    },
    arrayFill: function(array, fromIndex, toIndex, value) {
        // assign value to range from fromIndex (inclusive) to toIndex (exclusive)
        for (var i = fromIndex; i < toIndex; i++)
            array[i] = value;
    },
    arrayCopy: function(src, srcPos, dest, destPos, length) {
        // copy length elements from src at srcPos to dest at destPos
        if (src === dest && srcPos < destPos)
            for (var i = length - 1; i >= 0; i--)
                dest[destPos + i] = src[srcPos + i];
        else
            for (var i = 0; i < length; i++)
                dest[destPos + i] = src[srcPos + i];
    },
},
'debugging', {
    printMethod: function(aMethod) {
        // return a 'class>>selector' description for the method
        // in old images this is expensive, we have to search all classes
        if (!aMethod) aMethod = this.method;
        var found;
        this.allMethodsDetect(function(classObj, methodObj, selectorObj) {
            if (methodObj === aMethod)
                return found = classObj.className() + '>>' + selectorObj.bytesAsUnicode();
        });
        return found || "?>>?";
    },
    allMethodsDetect: function(callback) {
        // callback(classObj, methodObj, selectorObj) should return true to break out of iteration
        var globals = this.image.globals.pointers[NT.PI_SYMBOLTABLE_VALUES].pointers,
            found = {};
        for (var i = 0; i < globals.length; i++) {
            var objRef = globals[i];
            if (!objRef.isNil) {
                var cls = objRef.pointers[NT.PI_OBJECTREFERENCE_VALUE];
                if (typeof cls === 'object' && cls.isClass()) {
                    found[cls.oop] = true;
                    var mdict = cls.pointers[NT.PI_CLASS_MDICT];
                    var selectors = mdict.pointers[NT.PI_MESSAGEDICT_OBJECTS].pointers;
                    var methods = mdict.pointers[NT.PI_MESSAGEDICT_METHODS].pointers;
                    for (var j = 0; j < methods.length; j++)
                        if (!methods[j].isNil) {
                            if (callback.call(this, cls, methods[j], selectors[j]))
                                return;
                        }
                }
            }
        }
        // try again the expansive way
        var cls = this.image.firstOldObject;
        while (cls = cls.nextObject) {
            if (!cls.isClass() || found[cls.oop]) continue;
            var mdict = cls.pointers[NT.PI_CLASS_MDICT];
            var selectors = mdict.pointers[NT.PI_MESSAGEDICT_OBJECTS].pointers;
            var methods = mdict.pointers[NT.PI_MESSAGEDICT_METHODS].pointers;
            for (var j = 0; j < methods.length; j++)
                if (!methods[j].isNil) {
                    if (callback.call(this, cls, methods[j], selectors[j]))
                        return;
                }
        }
    },
    printStack: function(ctx, limit) {
        // both args are optional
        if (typeof ctx === "number") {limit = ctx; ctx = null;}
        if (!ctx) ctx = this.activeProcess;
        if (!limit) limit = 100;
        var stack = '',
            process = ctx.pointers,
            bp = this.bp,
            sp = this.sp,
            remoteCodeClass = this.primHandler.remoteCodeClass;
        while (limit-- > 0) {
            while (sp++ < bp) { // look for remoteCode activations in stack of current frame
                var rCode = process[sp];
                if (rCode.stClass !== remoteCodeClass) continue;
                if (rCode.pointers[NT.PI_RCODE_STACKOFFSET] === process.length - sp) {
                    var homeBP = process.length - rCode.pointers[NT.PI_RCODE_FRAMEOFFSET],
                        homeMethod = process[homeBP + NT.FI_METHOD];
                    stack = '[] in ' + this.printMethod(homeMethod) + '\n' + stack;
                    // continue with the frame that eval'ed this remoteCode
                    bp = process.length - process[sp - 2]; // stored BP
                }
            }
            var method = process[bp + NT.FI_METHOD],
                deltaBP = process[bp + NT.FI_SAVED_BP] + 1;
            stack = this.printMethod(method) + '\n' + stack;
            if (deltaBP <= 1) return stack;
            bp += deltaBP;
        }
        return stack;
    },
    findMethod: function(classAndMethodString) {
        // classAndMethodString is 'Class>>method'
        var found;
        this.allMethodsDetect(function(classObj, methodObj, selectorObj) {
            var thisMethod = classObj.className() + '>>' + selectorObj.bytesAsUnicode();
            if (classAndMethodString === thisMethod)
                return found = methodObj;
        });
        return found;
    },
    breakOn: function(classAndMethodString) {
        // classAndMethodString is 'Class>>method'
        return this.breakOnMethod = classAndMethodString && this.findMethod(classAndMethodString);
    },
    breakOnGlobal: function(name) {
        this.breakOnLiteral = this.image.globalRefNamed(name);
        return this.breakOnLiteral;
    },
    breakNow: function(msg) {
        if (msg) console.log("Break: " + msg);
        this.breakOutOfInterpreter = 'break';
    },
    breakOnReturn: function() {
        this.breakOnFrameChanged = false;
        this.breakOnFrameReturned = this.bp;
    },
    breakOnSendOrReturn: function() {
        this.breakOnFrameChanged = true;
        this.breakOnFrameReturned = null;
    },
    printActiveProcess: function(printAll, debugFrame) {
        // temps and stack in current context
        var ctx = this.activeProcessPointers,
            bp = this.bp,
            sp = this.sp,
            numArgs = ctx[bp + NT.FI_NUMARGS],
            numTemps = ctx[bp + NT.FI_METHOD].methodNumTemps();
        var stack = '';
        if (debugFrame) stack += Strings.format("\npc: %s sp: %s bp: %s numArgs: %s\n",
            this.pc, this.sp, this.bp, numArgs);
        for (var i = this.sp; i < ctx.length; i++) {
            if (!debugFrame && bp + NT.FI_SAVED_BP <= i && bp + NT.FI_RECEIVER > i) continue;
            var obj = ctx[i];
            var value = obj && obj.stInstName ? obj.stInstName(32) : obj;
            stack += Strings.format('\n[%s] %s%s', i,
                bp + NT.FI_FIRST_TEMP - numTemps < i && i <= bp + NT.FI_FIRST_TEMP
                    ? ('temp' + (bp-1+numArgs-i) + '/t' + (bp+numArgs-i) + ': ') :
                bp + NT.FI_SAVED_BP === i ? ' savedBP: ' :
                bp + NT.FI_CALLER_PC === i ? 'callerPC: ' :
                bp + NT.FI_NUMARGS === i ? ' numArgs: ' :
                bp + NT.FI_METHOD === i ? '  method: ' :
                bp + NT.FI_MCLASS === i ? '  mclass: ' :
                bp + NT.FI_RECEIVER === i ? 'receiver: ' :
                bp + NT.FI_RECEIVER < i && i <= bp + NT.FI_RECEIVER + numArgs
                    ? (' arg' + (bp+5+numArgs-i) + '/t' + (bp+6+numArgs-i) + ': ') :
                sp === i ? '   sp ==> ' :
                '          ', value);
            if (i >= bp + NT.FI_RECEIVER + numArgs && i+1 < ctx.length) {
                if (!printAll) return stack;
                sp = bp + NT.FI_LAST_ARG + numArgs;
                bp += ctx[bp + NT.FI_SAVED_BP] + 1;
                // look for remoteCode activation on stack
                for (var j = sp; j < bp; j++){
                    var rCode = ctx[j];
                    if (rCode.stClass !== this.primHandler.remoteCodeClass) continue;
                    if (rCode.pointers[NT.PI_RCODE_STACKOFFSET] === ctx.length - j) {
                        var homeBP = ctx.length - rCode.pointers[NT.PI_RCODE_FRAMEOFFSET],
                            homeMethod = ctx[homeBP + NT.FI_METHOD];
                        stack += '\n\n[] in ' + this.printMethod(homeMethod);
                        if (debugFrame) {
                            while (++i <= j) {
                                obj = ctx[i];
                                value = obj && obj.stInstName ? obj.stInstName(32) : obj;
                                stack += Strings.format('\n[%s] %s%s', i,
                                i === j-2 ? '  homeBP: ' :
                                i === j-1 ? '  homePC: ' :
                                i === j ?   '   rCode: ' :
                                '          ', value);
                            }
                            i--;
                        }
                        bp = ctx.length - ctx[j - 2]; // continue at stored BP
                    }
                }
                numArgs = ctx[bp + NT.FI_NUMARGS];
                numTemps = ctx[bp + NT.FI_METHOD].methodNumTemps();
                stack += '\n\n' + this.printMethod(ctx[bp + NT.FI_METHOD]);
            }
        }
        return stack;
    },
    printByteCodes: function(aMethod, optionalIndent, optionalHighlight, optionalPC) {
        var printer = new St78.vm.InstructionPrinter(aMethod || this.method, this);
        return printer.printInstructions(optionalIndent, optionalHighlight, optionalPC);
    },
    willSendOrReturn: function() {
        // Answer whether the next bytecode corresponds to a Smalltalk
        // message send or return
        var byte = this.method.bytes[this.pc];
        return byte >= 0xB0 || byte === 0x8C || byte === 0x83;
    },
});

Object.subclass('St78.vm.Primitives',
'initialization', {
    initialize: function(vm, display, files) {
        this.vm = vm;
        this.display = display;         // display interface
        this.display.vm = this.vm;
        NT.kbMap = this.vm.image.globalNamed('NTkbMap').bytes;
        this.fileStrings = files || {};
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (/^notetaker:/.test(key))
                this.fileStrings[key.replace(/^notetaker:/, '')] = localStorage[key];
        };
        this.displayPixels = null;      // HTML canvas pixel data matching this.display.ctx
        this.displayBlt = null;         // the current Smalltalk display/cursor object, also stored in image header
        this.displayBits = null;        // accessor for words in Smalltalk display
        this.displayPitch = 0;          // number of words per line in displayBits
        this.cursorBits = null;         // accessor for words in Smalltalk cursor
        this.cursorX = 0;
        this.cursorY = 0;
        this.cursorOffsetX = 0;
        this.cursorOffsetY = 0;
        this.damage = {dirtyRects: []};
        this.initAtCache();
        this.remoteCodeClass = vm.image.objectFromOop(NT.OOP_CLREMOTECODE);
        this.processClass = vm.image.objectFromOop(NT.OOP_CLPROCESS);
        this.pointClass = this.vm.image.objectFromOop(NT.OOP_CLPOINT);
        this.floatClass = this.vm.image.objectFromOop(NT.OOP_CLFLOAT);
        this.naturalClass = this.vm.image.objectFromOop(NT.OOP_CLNATURAL);
        this.largeIntegerClass = this.vm.image.objectFromOop(NT.OOP_CLLARGEINTEGER);
        this.stringClass = this.vm.image.objectFromOop(NT.OOP_CLSTRING);
        this.compiledMethodClass = this.vm.image.objectFromOop(NT.OOP_CLCOMPILEDMETHOD);
        this.uniqueStringClass = this.vm.image.objectFromOop(NT.OOP_CLUNIQUESTRING);
        this.vectorClass = this.vm.image.objectFromOop(NT.OOP_CLVECTOR);
        this.streamClass = this.vm.image.objectFromOop(NT.OOP_CLSTREAM);
        this.bitBltClass = this.vm.image.globalNamed('BitBlt');
        this.idleCounter = 0;
    },
},
'dispatch', {
    doSpecial: function(lobits) {
        // returns true if it succeeds
        this.success = true;
        switch (lobits) {
            case 0x0: return this.popNandPushIfOK(2, this.objectAt(this.stackNonInteger(0), this.stackLargeInt(1))); // ◦
            case 0x1: return this.popNandPushIfOK(3, this.objectAtPut(this.stackNonInteger(0), this.stackLargeInt(2), this.vm.stackValue(1))); // ◦ ←
            case 0x2: return this.primitiveNext(0); // next
            case 0x3: return this.primitiveNextPut(1); // next←
            case 0x4: return this.popNandPushIfOK(1, this.objectSize()); // length
            case 0x5: return this.pop2andPushBoolIfOK(this.vm.stackValue(0) === this.vm.stackValue(1)); // ==
            //case 0x6: return false; // is:
            //case 0x7: return false; // append:
            case 0x8: return this.popNandPushIfOK(1,this.vm.getClass(this.vm.top())); // class
            case 0x9: return this.primitiveRemoteCopy(0); // remoteCopy
            case 0xA: return this.primitiveValue(0); // eval
            //case 0xB: return false; // new
            //case 0xC: return false; // new:
            //case 0xD: return false; // x
            //case 0xE: return false; // y
            //case 0xF: return false; // asStream
        }
        return false;
    },
    emulatePrimitive: function(argCount, newMethod, newMethodClass) {
        // Control arrives here with rcvr being a ProcessFrame and first arg being the primitive index
        // Below there, the stack should be the receiver and args as they are in the process.
        // So we simply call doPrimitive to run it.
        var pFrame = this.vm.pop();
        var index = this.vm.pop();
        var rcvr = this.vm.stackValue(0);
        var arg1 = this.vm.stackValue(1);
        var arg2 = this.vm.stackValue(2);
         debugger;  //Need to check order of args in this case (o <-)
        if (this.doPrimitive(index, argCount-2, newMethod, newMethodClass)) return true;
        this.vm.push(index);
        this.vm.push(pFrame);  // Restore process frame receiver
        return false;   // and fail for it
    },
    doPrimitive: function(index, argCount, newMethod, newMethodClass) {
        this.success = true;
        this.floatReceiver = false;
        switch (index) {
            case 0: return this.popNandPushNumIfOK(2,this.stackIntOrFloat(0) + this.stackIntOrFloat(1));  // add
            case 1: return this.popNandPushNumIfOK(2,this.stackIntOrFloat(0) - this.stackIntOrFloat(1));  // subtract
            case 2: return this.pop2andPushBoolIfOK(this.stackIntOrFloat(0) < this.stackIntOrFloat(1));   // less
            case 3: return this.pop2andPushBoolIfOK(this.stackIntOrFloat(0) > this.stackIntOrFloat(1));   // greater
            case 4: return this.pop2andPushBoolIfOK(this.stackIntOrFloat(0) <= this.stackIntOrFloat(1));  // leq
            case 5: return this.pop2andPushBoolIfOK(this.stackIntOrFloat(0) >= this.stackIntOrFloat(1));  // geq
            case 6: return this.pop2andPushBoolIfOK(this.stackIntOrFloat(0) === this.stackIntOrFloat(1)); // equal
            case 7: return this.pop2andPushBoolIfOK(this.stackIntOrFloat(0) !== this.stackIntOrFloat(1)); // notequal
            case 8: return this.popNandPushNumIfOK(2,this.stackIntOrFloat(0) * this.stackIntOrFloat(1));  // multiply *
            case 9: return this.popNandPushNumIfOK(2,this.doDiv(this.stackIntOrFloat(0),this.stackIntOrFloat(1)));  // divide /
            case 10: return this.popNandPushNumIfOK(2,this.doRem(this.stackIntOrFloat(0),this.stackIntOrFloat(1)));  // rem \\
            case 11: return this.primitiveMakePoint(argCount);  // @ - make a Point
            case 12: return this.popNandPushIfOK(2,this.doBitShift());  // SmallInt.bitShift
            case 13: return this.popNandPushIfOK(2,this.doBitXor());  // SmallInt.bitXor
            case 14: return this.popNandPushIfOK(2,this.doBitAnd());  // SmallInt.bitAnd
            case 15: return this.popNandPushIfOK(2,this.doBitOr());  // SmallInt.bitOr
            case 18: return this.primitiveNext(argCount); // Stream.next
            case 19: return this.primitiveNextPut(argCount); // Stream.next←
            case 20: return false; // ???
            case 24: return this.popNandPushIfOK(1,this.vm.getClass(this.vm.top())); // class
            case 25: return this.primitiveRemoteCopy(argCount); // Process.remoteCopy
            case 26: return this.primitiveValue(argCount); // RemoteCode.value
            case 27: return this.primitiveNew(argCount); // argCount = 0 fixed size
            case 28: return this.primitiveNew(argCount); // argCount = 1 variable
            case 32: return this.popNandPushFloatIfOK(1,this.stackInteger(0)); // primitiveAsFloat
            case 33: return this.popNandPushIntIfOK(1,Math.trunc(this.stackFloat(0))); // primitiveAsInteger
            case 34: return this.popNandPushFloatIfOK(1,this.stackFloat(0)|0); // primitiveIntegerPart
            case 35: {var f = this.stackFloat(0); return this.popNandPushFloatIfOK(1, f - (f|0));} // primitiveFractionPart
            case 36: return this.popNandPushIntIfOK(1, this.vm.getHash(this.stackNonInteger(0))); // Object.hash
            case 38: return this.primitiveBecome(argCount); // Object.become()
            case 39: return this.primitiveValueGets(argCount); // RemoteCode.value_
            case 40: return this.primitiveCopyBits(argCount);  // BitBlt.callBLT
            case 41: return this.primitiveBeDisplayAndCursor(argCount); // BitBlt install for display
            case 45: return this.primitiveSaveImage(argCount);
            case 46: return this.primitiveInstField(argCount); //instField:
            case 47: return this.primitiveInstField(argCount); //instField: <-
            case 48: return this.primitivePerform(argCount); // Object>>perform:
            case 49: return this.primitiveRefCount(argCount); // Object>>refct
            case 50: return this.primitiveScanWord(argCount); // TextScanner>>scanword:
            //case 51: String.alignForDisplay
            case 52: return this.emulatePrimitive(argCount, newMethod, newMethodClass); // do primitive if possible
            case 53: this.vm.popN(argCount); return true; // altoDoAnything
            case 54: return true; //was purge
            case 55: return this.primitiveRunMethod(argCount);
            //case 56: primEqual
            //case 57: user.core
            case 58: return this.primitiveMousePoint(argCount);
            case 59: return true; //UserView.primCursorLoc←
            case 61: return this.primitiveKeyboardPeek(argCount);
            case 62: return this.primitiveKeyboardNext(argCount);
            case 66: return this.primitiveFileString(argCount);  // co-opted from user primPort:
            case 68: return this.primitiveMouseButtons(argCount);
            case 71: return this.primitiveSecondClock(argCount); // primitiveTime - seconds since 1901
            // the primitives below were not in the original Notetaker
            case 100: return this.primitiveAllInstances(argCount);
            case 101: return this.primitiveClipboardText(argCount);
            case 102: return this.primitiveTicks(argCount); // primitiveTicks
            case 103: this.vm.flushMethodCache(); return true; // primitiveFlushCache
            case 104: return this.primitiveWait(argCount); // primitiveWait
            case 200: return this.popNandPushFloatIfOK(1,Math.sqrt(this.stackFloat(0))); // primitiveSqrt
            case 201: return this.popNandPushFloatIfOK(1,Math.cos(this.stackFloat(0))); // primitiveCos
            case 202: return this.popNandPushFloatIfOK(1,Math.sin(this.stackFloat(0))); // primitiveSin
            case 203: return this.popNandPushFloatIfOK(1,Math.tan(this.stackFloat(0))); // primitiveTan
            case 204: return this.popNandPushFloatIfOK(1,Math.atan(this.stackFloat(0))); // primitiveArctan
            case 210: return this.popNandPushIfOK(2, this.makeLargeIfNeeded(this.stackLargeInt(0) + this.stackLargeInt(1))); // primitiveAddLargeIntegers
            case 211: return this.popNandPushIfOK(2, this.makeLargeIfNeeded(this.stackLargeInt(0) - this.stackLargeInt(1))); // primitiveSubtractLargeIntegers
            case 214: {var a = this.stackLargeInt(0), b = this.stackLargeInt(1); return this.popNandPushIfOK(2, a < b ? 1 : a === b ? 2 : 3)}; // primitiveCompareLargeInt
            case 240: return this.popNandPushFloatIfOK(argCount + 1, this.pathDistance(argCount)); // primitive Dollar1 pathLength

        }
        throw "primitive " + index + " not implemented yet";
        return false;
    },
},
'stack access', {
    pop2andPushBoolIfOK: function(bool) {
        this.vm.success = this.success;
        return this.vm.pop2AndPushBoolResult(bool);
    },
    popNandPushIfOK: function(nToPop, returnValue) {
        if (!this.success || returnValue == null) return false; // null or undefined
        this.vm.popNandPush(nToPop, returnValue);
        return true;
    },
    popNandPushNumIfOK: function(nToPop, returnValue) {
        if (!this.success) return false;
        if (this.floatReceiver)
            returnValue = this.makeFloat(returnValue);
        else if (!this.vm.canBeSmallInt(returnValue)) return false;
        this.vm.popNandPush(nToPop, returnValue);
        return true;
    },
    popNandPushFloatIfOK: function(nToPop, returnValue) {
        if (this.success)
            this.vm.popNandPush(nToPop, this.makeFloat(returnValue));
        return this.success;
    },
    stackNonInteger: function(nDeep) {
        return this.checkNonInteger(this.vm.stackValue(nDeep));
    },
    stackInteger: function(nDeep) {
        return this.checkSmallInt(this.vm.stackValue(nDeep));
    },
    fromLargeInt: function(obj) {
        if (this.vm.isSmallInt(obj))
            return obj;
        if (obj.stClass === this.largeIntegerClass) {
            var large = obj.largeIntegerValue();
            if (large >= -0x80000000 && large <= 0x7FFFFFFF)
                return large;
        }
        this.success = false;
        return 0;
    },
    stackLargeInt: function(nDeep) {
        return this.fromLargeInt(this.vm.stackValue(nDeep));
    },
    popNandPushIntIfOK: function(nToPop, returnValue) {
        if (!this.success) return false;
        if (this.vm.canBeSmallInt(returnValue)) return this.popNandPushIfOK(nToPop, returnValue);
        return false;
    },
    stackIntOrFloat: function(nDeep) {
        var obj = this.vm.stackValue(nDeep);
        if (this.vm.isSmallInt(obj)) return obj;
        if (obj.isFloat && (nDeep === 0 || this.floatReceiver)) {
            this.floatReceiver = true;
            return obj.float;
        }
        this.success = false;
        return 0;
    },
    stackFloat: function(nDeep) {
        return this.checkFloat(this.vm.stackValue(nDeep));
    }
},
'numbers', {
    doBitAnd: function() {
        var rcvr = this.stackInteger(0);
        var arg = this.stackInteger(1);
        if (!this.success) return 0;
        return rcvr & arg;
    },
    doBitOr: function() {
        var rcvr = this.stackInteger(0);
        var arg = this.stackInteger(1);
        if (!this.success) return 0;
        return rcvr | arg;
    },
    doBitXor: function() {
        var rcvr = this.stackInteger(0);
        var arg = this.stackInteger(1);
        if (!this.success) return 0;
        return rcvr ^ arg;
    },
    doBitShift: function() {
        var rcvr = this.stackInteger(0);
        var arg = this.stackInteger(1);
        if (!this.success) return 0;
        var result = this.vm.safeShift(rcvr, arg); // returns non-int if failed
        if (this.vm.canBeSmallInt(result))
            return result;
        this.success = false;
        return 0;
    },
    doDiv: function(rcvr, arg) {
        if (arg === 0) return this.success = false;
        return this.floatReceiver ? rcvr/arg : Math.trunc(rcvr/arg);
    },
    doRem: function(rcvr, arg) {
        if (arg === 0) return this.success = false;
        return rcvr - Math.trunc(rcvr/arg) * arg;
    },
},
'utils', {
    checkFloat: function(maybeFloat) { // returns a float and sets success
        if (maybeFloat.isFloat)
            return maybeFloat.float;
        this.success = false;
        return 0.0;
    },
    checkSmallInt: function(maybeSmall) { // returns an int and sets success
        if (this.vm.isSmallInt(maybeSmall))
            return maybeSmall;
        this.success = false;
        return 0;
    },
    checkNonInteger: function(obj) { // returns an St78Object and sets success
        if (!this.vm.isSmallInt(obj))
            return obj;
        this.success = false;
        return this.vm.nilObj;
    },
    makeFloat: function(value) {
        var newFloat = this.vm.instantiateClass(this.floatClass, 0);
        newFloat.isFloat = true;
        newFloat.float = value;
        return newFloat;
	},
    makePointWithXandY: function(x, y) {
        var newPoint = this.vm.instantiateClass(this.pointClass, 0);
        newPoint.pointers[NT.PI_POINT_X] = x;
        newPoint.pointers[NT.PI_POINT_Y] = y;
        return newPoint;
    },
    makeStString: function(jsStringOrArray) {
        var bytes = [];
        if (typeof jsStringOrArray === "string") {
            for (var i = 0; i < jsStringOrArray.length; i++)
                bytes.push(jsStringOrArray.charCodeAt(i) & 0xFF);
        } else {
            for (var i = 0; i < jsStringOrArray.length; i++)
                bytes.push(jsStringOrArray[i] & 0xFF);
        }
        var stString = this.vm.instantiateClass(this.stringClass, bytes.length);
        stString.bytes = bytes;
        return stString;
    },
    makeStVector: function(array) {
        var vector = this.vm.instantiateClass(this.vectorClass, array.length);
        for (var i = 0; i < array.length; i++)
            vector.pointers[i] = this.makeStObject(array[i]);
        return vector;
    },
    makeStObject: function(obj) {
        if (obj === undefined || obj === null) return this.vm.nilObj;
        if (obj === true) return this.vm.trueObj;
        if (obj === false) return this.vm.falseObj;
        if (obj.stClass) return obj;
        if (typeof obj === "string" || obj.constructor === Uint8Array) return this.makeStString(obj);
        if (obj.constructor === Array) return this.makeStVector(obj);
        if (typeof obj === "number")
            if (obj === (obj|0)) return this.makeLargeIfNeeded(obj);
            else return this.makeFloat(obj)
        throw "cannot make smalltalk object";
    },
    makeLargeInt: function(integer) {
        // JS numbers are only accurate to +/- 2**53
        if (integer < -0x20000000000000 || integer > 0x1fffffffffffff) {
            this.success = false;
            return 0;
        }
        var negative = integer < 0,
            bytes = [];
        if (negative) integer = -integer;
        while (integer) { bytes.push(integer & 0xFF); integer = Math.floor(integer / 256); }
        var natural = this.vm.instantiateClass(this.naturalClass, bytes.length),
            large = this.vm.instantiateClass(this.largeIntegerClass, 0);
        natural.bytes = bytes;
        large.pointers[NT.PI_LARGEINTEGER_BYTES] = natural;
        large.pointers[NT.PI_LARGEINTEGER_NEG] = this.makeBoolean(negative);
        return large;
    },
    makeLargeIfNeeded: function(integer) {
        return this.vm.canBeSmallInt(integer) ? integer : this.makeLargeInt(integer);
    },
    makeBoolean: function(bool) {
        return bool ? this.vm.trueObj : this.vm.falseObj;
    },
    pointsTo: function(rcvr, arg) {
        if (!rcvr.pointers) return false;
        return rcvr.pointers.indexOf(arg) >= 0;
    },
    idleMS: function() {
        // answer number of milliseconds to wait before starting to interpret again
        if (this.forceWait) {
            var ms = this.forceWait;
            this.forceWait = null;
            return ms;
        }
        // if not idle, resume interpreter ASAP
        if (this.idleCounter < 100) return 0;
        // otherwise, make up some number based on how recently we interacted
        var inactivityMS = Math.max(Date.now() - this.display.timeStamp - 500, 0); // go idle 500 ms after last event
        return inactivityMS;
    },
    asUint8Array: function(string) {
        if (string.constructor === Uint8Array) return string;
        var array = new Uint8Array(string.length);
        for (var i = 0; i < string.length; i++)
            array[i] = string.charCodeAt(i);
        return array;
    },
    fromUnicode: function(string) {
        var fromUnicode = {};
        for (var ntcode in NT.toUnicode) {
            var unicode = NT.toUnicode[ntcode];
            fromUnicode[unicode] = ntcode;
        }
        return string.split('').map(c => fromUnicode[c] || c).join('');
    },
},
'indexing', {
    indexableSize: function(obj) {
        if (this.vm.isSmallInt(obj)) return -1; // -1 means not indexable
        var instSize = obj.stClass.pointers[NT.PI_CLASS_INSTSIZE];
        if ((instSize & NT.FMT_ISVARIABLE) === 0) return -1;  // fail if not indexable

        if (obj.bytes) return obj.bytes.length;
        if (obj.words) return obj.words.length;
        return obj.pointersSize() - obj.stClass.classInstSize();
    },
    objectAt: function(array, index) {
        //Returns result of at: or sets success false
        if (!this.success) return array;
        var info = this.atCache[(array.oop >> 1) & this.atCacheMask];
        if (info.array !== array)
            info = this.makeAtCacheInfo(this.atCache, array);
        if (index < 1 || index > info.size) {this.success = false; return array;}
        if (array.words) // words
            return this.makeLargeIfNeeded(array.words[index-1]);
        if (array.bytes) // bytes...
            return array.bytes[index-1];
        // comes last to not report pointers of compiled methods
        if (array.pointers)
            return array.pointers[index-1+info.ivarOffset];
        throw "indexing problem"
    },
    primitiveInstField: function(argCount) {
        // Both instField: and instField: <-
        var rcvr = this.stackNonInteger(0);
        var index = this.stackInteger(argCount); //args out of order ;-)
        if (!this.success) return false;
        if (index === 1 && rcvr.stClass.oop === NT.OOP_CLFLOAT) {
          // field 1 is the exponent in the 3x16bit floating point format
          // but it is shifted left by 1 bit, low bit is the sign
          // uninitialized Floats have all bits 1
          var float = rcvr.isFloat ? frexp(rcvr.float) : {mantissa: 1, exponent: -1, sign: 1};
          if (argCount > 1) {
              var word = this.vm.stackInteger(1);
              float.exponent = word >> 1;
              float.sign = word & 1;
              rcvr.float = ldexp(float.mantissa, float.exponent, float.sign);
              if (!rcvr.isFloat) rcvr.isFloat = true;
          }
          return this.popNandPushIfOK(argCount + 1, (float.exponent << 1) | float.sign);
        }
        var instSize = rcvr.stClass.classInstSize();
        if (index < 1 || index > instSize) return false;
        if (argCount > 1) rcvr.pointers[index-1] = this.vm.stackValue(1);
        return this.popNandPushIfOK(argCount + 1, rcvr.pointers[index-1]);

        function frexp(value) {
            if (value === 0) return {mantissa: 0, exponent: 0, sign: 0};
            var sign = value < 0 ? 1 : 0;
            if (sign) value = -value;
            var data = new DataView(new ArrayBuffer(8));
            data.setFloat64(0, value);
            var bits = (data.getUint32(0) >>> 20) & 0x7FF;
            if (bits === 0) { // denormal
                data.setFloat64(0, value * Math.pow(2, 64));  // exp + 64
                bits = ((data.getUint32(0) >>> 20) & 0x7FF) - 64;
            }
            var exponent = bits - 1022;
            var mantissa = ldexp(value, -exponent, 0);
            return {mantissa: mantissa, exponent: exponent, sign: sign};
        }

        function ldexp(mantissa, exponent, sign) {
            var steps = Math.min(3, Math.ceil(Math.abs(exponent) / 1023));
            var result = mantissa;
            for (var i = 0; i < steps; i++)
                result *= Math.pow(2, Math.floor((exponent + i) / steps));
            if (sign) result = result * -1;
            return result;
        }
    },
    objectAtPut: function(array, index, objToPut) {
        //Returns result of at:put: or sets success false
        if (!this.success) return array;
        var info = this.atPutCache[(array.oop >> 1) & this.atCacheMask];
        if (info.array !== array)
            info = this.makeAtCacheInfo(this.atPutCache, array);
        if (index<1 || index>info.size) {this.success = false; return array;}
        if (array.pointers && !array.bytes) // pointers, but not compiled methods
            return array.pointers[index-1+info.ivarOffset] = objToPut;
        // words and bytes
        if (array.words) {  // words...
            var wordToPut = this.fromLargeInt(objToPut);
            if (this.success) array.words[index-1] = wordToPut & 0xFFFF;
            return objToPut;
        }
        if (array.bytes) { // bytes...
            var byteToPut = this.checkSmallInt(objToPut);
            if (this.success) array.bytes[index-1] = byteToPut & 0xFF;   // Just the lowest 8 bits of whatever is passed. Yes, really.
            return objToPut;
        }
        throw "indexing problem"
    },
    objectSize: function(argCount) {
        var rcvr = this.vm.stackValue(0);
        var size = this.indexableSize(rcvr);
        if (size === -1) {this.success = false; return -1}; //not indexable
        return this.makeLargeIfNeeded(size);
    },
    initAtCache: function() {
        // The purpose of the at-cache is to allow fast (bytecode) access to at/atput code
        // without having to check whether this object has overridden at, etc.
        this.atCacheSize = 32; // must be power of 2
        this.atCacheMask = this.atCacheSize - 1; //...so this is a mask
        this.atCache = [];
        this.atPutCache = [];
        this.nonCachedInfo = {};
        for (var i= 0; i < this.atCacheSize; i++) {
            this.atCache.push({});
            this.atPutCache.push({});
        }
    },
    clearAtCache: function() { //clear at-cache pointers (prior to GC)
        this.nonCachedInfo.array = null;
        for (var i= 0; i < this.atCacheSize; i++) {
            this.atCache[i].array = null;
            this.atPutCache[i].array = null;
        }
    },
    makeAtCacheInfo: function(atOrPutCache, array) {
        //Make up an info object and store it in the atCache or the atPutCache.
        //If it's not cacheable (it's a super send)
        //then return the info in nonCachedInfo.
        var cacheable = !this.vm.doSuper,
            instSize = array.stClass.classInstSize(),
            indexableSize = this.indexableSize(array),
            info = cacheable ? atOrPutCache[(array.oop >> 1) & this.atCacheMask] : this.nonCachedInfo;
        info.array = array;
        info.size = indexableSize;
        info.ivarOffset = instSize;
        return info;
    },
    primitiveNext: function(argCount) {
        var stream = this.vm.stackValue(0);
        if (stream.stClass !== this.streamClass) return false;
        var array = stream.pointers[NT.PI_STREAM_ARRAY],
            pos = this.fromLargeInt(stream.pointers[NT.PI_STREAM_POSITION]),
            limit = this.fromLargeInt(stream.pointers[NT.PI_STREAM_LIMIT]);
        if (!this.success || pos < 0 || pos >= limit) return false;
        ++pos;
        var result = this.objectAt(array, pos);
        if (!this.success) return false;
        stream.pointers[NT.PI_STREAM_POSITION] = this.makeLargeIfNeeded(pos);
        this.vm.popNandPush(argCount+1, result);
        return true;
    },
    primitiveNextPut: function(argCount) {
        var stream = this.vm.stackValue(0),
            objToPut = this.vm.stackValue(1);
        if (stream.stClass !== this.streamClass) return false;
        var array = stream.pointers[NT.PI_STREAM_ARRAY],
            pos = this.fromLargeInt(stream.pointers[NT.PI_STREAM_POSITION]),
            limit = this.fromLargeInt(stream.pointers[NT.PI_STREAM_LIMIT]);
        if (!this.success || pos < 0 || pos >= limit) return false;
        ++pos;
        var result = this.objectAtPut(array, pos, objToPut);
        if (!this.success) return false;
        stream.pointers[NT.PI_STREAM_POSITION] = this.makeLargeIfNeeded(pos);
        this.vm.popNandPush(argCount+1, result);
        return true;
    },
},
'basic',{
    primitiveAllInstances: function(argCount) {
        var rcvr = this.stackNonInteger(0);
        if (!this.success || !rcvr.isClass())
            return false;
        var instances = this.vm.image.allInstancesOf(rcvr);
        this.popNandPushIfOK(argCount + 1, this.makeStVector(instances));
        this.vm.forceInterruptCheck();
        return true;
    },
    primitiveMakePoint: function(argCount) {
        var x = this.vm.stackValue(0);
        var y = this.vm.stackValue(1);
        this.vm.popNandPush(2, this.makePointWithXandY(x, y));
        return true;
    },
    primitiveNew: function(argCount) {
        // Create a new instance
        // Note testing for argCount is *not* the way to check indexable
        // Instead we should be checking the instSize spec
        var rcvr = this.stackNonInteger(0);
        if (!this.success || !rcvr.isClass()) return false;
        if (argCount === 0) // fixed size
            return this.popNandPushIfOK(1, this.vm.instantiateClass(rcvr, 0));
        // variable size
        var size = this.stackInteger(1);
        if (this.success && size < 0) return false;  // negative size
        if (!this.success) {
            var largeSize = this.stackNonInteger(1);
            if (largeSize.stClass.oop !== NT.OOP_CLLARGEINTEGER) return false;
            size = largeSize.largeIntegerValue();
            if (size < 0 || size > NT.MAX_INSTSIZE) return false; // arbitrary limit
            this.success = true;
        }
        if (!((rcvr.pointers[NT.PI_CLASS_INSTSIZE] & NT.FMT_ISVARIABLE) > 0)) {
            console.log("Failure of new: due to instSize bit not set for class " + rcvr);
            return false
        }
        if (rcvr === this.compiledMethodClass)
            this.vm.flushMethodCache();
        return this.popNandPushIfOK(2, this.vm.instantiateClass(rcvr, size));
    },
    primitiveBecome: function(argCount) {
        if (argCount !== 1) return false;
        var rcvr = this.stackNonInteger(0);
        var arg = this.stackNonInteger(1);
        if (!this.success) return false;
        this.vm.forceInterruptCheck();
        return this.vm.image.bulkBecome([rcvr], [arg], true);
    },
},
'eval', {
    primitivePerform: function(argCount) {
        // handle perform: <selector> (with: arg)*
        this.vm.performCount++;
        if (this.vm.stackValue(argCount).stClass !== this.uniqueStringClass)
            return false;
        var args = [];
        for (var i = 0; i < argCount; i++) args.push(this.vm.pop());
        var selector = this.vm.pop();
        while (args.length) this.vm.push(args.pop());
        this.vm.send(selector, argCount - 1);
        return true;
    },
    primitiveRemoteCopy: function(argCount) {
        // Make a block-like outrigger to rcvr, a process
        this.vm.remoteCopyCount++;
        var rcvr = this.vm.stackValue(0);
	    if (rcvr !== this.vm.activeProcess) return false;
		var pc = this.vm.pc,
    		bp = this.vm.bp,
		    sp = this.vm.sp,
		    relBP = rcvr.pointers.length - bp,
    		relSP = rcvr.pointers.length - sp,
		    jumpInstr = this.vm.method.bytes[pc],
    		rCode = this.vm.instantiateClass(this.remoteCodeClass, 0);
		pc += jumpInstr < 0xA0 ? 1 : 2;
		// these are used in primitiveValue
		rCode.pointers[NT.PI_RCODE_FRAMEOFFSET] = relBP; // offset from end, used in ProcessFrame>>from:
		rCode.pointers[NT.PI_RCODE_STARTINGPC] = pc + NT.PC_BIAS;
		rCode.pointers[NT.PI_RCODE_PROCESS] = rcvr;
		this.vm.popNandPush(1, rCode);
		return true;
    },
    primitiveValue: function(argCount) {
        // One entry for RemoteCode eval, value, and for Process eval which does a full process switch
        this.vm.remoteEvalCount++;
        var rCode = this.vm.stackValue(0);
        if (rCode.stClass === this.processClass) return this.resume(rCode);
        if (rCode.stClass !== this.remoteCodeClass) return false;

        var contextLength = this.vm.activeProcessPointers.length;

        // store the current sp here to mark the rCode as activated
		rCode.pointers[NT.PI_RCODE_STACKOFFSET] = contextLength - this.vm.sp;

        // Common code to sleep this frame
        this.vm.push(this.vm.pc + NT.PC_BIAS);           // save PC and absBP for remoteReturn
        this.vm.push(contextLength - this.vm.bp);

        // Wake the remote context frame
        var frame = contextLength - rCode.pointers[NT.PI_RCODE_FRAMEOFFSET];
		this.vm.bp = this.vm.loadFromFrame(frame);
		this.vm.pc = rCode.pointers[NT.PI_RCODE_STARTINGPC] - NT.PC_BIAS;
        return true;
    },
    primitiveValueGets: function(argCount) {
		var value = this.vm.stackValue(1);
        if (!this.primitiveValue(0))
            return false;
		this.vm.push(value);		// for remote return (if there is only a ld/store opcode)
		this.vm.doStore(value, this.vm.nextByte());		// TODO emulate STOREMODE
		return true;
    },
    resume: function(processToRun) {
        // Called by <Process> eval - sleep the current process and wake processToRun
        // FIXME: this needs to be refactored with RCeval, RCreturn, and VM.loadActiveProcess
        // All should use common pushPCBP, popPCBP, and sleep/wake (for storing SP in top)

        // Push this frame and sleep this process
        this.vm.pop();                // drop receiver (old process)
        this.vm.pushPCBP();           // save PC and BP for remoteReturn, then preserve in top
        this.vm.sleepProcess();

        // Wake processToRun and load vm state   //NOTE: same as loadInitialContext
        this.vm.wakeProcess(processToRun);  // set up activeProcess and sp
        this.vm.popPCBP();            // restore pc and current frame
        this.vm.loadFromFrame(this.vm.bp);    // load all the rest from the frame
        this.vm.push(processToRun);           // push method return value (new process)
        return true;
    },
    primitiveRunMethod: function(argCount) {
        if (argCount !== 2) return false;
        var method = this.vm.stackValue(0),
            mClass = this.vm.stackValue(1),
            newRcvr = this.vm.stackValue(2);
        if (method.stClass !== this.compiledMethodClass || !mClass.isClass())
            return false;
        var primIndex = method.methodPrimitiveIndex();
            argCount = method.methodNumArgs();
        this.vm.popNandPush(3, newRcvr);
        if (this.vm.breakOnDoit) this.vm.breakNow("primitiveRunMethod called, likely a doit");
        this.vm.executeNewMethod(newRcvr, method, mClass, argCount, primIndex, true);
        return true;
    },
},
'platform', {
    primitiveQuit: function(argCount) {
        this.vm.breakOutOfInterpreter = 'break';
        return true;
    },
    primitiveSaveImage: function(argCount) {
        this.vm.pushPCBP();
        var process = this.vm.sleepProcess();
        var buffer = this.vm.image.writeToBuffer();
        this.vm.wakeProcess(process);
        this.vm.popPCBP();

        // write file asynchronously
        var imageName = window.localStorage['notetakerImageName'];
        if (!imageName || imageName === 'updated.st78' || !/.*\.st78/.test(imageName))
            imageName = 'default.st78';

        $world.prompt("Save image as", function(imageName) {
            if (!imageName) return alert("not saved");
            St78.vm.Image.saveBufferAs(buffer, imageName);
        }, imageName);
        return true;
    },
    primitiveExitToDebugger: function(argCount) {
        this.vm.breakOutOfInterpreter = 'break';
        debugger;
        return true;
    },
    primitiveRefCount: function(argCount) {
        var rcvr = this.vm.top(),
            count = 0;
        if (!this.vm.isSmallInt(rcvr)) {
            count = this.vm.image.referencesTo(rcvr).length;
            count = this.makeLargeIfNeeded(count);
            this.vm.forceInterruptCheck();
        }
        this.vm.popNandPush(argCount + 1, count);
        return true;
    },
    primitiveBeDisplayAndCursor: function(argCount) {
        var rcvr = this.vm.top();
        if (rcvr.stClass !== this.bitBltClass) {
            this.displayFlush();
            return this.popNandPushIfOK(argCount+1, this.makePointWithXandY(this.display.width, this.display.height));
        }
        this.setDisplayAndCursor(rcvr);
        this.vm.breakOutOfInterpreter = this.vm.breakOutOfInterpreter || true;   // show on screen
        this.vm.popN(argCount); // return self
        return true;
  	},

    primitiveWait: function(argCount) {
        if (argCount !== 1) return false;
        var milliseconds = this.stackLargeInt(1);
        if (!this.success) return false;
        this.displayFlush();
        this.forceWait = Math.max(milliseconds, 0);
        this.vm.breakOutOfInterpreter = this.vm.breakOutOfInterpreter || true;
        this.vm.pop(1);
        return true;
	},
	primitiveClipboardText: function(argCount) {
        if (argCount === 0) { // read from clipboard
            if (typeof(this.display.clipboardString) !== 'string') return false;
            this.vm.popNandPush(1, this.makeStString(this.fromUnicode(this.display.clipboardString)));
            this.display.clipboardStringChanged = false;
        } else if (argCount === 1) { // write to clipboard
            var stringObj = this.stackNonInteger(1);
            if (!stringObj.bytes) return false;
            this.display.clipboardString = stringObj.bytesAsUnicode();
            this.display.clipboardStringChanged = true;
            this.vm.popNandPush(2, stringObj);
            this.vm.breakOutOfInterpreter = this.vm.breakOutOfInterpreter || true;       // so the system can get the string
        }
        return true;
	},
	primitiveCopyBits: function(argCount) { // no rcvr class check, to allow unknown subclasses (e.g. under Turtle)
        var bitbltObj = this.vm.stackValue(argCount);
        if (bitbltObj.pointers[NT.PI_BITBLT_SOURCEBITS].pointers || bitbltObj.pointers[NT.PI_BITBLT_DESTBITS].pointers)
            return this.bitBltCopyPointers(bitbltObj);
        var bitblt = new St78.vm.BitBlt(this.vm);
        if (!bitblt.loadBitBlt(bitbltObj)) return false;
        bitblt.copyBits();
        if (bitblt.destForm === this.displayBlt.pointers[NT.PI_BITBLT_DEST])
            this.displayDirty(bitblt.affectedRect());
        return true;
	},
	primitiveScanWord: function(argCount) { // no rcvr class check as yet
        var lasti = this.stackLargeInt(1),
            bb = this.stackNonInteger(0);
        if (!this.success) return false;
        var bbPtrs = bb.pointers,
            text = bbPtrs[NT.PI_BITBLT_TEXT].bytes,
            exceptions = bbPtrs[NT.PI_BITBLT_EXCEPTIONS].bytes,
            printing = bbPtrs[NT.PI_BITBLT_PRINTING].isTrue,
            minascii = bbPtrs[NT.PI_BITBLT_MINASCII],
            maxascii = bbPtrs[NT.PI_BITBLT_MAXASCII],
            xtable = bbPtrs[NT.PI_BITBLT_XTABLE].pointers,
            kern = bbPtrs[NT.PI_BITBLT_KERN],
            chari = this.fromLargeInt(bbPtrs[NT.PI_BITBLT_CHARI]);
        if (printing && bbPtrs[NT.PI_BITBLT_FUNCTION] === 28) // for original image
            bbPtrs[NT.PI_BITBLT_FUNCTION] = 16;
        while (chari <= lasti) {
            var ascii = text[chari-1];
            if (exceptions[ascii] !== 0) {
                bbPtrs[NT.PI_BITBLT_CHARI] = this.makeLargeIfNeeded(chari);
                return this.vm.popNandPush(argCount+1, exceptions[ascii])
            };
            if (ascii < minascii || ascii > maxascii) {
                bbPtrs[NT.PI_BITBLT_CHARI] = this.makeLargeIfNeeded(chari);
                return this.vm.popNandPush(argCount+1, 11);
            }
            bbPtrs[NT.PI_BITBLT_SOURCEX] = xtable[ascii];
            bbPtrs[NT.PI_BITBLT_WIDTH] = xtable[ascii+1] - bbPtrs[NT.PI_BITBLT_SOURCEX];
            if (printing) {
                var bitblt = new St78.vm.BitBlt(this.vm);
                if (!bitblt.loadBitBlt(bb)) return false;
                bitblt.copyBits();
                if (bitblt.destForm === this.displayBlt.pointers[NT.PI_BITBLT_DEST])
                    this.displayDirty(bitblt.affectedRect());
            }
            var w = bbPtrs[NT.PI_BITBLT_WIDTH] + bbPtrs[NT.PI_BITBLT_CHARPAD];
            if (kern > 0) w = Math.max(2, w - kern);
            bbPtrs[NT.PI_BITBLT_DESTX] += w;
            if (bbPtrs[NT.PI_BITBLT_DESTX] > bbPtrs[NT.PI_BITBLT_STOPX]) {
                bbPtrs[NT.PI_BITBLT_CHARI] = this.makeLargeIfNeeded(chari);
                return this.vm.popNandPush(argCount+1, 2);
            }
            chari++;
        }
        chari--;
        bbPtrs[NT.PI_BITBLT_CHARI] = this.makeLargeIfNeeded(chari);
        return this.vm.popNandPush(argCount+1, 10);
	},

    primitiveKeyboardNext: function(argCount) {
        this.idleCounter = 0; // reset idle if there is input
        return this.popNandPushIfOK(argCount+1, this.checkSmallInt(this.display.keys.shift()));
    },
    primitiveKeyboardPeek: function(argCount) {
        var length = this.display.keys.length;
        if (!length) this.idleCounter++;
        this.displayFlush();
        return this.popNandPushIfOK(argCount+1, length ? this.checkSmallInt(this.display.keys[0] || 0) : this.vm.falseObj);
    },
    primitiveMouseButtons: function(argCount) {
        if (this.display.fetchMouseButtons) this.display.fetchMouseButtons();
        if (this.display.buttons & 7) this.idleCounter = 0;
        else this.idleCounter++;
        this.displayFlush();
        return this.popNandPushIfOK(argCount+1, this.checkSmallInt(this.display.buttons));
    },
    primitiveMousePoint: function(argCount) {
        if (this.display.fetchMousePos) this.display.fetchMousePos();
        return this.popNandPushIfOK(argCount+1, this.makePointWithXandY(this.checkSmallInt(this.display.mouseX), this.checkSmallInt(this.display.mouseY)));
    },
    setDisplayAndCursor: function(bitBlt, fullRedraw){
        // dest is display form, source is cursor form
        this.displayBlt = bitBlt;   // also stored in image
        var blt = new St78.vm.BitBlt(this.vm);
        blt.loadBitBlt(this.displayBlt);
        this.displayBits = blt.destBits;
        this.displayPitch = blt.destPitch;
        this.cursorBits = blt.sourceBits;
        this.cursorOffsetX = blt.destX;
        this.cursorOffsetY = blt.destY;
        if (fullRedraw) this.redrawFullDisplay();
        else this.cursorUpdate(true);
    },
    redrawFullDisplay: function() {
        this.displayUpdate({left: 0, top: 0, right: this.display.width, bottom: this.display.height});
    },
    displayDirty: function(rect) {
        if (!rect) return;
        this.idleCounter = 0; // reset idle if there was drawing
        this.display.timeStamp = Date.now();
        if (!this.damage) return this.displayUpdate(rect);
        // look for rect to merge with
        rect.area = (rect.right - rect.left) * (rect.bottom - rect.top);
        for (var i = 0; i < this.damage.dirtyRects.length; i++) {
            var existing = this.damage.dirtyRects[i],
                mergedLeft = Math.min(rect.left, existing.left),
                mergedTop = Math.min(rect.top, existing.top),
                mergedRight = Math.max(rect.right, existing.right),
                mergedBottom = Math.max(rect.bottom, existing.bottom),
                mergedArea = (mergedRight - mergedLeft) * (mergedBottom - mergedTop);
            // if merged area is smaller, do the merge
            if (mergedArea <= rect.area + existing.area) {
                existing.left = mergedLeft;
                existing.right = mergedRight;
                existing.top = mergedTop;
                existing.bottom = mergedBottom;
                existing.area = mergedArea;
                return; // merged, so we're done
            }
        }
        // non found: add this as extra region
        this.damage.dirtyRects.push(rect);
    },
    displayFlush: function(rect) {
        if (!this.damage) return;
        if (this.damage.dirtyRects.length)
            this.vm.breakOutOfInterpreter = this.vm.breakOutOfInterpreter || true;   // show on screen
        while (this.damage.dirtyRects.length)
            this.displayUpdate(this.damage.dirtyRects.shift());
    },
    displayUpdate: function(rect, noCursor) {
        if (!this.displayBits) return; // image has not created display bitmap yet
        if (!this.displayPixels) // our actual screen pixels, 32 bits ARGB
            this.displayPixels = this.display.ctx.createImageData(this.display.width, this.display.height);
        var dest = new Uint32Array(this.displayPixels.data.buffer),
            dstPitch = this.displayPixels.width,
            dstX = rect.left,
            source = this.displayBits,
            srcPitch = this.displayPitch,
            srcX = rect.left >> 4, // 16 bit words
            leftMask = 0x8000 >> (rect.left & 15);
        for (var y = rect.top; y < rect.bottom; y++) {
            var srcIndex = srcPitch * y + srcX;
            var mask = leftMask;
            var src = source.getWord(srcIndex);
            var dstIndex = dstPitch * y + dstX;
            for (var x = rect.left; x < rect.right; x++) {
                dest[dstIndex++] = src & mask ? NT.BLACK : NT.WHITE;
                if (!(mask = mask >> 1)) {
                    mask = 0x8000;
                    src = source.getWord(++srcIndex);
                }
            }
        };
        this.display.ctx.putImageData(this.displayPixels, 0, 0, rect.left, rect.top, rect.right - rect.left, rect.bottom - rect.top);
        this.display.lastDraw = Date.now();
        // show cursor if it was just overwritten
        if (noCursor) return;
        if (this.cursorX + 16 > rect.left && this.cursorX < rect.right &&
            this.cursorY + 16 > rect.top && this.cursorY < rect.bottom)
                this.cursorDraw();
    },
    cursorUpdate: function(force) {
        if (this.damage && this.damage.dirtyRects.length && !force) return;
        var x = this.display.mouseX - this.cursorOffsetX,
            y = this.display.mouseY - this.cursorOffsetY;
        if (x === this.cursorX && y === this.cursorY && !force) return;
        var oldBounds = {left: this.cursorX, top: this.cursorY, right: this.cursorX + 16, bottom: this.cursorY + 16 };
        this.cursorX = x;
        this.cursorY = y;
        // restore display at old cursor pos
        this.displayUpdate(oldBounds, true);
        // draw cursor at new pos
        this.cursorDraw();
    },
    cursorDraw: function() {
        if (!this.cursorBits || !this.displayPixels) return;
        var src = this.cursorBits, // 16x16 cursor form
            srcY = 0,
            dst = new Uint32Array(this.displayPixels.data.buffer),
            dstPitch = this.displayPixels.width,
            dstX = this.cursorX,
            dstY = this.cursorY;
        for (var y = 0; y < 16; y++) {
            var srcWord = src.getWord(y);
            var mask = 0x8000;
            var dstIndex = dstPitch * dstY++ + dstX;
            for (var x = 0; x < 16; x++, dstIndex++) {
                if (srcWord & mask) dst[dstIndex] = NT.BLACK;
                mask = mask >> 1;
            }
        };
        this.display.ctx.putImageData(this.displayPixels, 0, 0, this.cursorX, this.cursorY, 16, 16);
        this.display.lastDraw = Date.now();
    },
	primitiveTicks: function(argCount) {
        //Return the value of the millisecond clock as a large integer.
        //Note that the millisecond clock wraps around periodically.
        return this.popNandPushIfOK(argCount + 1, this.makeLargeIfNeeded(this.millisecondClockValue()));
	},
	millisecondClockValue: function() {
        //Return the value of the millisecond clock as a large integer.
        //Note that the millisecond clock wraps around periodically.
        return (Date.now() - this.vm.startupTime) & this.vm.millisecondClockMask;
	},
    bitBltCopyPointers: function(bitbltObj) {
        // BitBlt is used by the image to copy literals into and out of
        // CompiledMethods' bytes. In our implementation, the literals are
        // duplicated into pointers. This is taken care of here.
        var src = bitbltObj.pointers[NT.PI_BITBLT_SOURCEBITS],
            srcIndex = bitbltObj.pointers[NT.PI_BITBLT_SOURCEY],
            dest = bitbltObj.pointers[NT.PI_BITBLT_DESTBITS],
            destIndex = bitbltObj.pointers[NT.PI_BITBLT_DESTY],
            count = bitbltObj.pointers[NT.PI_BITBLT_CLIPHEIGHT];
        // adjust for missing header word in CompiledMethod's pointers
        if (src.stClass === this.compiledMethodClass) srcIndex--;
        if (dest.stClass === this.compiledMethodClass) destIndex--;
        // make sure the CompiledMethod pointers are initialized
        [{obj:src,i:srcIndex},{obj:dest,i:destIndex}].forEach(function(each){
            if (each.obj.isNil && each.obj !== dest) return; // okay for src to be nil
            if (!each.obj.pointers) {
                if (each.obj.stClass !== this.compiledMethodClass)
                    throw Strings.format("bitBltCopyPointers: %s fields from %s@%s to %s@%s",
                        count, src.stInstName(), srcIndex, dest.stInstName(), destIndex);
                // this is a new CompiledMethod, duplicate its bytes to pointers
                each.obj.methodInitLits(this.vm.image);
            }
            if (each.i < 0 || each.i + count > each.obj.pointers.length) {
                throw Strings.format("bitBltCopyPointers: access out of bounds for %s@%s-%s",
                    each.obj.stInstName(), each.i, each.i + count - 1);
            }
        }, this);
        // now do the copy or store nil
        if (src.isNil)
            this.vm.arrayFill(dest.pointers, destIndex, destIndex+count, src);
        else
            this.vm.arrayCopy(src.pointers, srcIndex, dest.pointers, destIndex, count);
        // if a CompiledMethod was modified, adjust its bytes, too
        if (dest.stClass === this.compiledMethodClass)
            dest.methodPointersModified(this.vm.image, destIndex, count);
        return true;
    },
    primitiveSecondClock: function(argCount) {
        var date = new Date();
        var seconds = date.getTime() / 1000 | 0;    // milliseconds -> seconds
        seconds -= date.getTimezoneOffset() * 60;   // make local time
        seconds += ((69 * 365 + 17) * 24 * 3600);   // adjust epoch from 1970 to 1901
        return this.popNandPushIfOK(argCount + 1, this.makeLargeIfNeeded(seconds));
    },
},
'files', {
    primitiveFileString: function(argCount) {
        // the fileStrings object contains strings stored from the image
        // (which are also persisted in localStorage) and files dropped onto this world.
        // They can be read using this primitive, co-opted from user primPort:
        // If argument is not a string, a vector containing all local filenames is returned
        // If the filename starts with http we do a web get/put and
        // if it ends in a slash, answer a vector of linked files
        var fName = this.stackNonInteger(argCount).bytesAsRawString();
        if (!this.success) return false;
        var stStringToStore, stringToStore,
            remove = false;
        if (argCount === 2) {
            // check for a string argument to store
            stStringToStore = this.stackNonInteger(1);
            if (!this.success) return false;
            if (stStringToStore === this.vm.nilObj) remove = true;
            else {
                if (stStringToStore.stClass !== this.stringClass) return false;
                stringToStore = stStringToStore.bytesAsRawString();
            }
        }
        if (remove) {
            this.fileDelete(fName);
        } else if (stringToStore) {
            this.filePut(fName, stringToStore);
        } else {
            // must be async
            this.fileGet(fName, function(result) {
                this.popNandPushIfOK(argCount+1, this.makeStObject(result));
            }.bind(this));
            return true;
        }
        this.popNandPushIfOK(argCount+1, this.vm.nilObj);
        return true;
    },
    fileGet: function(fileName, thenDo) {
        // read from this.fileStrings
        // If the filename starts with http do a web get
        // if fileName is empty or ends in slash, answer array of files
        var result;
        if (/http(s)?:/.test(fileName)) {
            // if url does not have a double slash after http: then remove
            // the protocol so the browser will use it as relative URL
            if (!/http(s)?:\/\//.test(fileName)) fileName = fileName.replace(/http(s)?:/, '');
            // HACK: we switched to https but the image may still use http
            fileName = fileName.replace(/^http:(\/\/lively-web.org\/)/, 'https:$1');
            alertOK("fetching " + fileName);
            var isDir = /\/$/.test(fileName),  // ends in slash
                unfreeze = this.vm.freeze(),   // freeze VM until we get result
                xhr = new XMLHttpRequest();
            xhr.open("get", fileName, true);
            if (!isDir) xhr.responseType = "arraybuffer";
            xhr.timeout = 10000;
            xhr.onreadystatechange = function() {
                if (this.readyState != this.DONE) return;
                if (this.status === 200) {
                    if (isDir) {
                        console.log("Got " + this.responseText.length + " bytes from " + fileName);
                        var urls = this.responseText.match(/href="[^"]*"/gi).collect(function(href){return decodeURI(href.match(/"([^"]*)"/)[1])}),
                            dirPath = new URL(fileName, document.baseURI).pathname;
                        // got all the hrefs, find the ones in this dir and extract file names
                        result = urls.select(function(url){return url.startsWith(dirPath)})
                            .collect(function(path){return path.slice(dirPath.length)}).uniq();
                    } else {
                        result = new Uint8Array(this.response);
                    }
                } else {
                    console.log("Got " + this.response.byteLength + " bytes from " + fileName);
                    alert("Download failed (" + this.status + ") " + fileName);
                }
                unfreeze();
                thenDo(result);
            }
            xhr.send();
            return;
        } else { // otherwise, use our fileStrings
            if (fileName.length) {
                if (fileName[0] != '.') alertOK("reading " + fileName);
                result = this.fileStrings[fileName];
                if (fileName[0] != '.')
                    if (result) console.log("Got " + result.length + " bytes");
                    else console.log("File not found: " + fileName);
            } else { // if called without a filename, return a directory index as vector
                result = Object.keys(this.fileStrings);
            }
        }
        if (thenDo) thenDo(result);
        return result;
    },
    filePut: function(fileName, stringToStore) {
        // write to this.fileStrings and window.localStorage
        // If the filename starts with http do a web put
        if (/http(s)?:/.test(fileName)) {
            // if url does not have a double slash after http: then remove
            // the protocol so the browser will use it as relative URL
            if (!/http(s)?:\/\//.test(fileName)) fileName = fileName.replace(/http(s)?:/, '');
            console.log('Uploading ' + stringToStore.length + ' bytes to ' + fileName);
            if (typeof WebResource !== 'undefined') { // use Lively's WebResource
                new WebResource(fileName)
                    .beAsync()
                    .createProgressBar('Uploading ' + stringToStore.length + ' bytes ...')
                    .whenDone(function(content, status) {
                        if (status.isSuccess()) alertOK("Uploaded to " + fileName);
                        else alert("Upload failed")})
                    .put(this.asUint8Array(stringToStore));
            } else { // use fetch
                fetch(fileName, {method: 'PUT', body: stringToStore})
                    .then(function(response) {
                        if (!response.ok) console.warn("Upload failed " + response.status + " " + response.statusText + " " + fileName);
                    });
            }
        } else { // otherwise, use our fileStrings
            if (fileName[0] != '.') alertOK("storing " + fileName);
            this.fileStrings[fileName] = stringToStore;
            window.localStorage['notetaker:' + fileName] = stringToStore;
        }
    },
    fileDelete: function(fileName) {
        // Remove fileName from this.fileStrings and window.localStorage
        alertOK("deleting " + fileName);
        delete this.fileStrings[fileName];
        delete window.localStorage['notetaker:' + fileName];
    },
},
'd1 recognizer', {
    pathDistance: function(argCount) {
        var a = this.vm.stackValue(argCount);
        var b = this.vm.stackValue(argCount - 1);
        var d = 0.0;
        for (var i = 0; i < a.pointers.length; i++) {
            var ai = a.pointers[i];
            var bi = b.pointers[i];
            var aix = ai.pointers[0].float;
            var aiy = ai.pointers[1].float;
            var bix = bi.pointers[0].float;
            var biy = bi.pointers[1].float;
            var v = Math.sqrt((aix - bix) * (aix - bix) + (aiy - biy) * (aiy - biy));
            d = d + v;
        }
        return d / a.pointers.length;
    }
});
Object.subclass('St78.vm.BitBlt',
'initialization', {
    initialize: function(vm) {
        this.vm = vm;
    },
    loadBitBlt: function(bitbltObj) {
        this.success = true;
        var bitblt = bitbltObj.pointers;
        var func = bitblt[NT.PI_BITBLT_FUNCTION];
        this.destRule = func & 3;           // set, or, xor, and
        this.sourceRule = (func >> 2) & 3;  // src, ~src, halftone in src, halftone
        this.noSource = this.sourceRule === 3;
        this.sourceFn = this.makeSourceFn(this.sourceRule);
        this.destFn = this.makeDestFn(this.destRule);
        this.halftone = this.sourceRule >= 2 ? this.loadHalftone(bitblt[NT.PI_BITBLT_GRAY]) : null;
        this.destBits = this.loadBits(bitblt[NT.PI_BITBLT_DESTBITS]);
        this.destPitch = this.intFrom(bitblt[NT.PI_BITBLT_DESTRASTER]);
        this.destX = this.intFrom(bitblt[NT.PI_BITBLT_DESTX]);
        this.destY = this.intFrom(bitblt[NT.PI_BITBLT_DESTY]);
        this.width = this.intFrom(bitblt[NT.PI_BITBLT_WIDTH]);
        this.height = this.intFrom(bitblt[NT.PI_BITBLT_HEIGHT]);
        if (!this.noSource) {
            this.sourceBits = this.loadBits(bitblt[NT.PI_BITBLT_SOURCEBITS]);
            this.sourcePitch = this.intFrom(bitblt[NT.PI_BITBLT_SOURCERASTER]);
            this.sourceX = this.intFrom(bitblt[NT.PI_BITBLT_SOURCEX]);
            this.sourceY = this.intFrom(bitblt[NT.PI_BITBLT_SOURCEY]);
            this.sourceForm = bitblt[NT.PI_BITBLT_SOURCE];
        }
        this.clipX = this.intFrom(bitblt[NT.PI_BITBLT_CLIPX]);
        this.clipY = this.intFrom(bitblt[NT.PI_BITBLT_CLIPY]);
        this.clipW = this.intFrom(bitblt[NT.PI_BITBLT_CLIPWIDTH]);
        this.clipH = this.intFrom(bitblt[NT.PI_BITBLT_CLIPHEIGHT]);
        this.destForm = bitblt[NT.PI_BITBLT_DEST];
        return this.success;
    },
    makeSourceFn: function(rule) {
        switch(rule) {
            case 0: return function(src, halftone, dst) { return src };
            case 1: return function(src, halftone, dst) { return ~src };
            case 2: return function(src, halftone, dst) { return (src & halftone) | (~src & dst) };
            case 3: return function(src, halftone, dst) { return halftone };
        }
        throw "bitblt rule not implemented yet";
    },
    makeDestFn: function(rule) {
        switch(rule) {
            case 0: return function(val, dst) { return val };
            case 1: return function(val, dst) { return val | dst };
            case 2: return function(val, dst) { return val ^ dst };
            case 3: return function(val, dst) { return val & dst };
        }
    },
    loadBits: function(bitsOop) {
        // make the bytes in bitOop accessible as a word array
        if (!bitsOop.bitBltAcccessor) {
            if (!bitsOop.bytes) { // certainly an error, but we'll play along ...
                console.warn("BitBlt with empty form " + bitsOop.oop);
                return {
                    getWord: function(index) { return 0 },
                    setWord: function(index, value) { }
                }
            } else {
                // convert its bytes to a Uint8Array
                if (!bitsOop.bytes.buffer)
                    bitsOop.bytes = new Uint8Array(bitsOop.bytes);
                // make a dataview on the same data buffer
                var bytesAsWords = new DataView(bitsOop.bytes.buffer);
                bitsOop.bitBltAcccessor = {
                    getWord: function(index) {
                        if (index >= 0 && index * 2 < bytesAsWords.byteLength)
                            return bytesAsWords.getUint16(index * 2);
                        else return 0;
                    },
                    setWord: function(index, value) {
                        if (index >= 0 && index * 2 < bytesAsWords.byteLength)
                            bytesAsWords.setUint16(index * 2, value);
                    }
                }
            }
        }
        return bitsOop.bitBltAcccessor;
    },

    intFrom: function(intOrFloat) {
        if (this.vm.isSmallInt(intOrFloat))
            return intOrFloat;
        if (intOrFloat.isFloat)
            return intOrFloat.float | 0;
        this.success = false;
    },

    loadHalftone: function(int) {
        // halftone is 4x4 bits. Expand to 16x4 bits for quick access
        if (int.pointers)  // large int
            int = int.largeIntegerValue();
        var words = [];
        for (i = 0; i < 4; i++) {
            var word = (int >> (i * 4)) & 0x000F;
            word += word << 4;
            word += word << 8;
            words.push(word);
        }
        return words;
    },
},
'blitting', {
    copyBits: function() {
        this.bitCount = 0;
        this.clipRange();
        if (this.bbW <= 0 || this.bbH <= 0) return;
        //console.log("Blt " + ['src', '~src', 'halftone in src', 'halftone'][this.sourceRule] + ' ' + ['set', 'or', 'xor', 'and'][this.destRule] + " dest ")
        //console.log(Strings.format("x: %s y: %s w: %s h: %s", this.destX, this.destY, this.width, this.height));
        this.destMaskAndPointerInit();
        /* Choose and perform the actual copy loop. */
        if (this.noSource) {
            this.copyLoopNoSource();
        } else {
            this.checkSourceOverlap();
            this.sourceSkewAndPointerInit();
            this.copyLoop();
        }
    },
    copyLoopNoSource: function() {
        //	Faster copyLoop when source not used.  hDir and vDir are both
        //	positive, and perload and skew are unused
        var halftoneWord = 0xFFFF;
        for (var i = 0; i < this.bbH; i++) { // vertical loop
            if (this.halftone) halftoneWord = this.halftone[(this.dy + i) % 4];
            // First word in row is masked
            var destMask = this.mask1,
                destWord = this.destBits.getWord(this.destIndex),
                mergeWord = this.destFn(halftoneWord, destWord);
            destWord = (destMask & mergeWord) | (destWord & (~destMask));
            this.destBits.setWord(this.destIndex++, destWord);
            destMask = 0xFFFF;
            //the central horizontal loop requires no store masking */
            if (this.destRule === 0) // Store rule requires no dest merging
                for (var word = 2; word < this.nWords; word++)
                    this.destBits.setWord(this.destIndex++, halftoneWord);
            else
                for (var word = 2; word < this.nWords; word++) {
                    destWord = this.destBits.getWord(this.destIndex);
                    mergeWord = this.destFn(halftoneWord, destWord);
                    this.destBits.setWord(this.destIndex++, mergeWord);
                }
            //last word in row is masked
            if (this.nWords > 1) {
                destMask = this.mask2;
                destWord = this.destBits.getWord(this.destIndex);
                mergeWord = this.destFn(halftoneWord, destWord);
                destWord = (destMask & mergeWord) | (destWord & (~destMask));
                this.destBits.setWord(this.destIndex++, destWord);
            }
            this.destIndex += this.destDelta;
        }
    },
    copyLoop: function() {
        // this version of the inner loop assumes we do have a source
        var hInc = this.hDir;
        // init skew (the difference in word alignment of source and dest)
        var unskew;
        var skewMask;
        if (this.skew === -16) {
            this.skew = unskew = skewMask = 0;
        } else {
            if (this.skew < 0) {
                unskew = this.skew + 16;
                skewMask = 0xFFFF << -this.skew;
            } else {
                if (this.skew === 0) {
                    unskew = 0;
                    skewMask = 0xFFFF;
                } else {
                    unskew = this.skew - 16;
                    skewMask = 0xFFFF >> this.skew;
                }
            }
        }
        var notSkewMask = ~skewMask;
        // init halftones
        var halftoneWord;
        var halftoneHeight;
       	if (this.halftone) {
            halftoneWord = this.halftone[0];
            halftoneHeight = this.halftone.length;
        } else {
            halftoneWord = 0xFFFF;
            halftoneHeight = 0;
        }
        // now loop over all lines
        var y = this.dy;
        for (var i = 1; i <= this.bbH; i++) {
            if (halftoneHeight > 1) {
                halftoneWord = this.halftone[y % halftoneHeight];
                y += this.vDir;
            }
            var prevWord;
            if (this.preload) {
                prevWord = this.sourceBits.getWord(this.sourceIndex);
                this.sourceIndex += hInc;
            } else {
                prevWord = 0;
            }
            var destMask = this.mask1;
            /* pick up next word */
            var thisWord = this.sourceBits.getWord(this.sourceIndex);
            this.sourceIndex += hInc;
            /* 16-bit rotate */
            var skewWord = ((unskew < 0 ? ( (prevWord & notSkewMask) >> -unskew) : ( (prevWord & notSkewMask) << unskew)))
                | (((this.skew < 0) ? ( (thisWord & skewMask) >> -this.skew) : ( (thisWord & skewMask) << this.skew)));
            prevWord = thisWord;
            var destWord = this.destBits.getWord(this.destIndex);
            var mergeWord = this.destFn(this.sourceFn(skewWord, halftoneWord, destWord), destWord);
            destWord = (destMask & mergeWord) | (destWord & (~destMask));
            this.destBits.setWord(this.destIndex, destWord);
            //The central horizontal loop requires no store masking */
            this.destIndex += hInc;
            destMask = 0xFFFF;
            if (this.destRule === 0 && this.sourceRule !== 2) { //Store mode avoids dest merge function
                if ((this.skew === 0) && (this.sourceRule === 0)) {
                    //Non-skewed and no sourceFn: fast copy. TODO: destBits.set(sourceBits.subarray(...)) ?
                    if (this.hDir === -1) {
                        for (var word = 2; word < this.nWords; word++) {
                            thisWord = this.sourceBits.getWord(this.sourceIndex);
                            this.destBits.setWord(this.destIndex, thisWord);
                            this.sourceIndex += hInc;
                            this.destIndex += hInc;
                        }
                    } else {
                        for (var word = 2; word < this.nWords; word++) {
                            this.destBits.setWord(this.destIndex, prevWord);
                            prevWord = this.sourceBits.getWord(this.sourceIndex);
                            this.destIndex += hInc;
                            this.sourceIndex += hInc;
                        }
                    }
                } else {
                    //skewed and/or source function
                    for (var word = 2; word < this.nWords; word++) {
                        thisWord = this.sourceBits.getWord(this.sourceIndex);
                        this.sourceIndex += hInc;
                        /* 16-bit rotate */
                        skewWord = (((unskew < 0) ? ( (prevWord & notSkewMask) >> -unskew) : ( (prevWord & notSkewMask) << unskew)))
                            | (((this.skew < 0) ? ( (thisWord & skewMask) >> -this.skew) : ( (thisWord & skewMask) << this.skew)));
                        prevWord = thisWord;
                        this.destBits.setWord(this.destIndex, this.sourceFn(skewWord, halftoneWord, null));
                        this.destIndex += hInc;
                    }
                }
            } else { //Dest merging here...
                for (var word = 2; word < this.nWords; word++) {
                    thisWord = this.sourceBits.getWord(this.sourceIndex); //pick up next word
                    this.sourceIndex += hInc;
                    /* 16-bit rotate */
                    skewWord = (((unskew < 0) ? ( (prevWord & notSkewMask) >> -unskew) : ( (prevWord & notSkewMask) << unskew)))
                        | (((this.skew < 0) ? ( (thisWord & skewMask) >> -this.skew) : ( (thisWord & skewMask) << this.skew)));
                    prevWord = thisWord;
                    destWord = this.destBits.getWord(this.destIndex);
                    mergeWord = this.destFn(this.sourceFn(skewWord, halftoneWord, destWord), destWord);
                    this.destBits.setWord(this.destIndex, mergeWord);
                    this.destIndex += hInc;
                }
            }
            // last word with masking and all
            if (this.nWords > 1) {
                destMask = this.mask2;
                thisWord = this.sourceBits.getWord(this.sourceIndex); //pick up last word
                this.sourceIndex += hInc;
                /* 16-bit rotate */
                skewWord = (((unskew < 0) ? ((prevWord & notSkewMask) >> -unskew) : ((prevWord & notSkewMask) << unskew)))
                    | (((this.skew < 0) ? ( (thisWord & skewMask) >> -this.skew) : ( (thisWord & skewMask) << this.skew)));
                destWord = this.destBits.getWord(this.destIndex);
                mergeWord = this.destFn(this.sourceFn(skewWord, halftoneWord, destWord), destWord);
                destWord = (destMask & mergeWord) | (destWord & (~destMask));
                this.destBits.setWord(this.destIndex, destWord);
                this.destIndex += hInc;
            }
            this.sourceIndex += this.sourceDelta;
            this.destIndex += this.destDelta;
        }
    },
    pickSourcePixels: function(nPixels, srcMask, dstMask, srcShiftInc, dstShiftInc) {
        /*	Pick nPix pixels starting at srcBitIndex from the source, map by the
        color map, and justify them according to dstBitIndex in the resulting destWord. */
        var sourceWord = this.sourceBits[this.sourceIndex];
        var destWord = 0;
        var srcShift = this.srcBitShift; // put into temp for speed
        var dstShift = this.dstBitShift;
        var nPix = nPixels;
        // always > 0 so we can use do { } while(--nPix);
       do {
            var sourcePix = (sourceWord >>> srcShift) & srcMask;
            var destPix = this.mapPixel(sourcePix);
            // adjust dest pix index
            destWord = destWord | ((destPix & dstMask) << dstShift);
            // adjust source pix index
            dstShift += dstShiftInc;
            if ((srcShift += srcShiftInc) & 0xFFFFFFE0) {
                srcShift += 16;
                sourceWord = this.src.bits[++sourceIndex];
            }
        } while (--nPix);
        this.srcBitShift = srcShift;  // Store back
        return destWord;
    },
    sourceSkewAndPointerInit: function() {
        var sxLowBits = this.sx & 15;
        var dxLowBits = this.dx & 15;
        // check if need to preload buffer
        // (i.e., two words of source needed for first word of destination)
        var dWid;
        if (this.hDir > 0) {
            dWid = ((this.bbW < (16 - dxLowBits)) ? this.bbW : (16 - dxLowBits));
            this.preload = (sxLowBits + dWid) + 1 > 16;
        } else {
            dWid = ((this.bbW < (dxLowBits + 1)) ? this.bbW : (dxLowBits + 1));
            this.preload = (sxLowBits - dWid) + 1 < 0;
        }
        this.skew = sxLowBits - dxLowBits;
        if (this.preload) {
            if (this.skew < 0) this.skew += 16;
            else this.skew -= 16;
        }
        /* calculate increments from end of one line to start of next */
        this.sourceIndex = (this.sy * this.sourcePitch) + (this.sx / 16 | 0);
        this.sourceDelta = (this.sourcePitch * this.vDir) - (this.nWords * this.hDir);
        if (this.preload) this.sourceDelta -= this.hDir;
    },
    destMaskAndPointerInit: function() {
        var startBits = 16 - (this.dx & 15); //how many pixels in first word
        var endBits = (((this.dx + this.bbW) - 1) & 15) + 1;
        this.mask1 = 0xFFFF >> (16 - startBits);
        this.mask2 = 0xFFFF << (16 - endBits);
        if (this.bbW < startBits) { //start and end in same word, so merge masks
            this.mask1 = this.mask1 & this.mask2;
            this.mask2 = 0;
            this.nWords = 1;
        } else
            this.nWords = (((this.bbW - startBits) + 15) / 16 | 0) + 1;
        this.hDir = this.vDir = 1; //defaults for no overlap with source
        this.destIndex = (this.dy * this.destPitch) + (this.dx / 16 | 0); //both these in words, not bytes
        this.destDelta = (this.destPitch * this.vDir) - (this.nWords * this.hDir);
    },
    clipRange: function() {
        // initialize sx,sy, dx,dy, bbW,bbH to the intersection of source, dest, and clip
        // let's assume everything is alright ...
        // intersect with destForm bounds
        if (this.clipX < 0) {this.clipW += this.clipX; this.clipX = 0; }
        if (this.clipY < 0) {this.clipH += this.clipY; this.clipY = 0; }
        if ((this.clipX + this.clipW) > this.destWidth) {this.clipW = this.destWidth - this.clipX; }
        if ((this.clipY + this.clipH) > this.destHeight) {this.clipH = this.destHeight - this.clipY; }
        // intersect with clipRect
        var leftOffset = Math.max(this.clipX - this.destX, 0);
        this.dx = this.destX + leftOffset;
        this.bbW = this.width - leftOffset;
        var rightOffset = (this.dx + this.bbW) - (this.clipX + this.clipW);
    	if (rightOffset > 0)
    		this.bbW -= rightOffset;
        var topOffset = Math.max(this.clipY - this.destY, 0);
        this.dy = this.destY + topOffset;
        this.bbH = this.height - topOffset;
        var bottomOffset = (this.dy + this.bbH) - (this.clipY + this.clipH);
    	if (bottomOffset > 0)
    		this.bbH -= bottomOffset;
        // intersect with sourceForm bounds
    	if (this.noSource) return;
        this.sx = this.sourceX + leftOffset;
        this.sy = this.sourceY + topOffset;
    	if (this.sx < 0) {
    		this.dx -= this.sx;
    		this.bbW += this.sx;
    		this.sx = 0;
    	}
    	if ((this.sx + this.bbW) > this.sourceWidth)
    		this.bbW -= (this.sx + this.bbW) - this.sourceWidth;
    	if (this.sy < 0) {
    		this.dy -= this.sy;
    		this.bbH += this.sy;
    		this.sy = 0;
    	}
    	if ((this.sy + this.bbH) > this.sourceHeight)
    		this.bbH -= (this.sy + this.bbH) - this.sourceHeight;
	},
    checkSourceOverlap: function() {
        if (this.sourceForm === this.destForm && this.dy >= this.sy) {
            if (this.dy > this.sy) {
                this.vDir = -1;
                this.sy = (this.sy + this.bbH) - 1;
                this.dy = (this.dy + this.bbH) - 1;
            } else {
                if (this.dy === this.sy && this.dx > this.sx) {
                    this.hDir = -1;
                    this.sx = (this.sx + this.bbW) - 1; //start at right
                    this.dx = (this.dx + this.bbW) - 1;
                    if (this.nWords > 1) {
                        var t = this.mask1; //and fix up masks
                        this.mask1 = this.mask2;
                        this.mask2 = t;
                    }
                }
            }
            this.destIndex = (this.dy * this.destPitch) + (this.dx / 16 | 0); //recompute since dx, dy change
            this.destDelta = (this.destPitch * this.vDir) - (this.nWords * this.hDir);
		}
    },
},
'accessing', {
    affectedRect: function() {
        if (this.bbW <= 0 || this.bbH <= 0) return null;
        var affectedL, affectedR, affectedT, affectedB;
        if (this.hDir > 0) {
            affectedL = this.dx;
            affectedR = this.dx + this.bbW;
        } else {
            affectedL = (this.dx - this.bbW) + 1;
            affectedR = this.dx + 1;
        }
        if (this.vDir > 0) {
            affectedT = this.dy;
            affectedB = this.dy + this.bbH;
        } else {
            affectedT = (this.dy - this.bbH) + 1;
            affectedB = this.dy + 1; }
        return {left: affectedL, top: affectedT, right: affectedR, bottom: affectedB};
    },
});
Object.subclass('St78.vm.InstructionPrinter',
'initialization', {
    initialize: function(method, vm) {
        this.method = method;
        this.vm = vm;
    },
},
'printing', {
    printInstructions: function(indent, highlight, highlightPC) {
        // all args are optional
        this.indent = indent;           // prepend to every line except if highlighted
        this.highlight = highlight;     // prepend to highlighted line
        this.highlightPC = highlightPC; // PC of highlighted line
        if (!this.method.isCompiledMethod())
            return "<not a CompiledMethod>";
        this.result = '';
        this.scanner = new St78.vm.InstructionStream(this.method, this.vm);
        this.oldPC = this.scanner.pc;
        var end = this.method.methodEndPC();
    	while (this.scanner.pc < end)
        	this.scanner.interpretNextInstructionFor(this);
        return this.result;
    },
    print: function(instruction) {
        if (this.oldPC === this.highlightPC) {
            if (this.highlight) this.result += this.highlight;
        } else {
            if (this.indent) this.result += this.indent;
        }
        this.result += this.oldPC + " <";
        for (var i = this.oldPC; i < this.scanner.pc; i++) {
            if (i > this.oldPC) this.result += " ";
            this.result += (this.method.bytes[i]+0x100).toString(16).substr(-2).toUpperCase(); // padded hex
        }
        this.result += "> " + instruction + "\n";
        // if pc is in the middle of an extended instruction, restart from there
        if (this.highlightPC > this.oldPC && this.highlightPC < this.scanner.pc) {
            this.oldPC = this.highlightPC;
            this.scanner.pc = this.highlightPC;
            this.scanner.interpretNextInstructionFor(this);
            this.result = this.result.slice(0,-1) + " <partial instr>\n";
        }
        this.oldPC = this.scanner.pc;
    },
    printInstVar: function(offset) {
        if (!this.instVarNames) {
            this.instVarNames = [];
            if (this.vm.method === this.method) {
                var cls = this.vm.receiver.stClass;
                if (cls) cls.allInstVarNames().forEach(function(v){
                    this.instVarNames.push(Strings.format("%s (%s)", this.instVarNames.length, v));
                }.bind(this));
            }
        }
        if (offset < this.instVarNames.length)
            return this.instVarNames[offset];
        return offset.toString();
    },
    printLiteral: function(index) {
        var literals = this.method.pointers,
            literal = literals && literals[index];
        if (!literal) return "invalid literal";
        return literal.stInstName ? literal.stInstName() : literal.toString();
    },
},
'decoding', {

    doDup: function() {
    	this.print('dup');
    },
    doPop: function() {
    	this.print('pop');
    },
    doSuper: function() {
    	this.print('do super send');
    },
	jump: function(delta, conditional) {
        this.print((conditional ? 'jumpIfFalse: ' : 'jumpTo: ') + (this.scanner.pc + delta));
    },


    doReturn: function() {
	    this.print('return');
    },




	pushActiveContext: function() {
	    this.print('push: thisContext');
    },
    pushConstant: function(obj) {
    	this.print('pushConst: ' + (obj.stInstName ? obj.stInstName() : obj));
    },
    pushLiteralVariable: function(index) {
        var lit = this.printLiteral(index);
        this.print('pushLitRef: ' + index + ' (' + lit + ')');
    },
	pushReceiver: function() {
        this.print('push: self');
    },
    pushReceiverVariable: function(offset) {
        var inst = this.printInstVar(offset);
        this.print('pushInstVar: ' + inst);
    },
	pushTemporaryVariable: function(offset) {
	    this.print('pushArgOrTemp: ' + offset);
    },
    send: function(selector) {
    	this.print( 'send: #' + (selector.bytesAsUnicode ? selector.bytesAsUnicode() : selector));
    },
    storeIntoLiteralVariable: function(index, doPop) {
        var lit = this.printLiteral(index);
        this.print((doPop ? 'pop' : 'store') + 'IntoLitRef: ' + index + ' (' + lit + ')');
    },
    storeIntoReceiverVariable: function(offset, doPop) {
        var inst = this.printInstVar(offset);
        this.print((doPop ? 'pop' : 'store') + 'IntoInstVar: ' + inst);
    },
	storeIntoTemporaryVariable: function(offset, doPop) {
	    this.print((doPop ? 'pop' : 'store') + 'IntoArgOrTemp: ' + offset);
    },
    doRemoteReturn: function() {
        this.print('remote return');
    }

});

Object.subclass('St78.vm.InstructionStream',
'initialization', {
    initialize: function(method, vm) {
        this.vm = vm;
        this.method = method;
        this.pc = method.methodStartPC();
        this.specialConstants = ['-1', '0', '1', '2', '10', 'nil', 'false', 'true'];
        this.specialSelectors = ['+', '-', '<', '>', '≤', '≥', '=', '≠', '*', '/', '\\', '⦿',
        'lshift:', 'lxor:', 'land:', 'lor:', '◦', '◦←', 'next', 'next←', 'length', '≡',
        'is:', 'append:', 'class', 'remoteCopy', 'eval', 'new', 'new:', 'x', 'y', 'asStream'];
    },
},
'decoding',
{
    interpretNextInstructionFor: function(client) {
    	// Send to the argument, client, a message that specifies the type of the next instruction.
    	var method = this.method;
    	var byte = method.bytes[this.pc++];
    	var offset = byte & 0xF;
    	switch (byte >> 4) {
    	case 0: return client.pushReceiverVariable(offset);
    	case 1: return client.pushTemporaryVariable(offset);
    	case 2: return client.pushConstant(method.methodGetLiteral(offset));
    	case 3: return client.pushConstant(method.methodGetLiteral(offset + 16));
    	case 4: return client.pushLiteralVariable(offset);
    	case 5: return client.pushLiteralVariable(offset + 16);
    	case 6: return client.pushLiteralVariable(offset + 32);
    	case 7:
            if (offset===1) return client.pushReceiver()
			if (offset < 8) throw "unusedBytecode";
			return client.pushConstant(this.specialConstants[offset - 8]);
    	case 8: // sundry
    	    var doPop = false;
    	    switch (offset) {
    	        case 0: // ext pop
    	            doPop = true;
    	        case 1: // ext store
    	            var byte2 = this.method.bytes[this.pc++];
    	            var offset2 = byte2 & 0xF;
                    switch (byte2 >> 4) {
                        case 0: return client.storeIntoReceiverVariable(offset2, doPop);
                        case 1: return client.storeIntoTemporaryVariable(offset2, doPop);
                    	case 4: return client.storeIntoLiteralVariable(offset2, doPop);
                    	case 5: return client.storeIntoLiteralVariable(offset2 + 16, doPop);
                    	case 6: return client.storeIntoLiteralVariable(offset2 + 32, doPop);
                    	case 8: // double-extended
            	            var byte3 = this.method.bytes[this.pc++];
                    	    switch (offset2) {
                    	        case 8: return client.storeIntoReceiverVariable(byte3, doPop);
                    	        case 9: return client.storeIntoTemporaryVariable(byte3, doPop);
                    	        case 11: return client.storeIntoLiteralVariable(byte3, doPop);
                    	    }
                    }
                    throw "unusedBytecode";
    	        case 2: return client.doPop();
    	        case 3: return client.doReturn();
    	        case 4: return client.doRemoteReturn();
    	        case 5: return client.pushActiveContext();
    	        case 6: return client.doSuper();
    	        case 7: return client.pushReceiver();
    	        case 8: return client.pushReceiverVariable(this.method.bytes[this.pc++]);
    	        case 9: return client.pushTemporaryVariable(this.method.bytes[this.pc++]);
    	        case 0xA: return client.pushConstant(method.methodGetLiteral(this.method.bytes[this.pc++]));
        	    case 0xB: return client.pushLiteralVariable(this.method.bytes[this.pc++]);
            	case 0xC: return client.send(method.methodGetLiteral(this.method.bytes[this.pc++]));
            	case 0xF: return client.doBreakpoint();
    	    }
    	    throw "unusedBytecode";
    	case 9: return client.jump((offset&7)+1, offset&8);
    	case 0xA: return client.jump((((offset&7) - 4) * 256) + this.method.bytes[this.pc++], offset&8);
    	case 0xB: return client.send(this.specialSelectors[offset]);
    	case 0xC: return client.send(this.specialSelectors[offset+16]);
    	case 0xD: return client.send(method.methodGetLiteral(offset));
    	case 0xE: return client.send(method.methodGetLiteral(offset + 16));
    	case 0xF: return client.send(method.methodGetLiteral(offset + 32));
    	}
    },

});

}) // end of module
