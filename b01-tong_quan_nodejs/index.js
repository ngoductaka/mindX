// require 
// fs tên module 
// module

// 1. local module 
// const add = (a, b) => a + b;

// . => folder hien tai 
// .. => folder cha
// 
const add = require('./add.js')

const data = add(1, 3);


// 2. native module  ex: fs, http 
var fs = require('fs');

// 3. npm module 
const _ = require('lodash');
// 

console.log('hi hi', _.add(1, 2));


// const path = require('path');

// const a = 2;
// const b = 3;
// // console.log('__dirname', console.log(__dirname);)
// console.log(__dirname);
// fs.readFile(path.resolve(__dirname, 'course.md'), 'utf8', (err, data) => {
//     console.log(err) ;
//     console.log(data)
// })

// console.log(a+b);

// const add = require('./add');

// const result = add(2, 4);

// console.log('result', result);