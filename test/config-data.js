const test = require('tape');
const configData = require('../lib/config-data');
const data = getData();

test('should set the passed language value as the language property', t => {
    configData(data, { language: 'nl' });

    t.equal(data.options.language, 'nl');
    t.doesNotThrow(() => configData(data, { language: 'nl' }));
    t.end();
});

test('should throw an exception if an invalid language is passed', t => {
    t.throws(() => configData(data, { language: 'dfrnl' }));
    t.end();
});

test('should set the passed ToC levels as the toc property', t => {
    configData(data, { toc: { minLevel: 4, maxLevel: 6 } });

    t.equal(data.options.toc.minLevel, 4);
    t.equal(data.options.toc.maxLevel, 6);
    t.doesNotThrow(() => configData(data, { toc: { minLevel: 4, maxLevel: 6 } }));
    t.end();
});

test('should throw an exception if an invalid ToC level is passed', t => {
    t.throws(() => configData(data, { toc: { minLevel: 7, maxLevel: 6 } }));
    t.end();
});

function getData() {
    return {
        title: 'Some title',
        subtitle: 'Some subtitle',
        body: '<p>Text</p><h2 id="hello">Hello World</h2><p>Text</p><h3 id="another">Another level</h3>',
        footer: ''
    }
}
