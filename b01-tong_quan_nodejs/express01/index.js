
const express = require('express')
const path = require('path')
var bodyParser = require('body-parser')

const privateKey = 'asdfkasbdfjhasvdfjhasvdfjasdf';

var jwt = require('jsonwebtoken');

const userHandle = require('./handle_user');
var cors = require('cors'); // 
const { userCreateValidate, loginSchema, middlewareValidate } = require('./validate');

var app = express()
// static file 
app.use(express.static('static'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors())


const authMiddleware = (req, res, next) => {
    try {
        console.log(req.headers.authorization)
        const [_, token] = req.headers.authorization.split(" ")
        const userData = jwt.verify(token, privateKey);
        console.log('userData', userData);
        req.user = userData;
        next();
    } catch (err) {
        res.status(401).json({
            msg: 'invalid token',
            err: err
        })
    }
};
// http 

// 1. đường dẫn 

// 2. method 
// get
// post
// patch
// put
// delete

// 3. phương thức truyền dữ liêu 
// header

// body 
// path



const router = express.Router();
// 1. đường dẫn 
// 2. method
// 3. dữ liệu mà client gửi lên
// truyền bằng đường dẫn
// - params /:userId
// - query  ?name=react-native&number=25
// truyền bằng body
// - body

const userRouter = express.Router();

// Read all user
userRouter.get(
    '/', // đường dẫn
    // middleware
    // 
    async (req, res) => {
        const data = await userHandle.readAllUser();
        res.status(200).json(data);
    }, // cb xử lý req và res từ client theo đường dẫn 
)
// get current user
userRouter.get(
    '/current', // đường dẫn
    authMiddleware,
    // 
    async (req, res) => {
        const data = await userHandle.getUserById(req.user.id);
        res.status(200).json(data);
    }, // cb xử lý req và res từ client theo đường dẫn 
)

// Read user by id
userRouter.get(
    '/:userId', // đường dẫn
    async (req, res) => {
        const userFounded = await userHandle.getUserById(req.params.userId);
        if (userFounded) {
            res.status(200).json(userFounded);
        } else {
            res.status(404).json({
                message: 'user not found'
            });
        }
    }, // cb xử lý req và res từ client theo đường dẫn 
)
// create user
userRouter.post('/',
    // middlewareValidate(createUserSchema),
    (req, res, next) => {
        // logic định danh user 
        req.user = {
            data: 'data',
        }
        next();
    },
    userCreateValidate,
    // (
    //     req, // object chứa thông tin từ client 
    //     res, // obj chứa chức năng phản hồi từ server về client
    //     next, // function gọi để chuyển logic sang cb sau đó 
    // ) => {
    //     const { error } = createUserSchema.validate(req.body);
    //     if (error) {
    //         res.status(400).json(error.details)
    //     }
    //     // req đúng quy cách format 
    //     next();
    // },
    async (req, res) => {
        console.log('user info: ', req.user);
        const newDataUser = req.body;
        await userHandle.createUser(newDataUser);
        res.status(200).send('Create user success');
    });

userRouter.patch(
    '/:userId',  // path
    // middlewareValidate(updateUserSchema),
    async (req, res) => {
        const newDataUser = req.body;
        await userHandle.updateUser(req.params.userId, newDataUser);
        res.status(200).send('Update user success');
    }
)


userRouter.delete('/:userId', async (req, res) => {
    const newDataUser = req.body;
    await userHandle.deleteUser(req.params.userId, newDataUser);
    res.status(200).send('Update user success');
})

router.use('/user', userRouter)

router.post('/login',
    middlewareValidate(loginSchema),
    async (req, res) => {
        const user = await userHandle.handleLogin(req.body);
        if (user) {
            var token = jwt.sign(user, privateKey);
            res.json({
                token,
            })
            return 1;
        }
        res.status(404).send({
            msg: 'user not found',
        })
    })

// router.use('/file', (req, res)=> {
//     res.sendFile(path.resolve(__dirname, 'index1.html'))
// })
// router.use('/dnd.jpeg', (req, res)=> {
//     res.sendFile(path.resolve(__dirname, 'dnd.jpeg'))
// })



app.use('/', router); // tổng
const PORT = 3001;
app.listen(PORT, () => {
    console.log('app run on port ' + PORT)
})


// express js
// - routing
    // - 1. đường dẫn
    // - 2. method (get, post, path, delete, put)

// - sử lý req, res
    // res (thông tin về yêu cầu từ client)
       // 1 req.query
       // 2 req.params
       // 3 req.body


// http code 

// RestFULL => chuẩn để viết api 
// quy cách viết api 
// đường dẫn 

// method 
// get lấy dữ liệu 
// post => tạo mới 
// put => update ( thay thế toàn bộ dữ liêu)
// path => update ( update 1 hoặc nhiều trường dữ liệu)
// delete => xoá dữ liệu 


// 1 . có phải user của hệ thống hay không || => 
// 2. đó là user nào || => 

// JWT 