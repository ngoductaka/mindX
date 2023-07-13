
const express = require('express');
const multer = require('multer');
const userRouter = require('./user');
const { userController } = require('../controller');
const { authMiddleware } = require('../middleware/auth');


const router = express.Router();
const allowType = ['png', 'jpg', 'jpeg', 'gif'];

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'statics/')
    },

    filename: function (req, file, cb) {
        console.log(req.params.user_id, '1111');
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const splitFileName = file.originalname.split('.')
        const fileType = splitFileName[splitFileName.length - 1];
        // mimetype of file use to check type of file
        const fileSize = parseInt(req.headers["content-length"])
        // if (fileSize > 25) {
        //     cb('type too large to upload ', null)
        //     return 0;
        // }

        if (allowType.includes(fileType)) {
            cb(null, `${req.params.user_id}.${fileType}`)
        } else {
            cb('type of file is not allow', null)
        }

    }
})

const upload = multer({
    storage: storage,
    limits: { fieldSize: 25 }
}).single('avatar')

router.use('/user', authMiddleware, userRouter);
router.post('/login', userController.login);
router.post('/register', userController.createUser);
router.post(
    '/upload/:user_id',
    // authMiddleware, 
    // upload.single('avatar'),
    (req, res) => {
        console.log(req.params.user_id, '3333');
        upload(req, res, function (err) {
            console.log(req.file, '2222');
            if (err) {
                return res.status(400).json({
                    success: false,
                    error: err
                });
            } else {
                res.json({
                    success: true,
                    ...req.file
                });
            }
        })
    });
module.exports = router;