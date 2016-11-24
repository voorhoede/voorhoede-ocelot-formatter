'use strict';

const nunjucks = require('nunjucks');
const getHeadings = require('./get-headings');
const defineSettings = require('./define-settings');
const path = require('path');
const env = new nunjucks.Environment(
    new nunjucks.FileSystemLoader([path.join(__dirname, '/../src/')], {
        noCache: true
    })
);

function renderHtml(data, options) {
    data = Object.assign(data, {
        headings: getHeadings(data.body),
        lang: defineSettings(options).lang,
        toc: defineSettings(options).toc,
        github: defineSettings(options).github
    });

    return new Promise((resolve, reject) => {
        env.render('templates/product.html', data, (err, html) => {
            err ? reject(err) : resolve(html);
        });
    });
}

module.exports = renderHtml;
