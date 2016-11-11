'use strict';

const merge = require('lodash/merge');
const inRange = require('lodash/inrange');
const getHeadings = require('./get-headings');
const ISO6391 = require('iso-639-1');
const defaults = {
    lang: 'en',
    toc: { minLevel: 2, maxLevel: 6 }
};

function configData(data, options) {
    const settings = merge({}, defaults, options);

    const validMinLevel = inRange(settings.toc.minLevel, defaults.toc.minLevel, defaults.toc.maxLevel + 1);
    const validMaxLevel = inRange(settings.toc.maxLevel, defaults.toc.minLevel, defaults.toc.maxLevel + 1);
    const isValidRange = (validMinLevel && validMaxLevel);

    if (!ISO6391.validate(settings.lang)) {
        throw 'Your language argument is invalid';
    } else if (settings.toc && !isValidRange) {
        throw `ToC levels must between ${defaults.toc.minLevel} and ${defaults.toc.maxLevel}`;
    } else {
        return Object.assign(data, {
            headings: getHeadings(data.body),
            options: settings
        });
    }
}

module.exports = configData;
