const test = require('tape');
const shell = require('shelljs');
const binPath = require('../package.json').bin.formatter;


test('cli should output html', t => {
    const output = shell.exec(`node ${binPath} README.md`, { silent: true });
    t.equal(/<html.*>/.test(output.stdout), true);
    t.end();
});

test('cli should throw error if no source file provided', t => {
    const output = shell.exec(`node ${binPath}`, { silent: true });
    t.equal(output.stderr.length > 0, true);
    t.end();
});