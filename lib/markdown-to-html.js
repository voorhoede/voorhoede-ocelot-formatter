'use strict';

const marked = require('marked');
const fs = require('fs');

function markdownToHtml(filename) {
    return new Promise((resolve, reject) => {
        try {
            const markdown = fs.readFileSync(`${filename}`, 'utf8');
            var html = marked(markdown);
            resolve(html);
        } catch(err) {
            reject(err);
        }
    });
}

module.exports = markdownToHtml;
