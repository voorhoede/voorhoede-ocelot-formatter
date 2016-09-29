const test = require('tape');
const renderCode = require('../lib/render-code');
const code = getCode();

test('should render code with javascript language', t => {
    const snippet = renderCode(code, 'javascript');

    t.equal(snippet, '<pre class="language-javascript"><code><span class="token keyword" >const</span> foo <span class="token operator" >=</span> bar<span class="token punctuation" >;</span></code></pre>');
    t.end();
});

test('should render code with unknown language', t => {
    const snippet = renderCode(code);

    t.equal(snippet, '<pre class="language-unknown"><code>const foo = bar;</code></pre>');
    t.end();
});

function getCode() {
    return 'const foo = bar;'
}