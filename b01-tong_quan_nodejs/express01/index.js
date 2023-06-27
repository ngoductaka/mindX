
const express = require('express')
var bodyParser = require('body-parser')
const userHandle = require('./handle_user');
var cors = require('cors') // 

var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors())



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
    async (req, res) => {
        const data = await userHandle.readAllUser();
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
userRouter.post('/', async (req, res) => {
    const newDataUser = req.body;
    await userHandle.createUser(newDataUser);
    res.status(200).send('Create user success');
});

userRouter.patch('/:userId', async (req, res) => {
    const newDataUser = req.body;
    await userHandle.updateUser(req.params.userId, newDataUser);
    res.status(200).send('Update user success');
})


userRouter.delete('/:userId', async (req, res) => {
    const newDataUser = req.body;
    await userHandle.deleteUser(req.params.userId, newDataUser);
    res.status(200).send('Update user success');
})

router.use('/user', userRouter)

app.use('/', router); // tổng

app.listen(3001, () => {
    console.log('app run on port 3001')
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