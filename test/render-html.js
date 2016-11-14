const test = require('tape');
const cheerio = require('cheerio');
const renderHtml = require('../lib/render-html');
const data = getData();

const html = renderHtml(data);

test('should render the title as page header title', t => {
    html.then(html => {
        const page = getPageProperties(html);

        t.equal(page.titleText, 'Hello World');
        t.end();
    });
});

test('should render the sub title as page header sub title', t => {
    html.then(html => {
        const page = getPageProperties(html);

        t.equal(page.subTitleText, 'Test this');
        t.end();
    });
});

test('should render a navigation item for each heading', t => {
    html.then(html => {
        const page = getPageProperties(html);

        t.equal(page.headings.length, 1);
        t.end();
    });
});

function getData() {
    return {
        title: 'Hello World',
        subtitle: 'Test this',
        body: '<h2>Heading level 2</h2><p>Some body content</p>'
    }
}

function getPageProperties(html) {
    const $ = cheerio.load(html);
    const $body = $('body');

    return {
        titleText: $body.find('.page-header-title').html(),
        subTitleText: $body.find('.page-header-sub-title').html(),
        headings: $body.find('*[class^="toc-level"]')
    }
}