const test = require('tape');
const markdownToHtml = require('../lib/markdown-to-html');
const markdown = getMarkdown();
const html = markdownToHtml(markdown);

test('should convert markdown to html', function(t) {
    html.then(html =>  {
        t.equal(html, `<h1 id="hello-world">Hello World</h1>
<h2 id="test">Test</h2>
<p>some text</p>
`)
    });
    t.end();
});

function getMarkdown() {
    return `# Hello World
## Test
some text`
}
