const markdownToHtml = require('./lib/markdown-to-html');
const getPageData = require('./lib/get-page-data');
const configData = require('./lib/config-data');
const renderHtml = require('./lib/render-html');

function formatter(markdown, options) {

    return markdownToHtml(markdown)
        .then(html => getPageData(html))
        .then(data => configData(data, options))
        .then(data => renderHtml(data))
}

module.exports = formatter;
