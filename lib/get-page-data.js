'use strict';

const cheerio = require('cheerio');

function getPageData(html) {
    const $ = cheerio.load(html);
    const $title = $('h1').first();
    const $subtitle = $('p').first();

    const title = $title.html();
    const subtitle = $subtitle.html();

    $title.remove();
    $subtitle.remove();

    const body = $.html();

    return { title, subtitle, body };
}

module.exports = getPageData;
