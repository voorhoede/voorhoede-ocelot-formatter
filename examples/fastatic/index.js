#!/usr/bin/env node

const formatter = require('../../index');
const path = require('path');
const promisifyAll = require('bluebird').promisifyAll;
const fs = promisifyAll(require('fs'));

const srcFilename = path.join(__dirname, '/README.md');
const destFilename = path.join(__dirname, '/index.html');

fs.readFileAsync(srcFilename, 'utf8')
    .then(readme => formatter(readme))
    .then(html => fs.writeFile(destFilename, html))
    .catch(err => console.error(err));