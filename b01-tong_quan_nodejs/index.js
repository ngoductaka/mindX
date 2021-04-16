// 

var fs = require('fs');
const path = require('path');

const a = 2;
const b = 3;
// console.log('__dirname', console.log(__dirname);)
console.log(__dirname);
fs.readFile(path.resolve(__dirname, 'course.md'), 'utf8', (err, data) => {
    console.log(err) ;
    console.log(data)
})

console.log(a+b);