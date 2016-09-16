const test = require('tape');
const getHeadings = require('../lib/get-headings');

test('should get the id from the heading', function(t) {
    const body = getBody();
    const headings = getHeadings(body);

    t.equal(headings[0].id, 'hello');
    t.equal(headings[1].id, 'another');
    t.end();
});

test('should get the level from the heading', function(t) {
    const body = getBody();
    const headings = getHeadings(body);

    t.equal(headings[0].level,  2);
    t.equal(headings[1].level,  3);
    t.end();
});

test('should get the html from the heading', function(t) {
    const body = getBody();
    const headings = getHeadings(body);

    t.equal(headings[0].html, 'Hello World');
    t.equal(headings[1].html, 'Another level');
    t.end();
});

function getBody() {
    return '<p>Text</p><h2 id="hello">Hello World</h2><p>Text</p><h3 id="another">Another level</h3>'
}
