const express = require('express')
var bodyParser = require('body-parser')
const path = require('path');


const multer = require('multer')
const app = express();
app.use(express.static('uploads'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const jwt = require('jsonwebtoken');
const KEY = "supper_secret_key"

const { createUser, handleLogin, getAll, getOne } = require('./controller');
const {
    createNewRecord,
    readAll: getALlProduct, } = require('./product_model');
const userRouter = express.Router();

const validateToken = async (req, res, next) => {
    try {
        console.log('asdasd', req.headers)
        const [bb, token] = req.headers.authorization.split(" ");
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
userRouter.post(
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
app.post('/login', handleLogin);


const fullPath = path.resolve('./uploads')
// const upload = multer({ dest: 'uploads/' })
const storage = multer.diskStorage({
    limits: { fieldSize: 25 * 1024 * 1024 },
    destination: fullPath,
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits: { fieldSize: 25 * 1024 * 1024 }
})


app.post('/upload', (req, res, next) => {
    console.log('dddddd', req.body)
    next();
}, upload.single('img'), (req, res) => {
    res.json(req.file)
})


// api for list product ()

app.get('/product', async (req, res) => {
    const data = await getALlProduct();
    res.json(data);
});

// api for create product ()
app.post('/product', async (req, res) => {
    const dataProduct = req.body
    const data = await createNewRecord(dataProduct);
    res.json(data);
});


app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:${3000}`)
})