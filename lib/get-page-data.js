'use strict';

const cheerio = require('cheerio');

function getPageData(html) {
    return new Promise((resolve, reject) => {
        try {
            const $ = cheerio.load(html);
            const $title = $('h1').first();
            const $subtitle = $('p').first();

            const title = $title.html();
            const subtitle = $subtitle.html();

            $title.remove();
            $subtitle.remove();

            const body = $.html();

            var data = { title, subtitle, body };

            resolve(data);
        } catch(err) {
            reject(err);
        }
    });
}

module.exports = getPageData;
