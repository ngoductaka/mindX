const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const {
    readAll,
    createNewUser,
    updateUser,
    deleteUser,
} = require('./fs');

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
app.get(
    '/user', // path
    async (req, res) => {
        // data gửi kèm: params, query, body(body-parser) lấy từ req 
        // query, param : dữ liệu trên đường dẫn
        const query = req.query;
        const params = req.params;
        // value => string
        // console.log('params and query:', { params, query });
        const data = await readAll()
        res.json(data);
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

app.put('/user', (req, res) => { });
app.patch('/user', (req, res) => { });
app.delete('/user', (req, res) => { });

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