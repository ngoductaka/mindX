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

// 3 third party module (express, body-parser, ...)
// npm:  node package manager
// 



// var fs = require('fs');

// var path = require('path');
// // 
// const content = [{
//     id: 2,
//     name: 'foo',
//     age: 36,
//     description: 'foo',
// },
// {
//     id: 1,
//     name: 'foo',
//     age: 36,
//     description: 'foo',
// },
// ];

// console.log('content:', JSON.stringify(content));
// console.log('__dirname:', __dirname);
// console.log('full path:', path.join(__dirname, 'database.json'));
// fs.writeFile(
//     path.join(__dirname, 'database.json'),// path 
//     JSON.stringify(content), // content 
//     function (err, data) { // function handle result 
//         if (err) {
//             console.log(err);
//             return;
//         }
//         console.log('writeFile', data);
//     }
// );

// fs.readFile(
//     './database.json', // path 
//     'utf-8',// type of decode
//     function (err, data) { // function handle result 
//         if (err) {
//             console.log(err);
//             return;
//         }
//         console.log('readFile', JSON.parse(data));
//     }
// );
// // 
// // CRUD list user 
// // => create, read, update, delete