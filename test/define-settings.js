const test = require('tape');
const defineSettings = require('../lib/define-settings');

test('should set the passed language value as the language property', t => {
    t.equal(defineSettings({ lang: 'nl' }).lang, 'nl');
    t.doesNotThrow(() => defineSettings({ lang: 'nl' }));
    t.end();
});

test('should throw an exception if an invalid language is passed', t => {
    t.throws(() => defineSettings({ lang: 'dfrnl' }));
    t.end();
});

test('should set the passed ToC levels as the toc property', t => {
    t.equal(defineSettings({ toc: { minLevel: 4 } }).toc.minLevel, 4);
    t.equal(defineSettings({ toc: { maxLevel: 6 } }).toc.maxLevel, 6);
    t.doesNotThrow(() => defineSettings({ toc: { minLevel: 4, maxLevel: 6 } }));
    t.end();
});

test('should throw an exception if an invalid ToC level is passed', t => {
    t.throws(() => defineSettings({ toc: { minLevel: 7, maxLevel: 6 } }));
    t.end();
});