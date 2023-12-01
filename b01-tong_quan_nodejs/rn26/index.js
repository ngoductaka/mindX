const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const {
    readAll,
    createNewUser,
    updateUser,
    deleteUser,
    replaceUser,
    userLogin,
} = require('./fs');
const PRIVATE_KEY = 'adskjfabsfjkkw4u9283fbwecbshcbf94y34r3efb'
const verifyUser = (req, res, next) => {
    try {

        if (!req?.headers?.authorization) {
            res.status(401).json({
                message: 'unauthorization',
            });
            return;
        }
        console.log('req.headers.authorization', req.headers.authorization)
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, PRIVATE_KEY);
        console.log('decoded', decoded);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            message: error.message,
        });
    }
}
// khởi tạo 1 app (instance của express)
const app = express();
cors(app);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// phân tách request 
// 1. url // path (đường dẫn ) địa chỉ trên trình duyệt
// eg: https://en.wikipedia.org/wiki/HTTP ( domain: en.wikipedia.org, path: /wiki/HTTP)
// 2. method // phương thức (get, post, put, patch, delete) RESTful API
// 3. data gửi kèm: params, query, body // nội dung

// method: get
// url: /wiki
// data gửi kèm: params, query, body
// query: http://localhost:3000/wiki?name=rn26&age=33 => ?name=rn26&age=33
//  key and value (key=value)




// 1. luôn luôn lắng nghe request và phân tích request 
// 2. phân tích request
// 3. trả về response
// 4. đóng kết nối

// request  
app.get(
    '/user', // path
    async (
        req, // 
        res
    ) => {
        // data gửi kèm: params, query, body(body-parser) lấy từ req 
        // query, param : dữ liệu trên đường dẫn
        const query = req.query;
        const params = req.params;
        // value => string
        // console.log('params and query:', { params, query });
        const data = await readAll()
        res.status(401).json(data);
    });

// validate 
// sinh userId
app.post('/user', async (req, res) => {
    const body = req.body;
    await createNewUser(body);
    res.json({
        message: 'create user success',
    });
    // res.send('<h2 style="font-size: 30px; color: blue">hello wiki</h2>');
});

app.put('/user/:userId', verifyUser,async (req, res) => {
    const { userId } = req.params;
    const body = req.body;
    await replaceUser(userId, body);
    res.status(300).json({
        message: 'replace user success',
    });

});

// 
app.delete('/user/:userID',verifyUser, (req, res) => {
    const { userID } = req.params;
    deleteUser(userID);
    res.json({
        message: 'delete user success',
    });

});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        // xác thực người dùng
        const user = await userLogin(username, password);
        // 
        var token = jwt.sign(
            user, // body 
            PRIVATE_KEY, // footer chứa chữ ký
            // { algorithm: 'RS256' } // header chứa thuật toán mã hóa
        );

        res.json({
            data: user,
            token: token,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
});
app.post('/register', (req, res) => {
    const body = req.body;
    createNewUser(body);
    res.json({
        message: 'register success',
    });
});

app.patch('/user', verifyUser, async (req, res) => {
    try {
        // xác thực người dùng bănq cách xác thực token
        // update 
        console.log('req.user', req.user);
        const userId = req.user.id;
        const body = req.body;
        await updateUser(userId, body);
        res.json({
            message: 'update user success',
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
});


app.listen(3000, () => {
    console.log(`Example app listening on: ${3000}`)
})
// RESTful API (Bộ quy tắc thiết kế API)
// get: lấy dữ liệu
// post: tạo mới dữ liệu
// put: cập nhật toàn bộ dữ liệu
// patch: cập nhật 1 phần dữ liệu
// delete: xóa dữ liệu

// http code
// 200: ok
// 201: created
// 400: bad request


// Authentication: xác thực xem người dùng có quyền truy cập hay không
// Authorization: xác định người dùng, phân quyền xem người dùng có quyền truy cập vào resource hay không
// session

// jwt

