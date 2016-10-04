const test = require('tape');
const renderCode = require('../lib/render-code');
const cheerio = require('cheerio');
const code = getCode();

test('should render code with javascript language', t => {
    const snippet = renderCode(code, 'javascript');
    const $ = cheerio.load(snippet);

    t.equal($('pre').attr('class'), 'language-javascript');
    t.equal($('.token').length >= 1, true);
    t.end();
});

test('should render code with json language', t => {
    const snippet = renderCode(code, 'json');
    const $ = cheerio.load(snippet);

    t.equal($('pre').attr('class'), 'language-json');
    t.equal($('.token').length >= 1, true);
    t.end();
});

test('should render code with unknown language', t => {
    const snippet = renderCode(code);
    const $ = cheerio.load(snippet);

    t.equal($('pre').attr('class'), 'language-unknown');
    t.equal($('.token').length, 0);
    t.end();
});

function getCode() {
    return 'const foo = bar;'
}