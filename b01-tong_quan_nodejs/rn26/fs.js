var fs = require('fs');
var path = require('path');

const database = path.join(__dirname, 'database.json');

const readAllCallBack = (cb) => {
    fs.readFile(
        database, // path đến file 
        'utf8', // kiêu decode
        (err, data) => {  // callback
            if (err) {
                console.log(err);
                return;
            }
            cb(JSON.parse(data))
            console.log('readFile', JSON.parse(data));
        }
    );
}
// Read
const readAllPromise = () => {
    return fs.promises.readFile(
        database, // path đến file 
        'utf8', // kiêu decode
    ).then((data) => {
        // console.log('readFile', JSON.parse(data)); // string => object
        return JSON.parse(data);
        // JSON => string co cau truc 
    })
        .catch((err) => {
            console.log(err);
        });
}
// write
const readAll = async () => {
    try {
        const data = await fs.promises.readFile(
            database, // path đến file 
            'utf8', // kiêu decode
        );
        return JSON.parse(data);
    } catch (err) {
        console.log('readAll', err);
    };
}
const writeData = (data) => {
    return fs.promises.writeFile(database, JSON.stringify(data, null, 4), 'utf8');
};

const createNewUser = async (userData) => {
    const oldData = await readAll();
    const newData = [userData, ...oldData];
    // const user = 3;
    // const oldData = [1, 2];
    // const newData = [user, ...oldData]; // ngắn gọn hơn
    // // 
    // const newData = [user, oldData[0], oldData[1]];



    await writeData(newData);
};
const updateUser = async (userId, dataUpdate) => {
    const oldData = await readAll();
    const newData = oldData.map(user => {
        if (user.id === userId) {
            return {
                ...user,
                ...dataUpdate
            }
        }
        return user;
    });

    await writeData(newData);
};
const replaceUser = async (userId, dataUpdate) => {
    const oldData = await readAll();
    const newData = oldData.map(user => {
        if (user.id === userId) {
            return {
                ...dataUpdate,
                id: userId
            }
        }
        return user;
    });

    await writeData(newData);
};

const deleteUser = async (userId) => {
    // b1 get all data
    const oldData = await readAll();
    // b2 delete
    // c1
    // const newData = oldData.filter(user => user.id !== userId);
    // newData là array mới dựa trên oldData
    // c2

    const index = oldData.findIndex(user => user.id === +userId);
    //  === 
    //  ==
    // primary value 
    // js có 7 kiểu dữ liệu nguyên thủy
    // cấu trúc dữ liệu [] {} map set weakMap weakSet
    // [] // map filter findIndex find forEach reduce for in for of ....
    // {} // for in for of Object.keys Object.values Object.entries
    // hàm function 

    // 
    console.log('index', index)
    if (index !== -1) {
        oldData.splice(index, 1);
        // splice tác động đến array ban đầu
        // b3 save
        await writeData(oldData);
    }
}

const userLogin = async (username, password) => {
    const oldData = await readAll();
    let errMessage = ''
    const user = oldData.find(user => {
        if (user.username !== username) {
            errMessage = 'username not found';
            return false;
        }
        if (user.password !== password) {
            errMessage = 'Password not match';
            return false;
        }
        return true;
    });

    if (user) {
        return user;
    }
    throw new Error(errMessage);
};

const main = async () => {
    const data = await readAll();
    console.log('data return:', data);
    await deleteUser(2);
    const dataAfterDelete = await readAll();
    console.log('dataAfterDelete return:', dataAfterDelete);

    // readAllPromise()// promise hell
    //     .then(data => {
    //         console.log('readAll', data);

    //     })
    // readAllCallBack((data) => {
    //     console.log('readAllCallBack', data);
    // });
    // readAllCallBack();

    // writeData([
    //     {
    //         name: 'nva',
    //         age: 33,
    //         id: 1,
    //     }
    // ]);
    // createNewUser({
    //     name: 'nguyen van b',
    //     age: 22,
    //     id: 2,
    // })
    // updateUser(2, {
    //     age: 29,
    // })
};
// delete (filter splice)
// main();
// // 
// CRUD list user 
// => create, read,update 
// => delete => btvn
// check btvn 
// 
// CURD
module.exports = {
    readAll,
    createNewUser,
    updateUser,
    deleteUser,
    replaceUser,
    userLogin,
}
