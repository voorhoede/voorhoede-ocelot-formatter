'use strict';

const fs = require('fs');
const nunjucks = require('nunjucks');
const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(['./src/'])); // loads templates from the 'src' folder

function renderHtml(data, dest) {
    return new Promise((resolve, reject) => {
        try {
            var content = env.render('../src/templates/product.html', {
                title: data.title,
                subtitle: data.subtitle,
                body: data.body,
                toc: data.headings
            });
            fs.writeFileSync(`${dest}/index.html`, content);

            resolve(content);
        } catch(err) {
            reject(err);
        }
    });
}

module.exports = renderHtml;
