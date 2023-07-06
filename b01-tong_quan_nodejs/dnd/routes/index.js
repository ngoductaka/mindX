
const express = require('express');
const userRouter = require('./user');
const { userController } = require('../controller');
const { authMiddleware } = require('../middleware/auth');


const router = express.Router();
router.use('/user', authMiddleware, userRouter);
router.post('/login', userController.login);

module.exports = router;