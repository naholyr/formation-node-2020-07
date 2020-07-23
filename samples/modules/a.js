'use strict';

console.log('a');

const { c } = require('./c');

exports.a = () => 'a';
exports.a2 = () => c();