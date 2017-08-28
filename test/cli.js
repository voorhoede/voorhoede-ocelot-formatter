const test = require('tape');
const binPath = require('../package.json').bin.formatter;
const { spawnSync, exec } = require('child_process');


test('cli should output html', t => {
    const formatter = spawnSync('node', [ binPath, 'README.md' ]);
    t.equal(/<html.*>/.test(formatter.stdout.toString()), true);
    t.end();
});

test('cli should throw error if no source file provided', t => {
    const formatter = spawnSync('node', [ binPath ]);
    t.equal(formatter.stderr.toString().length > 0, true);
    t.end();
});

test('cli should accept a stream as input', t => {
    exec(`echo "# markdown\n ## FTW\n" | node ${binPath}`, (err, stdout) => {
        if (err) {
            t.fail(err);
            return;
        }
        t.equal(/<html.*>/.test(stdout.toString()), true);
        t.end();
    });
});
