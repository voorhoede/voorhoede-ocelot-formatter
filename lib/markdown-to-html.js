'use strict';

const promisify = require('bluebird').promisify;
const marked = promisify(require('marked'));

function markdownToHtml(markdown) {
    return marked(markdown);
}

module.exports = markdownToHtml;
