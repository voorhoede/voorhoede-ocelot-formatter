'use strict';

const merge = require('lodash/merge');
const getHeadings = require('./get-headings');

function configData(data, options) {
    options = merge({
        language: 'en',
        toc: { minLevel: 2, maxLevel: 6 }
    }, options);

    return Object.assign({}, data, {
        headings: getHeadings(data.body),
        options: options
    });
}

module.exports = configData;