
const fs = require('fs');

const readFilePromise = (path, endCode) => {
    return new Promise((res, rej) => {
        fs.readFile(path, endCode, (err, result) => {
            if (err) rej(err);
            res(result)
        })
    })
}

// const router = require('./router/index');
// model.js
const readAll = async () => {
    try {
        const dataString = await readFilePromise('./user.json', 'utf8');
        // console.log('dataString', dataString);
        return JSON.parse(dataString)
    } catch (err) {
        return [];
    }
}
const saveDataArray = dataSave => fs.promises.writeFile('./user.json', JSON.stringify(dataSave));

// xử lý lưu trong db
// const dataNewUser = {
//     name: 'ngoc duc',
//     age: 22,
// };

const createNewRecord = async (dataNewUser) => {
    try {

        const dataConvert = {
            ...dataNewUser, // spread es6
            id: new Date().valueOf(),
        };

        console.log('dataConvert:', dataConvert);
        // data user mới log
        // dataConvert = {
        //     name: 'ngoc duc',
        //     age: 22,
        //     id: new Date().valueOf(),
        // };

        //  đọc tất cả dữ liệu dang có
        const allData = await readAll();
        // insert dữ liệu mới vào data có sẵn
        allData.push(dataConvert);
        //  lưu dữ liệu mới 
        await saveDataArray(allData);

        return dataConvert
    } catch (err) {
        throw err;
    }
};

const findUser = async (userName, password) => {
    const allUser = await readAll();

    // map|find|reduce;
    console.log('userName, password', userName, password)
    const userFounded = allUser.find(({ name, pass }) => userName === name && password === pass);
    return userFounded;
}

module.exports = {
    createNewRecord,
    findUser,
    readAll,
}