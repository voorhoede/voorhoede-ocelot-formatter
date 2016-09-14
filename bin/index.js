#!/usr/bin/env node

const formatter = require('../index');
const pkg = require('../package');

const program = require('commander')
    .version(pkg.version)
    .description(`${pkg.name} (v${pkg.version}): ${pkg.description}`)
    .usage('<file>')
    .arguments('<file>')
    .parse(process.argv);

formatter(program.args[0])
    .then(html => console.log(html));