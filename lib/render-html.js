'use strict';

const nunjucks = require('nunjucks');
const path = require('path');
const env = new nunjucks.Environment(
    new nunjucks.FileSystemLoader([path.join(__dirname, '/../src/')], {
        noCache: true
    })
);

function renderHtml(data) {
    return new Promise((resolve, reject) => {
        env.render('templates/product.html', data, (err, html) => {
            err ? reject(err) : resolve(html);
        });
    });
}

module.exports = renderHtml;
