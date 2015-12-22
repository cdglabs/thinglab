/*
 * Copyright (c) 2013,2014 Bert Freudenberg
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


//////////////////////////////////////////////////////////////////////////////
// these functions fake the Lively module and class system
// just enough so the loading of vm.js succeeds
//////////////////////////////////////////////////////////////////////////////

module = function(dottedPath) {
    if (dottedPath == "") return window;
    var path = dottedPath.split("."),
        name = path.pop(),
        parent = module(path.join(".")),
        self = parent[name];
    if (!self) parent[name] = self = {
        loaded: false,
        pending: [],
        requires: function(req) {
            return {
                toRun: function(code) {
                    function load() {
                        code();
                        self.loaded = true;
                        self.pending.forEach(function(f){f()});
                    }
                    if (req && !module(req).loaded) {
                        module(req).pending.push(load);
                    } else {
                        load();
                    }
                }
            }
        },
    };
    return self;
};

Object.subclass = function(classPath /* + more args */ ) {
    var path = classPath.split("."),
        className = path.pop();
    var newClass = function() {
        if (this.initialize) this.initialize.apply(this, arguments);
        return this;
    };
    // skip arg 0, copy properties of other args to class proto
    for (var i = 1; i < arguments.length; i++)
        for (name in arguments[i])
            newClass.prototype[name] = arguments[i][name];
    module(path.join('.'))[className] = newClass;
};

Object.extend = function(obj /* + more args */ ) {
    // skip arg 0, copy properties of other args to obj
    for (var i = 1; i < arguments.length; i++)
        for (name in arguments[i])
            obj[name] = arguments[i][name];
};

function alertOK(msg) { console.log(msg); }

Object.extend(Array.prototype, {
    select: Array.prototype.filter,
    collect: Array.prototype.map,
    last: function () { return this[this.length - 1]; },
    include: function (object) { return this.indexOf(object) !== -1 },
    inject: function (memo, iterator, context) {
        if (context) iterator = iterator.bind(context);
        return this.reduce(iterator, memo);
    },
    uniq: function (sorted) {
        return this.inject([], function(array, value, index) {
            if (0 === index || (sorted ? array.last() != value : !array.include(value))) array.push(value);
            return array;
        });
    },
});

Object.extend(String.prototype, {
    startsWith: function(pattern) { return this.indexOf(pattern) === 0; }
});

//////////////////////////////////////////////////////////////////////////////
// load vm.js
//////////////////////////////////////////////////////////////////////////////

(function loadVM(){
    var scripts = document.getElementsByTagName("script"),
        myself = scripts[scripts.length - 1],
        vmDir = myself.src.replace(/[^\/]*$/, "");
    var script = document.createElement("script");
    script.setAttribute("type","text/javascript");
    script.setAttribute("src", vmDir + "vm.js");
    document.getElementsByTagName("head")[0].appendChild(script);
})();

module("Smalltalk78").requires("users.bert.St78.vm").toRun(function() {

//////////////////////////////////////////////////////////////////////////////
// display & event setup
//////////////////////////////////////////////////////////////////////////////

function createDisplay(canvas) {
    var display = {
        ctx: canvas.getContext("2d"),
        width: canvas.width,
        height: canvas.height,
        timeStamp: Date.now(),
        mouseX: 0,
        mouseY: 0,
        buttons: 0,
        keys: [],
        interrupt: false,
        fetchMousePos: fetchMousePos,
        fetchMouseButtons: fetchMouseButtons,
        // private state below
        buttonsQueue: null, // if null, access is immediate
        mouseDownX: 0,
        mouseDownY: 0,
        mouseUpX: 0,
        mouseUpY: 0,
        clipboardString: '',
        clipboardStringChanged: false,
    };

    function fetchMouseButtons() {
        // VM sends fetch: create queue
        if (!display.buttonsQueue) return display.buttonsQueue = [];
        var queue = display.buttonsQueue;
        if (queue.length > 0) {
            var evt = queue[0],
                ms = Date.now() - evt.timeStamp;
            if (!(evt.buttons & 7) && ms < 200) return; // delay up for 200 ms
            display.buttons = evt.buttons;
            display.mouseX = evt.x;
            display.mouseY = evt.y;
            display.timeStamp = evt.time;
            queue.shift();
        }
    }

    function fetchMousePos() {
        // VM sends fetch: create queue
        if (!display.buttonsQueue) return display.buttonsQueue = [];
    }

    function recordMouseEvent(evt) {
        evt.preventDefault();
        display.timeStamp = evt.timeStamp;
        var buttons = display.buttons & 7;
        if (!display.buttonsQueue || !display.buttonsQueue.length) {
            display.mouseX = evt.layerX;
            display.mouseY = evt.layerY;
        }
        switch (evt.type) {
            case 'mousemove':
                return; // nothing more to do
            case 'mouseup':
                buttons = 0;
                break;
            case 'mousedown':
                switch (evt.button) {
                    case 0: buttons = NT.Mouse_Red; break;
                    case 1: buttons = NT.Mouse_Yellow; break;
                    case 2: buttons = NT.Mouse_Blue; break;
                };
                var swapButtons = !location.hash.match(/3buttonmouse/i);
                if (swapButtons)
                    if (buttons == NT.Mouse_Yellow) buttons = NT.Mouse_Blue; else
                    if (buttons == NT.Mouse_Blue) buttons = NT.Mouse_Yellow;
                if (evt.ctrlKey)
                    buttons = swapButtons ? NT.Mouse_Blue : NT.Mouse_Yellow;
                break;
        }
        buttons +=
            (evt.shiftKey              ? NT.Key_Shift : 0) +
            (evt.ctrlKey               ? NT.Key_Ctrl : 0) +
            (evt.metaKey || evt.altKey ? NT.Key_Meta : 0);

        // we use a queue for up/down events to make the image
        // polling more reliable
        if (!display.buttonsQueue) {
            display.buttons = buttons;
        } else {
            var n = display.buttonsQueue.length,
                isPressed = !!(buttons & 7),
                wasPressed = !!((n ? display.buttonsQueue[n-1].buttons : display.buttons) & 7);
            if (wasPressed !== isPressed)
                display.buttonsQueue.push(
                    {buttons: buttons, x: evt.layerX, y: evt.layerY, time: evt.timeStamp});
        }
    }
    canvas.onmousedown = recordMouseEvent;
    canvas.onmousemove = recordMouseEvent;
    canvas.onmouseup = recordMouseEvent;
    canvas.oncontextmenu = function() { return false; };

    function recordKeyboardEvent(char, repeatOK) {
        // char is the code used in the image, which is 
        // ASCII from 32-126 but custom outside that range
        // we do a reverse lookup in the keyboard map to find
        var key = NT.kbMap.indexOf(char) + 1;
        if (key) {
            var q = display.keys,
                repeat = 0;
            // limit how many repetitions of a key to queue in advance
            if (!repeatOK)
                while (repeat < q.length && key == q[q.length - (++repeat)]);
            if (repeat < 3)
                q.push(key);
        }
    }

    document.onkeydown = function(evt) {
        display.timeStamp = evt.timeStamp;
        var code, modifier;
        switch (evt.keyCode) {
            case 8:  code = 'bs'; break;
            case 9:  code = 'tab'; break;
            case 13: code = 'cr'; break;
            case 16: modifier = NT.Key_Shift; break;
            case 17: modifier = NT.Key_Ctrl; break;
            case 18: modifier = NT.Key_Meta; break;
            case 27: code = 'esc'; break;
            case 33: code = 'pageUp'; break;
            case 34: code = 'pageDown'; break;
            case 35: code = 'end'; break;
            case 36: code = 'home'; break;
            case 37: code = 'left'; break;
            case 38: code = 'up'; break;
            case 39: code = 'right'; break;
            case 40: code = 'down'; break;
            case 224: modifier = NT.Key_Meta; break;
        }
        if (code) { // special key pressed
            recordKeyboardEvent(NT.kbSymbolic[code]);
            return evt.preventDefault();
        }
        if (modifier) { // modifier pressed
            display.buttons |= modifier;
            return evt.preventDefault();
        }
        if (evt.ctrlKey || evt.metaKey || evt.altKey) { // clipboard requires special handling
            var c = String.fromCharCode(evt.which);
            switch(c && c.toLowerCase()) {
                // return false to let default handler do its magic
                case 'c': doKeyCopy(evt); return false;
                case 'v': doKeyPaste(evt); return false;
            }
        }
        // regular cmd keys. TODO: Windows/Linux?
        if ((evt.metaKey || evt.altKey) && evt.which) {
            code = evt.which;
            if (code >= 65 && code <= 90) {
                if (!evt.shiftKey) code += 32; // make lowercase
            } else {
                if (evt.keyIdentifier && evt.keyIdentifier.slice(0,2) == 'U+')
                    code = parseInt(evt.keyIdentifier.slice(2), 16)
            }
            var command = NT.kbCommands[String.fromCharCode(code)];
            if (command == "interrupt") {
                display.interrupt = true;
            } else recordKeyboardEvent(NT.kbSymbolic[command]);
            return evt.preventDefault();
        }
        //return false;
    }
    document.onkeypress = function(evt) {
        display.timeStamp = evt.timeStamp;
        var code = evt.charCode;
        // check for special
        if (code in NT.kbSpecial) {
            var char = NT.kbSpecial[code];
            code = NT.kbSymbolic[char] || char.charCodeAt(0);
        }
        // convert back from unicode if needed
        for (var ntcode in NT.toUnicode) {
            var unicode = NT.toUnicode[ntcode].charCodeAt(0);
            if (code == unicode) {
                code = ntcode.charCodeAt(0);
                break;
            }
        }
        recordKeyboardEvent(code);
        evt.preventDefault();
    }
    document.onkeyup = function(evt) {
        var modifier;
        switch (evt.keyCode) {
            case 16: modifier = NT.Key_Shift; break;
            case 17: modifier = NT.Key_Ctrl; break;
            case 18:
            case 224: modifier = NT.Key_Meta; break;
        }
        if (modifier) {
            display.buttons &= ~modifier;
        }
    }
        
    return display;
}


//////////////////////////////////////////////////////////////////////////////
// main loop
//////////////////////////////////////////////////////////////////////////////

var loop; // holds timeout for main loop

function interpretLoop() {
    clearTimeout(loop);
    try {
        Smalltalk78.vm.interpret(20, function(ms) {
            if (ms > 0) setTimeout(interpretLoop, ms);
            else        requestAnimationFrame(interpretLoop);
        });
    } catch(error) {
        console.error(error);
        alert(error);
    }
}

function runImage(buffer, imageName, canvas) {
    var display = createDisplay(canvas),
        image = users.bert.St78.vm.Image.readFromBuffer(buffer, imageName);
    Smalltalk78.vm = new users.bert.St78.vm.Interpreter(image, display);
    window.onbeforeunload = function() {
        return "Smalltalk78 is still running";
    };
    interpretLoop();
}

Smalltalk78.run = function(imageUrl, canvas) {
    var rq = new XMLHttpRequest();
    rq.open("get", imageUrl, true);
    rq.responseType = "arraybuffer";
    rq.onload = function(e) {
        if (rq.status == 200) {
            runImage(rq.response, imageUrl, canvas); 
        }
        else rq.onerror(rq.statusText);
    };
    rq.onerror = function(e) {
        alert("Failed to download:\n" + imageUrl);
    }
    rq.send();
}

// end of module
});
