'use strict';

const prism = require('prismjs');

function getCode(code, language) {
    if (prism.languages.hasOwnProperty(language)) {
        code = prism.highlight(code, prism.languages[language]);
        return `<pre class="language-${language}"><code>${code}</code></pre>`;
    } else {
        return `<pre class="language-unknown"><code>${code}</code></pre>`;
    }
}

module.exports = getCode;
