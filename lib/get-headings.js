'use strict';

const cheerio = require('cheerio');

/**
 * Return list of heading (html, id, level)
 *
 * @param  {Object} data
 * @return {Promise}
 */

function getHeadings(body) {
    return new Promise((resolve, reject) => {
        try {
            const $ = cheerio.load(body);
            const headings = $(':header').get().map(heading => {
                const $heading = $(heading);
                return {
                    html: $heading.html(),
                    id: $heading.attr('id'),
                    level: parseInt(heading.tagName.substring(1))
                }
            });

            resolve(headings);
        } catch(err) {
            reject(err);
        }
    });
}

module.exports = getHeadings;
