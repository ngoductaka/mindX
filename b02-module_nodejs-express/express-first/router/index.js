const express = require('express')
const router = express.Router()

const authRouter = require('./authRouter');
const userRouter = require('./userRouter');

router.use('/login', authRouter)
router.use('/user', userRouter)

module.exports = router;