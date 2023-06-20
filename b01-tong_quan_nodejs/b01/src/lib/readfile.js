const fs = require('fs');
const path = require('path');
// đọc file 

const read = (fileName, cb) => {
    fs.readFile(
        // '/Users/ducngoc/Documents/mindx/mindX/b01-tong_quan_nodejs/b01/src/database/text.txt', // 1 đường dẫn
        path.resolve(__dirname, `../database/${fileName}`),
        'utf8', // kiểu mã hoá 
        (
            err, // lỗi errors 
            re // kết quả trả về
        ) => { // callback 
            if (err) {
                console.log(err);
            }
            // const data = [
            //     {
            //         "name": "dnd",
            //         "age": 33
            //     },
            //     {
            //         "name": "ngoc duc",
            //         "age": 31
            //     }
            // ];
            // file text

            // 7 kiểu dữ liệu cơ bản
            //  cấu trúc dữ liệu  

            // console.log(
            //     'result:',
            //     JSON.parse(re),
            //     re
            // );
            cb(JSON.parse(re))
        }
    );
}

const readSyc = async (fileName) => {
    try {
        const data = await fs.promises.readFile(
            path.resolve(__dirname, `../database/${fileName}`),
            'utf8',
        );
        // data is string
        return JSON.parse(data);
    } catch (err) {
        console.log('err:', err);
        return [];
    }
}

module.exports = {
    read,
    readSyc,
};