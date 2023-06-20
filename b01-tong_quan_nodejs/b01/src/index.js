// Read file 
const fs = require('fs');
const path = require('path');

const readAllStudent = async (fileName = 'student.json') => {
    try {
        const data = await fs.promises.readFile(
            path.resolve(__dirname, `${fileName}`),
            'utf8',
        );
        // data is string
        return JSON.parse(data);
    } catch (err) {
        console.log('err:', err);
        return [];
    }
};

const createStudent = async (studentData) => {
    try {
        const allStudent = await readAllStudent();
        allStudent.push(studentData);
        const dataSave = JSON.stringify(allStudent, null, 4);
        await fs.promises.writeFile(
            path.resolve(__dirname, `student.json`),
            dataSave
        )
    } catch (err) {
        // ko co file student.json
        // > tạo mới file 
    }
}

// Create : tạo mới bài viết
// Read: đọc bài viết
// Update: chỉnh sửa
// Delete: xoá
// => CRUD
// http

const newStudent = {
    name: "Dương Bảo Ngọc",
    age: 19,
}
const main = async () => {
    await createStudent(newStudent);
    const dataResult = await readAllStudent();
    console.log('dataResult', dataResult);
};

main();