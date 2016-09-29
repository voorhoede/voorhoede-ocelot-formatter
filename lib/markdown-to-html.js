'use strict';

const promisify = require('bluebird').promisify;
const marked = promisify(require('marked'));
const renderCode = require('./render-code');

function markdownToHtml(markdown) {
    let renderer = new marked.Renderer();
    renderer.code = renderCode;
    return marked(markdown, { renderer });
}

module.exports = markdownToHtml;
