const test = require('tape');
const cheerio = require('cheerio');
const formatter = require('../index');
const markdown = getMarkdown();
const html = formatter(markdown);

test('should render the title as document title', t => {
    html.then(html => {
        const page = getPageProperties(html);

        t.equal(page.documentTitle, 'Hello World');
        t.end();
    });
});

test('should render the title as h1', t => {
    html.then(html => {
        const page = getPageProperties(html);

        t.equal(page.pageTitle, 'Hello World');
        t.end();
    });
});

test('should render a navigation item for each heading', t => {
    html.then(html => {
        const page = getPageProperties(html);

        t.equal(page.headings.length, 3);
        t.end();
    });
});

function getMarkdown() {
    return `# Hello World
## Test
some text
## Another heading
some more text
### Yet another heading
even more text`
}

function getPageProperties(html) {
    const $ = cheerio.load(html);
    const $html = $('html');

    return {
        documentTitle: $html.find('title').html(),
        pageTitle: $html.find('.page-header-title').html(),
        headings: $html.find('*[class^="toc-level"]'),
        body: $html.find('.page-content section').html()
    }
}