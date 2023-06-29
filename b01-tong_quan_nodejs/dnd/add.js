const fs = require('fs');
// CRUD 

// studentData
// {id: '447463462', name: 'dnd', age: 18}
const saveData = (studentData) => {
    return new Promise(
        (res, rej) => {
            const dataSave = JSON.stringify(studentData);
            fs.writeFile(
                'student.json', // đường dẫn 
                dataSave,
                // nội dung 
                function (err) { // call back
                    if (err) rej(err);
                    console.log('Saved!');
                    res(1)
                }
            );
        })
};
//  save in student.json 
// [ { name: 'dnd', age: 18},  { name: 'ngoc', age: 20}]

const readStudent = (studentData) => {
    const newPromise = new Promise(
        (res, rej) => {
            fs.readFile(
                'student.json',
                'utf8',
                (err, re) => {
                    if (err) rej(err);
                    res(re);
                }
            );
        }
    );
    return newPromise;
};

const CreateStudent = async (data) => {
    try {
        // b1 read all data
        const allStudent = await readStudent();
        if (allStudent) {
            const dataCOnvert = JSON.parse(allStudent);
            await saveData([...dataCOnvert, data])
        } else { // 
            await saveData([data])
        }
    } catch (err) {
        console.log('err', err);
    }
};
// C R U D
const Update = 
const dataStudent = {
    name: 'nguyen van a',
    age: 27,
}
CreateStudent(dataStudent);