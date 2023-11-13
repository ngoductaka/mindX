require('dotenv').config();

const express = require('express')
var bodyParser = require('body-parser')

var cors = require('cors');
const { connect } = require('./models/connect')

var app = express();
app.use(express.static('statics'))
app.use(bodyParser.urlencoded({ extended: true })); 
// app.use(express.urlencoded());
// app.use(bodyParser.json());


// config body-parser (parse body) req.body
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json())

// config cors 
app.use(cors())

connect()


app.use('/', require('./routes/index'));


const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(`Example app listening on port: ${port}!`)
})
// jwt full flow
// pass encoded
// cấu trúc thư mục 
// momgodb và class base

//  1 backend
//  -  api login => trả jwt
//  -  sử dụng jwt => tường request ngoại trừ (create user và login)
//  - api profile (CRUD) 
//        - create: đk tài khoản
//        - Read: lấy user hiện tại 
//        - update: update thông tin user =>  sửa profile 
//        - delete: xóa user
//  2 frontend
//  -  login, register, ()
//  -  profile
//  -  update profile (update avatar + api upload ảnh) 
//  -  delete profile
//  -  


// CRUD
// => create, Read, Update, Delete