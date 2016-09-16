const test = require('tape');
const cheerio = require('cheerio');
const renderHtml = require('../lib/render-html');
const data = getData();
const html = renderHtml(data);

test('should render the title as page header title', function(t) {
    html.then(function(html) {
        const page = getHtml(html);

        t.equal(page.titleText, 'Hello World');
        t.end();
    });
});

test('should render the sub title as page header sub title', function(t) {
    html.then(function(html) {
        const page = getHtml(html);

        t.equal(page.subTitleText, 'Test this');
        t.end();
    });
});

test('should render a navigation item for each heading', function(t) {
    html.then(function(html) {
        const page = getHtml(html);

        t.equal(page.headings.length, 2);
        t.end();
    });
});

function getData() {
    return {
        title: 'Hello World',
        subtitle: 'Test this',
        headings: [
            { html: 'Test me', id: 'test', level: 2 },
            { html: 'Test me too', id: 'testing', level:  3}
        ]
    }
}

function getHtml(html) {
    const $ = cheerio.load(html);
    const $body = $('body');

    return {
        titleText: $body.find('.page-header-title').html(),
        subTitleText: $body.find('.page-header-sub-title').html(),
        headings: $body.find('*[class^="toc-level"]')
    }
}