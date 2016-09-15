'use strict';

const nunjucks = require('nunjucks');
const path = require('path');
const env = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(['./src/'], {
        noCache: true
    })
);

function renderHtml(data) {
    return new Promise((resolve, reject) => {
        env.render(path.join(__dirname, '../src/templates/product.html'), data, (err, html) => {
            err ? reject(err) : resolve(html);
        });
    });
}

module.exports = renderHtml;
