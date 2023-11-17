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
        console.log(err);
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


            // const user = {
            //     name: 'nva',
            //     age: 33,
            //     id: 1,
            // }
            // const dataUpdate = {
            //     age: 29,
            // }
            // return {
            //     name: 'nva',
            //     id: 1,
            //     age: 29,
            // }


        }
        return user;
    });

    await writeData(newData);
};

const main = () => {
    // const data = await readAll();
    // console.log('data return:', data);
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
main();
// // 
// // CRUD list user 
// // => create, read, update, delete