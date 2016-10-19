'use strict';

const cheerio = require('cheerio');

function getPageData(html) {
    const $ = cheerio.load(html);
    const $title = $('h1').first();
    const $subtitle = $('p').first();
    const $hr = $('hr').last();
    const $footerItems = $hr.nextAll();
    const footer = $($footerItems).map((i, elem) => $(elem)).get().join('');

    const title = $title.html();
    const subtitle = $subtitle.html();

    $title.remove();
    $subtitle.remove();
    $hr.remove();
    $footerItems.remove();

    const body = $.html();

    return { title, subtitle, body, footer };
}

module.exports = getPageData;
