// npm module
const _ = require('lodash');
// local module
const add = require('./add');
// core module
const fs = require('fs');



// read file 

// fs.promises.readFile('add.js', 'utf8')
//     .then((data) => {
//         console.log('data: ', data)
//     })

// fs.readFile(
//     '../project/add.js',
//     'utf8',
//     (err, re) => {
//         if (err) {
//             console.log(err);
//             return 0;
//         }
//         console.log(re);
//     }
// );

fs.writeFile(
    'mynewfile3.txt', // đường dẫn 
    'Hello nodejs!', // nội dung 
    function (err) { // call back
        if (err) throw err;
        console.log('Saved!');
    }
);



