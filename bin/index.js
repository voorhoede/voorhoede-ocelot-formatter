#!/usr/bin/env node

const defineSettings = require('../lib/define-settings');
const formatter = require('../index');
const pkg = require('../package');
const path = require('path');
const promisify = require('bluebird').promisify;
const promisifyAll = require('bluebird').promisifyAll;
const makeDir = promisify(require('mkdirp'));
const fs = promisifyAll(require('fs'));
const through = require('through2');

function range(value) {
    const values = value.split('..').map(Number);
    return { minLevel: values[0], maxLevel: values[1] }
}

const program = require('commander')
    .version(pkg.version)
    .description(`${pkg.name} (v${pkg.version}): ${pkg.description}`)
    .usage('<file> [options]')
    .option('-o, --output <file>', 'write to HTML file')
    .option('-l, --lang [value]', 'specify language of page content')
    .option('-t, --toc [range]', 'specify min and max level of table of contents', range)
    .option('-n, --noToc', 'do not render table of contents')
    .option('-g, --github [value]', 'add link to Github page')
    .parse(process.argv);

let options;

try {
    // Errors if ToC is given and out of range
    options = defineSettings(program);
} catch(err) {
    failWithError(err);
}

const destFile = options.output;
const stdin = process.stdin;

if (destFile) {
    // Create output directory if it doesn't exist
    makeDir.sync(path.dirname(destFile));
}

stdin.once('readable', () => {
    // if data can be read from stdin, we're streaming.
    const data = stdin.read();
    let stream;
    if (!data) { // input is not a stream
        const srcFile = program.args[0];
        if (!srcFile) { // if not streaming, an input file should be provided
            failWithError('Error: Expected input filename or stream');
        }
        stream = fs.createReadStream(srcFile)
            .pipe(transform(options).on('error', failWithError))
            .on('end', () => stdin.end());
    } else { // input is a stream
        // data previously read from stream is prepended here
        stream = stdin.pipe(transform(options, data)
            .on('error', failWithError));
    }

    if (!destFile) { // output to terminal
        stream.pipe(process.stdout);
    } else { // write to file
        stream.pipe(fs.createWriteStream(destFile));
    }
});

/**
 * Transform stream translates markdown to html
 *
 * @param {object} options for html renderer
 * @param {buffer} buf buffer to append read bytes to
 * @returns {stream}
 */
function transform(options, buffer) {
    buffer = buffer || new Buffer('');
    return through((chunk, enc, cb) => {
        buf = Buffer.concat([buffer, chunk]);
        cb();
    }, function(cb) {
        const stream = this;
        formatter(buffer.toString(), options)
            .then(html => {
                this.push(html);
                cb();
            })
            .catch(cb);
    });
}

/**
 * Log error to stdout and exit non-zero
 *
 * @param {Error} err
 */
function failWithError(err) {
    console.error(err)
    process.exit(1);
}
