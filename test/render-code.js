const test = require('tape');
const renderCode = require('../lib/render-code');
const cheerio = require('cheerio');
const code = getCode();

test('should render code with javascript language', t => {
    const snippet = renderCode(code, 'javascript');
    const $ = cheerio.load(snippet);

    t.equal($('pre').attr('class'), 'language-javascript');
    t.notEqual($('span').length, 0);
    t.end();
});

test('should render code with unknown language', t => {
    const snippet = renderCode(code);
    const $ = cheerio.load(snippet);

    console.log(snippet);

    t.equal($('pre').attr('class'), 'language-unknown');
    t.equal($('span').length, 0);
    t.end();
});

function getCode() {
    return 'const foo = bar;'
}