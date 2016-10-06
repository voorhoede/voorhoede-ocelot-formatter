const markdownToHtml = require('./lib/markdown-to-html');
const getPageData = require('./lib/get-page-data');
const renderHtml = require('./lib/render-html');
const getHeadings = require('./lib/get-headings');

function formatter(markdown, options) {
    options = Object.assign({ language: 'en' }, options);

    return markdownToHtml(markdown)
        .then(html => getPageData(html))
        .then(data => addData(data, options))
        .then(data => renderHtml(data))
}

function addData(data, options) {
    return Object.assign({}, data, {
        headings: getHeadings(data.body),
        options: options
    });
}

module.exports = formatter;
