const express = require('express')
var bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const fs = require('fs');

 const readFilePromise = (path, endCode) => {
    return new Promise((res, rej) => {
        fs.readFile(path, endCode, (err, result) => {
            if(err) rej(err);
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
const createNewRecord = async (dataNewUser) => {
    try {
        const dataConvert = {
            ...dataNewUser,
            id: new Date().valueOf(),
        };
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

// controller.js
const createUser = async (
    req, // request object
    res // response object 
) => {
    try {
        // { params, query, body} = req 
        // lấy data từ client (request)
        const payload = req.body;
        // xử lý yêu cầu từ client 
        const result = await createNewRecord(payload);
        // response 
        res.json({
            data: result
        })
    } catch (err) {
        res.status(500).json({
            data: err
        })
    }
}

// useRouter.js // cần tách folder 
const userRouter = express.Router();
userRouter.post(
    '/', // dduowngf danx
    createUser // cal back xu lys
);
// get post patch put delete
// 
app.use('/user', userRouter);

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:${3000}`)
})





// 6 api theo mô hinh MVC RestFul

// 1. C (create) => ko cần token (jwt) // method post 

// 2. R (read all) => cần token với role admin // GET
// 3. R (read one) => cần token của user hiện tại (id trong token giống với id của user) // GET

// 4. U (update) => cần token của user hiện tại (id trong token giống với id của user) 
// PUT ( update date toàn bộ )
// PATCH ( update lại 1 số trường nhất định )

// 5. D (delete) => cần token vs role admin 
// DELETE

// 6. login => tìm trong db xác định user => trả về token 



// //  =========== 8*********************8 =============================
// // 1. jwt 
// // 2. middleware 

// // http code
// // 100 -> 199
// // 200 => thanh công
// // 300 => redirect 
// // 400 => lỗi client 
// // 500 => lỗi liên quan đến server 
// // middleware 
// // user 
// //   validateRole
// const validateRole = (req, res, next) => {
//     console.log(req.headers?.authorization);
//     if (req.headers?.authorization) {
//         const [bb, token] = req.headers?.authorization.split(' ');
//         jwt.verify(
//             token,
//             'secret_key',
//             function (err, decoded) {
//                 if(err) {
//                     res.status(401).send(err)
//                 } else {
//                     req.user = decoded.data
//                     next()
//                 }
//             });

//     } else {
//         res.status(401).send("unauthorization!")
//     }
// }

// // app.get(
// //     '/user', // path đường dẫn 
// //     // handle logic 1
// //     validateRole,
// //     //  handle logic 2
// //     (req, res) => {
// //         res.send({
// //             msg: "Request success!",
// //             data: req.user,
// //         })
// //     },
// // )


// // logic JWT
// var jwt = require('jsonwebtoken');

// const createTOken = (dataEndCode) => {
//     return jwt.sign({
//         data: dataEndCode
//     }, 'secret_key');
// }
// // call db
// const isExit = ({ userName, password }) => {
//     return (userName === 'dnd' && password === '123')
// }
// // api login 
// // app.post('/login', (req, res) => {
// //     const { userName, password } = req.body;
// //     // tim kiem trong db 
// //     const isExitUser = isExit({ userName, password })
// //     if (isExitUser) {
// //         const token = createTOken({ userName, password, role: 'admin' });
// //         console.log('token', token);
// //         res.json({
// //             userData: { userName, password, role: 'admin' },
// //             token: token,
// //         })
// //     } else {
// //         res.status(400).json({ msg: 'user not found!' })
// //     }

// // })

// // buổi 01: CRUD ( create Read Update Delete) danh sách học sinh
// // buổi 02: express + router 
// // buổi 03: middleware + jwt
// // buổi 04: 

// // 6 api theo mô hinh MVC RestFul

// // 1. C (create) => ko cần token (jwt) // method post 

// // 2. R (read all) => cần token với role admin // GET
// // 3. R (read one) => cần token của user hiện tại (id trong token giống với id của user) // GET

// // 4. U (update) => cần token của user hiện tại (id trong token giống với id của user) 
// // PUT ( update date toàn bộ )
// // PATCH ( update lại 1 số trường nhất định )

// // 5. D (delete) => cần token vs role admin 
// // DELETE

// // 6. login => tìm trong db xác định user => trả về token 






// // router => middware => controller <=> model 

// // M : model => xử lý database (CRUD)
// // V : view => ( html giao tiếp client )
// // C : controller ( sử lý logic )


// //  các method trên http
