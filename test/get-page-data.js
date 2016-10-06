const test = require('tape');
const getPageData = require('../lib/get-page-data');

test('should get the title', t => {
    const html = '<h1>Hello World</h1>';
    const output = getPageData(html);

    t.equal(output.title, 'Hello World');
    t.end();
});

test('should get the first h1 as title', t => {
    const html = '<h1>First title</h1><h1>Second title</h1>';
    const output = getPageData(html);

    t.equal(output.title, 'First title');
    t.end();
});

test('should get the first p as subtitle', t => {
    const html = '<h1>Hello World</h1><p>Text</p><p>Some more text</p>';
    const output = getPageData(html);

    t.equal(output.subtitle, 'Text');
    t.end();
});

test('should get the body', t => {
    const html = '<h1>Hello World</h1><p>Text</p><p>Some more text</p>';
    const output = getPageData(html);

    t.equal(output.body, '<p>Some more text</p>');
    t.end();
});

test('should display the footer if there is a horizontal rule', t => {
    const html = '<h1>Hello World</h1><p>Text</p><p>Some more text</p><hr><p>some footer content</p>';
    const output = getPageData(html);

    t.equal(output.footer, '<p>some footer content</p>');
    t.end();
});

test('should not display the footer if there is no horizontal rule', t => {
    const html = '<h1>Hello World</h1><p>Text</p><p>Some more text</p>';
    const output = getPageData(html);

    t.equal(output.footer, '');
    t.end();
});
