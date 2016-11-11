'use strict';

const nunjucks = require('nunjucks');
const getHeadings = require('./get-headings');
const defineSettings = require('./define-settings');
const path = require('path');
const env = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(['./src/'], {
        noCache: true
    })
);

function renderHtml(data, options) {
    data = Object.assign(data, {
        headings: getHeadings(data.body),
        lang: defineSettings(options).lang,
        toc: defineSettings(options).toc
    });

    return new Promise((resolve, reject) => {
        env.render(path.join(__dirname, '../src/templates/product.html'), data, (err, html) => {
            err ? reject(err) : resolve(html);
        });
    });
}

module.exports = renderHtml;
