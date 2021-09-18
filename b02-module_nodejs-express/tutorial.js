
var fs = require('fs');
const path = require('path');

// student là 1 object có format
// {
//     "name": "",
//     "age": 23,
//     "gender": "Female",
//     "department": "History",
// }

const addNew = (student) => {
    // các bước cần làm 
    // b1: đọc và convert nội dung file json sang mảng
    // b2: thêm object vào mảng 
    // b3: ghi đè nội dung file

    // b1 lấy nội dung file
    fs.readFile('student.json', 'utf8', (err, data) => {
        if (err) { // có lỗi => file không tồn tại hoặc có lỗi khi đọc 
            console.log('lỗi khi đọc file')
            throw err;
        }
        // khi lấy được dữ liệu thì cần JSON.parse để lấy ra mảng vì dữ liệu lấy ra là string 
        // ******** 1 số trương hợp xảy ra lỗi nếu data lấy ra không phải là json ******
        const convertData = JSON.parse(data);

        //b2 thêm mới student
        const newList = [
            ...convertData,
            student
        ];
        //b3 ghi đè dữ liệu cũ
        fs.writeFile('student.json', JSON.stringify(newList), function (err) {
            if (err) { // có lỗi 
                console.log(err);
                throw err;
            }
            console.log('THêm mới học sinh thành công');
        });
    })
}
const addNewPromise = async student => {
    try {
        // b1 check sự tồn tại file 
        const isExit = await fs.existsSync('student.json');
        if (!isExit) {
            const newList = [student];
            const dataToSave = JSON.stringify(newList)
            await fs.promises.writeFile('student.json', dataToSave, "utf-8");
        }
        const data = await fs.promises.readFile('student.json', 'utf8');

        const dataConvert = JSON.stringify(data);
        const newList = [...dataConvert, student];

        await fs.promises.writeFile('student.json', JSON.stringify(newList));
        console.log('THêm mới học sinh thành công');

    } catch (err) {
        console.log('THêm mới học sinh thất bại');
        throw err;

    }
}

const main = () => {
    const newStudent = {
        "name": "duc",
        "age": 26,
        "gender": "Male",
        "department": "Math",
    }
    // sử dụng callback
    // addNew(newStudent)

    // sử dụng async await
    addNewPromise(newStudent)
        .catch(err => {
            console.log("final err", err)
        })
}

main();