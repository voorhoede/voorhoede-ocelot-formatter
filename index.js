const markdownToHtml = require('./lib/markdown-to-html');
const getPageData = require('./lib/get-page-data');
const renderHtml = require('./lib/render-html');

function formatter(filename, dest) {

    markdownToHtml(filename)
        .then((html) => getPageData(html))
        .then((data) => renderHtml(data, dest))
}

module.exports = formatter;
