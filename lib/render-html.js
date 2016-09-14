'use strict';

const nunjucks = require('nunjucks');
const env = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(['./src/'], {
        noCache: true
    })
);

function renderHtml(data) {
    return new Promise((resolve, reject) => {
        env.render('../src/templates/product.html', data, (err, html) => {
            err ? reject(err) : resolve(html);
        });
    });
}

module.exports = renderHtml;
