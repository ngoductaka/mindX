// 
var fs = require('fs');
var path = require('path');
// 
const content = [{
    id: 2,
    name: 'foo',
    age: 36,
    description: 'foo',
},
{
    id: 1,
    name: 'foo',
    age: 36,
    description: 'foo',
},
];
console.log('content:', JSON.stringify(content));
console.log('__dirname:', __dirname);
console.log('full path:', path.join(__dirname, 'database.json'));
fs.writeFile(
    path.join(__dirname, 'database.json'),// path 
    JSON.stringify(content), // content 
    function (err, data) { // function handle result 
        if (err) {
            console.log(err);
            return;
        }
        console.log('writeFile', data);
    }
);

fs.readFile(
    './database.json', // path 
    'utf-8',// type of decode
    function (err, data) { // function handle result 
        if (err) {
            console.log(err);
            return;
        }
        console.log('readFile', JSON.parse(data));
    }
);
// 
// CRUD list user 
// => create, read, update, delete