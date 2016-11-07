'use strict';

const merge = require('lodash/merge');
const getHeadings = require('./get-headings');
const ISO6391 = require('iso-639-1');

function configData(data, options) {

    options = merge({
        language: 'en',
        toc: { minLevel: 2, maxLevel: 6 }
    }, options);

    return new Promise((resolve, reject) => {
        if (ISO6391.validate(options.language)) {
            const config = Object.assign({}, data, {
                headings: getHeadings(data.body),
                options: options
            });
            resolve(config);
        } else {
            reject('Your language argument is invalid');
        }
    });
}

module.exports = configData;