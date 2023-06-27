
const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')

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

userRouter.get(
    '/:userId', // đường dẫn
    (req, res) => {
        res.send('hihi')
        // req object chứa thông tin mà client gửi lên 
        console.log('req', {
            query: req.query,
            body: req.body,
            params: req.params,
        });

    }, // cb xử lý req và res từ client theo đường dẫn 
)

userRouter.post('/', (req, res) => {
    console.log('reqreqreq', req.body);
    res.json(req.body);
})

router.use('/user', userRouter)

router.get('/content',);

router.get('/article', (req, res) => {

});


app.use('/', router); // tổng


app.listen(3001, () => {
    console.log('app run on port 3001')
})
