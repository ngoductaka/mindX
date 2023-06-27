const fs = require('fs');

const fsReadFile = async () => await fs.promises.readFile('student.json', 'utf8');
const fsWrite = async (stringData) => await fs.promises.writeFile('student.json', stringData);
const generateId = () => new Date().valueOf();
// handle logic

// 
const readAllUser = async () => {
    try {
        const dataString = await fsReadFile();
        const dataObj = JSON.parse(dataString);
        return dataObj;
    } catch (err) {
        return [];
    }
}

// get one user 
const getUserById = async (userId) => {
    const dataUser = await readAllUser()
    const userFounded = dataUser.find(i => i.id == userId);
    return userFounded;
}
// get user by name 
const getUserByName = async (userId) => {
    const dataUser = await readAllUser()
    const userFounded = dataUser.find(i => i.id == userId);
    return userFounded;
}

// create user
const createUser = async (userData) => {
    const oldData = await readAllUser();
    userData.id = generateId();
    const newData = [...oldData, userData];
    const newDataConvertToString = JSON.stringify(newData, null, 4);
    await fsWrite(newDataConvertToString);
}

// update user
const updateUser = async (userId, newDataUpdate) => {
    const oldData = await readAllUser();

    const index = oldData.findIndex(i => i.id = userId);
    if (index > -1) { // tìm thấy user
        const userFound = oldData[index];
        oldData[index] = {
            ...userFound,
            ...newDataUpdate,
        };

        const newDataConvertToString = JSON.stringify(oldData, null, 4);
        await fsWrite(newDataConvertToString);
        return 1;
    } else { // ko tìm thấy 
        return 0;
    }
}
// delete user
const deleteUser = async (userId) => {
    const oldData = await readAllUser();
    const newData = oldData.filter(i => i.id != userId);
    if (newData.length === oldData.length) { // user not found
        return 0; // errors
    } else {
        const newDataConvertToString = JSON.stringify(newData, null, 4);
        await fsWrite(newDataConvertToString);
        return 1; // success
    }
}

module.exports = {
    readAllUser, getUserById, createUser, updateUser, deleteUser,
}
