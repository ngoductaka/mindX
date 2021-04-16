const _ = require('lodash');
const add = require('./add_function');

const a = 1;
const b = 2;
const total = _.add(a, b);

console.log('total:', total, add(1,2))