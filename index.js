const markdownToHtml = require('./lib/markdown-to-html');
const getPageData = require('./lib/get-page-data');
const renderHtml = require('./lib/render-html');
const getHeadings = require('./lib/get-headings');

function formatter(filename) {

    return markdownToHtml(filename)
        .then(html => getPageData(html))
        .then(data => addHeadings(data))
        .then(data => renderHtml(data))
}

function addHeadings(data) {
    return Object.assign({}, data, { headings: getHeadings(data.body) });
}

module.exports = formatter;
