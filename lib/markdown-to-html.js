'use strict';

const promisify = require('bluebird').promisify;
const fs = require('fs');
const marked = promisify(require('marked'));
const readFile = promisify(fs.readFile);


function markdownToHtml(filename) {
    return readFile(filename, 'utf8')
        .then(markdown => marked(markdown))
}

module.exports = markdownToHtml;
