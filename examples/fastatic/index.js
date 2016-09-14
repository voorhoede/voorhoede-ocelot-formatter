#!/usr/bin/env node

const formatter = require('../../index');
const path = require('path');

formatter(path.join(__dirname, '/README.md'), __dirname);
