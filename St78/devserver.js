// this is a simple dev server for testing Smalltalk78
// it serves static files and directory listings
// and allows uploading files (e.g. to the /updates/ directory)

// usage:
//   npm i
//   node devserver.js

// in Smalltalk78:
//    "upload a file"
//    user fileString: 'http:foo/bar.txt' ← 'hello'.
//    "use local update stream"
//    updateURL ← 'http:updates/'.
//    "see all updates"
//    user fileString: updateURL

const express = require('express');
const serveIndex = require('serve-index')
const fs = require('fs');
const path = require('path');
const app = express();
const port = 8000;

// log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// set req.body to raw body
app.use(express.raw({ type: '*/*' }));

// upload files
app.put("/*", (req, res, next) => {
    const filepath = path.join(".", req.path);
    const dir = filepath.slice(0, filepath.lastIndexOf('/'));
    if (!fs.existsSync(dir)) {
        console.log(`==> creating directory ${dir}`);
        fs.mkdirSync(dir, { recursive: true });
    }
    console.log(`==> storing ${req.body.length} bytes at ${filepath}`);
    const stream = fs.createWriteStream(filepath);
    stream.write(req.body);
    stream.end();
    res.send(`Uploaded ${req.path}`);
});

// serve static files and directory listings
app.use(express.static('.'), serveIndex('.'));

// start server
app.listen(port, () => {
    console.log(`Server listening at ${port}`);
});
