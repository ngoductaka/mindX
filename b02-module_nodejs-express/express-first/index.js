const express = require('express')
var bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const jwt = require('jsonwebtoken');
const KEY = "supper_secret_key"

const { createUser, handleLogin, getAll, getOne } = require('./controller');
const userRouter = express.Router();

const validateToken = async (req, res, next) => {
    try {
        const token = req?.query?.token;
        console.log('01: token', token);
        if (!token) {
            res.status(401).json({
                msg: 'missing token'
            });
        };

        const dataDecoded = await jwt.verify(token, KEY);
        console.log('02: dataDecoded', dataDecoded);
        if (dataDecoded && dataDecoded.id) {
            req.user = dataDecoded;
            next();
        } else {
            res.status(401).json({
                msg: 'Failed to authenticate token!'
            });
        }
    } catch (err) {
        res.status(401).json({
            msg: 'Failed to authenticate token!'
        });
    }
};
const isAdmin = async (req, res, next) => {
    console.log('03: req.user', req.user);
    if (req.user.role === 'admin') {
        next();
    } else {
        res.status(401).json({
            msg: 'permission deny!'
        });
    }
}

const logging = (req, res, next) => {
    console.log('url', req.url);
    console.log('user', req.user.name);
    next();
};

// 01 api register
userRouter.get(
    '/', // dduowngf danx
    createUser // cal back xu lys
);

// api 03 get all
userRouter.get(
    '/all', // dduowngf danx
    // middleware
    // midd 01
    validateToken,
    // midd 02
    isAdmin,
    // controller
    getAll // cal back xu lys
);

userRouter.get(
    '/one', // dduowngf danx
    // middleware
    // midd 01
    validateToken,
    logging,
    // midd 02
    // controller
    getOne // cal back xu lys
);
app.use('/user', userRouter);
// api 02
app.get('/login', handleLogin);


app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:${3000}`)
})





// 6 api theo mô hinh MVC RestFul

// 1. C (create sign in tạo mới user fb  ) => ko cần token (jwt) // method post 

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
