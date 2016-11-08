'use strict';

const merge = require('lodash/merge');
const getHeadings = require('./get-headings');
const ISO6391 = require('iso-639-1');

function configData(data, options) {
    options = merge({
        language: 'en',
        toc: { minLevel: 2, maxLevel: 6 }
    }, options);

    const defaultMinLevel = 2;
    const defaultMaxLevel = 6;
    const validMinLevel = (defaultMinLevel <= options.toc.minLevel && options.toc.minLevel <= defaultMaxLevel);
    const validMaxLevel = (defaultMinLevel <= options.toc.maxLevel && options.toc.maxLevel <= defaultMaxLevel && options.toc.maxLevel >= options.toc.minLevel);
    const validLevels = validMinLevel && validMaxLevel;

    if (!ISO6391.validate(options.language)) {
        throw 'Your language argument is invalid';
    } else if (!validLevels) {
        throw `ToC levels must between ${defaultMinLevel} and ${defaultMaxLevel}`;
    } else {
        return Object.assign({}, data, {
            headings: getHeadings(data.body),
            options: options
        });
    }
}

module.exports = configData;
