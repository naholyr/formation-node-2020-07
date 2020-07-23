'use strict';

console.log('c');

const { a } = require('./a');

exports.c = () => a() + 'c';