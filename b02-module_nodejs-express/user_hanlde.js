'use strict';

const fs = require('fs');
// read
try {

    let rawdata = fs.readFileSync('student.json');
    let student = JSON.parse(rawdata);

    console.log(student);
    // {
    //     "name": "",
    //     "age": 23,
    //     "gender": "Female",
    //     "department": "History",
    //     "car": "Honda"
    // }
} catch (err) {

}


// update or over write new file
let dataStudent = {
    name: 'Mike',
    age: 23,
    gender: 'Male',
    department: 'English',
    car: 'Honda'
};

let data = JSON.stringify(dataStudent);
fs.writeFileSync('student.json', data);

// update file with append



fs.appendFile('student.json', JSON.stringify(dataStudent), function (err) {
    if (err) throw err;
    console.log('Saved!');
});