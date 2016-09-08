'use strict';

const fs = require('fs');
const nunjucks = require('nunjucks');
const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(['./src/'])); // loads templates from the 'src' folder

/**
 * Gets the contents from the product template and writes it to an index file
 *
 * @param {Object} data
 * @param {String} dest
 * @returns {Promise}
 */

function renderHtml(data, dest) {
    return new Promise((resolve, reject) => {
        try {
            var content = env.render('../src/templates/product.html', {
                title: data.title,
                subtitle: data.subtitle,
                body: data.body
            });
            fs.writeFileSync(`${dest}/index.html`, content);

            resolve(content);
        } catch(err) {
            reject(err);
        }
    });
}

module.exports = renderHtml;
