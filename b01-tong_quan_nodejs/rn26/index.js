const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

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
    '/wiki/:userId', // path
    (req, res) => {
        // data gửi kèm: params, query, body(body-parser) lấy từ req 
        // query, param : dữ liệu trên đường dẫn
        const query = req.query;
        const params = req.params;
        // value => string
        console.log('params and query:', { params, query });

        res.send('<h2 style="font-size: 30px; color: blue">hello wiki</h2>');
        // res.status(400).send('hello wiki');
    });

app.post('/user', (req, res) => {
    const body = req.body;
    console.log('body:', body);
    res.json(body);

    // res.send('<h2 style="font-size: 30px; color: blue">hello wiki</h2>');
});

app.put('/user', (req, res) => { });
app.patch('/user', (req, res) => { });
app.delete('/user', (req, res) => { });

app.listen(3000, () => {
    console.log(`Example app listening on: ${3000}`)
})
