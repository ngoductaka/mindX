// module 
// 1 native module  (fs, http, os, path, ...) module được nodejs cung cấp sẵn.
// var os = require('os');

// console.log("Platform: " + os.platform());
// console.log("Architecture: " + os.arch());
// console.log("cpus: " + JSON.stringify(os.cpus()[0]));
// console.log(os.totalmem());
// console.log(os.freemem())

// 2 local module (module tự tạo) local module được tạo ra bởi chính người dùng.
const { add } = require('./add'); // đường dẫn tương đối đến file 

const result = add(1, 1);
const result1 = add(13, 1);
console.log('result:', result, result1);

// import, export => es6 (2015)
// 2007 => require and module.exports

// 3 third party module (express, body-parser, ...)
// npm:  node package manager
// 
var _ = require('lodash');

// const result = _.add(1, 1);
// const result1 = _.add(13, 1);
// console.log('result:', result, result1);