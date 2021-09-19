// thư viện bên thứ 3
const _ = require('lodash');
// core module
const fs = require('fs');
// local
const addFunction = require('./add.js');

const result = _.add(1, 1);
const result2 = addFunction(1, 1);

fs.promises.readFile('add.js', 'utf8')
    .then((data) => {
        console.log('data: ', data)
    })
console.log({ result, result2 })
