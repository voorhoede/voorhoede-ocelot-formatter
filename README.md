# Voorhoede Ocelot Formatter

[![Coverage Status](https://coveralls.io/repos/github/voorhoede/voorhoede-ocelot-formatter/badge.svg?branch=master)](https://coveralls.io/github/voorhoede/voorhoede-ocelot-formatter?branch=master)

Format plain content as Voorhoede pages

## Install

Voorhoede Ocelot Formatter is written in [Node.js](http://nodejs.org/) and can be installed via [npm](https://npmjs.org/):

```bash
$ npm install voorhoede-ocelot-formatter
```

## Usage

You can use Voorhoede Ocelot Formatter both as a CLI tool and programmatically in JS.

### CLI

Convert markdown file to html and log output to the console:

```bash
$ formatter README.md
```

### JS

To use Voorhoede Ocelot Formatter programmatically import the `voorhoede-ocelot-formatter` module.
Voorhoede Ocelot Formatter expects plain content as an argument.

```javascript
const formatter = require('voorhoede-ocelot-formatter');
const readme = 'content in markdown';

formatter(readme)
    .then(html => console.log(html))
    .catch(err => console.error(err));
```

The way you read or fetch a file is up to you, as is the way you handle the output.
E.g, you can fetch content from a remote URL and log the output to the console:

```javascript
fetch('https://raw.githubusercontent.com/voorhoede/voorhoede-ocelot-formatter/master/README.md')
    .then(response => response.text())
    .then(readme => formatter(readme))
    .then(html => console.log(html))
    .catch(err => console.error(err));
```

or you can read a file from disk and write the output to an HTML file:

```javascript
fs.readFile('path/to/README.md', 'utf8', (err, readme) => {
    formatter(readme)
        .then(html => fs.writeFile('path/to/output', html))
        .catch(err => console.error(err));
})'
```
