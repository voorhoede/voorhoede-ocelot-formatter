const test = require('tape');
const cheerio = require('cheerio');
const formatter = require('../index');
const markdown = getMarkdown();

test('should render the title as document title', t => {
    getPageProperties(markdown).then(page => {
        t.equal(page.title, 'Hello World');
        t.end();
    });
});

test('should render the title as page header title', t => {
    getPageProperties(markdown).then(page => {
        t.equal(page.pageHeaderTitle, 'Hello World');
        t.end();
    });
});

test('should render a navigation item for each heading', t => {
    getPageProperties(markdown).then(page => {
        t.equal(page.navigationItems.length, 3);
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

function getPageProperties(markdown) {
    return formatter(markdown).then(html => {
        const $ = cheerio.load(html);
        const $html = $('html');
        return {
            title: $html.find('title').html(),
            pageHeaderTitle: $html.find('.page-header-title').html(),
            navigationItems: $html.find('*[class^="toc-level"]')
        };
    });
}