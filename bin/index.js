#!/usr/bin/env node

const formatter = require('../index');
const pkg = require('../package');
const path = require('path');
const promisify = require('bluebird').promisify;
const promisifyAll = require('bluebird').promisifyAll;
const makeDir = promisify(require('mkdirp'));
const fs = promisifyAll(require('fs'));

const program = require('commander')
    .version(pkg.version)
    .description(`${pkg.name} (v${pkg.version}): ${pkg.description}`)
    .usage('<file> [options]')
    .option('-o, --output <file>', 'write to HTML file')
    .parse(process.argv);

const srcFile = path.join(program.args[0]);
const destFile = program.output;

const format = fs.readFileAsync(srcFile, 'utf8')
    .then(readme => formatter(readme));

if (program.output) {
    format.then(html => {
        makeDir(path.dirname(destFile))
            .then(() => fs.writeFileAsync(destFile, html))
            .catch(err => console.error(err));
    })
} else {
    format.then(html => console.log(html))
}
