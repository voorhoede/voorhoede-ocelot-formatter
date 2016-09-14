#!/usr/bin/env node

const formatter = require('../../index');
const path = require('path');
const fs = require('fs');

formatter(path.join(__dirname, '/README.md'))
    .then(html => saveFile(path.join(__dirname, '/index.html'), html))
    .catch(err => console.error(err));


function saveFile(dest, html) {
    fs.writeFileSync(dest, html);
}
