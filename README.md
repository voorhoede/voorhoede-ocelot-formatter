# Voorhoede Ocelot Formatter

[![voorhoede-ocelot-formatter on npm](https://badge.fury.io/js/voorhoede-ocelot-formatter.svg)](https://www.npmjs.com/package/voorhoede-ocelot-formatter)
[![Build Status](https://travis-ci.org/voorhoede/voorhoede-ocelot-formatter.svg?branch=master)](https://travis-ci.org/voorhoede/voorhoede-ocelot-formatter)
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

Convert markdown file to HTML and **log output to the console**:

```bash
$ formatter README.md
```

Convert markdown file to HTML and **output content to an HTML file** using `--output`:

```bash
$ formatter README.md --output path/to/output/file.html
```

#### Options

##### Document language

The default document language is set to 'en'. You can **specify another language** using `--lang`:

```bash
$ formatter README.md --lang nl
```

##### Table of contents levels

By default the table of contents renders heading levels 2 to 6. You can **specify different ToC levels** using `--toc`:

```bash
$ formatter README.md --toc 3..4
```

Convert markdown file to HTML and **specify that no ToC should be rendered** using `--noToc`:

```bash
$ formatter README.md --noToc
```

### JS

To use Voorhoede Ocelot Formatter programmatically import the `voorhoede-ocelot-formatter` module.
The formatter expects content in markdown (string) as an argument.
The formatter returns a promise which resolves with the content as HTML (string).

```javascript
const formatter = require('voorhoede-ocelot-formatter');
const readme = '#content in *markdown*';

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
});
```

#### Options

##### Document language

The default document language is set to 'en'. You can **specify another language**:

```javascript
formatter(readme, { language: 'nl' })
```

##### Table of contents levels

By default the table of contents renders heading levels 2 to 6. You can **specify different ToC levels**:

```javascript
formatter(readme, { toc: { minLevel: 3, maxLevel: 4 } })
```

Specify that no ToC should be rendered:

```javascript
formatter(readme, { toc: false })
```

## Formatting options

### Footer

If you want to have content displayed in the footer, you can add a horizontal rule (`---`) in your markdown content.
All content below the last horizontal rule will be displayed in the footer.

---

## License

[MIT licensed](https://github.com/voorhoede/voorhoede-ocelot-formatter/blob/master/LICENSE) © [De Voorhoede](https://www.voorhoede.nl/)
