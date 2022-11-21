const express = require('express')
var bodyParser = require('body-parser')

const router = require('./router');

const app = express();

// https://runkit.com/
const port = 3000;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// config static file
app.use(express.static('anh'))




app.use('/', router);

// 1. jwt 
// 2. middleware 

// http code
// 100 -> 199
// 200 => thanh công
// 300 => redirect 
// 400 => lỗi client 
// 500 => lỗi liên quan đến server 
// middleware 
// user 
//   validateRole
const validateRole = (req, res, next) => {
    console.log(req.headers?.authorization);
    if (req.headers?.authorization) {
        const [bb, token] = req.headers?.authorization.split(' ');
        jwt.verify(
            token,
            'secret_key',
            function (err, decoded) {
                if(err) {
                    res.status(401).send(err)
                } else {
                    req.user = decoded.data
                    next()
                }
            });

    } else {
        res.status(401).send("unauthorization!")
    }
}

app.get(
    '/user', // path đường dẫn 
    // handle logic 1
    validateRole,
    //  handle logic 2
    (req, res) => {
        res.send({
            msg: "Request success!",
            data: req.user,
        })
    },
)


// logic JWT
var jwt = require('jsonwebtoken');

const createTOken = (dataEndCode) => {
    return jwt.sign({
        data: dataEndCode
    }, 'secret_key');
}
// call db
const isExit = ({ userName, password }) => {
    return (userName === 'dnd' && password === '123')
}
// api login 
app.post('/login', (req, res) => {
    const { userName, password } = req.body;
    // tim kiem trong db 
    const isExitUser = isExit({ userName, password })
    if (isExitUser) {
        const token = createTOken({ userName, password, role: 'admin' });
        console.log('token', token);
        res.json({
            userData: { userName, password, role: 'admin' },
            token: token,
        })
    } else {
        res.status(400).json({ msg: 'user not found!' })
    }

})




// router => middware => controller <=> model 

// M : model => xử lý database (CRUD)
// V : view => ( html giao tiếp client )
// C : controller ( sử lý logic )


//  các method trên http


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})