#!/usr/bin/env node

const formatter = require('../index');
const pkg = require('../package');
const path = require('path');
const promisify = require('bluebird').promisify;
const promisifyAll = require('bluebird').promisifyAll;
const makeDir = promisify(require('mkdirp'));
const fs = promisifyAll(require('fs'));

function range(value) {
    const values = value.split('..').map(Number);
    return { min: values[0], max: values[1] }
}

const program = require('commander')
    .version(pkg.version)
    .description(`${pkg.name} (v${pkg.version}): ${pkg.description}`)
    .usage('<file> [options]')
    .option('-o, --output <file>', 'write to HTML file')
    .option('-l, --lang [value]', 'specify language of page content')
    .option('-t, --toc [range]', 'specify min and max level of table of contents', range)
    .option('-n, --noToc', 'do not render table of contents')
    .parse(process.argv);

const srcFile = path.join(program.args[0]);
const destFile = program.output;

program.toc = program.toc || [];

const format = fs.readFileAsync(srcFile, 'utf8')
    .then(readme => formatter(readme, {
        lang: program.lang,
        toc: program.noToc ? false : { minLevel: program.toc.min, maxLevel: program.toc.max }
    }));

if (program.output) {
    format
        .then(html => {
            makeDir(path.dirname(destFile))
            .then(() => fs.writeFileAsync(destFile, html))
            .catch(err => console.error(err));
        })
        .catch(err => console.log(err));
} else {
    format.then(html => console.log(html))
}
