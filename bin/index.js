#!/usr/bin/env node

const formatter = require('../index');
const pkg = require('../package');
const path = require('path');
const promisifyAll = require('bluebird').promisifyAll;
const fs = promisifyAll(require('fs'));

const program = require('commander')
    .version(pkg.version)
    .description(`${pkg.name} (v${pkg.version}): ${pkg.description}`)
    .usage('<file>')
    .arguments('<file>')
    .parse(process.argv);

const srcFilename = path.join(program.args[0]);

fs.readFileAsync(srcFilename, 'utf8')
    .then(readme => formatter(readme))
    .then(html => console.log(html))
    .catch(err => console.error(err));